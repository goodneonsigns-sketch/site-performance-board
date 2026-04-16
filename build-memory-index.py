#!/usr/bin/env python3
"""
Memory Index Builder

Scans memory/*.md files (YYYY-MM-DD format) and generates memory-index.json
for the Ops Dashboard Memory Tab.

Run this before each git push to keep the index current.
"""

import json
import os
import re
from datetime import datetime, timedelta
from pathlib import Path

# Directories
MEMORY_DIR = Path(__file__).parent.parent.parent / "memory"
OUTPUT_FILE = Path(__file__).parent / "memory-index.json"


def parse_markdown_headers(content):
    """Extract H2 sections from markdown content."""
    sections = []
    current_section = None
    
    for line in content.split('\n'):
        if line.startswith('## '):
            if current_section:
                sections.append(current_section)
            current_section = {
                'title': line[3:].strip(),
                'content': []
            }
        elif current_section and line.startswith('  -'):
            # Bullet points within sections
            current_section['content'].append(line.strip())
        elif current_section and not line.strip().startswith('#'):
            current_section['content'].append(line.strip())
    
    if current_section:
        sections.append(current_section)
    
    return sections


def count_words(content):
    """Count words in markdown content."""
    # Remove markdown syntax for counting
    text = re.sub(r'[#*`\[\]()]', '', content)
    return len(text.split())


def sanitize_content(text):
    """Remove secrets, tokens, API keys from content before publishing."""
    # Shopify access tokens (shpat_...)
    text = re.sub(r'shpat_[a-zA-Z0-9]{30,}', '[REDACTED_TOKEN]', text)
    # Shopify shared secrets
    text = re.sub(r'shpss_[a-zA-Z0-9]{30,}', '[REDACTED_SECRET]', text)
    # Generic long hex/alphanumeric tokens (40+ chars)
    text = re.sub(r'(?<![a-zA-Z0-9/])[a-f0-9]{40,}(?![a-zA-Z0-9])', '[REDACTED_HASH]', text)
    # API keys that look like key=value with long values
    text = re.sub(r'(api[_-]?key|api[_-]?token|access[_-]?token|secret[_-]?key|bearer)\s*[:=]\s*\S{20,}', r'\1: [REDACTED]', text, flags=re.IGNORECASE)
    # Dropbox tokens
    text = re.sub(r'sl\.[a-zA-Z0-9._-]{50,}', '[REDACTED_DROPBOX_TOKEN]', text)
    # JWT tokens
    text = re.sub(r'eyJ[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}\.[a-zA-Z0-9_-]{20,}', '[REDACTED_JWT]', text)
    return text


def parse_memory_file(file_path):
    """Parse a single memory file and extract structured data."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Sanitize content before indexing (strip secrets/tokens)
    content = sanitize_content(content)
    
    sections = parse_markdown_headers(content)
    word_count = count_words(content)
    file_size = os.path.getsize(file_path)
    
    # Extract date from filename (YYYY-MM-DD.md)
    date_match = re.match(r'(\d{4}-\d{2}-\d{2})', file_path.stem)
    date = date_match.group(1) if date_match else file_path.stem
    
    return {
        'date': date,
        'filename': file_path.name,
        'sections': sections,
        'section_count': len(sections),
        'file_size_bytes': file_size,
        'word_count': word_count,
        'full_content': content,
        'summary_content': '\n'.join([f"## {s['title']}\n" + '\n'.join(s['content']) for s in sections])
    }


def is_daily_file(file_path):
    """Check if file is a daily memory file (YYYY-MM-DD.md)."""
    pattern = re.compile(r'^\d{4}-\d{2}-\d{2}\.md$')
    return bool(pattern.match(file_path.name))


def analyze_activity_level(file_data):
    """Analyze activity level for color-coding."""
    # Use section count as activity metric
    section_count = file_data['section_count']
    word_count = file_data['word_count']
    
    if section_count == 0:
        return 'empty'
    elif section_count >= 15 or word_count >= 5000:
        return 'very-active'
    elif section_count >= 8 or word_count >= 2500:
        return 'active'
    elif section_count >= 4 or word_count >= 1000:
        return 'moderate'
    else:
        return 'light'


def get_project_mentions(file_data):
    """Extract project mentions from content."""
    projects = []
    keywords = ['Crown', 'Shirtsy', 'GoodNeon', 'Lux', 'Lux Neon', 'Coconut', 'Reclaimed', 
                'Virtus', 'Nova Titans', 'NET30', 'NET60', 'Shopify', 'WordPress', 'Cloudflare']
    
    content = file_data['full_content'].lower()
    for project in keywords:
        if project.lower() in content:
            projects.append(project)
    
    return list(set(projects))


def main():
    """Main build function."""
    if not MEMORY_DIR.exists():
        print(f"Error: Memory directory not found: {MEMORY_DIR}")
        return
    
    memory_index = []
    
    # Scan for daily files only
    daily_files = sorted([f for f in MEMORY_DIR.iterdir() if f.is_file() and is_daily_file(f)])
    
    print(f"Found {len(daily_files)} daily memory files")
    
    for file_path in daily_files:
        try:
            file_data = parse_memory_file(file_path)
            activity_level = analyze_activity_level(file_data)
            projects = get_project_mentions(file_data)
            
            index_entry = {
                'date': file_data['date'],
                'filename': file_data['filename'],
                'section_count': file_data['section_count'],
                'word_count': file_data['word_count'],
                'file_size_bytes': file_data['file_size_bytes'],
                'activity_level': activity_level,
                'projects': projects,
                'sections': file_data['sections']
            }
            
            memory_index.append(index_entry)
            print(f"  ✓ {file_path.name}: {file_data['section_count']} sections, {file_data['word_count']} words")
            
        except Exception as e:
            print(f"  ✗ Error processing {file_path.name}: {e}")
    
    # Sort by date descending (newest first)
    memory_index.sort(key=lambda x: x['date'], reverse=True)
    
    # Build stats for sidebar
    total_days = len(memory_index)
    total_entries = sum(e['section_count'] for e in memory_index)
    
    # Count project mentions
    project_counts = {}
    for entry in memory_index:
        for project in entry['projects']:
            project_counts[project] = project_counts.get(project, 0) + 1
    
    most_active_projects = sorted(project_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    
    # Calculate recent activity streak
    recent_streak = 0
    if memory_index:
        # Check consecutive days from today
        dates = [datetime.strptime(e['date'], '%Y-%m-%d') for e in memory_index]
        today = datetime.now().date()
        check_date = today
        
        # Start from most recent entry
        if memory_index[0]['date']:
            last_date = datetime.strptime(memory_index[0]['date'], '%Y-%m-%d').date()
            check_date = last_date
        
        while True:
            has_entry = any(e['date'] == check_date.strftime('%Y-%m-%d') for e in memory_index)
            if has_entry:
                recent_streak += 1
                check_date -= timedelta(days=1)
            else:
                break
    
    index_output = {
        'generated_at': datetime.now().isoformat(),
        'stats': {
            'total_days_logged': total_days,
            'total_entries': total_entries,
            'most_active_projects': [{'project': p, 'days': c} for p, c in most_active_projects],
            'recent_activity_streak': recent_streak
        },
        'days': memory_index
    }
    
    # Write output
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(index_output, f, indent=2)
    
    print(f"\nGenerated {OUTPUT_FILE}")
    print(f"Stats: {total_days} days logged, {total_entries} entries, {recent_streak} day streak")
    print("Most active projects:", [p for p, _ in most_active_projects[:3]])


if __name__ == '__main__':
    main()
