import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePropertyDetail } from '../hooks/usePropertyDetail'
import { formatPrice, formatSqft } from '../hooks/useSparkListings'
import { usePropertyContext } from '../context/PropertyContext'

/* ─────────────────────────────────────────────
   FIELD CATEGORISATION
   Fields in these sets are rendered in their
   dedicated sections and excluded from the
   "All Other Fields" catch-all.
───────────────────────────────────────────────*/
const SKIP_FIELDS = new Set([
  // Internal / odata
  '@odata.id', 'Media',
  // Price history — rendered by PriceHistoryCard, not as raw fields
  'OriginalListPrice', 'PreviousListPrice', 'MajorChangeType', 'MajorChangeTimestamp', 'PriceChangeTimestamp',
  // Location fields rendered by LocationCommunityCard
  'Latitude', 'Longitude', 'Country',
  // Hidden per Lex (2026-04-04) — internal/agent fields not for buyers/sellers
  'Contract_sp_Information_co_Assumable_sp_RetroRate_sp_YN2',
  'Contract_sp_Information_co_Comp_sp_Sale_sp_YN2',
  'Contract_sp_Information_co_List_sp_Office_sp_Agency2',
  'Contract_sp_Information_co_Owner_sp_Agent_sp_YN2',
  'Contract_sp_Information_co_Delayed_sp_Marketing_sp_YN2',
  'Contract_sp_Information_co_Original_sp_Entry_sp_Timestamp',
  'Financial_sp_Information_co_Application_sp_Required_sp_YN2',
  // Financial section — rendered by FinancialCard, not raw fields
  'Financial_sp_Information_co_Membership_sp_Fee_sp_Required_sp_YN2',
  'Application_sp_Fee_sp_Details_co_Application_sp_Fee_sp_Required',
  'Short_sp_Sale_sp_Details_co_Short_sp_Sale_sp_Addendum',
  'TaxLegalDescription',
  // AssociationFee, TaxAnnualAmount etc rendered visually in FinancialCard
  'AssociationFee', 'AssociationFee2', 'AssociationFeeFrequency', 'AssociationFee2Frequency',
  'AssociationFeeIncludes', 'AssociationYN', 'AssociationName', 'AssociationName2',
  'AssociationPhone', 'AssociationPhone2',
  'Association_sp_Type_co_Association_sp_Type',
  'Financial_sp_Information_co_Association_sp_Deposit_sp_YN3',
  'Financial_sp_Information_co_Association_sp_Membership',
  'Application_sp_Fee_sp_Details_co_Application_sp_Fee',
  'Recreation_sp_Lease_sp_Information_co_Recreation_sp_Lease_sp_Remarks',
  'TaxAnnualAmount', 'TaxAssessedValue', 'TaxYear', 'ParcelNumber',
  'Tax_sp_Information_co_Tax_sp_Information',
  'ListingTerms', 'SpecialListingConditions',
  'HomeWarrantyYN',
  'LandLeaseAmount', 'LandLeaseAmountFrequency', 'LandLeaseExpirationDate', 'LandLeaseYN',
  'LeaseConsideredYN', 'LeaseTerm',
  'Price_sp_Calculations_co_Current_sp_Price_sp_To_sp_SqFt',
  'Concessions', 'ConcessionsAmount', 'ClosePrice', 'CloseDate', 'PurchaseContractDate', 'BuyerFinancing',
  'DelayedMarketingDate', 'DelayedMarketingYN',
  'DocumentsCount', 'DocumentsChangeTimestamp',
  'InternetAddressDisplayYN', 'InternetAutomatedValuationDisplayYN',
  'InternetConsumerCommentYN', 'InternetEntireListingDisplayYN',
  // All listing agent fields
  'ListAgentAOR', 'ListAgentDirectPhone', 'ListAgentEmail', 'ListAgentFax',
  'ListAgentFirstName', 'ListAgentFullName', 'ListAgentKey', 'ListAgentLastName',
  'ListAgentMiddleName', 'ListAgentMlsId', 'ListAgentMobilePhone',
  'ListAgentOfficePhone', 'ListAgentOfficePhoneExt', 'ListAgentPager',
  'ListAgentPreferredPhone', 'ListAgentPreferredPhoneExt', 'ListAgentStateLicense',
  'ListAgentTollFreePhone', 'ListAgentURL', 'ListAgentVoiceMail', 'ListAgentVoiceMailExt',
  // All list office fields
  'ListOfficeEmail', 'ListOfficeFax', 'ListOfficeKey', 'ListOfficeMlsId',
  'ListOfficeName', 'ListOfficePhone', 'ListOfficePhoneExt', 'ListOfficeURL',
  // All co-list agent fields
  'CoListAgentAOR', 'CoListAgentDirectPhone', 'CoListAgentEmail', 'CoListAgentFax',
  'CoListAgentFirstName', 'CoListAgentFullName', 'CoListAgentKey', 'CoListAgentLastName',
  'CoListAgentMiddleName', 'CoListAgentMlsId', 'CoListAgentMobilePhone',
  'CoListAgentOfficePhone', 'CoListAgentOfficePhoneExt', 'CoListAgentPager',
  'CoListAgentPreferredPhone', 'CoListAgentPreferredPhoneExt', 'CoListAgentStateLicense',
  'CoListAgentTollFreePhone', 'CoListAgentURL', 'CoListAgentVoiceMail', 'CoListAgentVoiceMailExt',
  // All co-list office fields
  'CoListOfficeEmail', 'CoListOfficeFax', 'CoListOfficeKey', 'CoListOfficeMlsId',
  'CoListOfficeName', 'CoListOfficePhone', 'CoListOfficePhoneExt', 'CoListOfficeURL',
  // Listing contract/admin
  'ListingAgreement', 'ListingContractDate', 'ListingId', 'ListingKey', 'ListingService',
  // System/timestamps
  'ModificationTimestamp', 'OnMarketDate', 'OriginalEntryTimestamp',
  'OriginatingSystemID', 'OriginatingSystemKey', 'OriginatingSystemName',
  'SourceSystemID', 'SourceSystemKey', 'SourceSystemName',
  // Owner/occupant private info
  'OccupantType', 'OccupantName', 'OccupantPhone',
  'OwnerName', 'OwnerPhone',
  // Private agent remarks
  'PrivateRemarks',
  // Misc internal
  'OfficeMember_sp_Information_co_DXORIGMLSID2',
  'Remarks_sp_and_sp_Miscellaneous_co_Any_sp_Broker_sp_Advertise_sp_YN2',
  // @Core.Permissions variants
  'ListAgentAOR@Core.Permissions', 'ListOfficeAOR@Core.Permissions',
  'CoListAgentAOR@Core.Permissions', 'CoListOfficeAOR@Core.Permissions',
  'OnMarketTimestamp@Core.Permissions',
  // Showing/agent-only fields
  'ShowingContactPhone', 'ShowingInstructions', 'ShowingRequirements', 'StartShowingDate',
  'Showing_sp_Details_co_Pet_lparen_s_rparen__sp_on_sp_Premises',
  'Showing_sp_Requirements_co_Showing_sp_Requirements',
  'ContractStatusChangeDate', 'StatusChangeTimestamp',
  'Status_sp_Change_sp_Information_co_Price_sp_Change_sp_Timestamp',
  'VideosCount',
  // Rendered in hero / key-facts
  'ListPrice', 'UnparsedAddress', 'City', 'StateOrProvince', 'PostalCode',
  'CountyOrParish', 'BedroomsTotal', 'BathroomsTotalInteger', 'BathroomsFull',
  'BathroomsHalf', 'BathroomsTotalDecimal', 'LivingArea', 'YearBuilt',
  'PropertyType', 'PropertySubType', 'StandardStatus', 'MlsStatus',
  // Description
  'PublicRemarks',
  // Photos metadata (shown implicitly via gallery)
  'PhotosCount', 'PhotosChangeTimestamp',
  // Location — internal MLS fields not useful for buyers
  'MLSAreaMajor', 'MLSAreaMinor', 'RoadSurfaceType',
  'Location_sp_and_sp_Legal_co_Special_sp_Assessment_sp_YN2',
  // Location — rendered visually in LocationCommunityCard (not as raw fields)
  'VirtualTourURLUnbranded', 'VirtualTourURLBranded',
  'SubdivisionName', 'Zoning', 'PetsAllowed', 'SeniorCommunityYN',
  'Restrictions_co_Restrictions',
])

// Sections: map field name → section key
const SECTION_MAP = {
  // Interior
  InteriorFeatures: 'interior',
  Flooring: 'interior',
  WindowFeatures: 'interior',
  DoorFeatures: 'interior',
  FireplaceFeatures: 'interior',
  FireplaceYN: 'interior',
  LaundryFeatures: 'interior',
  RoomsTotal: 'interior',
  MainLevelBedrooms: 'interior',
  MainLevelBathrooms: 'interior',
  Levels: 'interior',
  Stories: 'interior',
  StoriesTotal: 'interior',
  EntryLevel: 'interior',
  EntryLocation: 'interior',
  'Master_sp_BedroomBath_co_Master_sp_BedroomBath': 'interior',
  'Dining_sp_Area_co_Dining_sp_Area': 'interior',
  'Balcony_sp_Details_co_Balcony_sp_Details': 'interior',
  'Room_sp_Types_co_Room_sp_Types': 'interior',
  'Room_sp_Types_co_Bedroom_sp_2_sp_Level': 'interior',
  'Room_sp_Types_co_Kitchen_sp_Level': 'interior',
  'Room_sp_Types_co_Living_sp_Room_sp_Level': 'interior',
  'Room_sp_Types_co_Master_sp_Bedroom_sp_Level': 'interior',
  Furnished: 'interior',
  AccessibilityFeatures: 'interior',

  // Exterior
  ExteriorFeatures: 'exterior',
  PoolFeatures: 'exterior',
  PoolPrivateYN: 'exterior',
  SpaFeatures: 'exterior',
  SpaYN: 'exterior',
  PatioAndPorchFeatures: 'exterior',
  Fencing: 'exterior',
  LotFeatures: 'exterior',
  LotSizeArea: 'exterior',
  LotSizeAcres: 'exterior',
  LotSizeDimensions: 'exterior',
  OtherStructures: 'exterior',
  View: 'exterior',
  DirectionFaces: 'exterior',
  WaterfrontFeatures: 'exterior',
  WaterfrontYN: 'exterior',
  HorseAmenities: 'exterior',
  HorseYN: 'exterior',
  Vegetation: 'exterior',
  'General_sp_Property_sp_Information_co_Gated_sp_Community_sp_YN2': 'exterior',
  'General_sp_Property_sp_Information_co_Outdoor_sp_Living_sp_Spaces_sp_YN': 'exterior',
  'General_sp_Property_sp_Information_co_Pool_sp_Private_sp_YN': 'exterior',
  'General_sp_Property_sp_Information_co_Senior_sp_Community_sp_YN': 'exterior',
  'General_sp_Property_sp_Information_co_Unit_sp_Floor_sp__pound_2': 'exterior',
  'Storm_sp_Protection_sp_Details_co_Storm_sp_Protection_sp_Details': 'exterior',
  ParkingFeatures: 'exterior',
  ParkingTotal: 'exterior',
  GarageSpaces: 'exterior',
  GarageYN: 'exterior',
  CoveredSpaces: 'exterior',
  CarportSpaces: 'exterior',
  CarportYN: 'exterior',
  OpenParkingSpaces: 'exterior',
  AttachedGarageYN: 'exterior',

  // Systems / appliances
  Appliances: 'systems',
  Heating: 'systems',
  HeatingYN: 'systems',
  Cooling: 'systems',
  CoolingYN: 'systems',
  Electric: 'systems',
  Utilities: 'systems',
  Sewer: 'systems',
  WaterSource: 'systems',
  OtherEquipment: 'systems',
  GreenEnergyEfficient: 'systems',
  GreenEnergyGeneration: 'systems',
  GreenBuildingVerificationType: 'systems',
  GreenIndoorAirQuality: 'systems',

  // Construction
  ConstructionMaterials: 'construction',
  Roof: 'construction',
  FoundationDetails: 'construction',
  ArchitecturalStyle: 'construction',
  BuildingAreaTotal: 'construction',
  BuildingAreaSource: 'construction',
  BuildingName: 'construction',
  BuilderName: 'construction',
  BuilderModel: 'construction',
  Model: 'construction',
  StructureType: 'construction',
  PropertyCondition: 'construction',
  NewConstructionYN: 'construction',
  NumberOfUnitsInCommunity: 'construction',
  'DOH1': 'construction',

  // Financial
  AssociationFee: 'financial',
  AssociationFee2: 'financial',
  AssociationFeeFrequency: 'financial',
  AssociationFee2Frequency: 'financial',
  AssociationFeeIncludes: 'financial',
  AssociationYN: 'financial',
  AssociationName: 'financial',
  AssociationName2: 'financial',
  AssociationPhone: 'financial',
  AssociationPhone2: 'financial',
  'Association_sp_Type_co_Association_sp_Type': 'financial',
  'Financial_sp_Information_co_Application_sp_Required_sp_YN2': 'financial',
  'Financial_sp_Information_co_Association_sp_Deposit_sp_YN3': 'financial',
  'Financial_sp_Information_co_Association_sp_Membership': 'financial',
  'Financial_sp_Information_co_Membership_sp_Fee_sp_Required_sp_YN2': 'financial',
  'Application_sp_Fee_sp_Details_co_Application_sp_Fee': 'financial',
  'Application_sp_Fee_sp_Details_co_Application_sp_Fee_sp_Required': 'financial',
  'Recreation_sp_Lease_sp_Information_co_Recreation_sp_Lease_sp_Remarks': 'financial',
  TaxAnnualAmount: 'financial',
  TaxAssessedValue: 'financial',
  TaxLegalDescription: 'financial',
  TaxYear: 'financial',
  'Tax_sp_Information_co_Tax_sp_Information': 'financial',
  ParcelNumber: 'financial',
  // OriginalListPrice, PreviousListPrice, MajorChangeType, MajorChangeTimestamp, PriceChangeTimestamp
  // → rendered by PriceHistoryCard; excluded from financial section via SKIP_FIELDS
  ListingTerms: 'financial',
  SpecialListingConditions: 'financial',
  'Short_sp_Sale_sp_Details_co_Short_sp_Sale_sp_Addendum': 'financial',
  'Contract_sp_Information_co_Assumable_sp_RetroRate_sp_YN2': 'financial',
  'Contract_sp_Information_co_Comp_sp_Sale_sp_YN2': 'financial',
  'Contract_sp_Information_co_List_sp_Office_sp_Agency2': 'financial',
  'Contract_sp_Information_co_Owner_sp_Agent_sp_YN2': 'financial',
  HomeWarrantyYN: 'financial',
  LandLeaseAmount: 'financial',
  LandLeaseAmountFrequency: 'financial',
  LandLeaseExpirationDate: 'financial',
  LandLeaseYN: 'financial',
  LeaseConsideredYN: 'financial',
  LeaseTerm: 'financial',
  'Price_sp_Calculations_co_Current_sp_Price_sp_To_sp_SqFt': 'financial',
  Concessions: 'financial',
  ConcessionsAmount: 'financial',
  ClosePrice: 'financial',
  CloseDate: 'financial',
  PurchaseContractDate: 'financial',
  BuyerFinancing: 'financial',

  // Location / community (Latitude, Longitude, Country handled separately in LocationCommunityCard — not in SECTION_MAP)
  Directions: 'location',
  SubdivisionName: 'location',
  MLSAreaMajor: 'location',
  MLSAreaMinor: 'location',
  Zoning: 'location',
  ElementarySchool: 'location',
  MiddleOrJuniorSchool: 'location',
  HighSchool: 'location',
  StreetName: 'location',
  StreetNumber: 'location',
  StreetNumberNumeric: 'location',
  StreetDirPrefix: 'location',
  StreetDirSuffix: 'location',
  StreetSuffix: 'location',
  UnitNumber: 'location',
  PostalCodePlus4: 'location',
  'Location_sp_and_sp_Legal_co_City_sp_Name': 'location',
  'Location_sp_and_sp_Legal_co_County_sp_Parish_sp_Name': 'location',
  'Location_sp_and_sp_Legal_co_Postal_sp_Zip': 'location',
  'Location_sp_and_sp_Legal_co_Special_sp_Assessment_sp_YN2': 'location',
  'Restrictions_co_Restrictions': 'location',
  SeniorCommunityYN: 'location',
  AssociationAmenities: 'location',
  SecurityFeatures: 'location',
  RoadFrontageType: 'location',
  RoadResponsibility: 'location',
  RoadSurfaceType: 'location',
  PetsAllowed: 'location',
  'Other_sp_Leasing_sp_Restrictions_co_Other_sp_Leasing_sp_Restrictions': 'location',
  'Special_sp_Information_co_Special_sp_Information': 'location',
  VirtualTourURLUnbranded: 'location',
  VirtualTourURLBranded: 'location',

  // Listing info / agent
  ListingKey: 'listing',
  ListingId: 'listing',
  ListingAgreement: 'listing',
  ListingService: 'listing',
  DaysOnMarket: 'listing',
  CumulativeDaysOnMarket: 'listing',
  ListingContractDate: 'listing',
  OnMarketDate: 'listing',
  OriginalEntryTimestamp: 'listing',
  ModificationTimestamp: 'listing',
  StatusChangeTimestamp: 'listing',
  ContractStatusChangeDate: 'listing',
  'Contract_sp_Information_co_Original_sp_Entry_sp_Timestamp': 'listing',
  'Contract_sp_Information_co_Delayed_sp_Marketing_sp_YN2': 'listing',
  DelayedMarketingYN: 'listing',
  DelayedMarketingDate: 'listing',
  StartShowingDate: 'listing',
  ShowingRequirements: 'listing',
  ShowingInstructions: 'listing',
  ShowingContactPhone: 'listing',
  'Showing_sp_Requirements_co_Showing_sp_Requirements': 'listing',
  'Showing_sp_Details_co_Pet_lparen_s_rparen__sp_on_sp_Premises': 'listing',
  Possession: 'listing',
  Contingency: 'listing',
  PrivateRemarks: 'listing',
  // List Agent
  ListAgentFullName: 'listing',
  ListAgentFirstName: 'listing',
  ListAgentLastName: 'listing',
  ListAgentMiddleName: 'listing',
  ListAgentEmail: 'listing',
  ListAgentMobilePhone: 'listing',
  ListAgentOfficePhone: 'listing',
  ListAgentPreferredPhone: 'listing',
  ListAgentDirectPhone: 'listing',
  ListAgentStateLicense: 'listing',
  ListAgentMlsId: 'listing',
  ListAgentAOR: 'listing',
  ListAgentURL: 'listing',
  ListAgentKey: 'listing',
  // List Office
  ListOfficeName: 'listing',
  ListOfficePhone: 'listing',
  ListOfficeEmail: 'listing',
  ListOfficeMlsId: 'listing',
  ListOfficeKey: 'listing',
  ListOfficeURL: 'listing',
  // Co-List Agent
  CoListAgentFullName: 'listing',
  CoListAgentEmail: 'listing',
  CoListAgentMobilePhone: 'listing',
  CoListAgentStateLicense: 'listing',
  CoListAgentMlsId: 'listing',
  CoListOfficeName: 'listing',
  // Originating system
  OriginatingSystemName: 'listing',
  OriginatingSystemID: 'listing',
  OriginatingSystemKey: 'listing',
  SourceSystemName: 'listing',
  SourceSystemID: 'listing',
  SourceSystemKey: 'listing',
  'OfficeMember_sp_Information_co_DXORIGMLSID2': 'listing',
  DocumentsCount: 'listing',
  VideosCount: 'listing',
  ApprovalStatus: 'listing',
  InternetAddressDisplayYN: 'listing',
  InternetAutomatedValuationDisplayYN: 'listing',
  InternetConsumerCommentYN: 'listing',
  InternetEntireListingDisplayYN: 'listing',
  'Remarks_sp_and_sp_Miscellaneous_co_Any_sp_Broker_sp_Advertise_sp_YN2': 'listing',
  AttributionContact: 'listing',
  PreferredPhotographer: 'listing',
  OwnerName: 'listing',
  OwnerPhone: 'listing',
  OccupantName: 'listing',
  OccupantPhone: 'listing',
  OccupantType: 'listing',
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────*/

/** Convert raw field key like Foo_sp_Bar_co_Baz into "Foo Bar: Baz" */
function humanizeKey(key) {
  // Remove @Core.Permissions suffix
  let k = key.replace(/@Core\.Permissions$/, '')
  // Decode _sp_ → space, _co_ → ": ", _pound_ → #, _lparen_ → (, _rparen_ → )
  k = k
    .replace(/_sp_/g, ' ')
    .replace(/_co_/g, ': ')
    .replace(/_pound_/g, '#')
    .replace(/_lparen_/g, '(')
    .replace(/_rparen_/g, ')')
    .replace(/_pound2$/, '')
    .replace(/(\d)$/, ' $1') // trailing digit → space
  // Insert space before uppercase sequences (camelCase → words)
  k = k.replace(/([a-z])([A-Z])/g, '$1 $2')
  // Clean up multiple spaces
  k = k.replace(/\s+/g, ' ').trim()
  // Strip verbose prefixes (e.g. "General Property Information: Gated Community" → "Gated Community")
  k = k.replace(/^General Property Information:\s*/i, '')
  k = k.replace(/^OfficeMember Information:\s*/i, '')
  k = k.replace(/^Contract Information:\s*/i, '')
  k = k.replace(/^Financial Information:\s*/i, '')
  k = k.replace(/^Application Fee Details:\s*/i, '')
  k = k.replace(/^Location Information:\s*/i, '')
  k = k.replace(/^Property Information:\s*/i, '')
  // Strip redundant "Label: Label" patterns (e.g. "Balcony Details: Balcony Details" → "Balcony Details")
  const colonIdx = k.indexOf(': ')
  if (colonIdx > 0) {
    const before = k.slice(0, colonIdx).trim()
    const after = k.slice(colonIdx + 2).trim()
    if (before.toLowerCase() === after.toLowerCase()) {
      k = before // "Room Types: Room Types" → "Room Types"
    }
  }
  // Strip trailing YN / Yn + optional trailing numbers (e.g. "Pool Private YN 2" → "Pool Private")
  k = k.replace(/\s+YN\s*\d*$/i, '')
  // Strip trailing standalone numbers (e.g. "List Office Agency 2" → "List Office Agency")
  k = k.replace(/\s+\d+$/, '')
  return k
}

function isEmptyValue(v) {
  if (v === null || v === undefined) return true
  if (typeof v === 'string' && v.trim() === '') return true
  if (Array.isArray(v) && v.length === 0) return true
  if (typeof v === 'string' && v === 'None') return false // keep explicit "None"
  return false
}

function isPermissionField(key) {
  return key.endsWith('@Core.Permissions')
}

function formatValue(v) {
  if (Array.isArray(v)) return v.join(', ')
  if (typeof v === 'boolean') return v ? 'Yes' : 'No'
  if (typeof v === 'number') return v.toLocaleString()
  if (typeof v === 'string' && v.match(/^\d{4}-\d{2}-\d{2}T/)) {
    // ISO timestamp
    try { return new Date(v).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) } catch { return v }
  }
  if (typeof v === 'string' && v.match(/^\d{4}-\d{2}-\d{2}$/)) {
    try { return new Date(v + 'T00:00:00').toLocaleDateString('en-US', { dateStyle: 'medium' }) } catch { return v }
  }
  return String(v)
}

function formatAddress(l) {
  if (l.UnparsedAddress) return l.UnparsedAddress
  return [l.StreetNumber, l.StreetName, l.StreetSuffix].filter(Boolean).join(' ')
}

function formatCityStateZip(l) {
  const parts = [l.City, l.StateOrProvince].filter(Boolean).join(', ')
  return l.PostalCode ? `${parts} ${l.PostalCode}` : parts
}

/* ─────────────────────────────────────────────
   SKELETON
───────────────────────────────────────────────*/
function Skeleton({ className }) {
  return <div className={`skeleton rounded ${className}`} />
}

function SkeletonDetail() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <Skeleton className="h-6 w-32 mb-6" />
      <Skeleton className="h-[480px] w-full rounded-2xl mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
          <div className="flex gap-3 mt-4">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-16 w-24 rounded-xl" />)}
          </div>
          <Skeleton className="h-40 w-full rounded-xl mt-4" />
          <Skeleton className="h-64 w-full rounded-xl mt-4" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PHOTO GALLERY
───────────────────────────────────────────────*/
function PhotoGallery({ photos, address }) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(0)
  const [imgErrors, setImgErrors] = useState({})
  const touchStartX = useRef(null)

  const go = useCallback((dir) => {
    setActive(c => (c + dir + photos.length) % photos.length)
  }, [photos.length])

  const openLightbox = (i) => { setLightboxIdx(i); setLightbox(true) }
  const closeLightbox = () => setLightbox(false)
  const lbGo = useCallback((dir) => {
    setLightboxIdx(c => (c + dir + photos.length) % photos.length)
  }, [photos.length])

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e, goFn) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) goFn(dx < 0 ? 1 : -1)
    touchStartX.current = null
  }

  // Key nav for lightbox
  useEffect(() => {
    if (!lightbox) return
    const handler = (e) => {
      if (e.key === 'ArrowRight') lbGo(1)
      if (e.key === 'ArrowLeft') lbGo(-1)
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, lbGo])

  if (!photos.length) {
    return (
      <div className="w-full h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400">
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
        </svg>
        <p className="font-medium">No photos available</p>
      </div>
    )
  }

  return (
    <>
      {/* Main image */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-black cursor-zoom-in select-none"
        style={{ height: 'clamp(260px, 52vw, 560px)' }}
        onTouchStart={onTouchStart}
        onTouchEnd={(e) => onTouchEnd(e, go)}
        onClick={() => openLightbox(active)}
      >
        {photos.map((url, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-300 ${i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {imgErrors[i] ? (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">Photo unavailable</div>
            ) : (
              <img
                src={url}
                alt={`${address} — photo ${i + 1}`}
                className="w-full h-full object-cover"
                onError={() => setImgErrors(p => ({ ...p, [i]: true }))}
              />
            )}
          </div>
        ))}

        {/* Photo count badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {active + 1} / {photos.length}
        </div>

        {/* Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); go(-1) }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}

        {/* Expand hint */}
        <div className="absolute bottom-4 right-4 z-20 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
          View full screen
        </div>
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin">
          {photos.map((url, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-150 ${i === active ? 'border-gold-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-90'}`}
            >
              {imgErrors[i] ? (
                <div className="w-full h-full bg-gray-200" />
              ) : (
                <img src={url} alt="" className="w-full h-full object-cover" onError={() => setImgErrors(p => ({ ...p, [i]: true }))} />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={(e) => onTouchEnd(e, lbGo)}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); lbGo(-1) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); lbGo(1) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIdx + 1} / {photos.length}
          </div>
          <img
            src={photos[lightboxIdx]}
            alt={`Photo ${lightboxIdx + 1}`}
            className="max-w-[92vw] max-h-[88vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────────*/
function Section({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-gold-500 text-xl">{icon}</span>}
          <h2 className="font-display font-bold text-gray-900 text-lg">{title}</h2>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 pb-6 pt-1">{children}</div>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   FIELD GRID — generic key/value renderer
───────────────────────────────────────────────*/
function FieldGrid({ fields }) {
  // fields: [[key, label, value], ...]
  const visible = fields.filter(([, , v]) => !isEmptyValue(v))
  if (!visible.length) return <p className="text-sm text-gray-400 italic">No data available.</p>
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
      {visible.map(([key, label, value]) => (
        <div key={key} className="flex items-baseline justify-between py-2.5 border-b border-gray-50 min-w-0 gap-3">
          <dt className="text-sm text-gray-500 flex-shrink-0">{label}</dt>
          <dd className="text-sm font-medium text-gray-900 text-right break-words">
            {typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))
              ? <a href={value} target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:text-navy-800 underline underline-offset-2 break-all">{value}</a>
              : formatValue(value)
            }
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Render an array field as tag chips */
function TagChips({ values }) {
  if (!values?.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((v, i) => (
        <span key={i} className="inline-block bg-navy-50 text-navy-800 text-xs font-medium px-3 py-1 rounded-full border border-navy-100">
          {String(v)}
        </span>
      ))}
    </div>
  )
}

/** Render a single array field with label + chips */
function ArrayField({ label, values }) {
  if (!values?.length || (values.length === 1 && values[0] === 'None')) return null
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
      <TagChips values={values} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   INTERIOR FEATURES CARD — visual redesign
───────────────────────────────────────────────*/

// Feature → emoji icon map
const FEATURE_ICONS = {
  'kitchen island': '🏝️',
  'wet bar': '🍷',
  'wine bar': '🍷',
  'bar': '🍷',
  'walk-in closet': '👑',
  'walk in closet': '👑',
  'high ceiling': '✨',
  'vaulted ceiling': '✨',
  'cathedral ceiling': '✨',
  'tray ceiling': '✨',
  'pantry': '🗄️',
  'fireplace': '🔥',
  'smart home': '📱',
  'smart wiring': '📱',
  'wine cellar': '🍇',
  'wine room': '🍇',
  'loft': '🏔️',
  'pool bath': '🏊',
  'cabana': '🏊',
  'split bedroom': '🛏️',
  'split bedrooms': '🛏️',
  'custom cabinet': '🪵',
  'granite counter': '💎',
  'granite': '💎',
  'marble': '💎',
  'stainless': '✨',
  'impact window': '🛡️',
  'hurricane window': '🛡️',
  'impact resistant': '🛡️',
  'crown molding': '🎨',
  'coffered ceiling': '🎨',
  'eat-in kitchen': '🍽️',
  'eat in kitchen': '🍽️',
  'breakfast bar': '☕',
  'breakfast room': '☕',
  'laundry inside': '👕',
  'laundry in unit': '👕',
  'inside laundry': '👕',
  'elevator': '🛗',
  'game room': '🎱',
  'media room': '🎬',
  'home theater': '🎬',
  'theater': '🎬',
  'office': '💼',
  'built-in': '🪵',
  'built in': '🪵',
  'open floor': '🏠',
  'open concept': '🏠',
  'bonus room': '🎯',
  'den': '🏠',
}

function getFeatureIcon(featureName) {
  const lower = featureName.toLowerCase()
  for (const [keyword, icon] of Object.entries(FEATURE_ICONS)) {
    if (lower.includes(keyword)) return icon
  }
  return '✦'
}

// Premium features that get gold treatment
const PREMIUM_KEYWORDS = [
  'kitchen island', 'wet bar', 'wine bar', 'walk-in closet', 'high ceiling',
  'vaulted ceiling', 'cathedral ceiling', 'fireplace', 'smart home', 'wine cellar',
  'loft', 'pool bath', 'cabana', 'game room', 'media room', 'home theater',
  'elevator', 'impact window', 'hurricane', 'granite', 'marble', 'custom cabinet',
  'wet bar', 'wine room', 'coffered', 'crown molding', 'custom cabinetry',
]

function isPremiumFeature(name) {
  const lower = name.toLowerCase()
  return PREMIUM_KEYWORDS.some(k => lower.includes(k))
}

// Room type → emoji
const ROOM_ICONS = {
  'master bedroom': '👑',
  'master suite': '👑',
  'primary bedroom': '👑',
  'bedroom': '🛏️',
  'kitchen': '🍳',
  'living room': '🛋️',
  'family room': '🛋️',
  'dining room': '🍽️',
  'dining': '🍽️',
  'den': '🏠',
  'office': '💼',
  'study': '💼',
  'laundry': '👕',
  'utility': '🔧',
  'loft': '🏔️',
  'bonus room': '🎯',
  'game room': '🎱',
  'media room': '🎬',
  'theater': '🎬',
  'garage': '🚗',
  'pool': '🏊',
  'cabana': '🏖️',
  'lanai': '🌴',
  'balcony': '🌇',
  'patio': '🌿',
  'foyer': '🚪',
  'entry': '🚪',
  'bath': '🚿',
  'bathroom': '🚿',
  'powder room': '🚿',
  'closet': '👔',
  'storage': '📦',
  'pantry': '🗄️',
  'library': '📚',
}

function getRoomIcon(roomName) {
  const lower = roomName.toLowerCase()
  // Check most specific first
  if (lower.includes('master') || lower.includes('primary')) return '👑'
  if (lower.includes('kitchen')) return '🍳'
  if (lower.includes('living')) return '🛋️'
  if (lower.includes('family')) return '🛋️'
  if (lower.includes('dining')) return '🍽️'
  if (lower.includes('laundry')) return '👕'
  if (lower.includes('loft')) return '🏔️'
  if (lower.includes('game')) return '🎱'
  if (lower.includes('media') || lower.includes('theater')) return '🎬'
  if (lower.includes('office') || lower.includes('study')) return '💼'
  if (lower.includes('den')) return '🏠'
  if (lower.includes('garage')) return '🚗'
  if (lower.includes('lanai') || lower.includes('pool')) return '🌴'
  if (lower.includes('balcony') || lower.includes('patio')) return '🌿'
  if (lower.includes('foyer') || lower.includes('entry')) return '🚪'
  if (lower.includes('bath') || lower.includes('powder')) return '🚿'
  if (lower.includes('closet')) return '👔'
  if (lower.includes('bedroom') || lower.includes('bed')) return '🛏️'
  if (lower.includes('bonus')) return '🎯'
  return '🏠'
}

function InteriorFeaturesCard({ listing, interiorFields }) {
  const arr = (key) => {
    const v = listing[key]
    if (!v) return []
    if (Array.isArray(v)) return v.filter(Boolean)
    if (typeof v === 'string') return [v]
    return []
  }
  const val = (key) => listing[key]

  const interiorFeatures = arr('InteriorFeatures')
  const flooring = arr('Flooring')
  const laundry = arr('LaundryFeatures')
  const appliances = arr('Appliances')
  const heating = arr('Heating')
  const cooling = arr('Cooling')
  const roomTypes = arr('Room_sp_Types_co_Room_sp_Types')
  const masterBath = arr('Master_sp_BedroomBath_co_Master_sp_BedroomBath')
  const furnished = val('Furnished')
  const roomsTotal = val('RoomsTotal')
  const stories = val('Stories') || val('Levels') || val('StoriesTotal')
  const mainLevelBeds = val('MainLevelBedrooms')
  const mainLevelBaths = val('MainLevelBathrooms')

  // Room level data
  const kitchenLevel = val('Room_sp_Types_co_Kitchen_sp_Level')
  const livingLevel = val('Room_sp_Types_co_Living_sp_Room_sp_Level')
  const masterLevel = val('Room_sp_Types_co_Master_sp_Bedroom_sp_Level')

  // Flooring types for stats row
  const hasWood = flooring.some(f => f.toLowerCase().includes('wood') || f.toLowerCase().includes('hardwood'))
  const hasMarble = flooring.some(f => f.toLowerCase().includes('marble'))
  const primaryFloor = hasMarble ? 'Marble' : hasWood ? 'Wood' : flooring[0] || null

  // Cooling/heating for stats
  const hasCentralAC = cooling.some(c => c.toLowerCase().includes('central'))
  const coolingSummary = hasCentralAC ? 'Central AC' : cooling[0] || null
  const heatingSummary = heating[0] || null

  // Identify premium highlight features
  const allFeatureTexts = [...interiorFeatures, ...laundry]
  const premiumFeatures = allFeatureTexts.filter(f => isPremiumFeature(f))
  const regularFeatures = allFeatureTexts.filter(f => !isPremiumFeature(f))

  // Build floor plan hint from room level data
  const floorRooms = {}
  const addToFloor = (level, room) => {
    if (!level || !room) return
    const floorKey = level
    if (!floorRooms[floorKey]) floorRooms[floorKey] = []
    floorRooms[floorKey].push(room)
  }
  if (kitchenLevel) addToFloor(kitchenLevel, 'Kitchen')
  if (livingLevel) addToFloor(livingLevel, 'Living Room')
  if (masterLevel) addToFloor(masterLevel, 'Master Bedroom')
  if (mainLevelBeds > 0) {
    // ensure "Main" floor exists
    if (!floorRooms['Main']) floorRooms['Main'] = []
    if (mainLevelBeds > 0 && !floorRooms['Main'].includes('Bedrooms')) {
      // Only add if not already captured
    }
  }

  // Build room cards from room types list
  const buildRoomCards = () => {
    const rooms = []
    roomTypes.forEach(r => {
      const icon = getRoomIcon(r)
      // Determine level
      let level = null
      if (r.toLowerCase().includes('kitchen') && kitchenLevel) level = kitchenLevel
      else if ((r.toLowerCase().includes('living')) && livingLevel) level = livingLevel
      else if ((r.toLowerCase().includes('master') || r.toLowerCase().includes('primary')) && masterLevel) level = masterLevel
      rooms.push({ name: r, icon, level })
    })
    return rooms
  }

  const roomCards = buildRoomCards()
  const hasFloorData = Object.keys(floorRooms).length > 0
  const hasAnyData = interiorFeatures.length > 0 || flooring.length > 0 || appliances.length > 0 || roomTypes.length > 0

  if (!hasAnyData && interiorFields.length === 0) return null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-50 flex items-center gap-3">
        <span className="text-xl">🛋️</span>
        <h2 className="font-display font-bold text-gray-900 text-lg">Property Interior</h2>
      </div>

      <div className="px-6 py-5 space-y-6">

        {/* ── 1. Quick Stats Row ── */}
        {(roomsTotal || stories || primaryFloor || coolingSummary) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {roomsTotal && (
              <div className="rounded-xl px-4 py-3 text-center border"
                style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)', borderColor: '#c7d2fe' }}>
                <p className="text-lg font-bold" style={{ color: '#1e3a5f' }}>{roomsTotal}</p>
                <p className="text-xs mt-0.5" style={{ color: '#4469a0' }}>🏠 Total Rooms</p>
              </div>
            )}
            {stories && (
              <div className="rounded-xl px-4 py-3 text-center border"
                style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)', borderColor: '#c7d2fe' }}>
                <p className="text-lg font-bold" style={{ color: '#1e3a5f' }}>{stories}</p>
                <p className="text-xs mt-0.5" style={{ color: '#4469a0' }}>🏗️ Stories</p>
              </div>
            )}
            {primaryFloor && (
              <div className="rounded-xl px-4 py-3 text-center border"
                style={{ background: 'linear-gradient(135deg, #fef9f0 0%, #fef3e0 100%)', borderColor: '#fcd68a' }}>
                <p className="text-sm font-bold leading-tight" style={{ color: '#7c4a00' }}>{primaryFloor}</p>
                <p className="text-xs mt-0.5" style={{ color: '#a06020' }}>🪵 Flooring</p>
              </div>
            )}
            {coolingSummary && (
              <div className="rounded-xl px-4 py-3 text-center border"
                style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f4ff 100%)', borderColor: '#bae6fd' }}>
                <p className="text-sm font-bold leading-tight" style={{ color: '#0c4a6e' }}>{coolingSummary}</p>
                <p className="text-xs mt-0.5" style={{ color: '#0369a1' }}>❄️ Cooling</p>
              </div>
            )}
          </div>
        )}

        {/* ── 2. Room Overview Grid ── */}
        {roomCards.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Rooms</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {roomCards.map((room, i) => (
                <div key={i} className="rounded-xl p-3 border flex flex-col gap-1 transition-all hover:shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4fc 100%)', borderColor: '#dde4f5' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{room.icon}</span>
                    <span className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>{room.name}</span>
                  </div>
                  {room.level && (
                    <span className="text-xs px-2 py-0.5 rounded-full self-start font-medium"
                      style={{ background: '#e8eeff', color: '#3b5fa0' }}>
                      {room.level}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 3. Master Suite Spotlight ── */}
        {masterBath.length > 0 && (
          <div className="rounded-xl p-4 border"
            style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', borderColor: '#fcd34d' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">👑</span>
              <div>
                <p className="font-bold text-base" style={{ color: '#7c4a00' }}>Master Suite</p>
                {masterLevel && (
                  <p className="text-xs flex items-center gap-1" style={{ color: '#a06020' }}>
                    <span>📍</span> {masterLevel}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {masterBath.map((feature, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full font-semibold border"
                  style={{ background: '#fef9c3', color: '#92400e', borderColor: '#fcd34d' }}>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── 4. Premium Highlight Features ── */}
        {premiumFeatures.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>What Makes This Home Special</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {premiumFeatures.map((feature, i) => (
                <div key={i} className="rounded-xl p-3 border flex items-center gap-3 transition-all hover:shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, #fffbeb 0%, #fef9f3 100%)',
                    borderColor: '#fcd68a',
                  }}>
                  <span className="text-2xl flex-shrink-0">{getFeatureIcon(feature)}</span>
                  <span className="font-semibold text-sm leading-tight" style={{ color: '#7c3a00' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 5. Other Interior Features ── */}
        {regularFeatures.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Interior Features</p>
            <div className="flex flex-wrap gap-2">
              {regularFeatures.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={{ background: '#f0f4ff', color: '#2d4a8a', borderColor: '#c7d2fe' }}>
                  <span className="text-base">{getFeatureIcon(f)}</span>
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── 6. Appliance Checklist ── */}
        {appliances.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Appliances</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {appliances.map((appliance, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5">
                  <span className="text-green-500 text-lg flex-shrink-0">✅</span>
                  <span className="text-sm text-gray-700">{appliance}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 7. Flooring detail (if multiple types) ── */}
        {flooring.length > 1 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Flooring</p>
            <div className="flex flex-wrap gap-2">
              {flooring.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={{ background: '#fef9f0', color: '#7c4a00', borderColor: '#fcd68a' }}>
                  🪵 {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── 8. Floor Plan Hint ── */}
        {hasFloorData && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Floor Layout</p>
            <div className="space-y-2">
              {Object.entries(floorRooms).map(([floor, rooms]) => (
                <div key={floor} className="flex items-start gap-3 rounded-lg px-4 py-2.5 border"
                  style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4fc 100%)', borderColor: '#dde4f5' }}>
                  <span className="text-sm font-bold flex-shrink-0 min-w-[90px]" style={{ color: '#1e3a5f' }}>
                    {floor}
                  </span>
                  <span className="text-sm text-gray-600">{rooms.join(', ')}</span>
                </div>
              ))}
              {/* Add main/second level bath counts if available */}
              {(mainLevelBaths != null || mainLevelBeds != null) && (
                <div className="flex flex-wrap gap-3 mt-1">
                  {mainLevelBeds != null && mainLevelBeds > 0 && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: '#e8eeff', color: '#3b5fa0' }}>
                      🛏️ {mainLevelBeds} bed(s) on main level
                    </span>
                  )}
                  {mainLevelBaths != null && mainLevelBaths > 0 && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: '#e8eeff', color: '#3b5fa0' }}>
                      🚿 {mainLevelBaths} bath(s) on main level
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── 9. HVAC & Heating ── */}
        {(heating.length > 0 || cooling.length > 0) && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Climate Control</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {heating.length > 0 && (
                <div className="rounded-xl p-3 border"
                  style={{ background: 'linear-gradient(135deg, #fff5f0 0%, #ffe8e0 100%)', borderColor: '#fcc0a0' }}>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: '#7c2d12' }}>🔥 Heating</p>
                  <p className="text-sm" style={{ color: '#9a3412' }}>{heating.join(', ')}</p>
                </div>
              )}
              {cooling.length > 0 && (
                <div className="rounded-xl p-3 border"
                  style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f4ff 100%)', borderColor: '#bae6fd' }}>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: '#0c4a6e' }}>❄️ Cooling</p>
                  <p className="text-sm" style={{ color: '#0369a1' }}>{cooling.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── 10. Remaining scalar interior fields ── */}
        {(() => {
          // Fields already rendered above — skip them
          const renderedKeys = new Set([
            'InteriorFeatures', 'Flooring', 'LaundryFeatures', 'Appliances',
            'Heating', 'Cooling', 'HeatingYN', 'CoolingYN',
            'RoomsTotal', 'Stories', 'StoriesTotal', 'Levels', 'Furnished',
            'MainLevelBedrooms', 'MainLevelBathrooms',
            'Master_sp_BedroomBath_co_Master_sp_BedroomBath',
            'Room_sp_Types_co_Room_sp_Types',
            'Room_sp_Types_co_Kitchen_sp_Level',
            'Room_sp_Types_co_Living_sp_Room_sp_Level',
            'Room_sp_Types_co_Master_sp_Bedroom_sp_Level',
            'Room_sp_Types_co_Bedroom_sp_2_sp_Level',
          ])
          const remaining = interiorFields.filter(([key]) => !renderedKeys.has(key))
          if (!remaining.length) return null
          return (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>More Details</p>
              <FieldGrid fields={remaining} />
            </div>
          )
        })()}

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   APPLIANCES & SYSTEMS CARD — visual redesign
───────────────────────────────────────────────*/

const APPLIANCE_ICONS = {
  'dishwasher': '🍽️',
  'refrigerator': '🧊',
  'fridge': '🧊',
  'freezer': '🧊',
  'microwave': '📡',
  'dryer': '👕',
  'washer': '🫧',
  'disposal': '🗑️',
  'electric range': '🔥',
  'gas range': '🔥',
  'range': '🔥',
  'electric water heater': '⚡',
  'water heater': '🚿',
  'ice maker': '❄️',
  'ice machine': '❄️',
  'oven': '🫕',
  'cooktop': '🍳',
  'induction': '🍳',
  'wine cooler': '🍷',
  'wine refrigerator': '🍷',
  'trash compactor': '🗜️',
  'compactor': '🗜️',
  'bar fridge': '🍷',
}

const PREMIUM_APPLIANCES = [
  'wine cooler', 'wine refrigerator', 'ice maker', 'ice machine',
  'induction', 'double oven', 'convection',
]

function getApplianceIcon(name) {
  const lower = name.toLowerCase()
  // Check electric water heater first (more specific)
  if (lower.includes('electric water heater')) return '⚡'
  for (const [keyword, icon] of Object.entries(APPLIANCE_ICONS)) {
    if (lower.includes(keyword)) return icon
  }
  return '✅'
}

function isAppliancePremium(name) {
  const lower = name.toLowerCase()
  return PREMIUM_APPLIANCES.some(k => lower.includes(k))
}

const UTILITY_ICONS = {
  'cable': '📺',
  'cable available': '📺',
  'electric': '💡',
  'electricity': '💡',
  'water': '💧',
  'sewer': '🔌',
  'septic': '🔌',
  'gas': '🔥',
  'natural gas': '🔥',
  'propane': '🔥',
  'solar': '☀️',
  'fiber': '🌐',
  'internet': '🌐',
  'phone': '📞',
  'none': '🚫',
}

function getUtilityIcon(name) {
  const lower = name.toLowerCase()
  for (const [keyword, icon] of Object.entries(UTILITY_ICONS)) {
    if (lower.includes(keyword)) return icon
  }
  return '🔧'
}

function AppliancesSystemsCard({ listing, systemsFields }) {
  const arr = (key) => {
    const v = listing[key]
    if (!v) return []
    if (Array.isArray(v)) return v.filter(Boolean)
    if (typeof v === 'string') return [v]
    return []
  }

  const appliances = arr('Appliances')
  const cooling = arr('Cooling')
  const heating = arr('Heating')
  const utilities = arr('Utilities')
  const sewer = arr('Sewer')
  const waterSource = arr('WaterSource')
  const electric = arr('Electric')

  // Combine all utilities
  const allUtilities = [...utilities, ...electric]

  const hasContent =
    appliances.length > 0 ||
    cooling.length > 0 ||
    heating.length > 0 ||
    allUtilities.length > 0 ||
    sewer.length > 0 ||
    waterSource.length > 0 ||
    systemsFields.length > 0

  if (!hasContent) return null

  // Scalar fields to skip (already rendered visually or redundant)
  const renderedKeys = new Set([
    'Appliances', 'Cooling', 'CoolingYN', 'Heating', 'HeatingYN',
    'Utilities', 'Sewer', 'WaterSource', 'Electric',
  ])
  const remainingFields = systemsFields.filter(([key]) => !renderedKeys.has(key))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-50 flex items-center gap-3">
        <span className="text-xl">⚙️</span>
        <h2 className="font-display font-bold text-gray-900 text-lg">Appliances &amp; Systems</h2>
      </div>

      <div className="px-6 py-5 space-y-6">

        {/* ── 1. Appliance Grid ── */}
        {appliances.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Appliances</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {appliances.map((appliance, i) => {
                const icon = getApplianceIcon(appliance)
                const premium = isAppliancePremium(appliance)
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 border transition-shadow hover:shadow-md"
                    style={{
                      background: premium
                        ? 'linear-gradient(135deg, #fffdf0 0%, #fef9e0 100%)'
                        : '#ffffff',
                      borderColor: premium ? '#f5d87a' : '#e5e7eb',
                      boxShadow: premium ? '0 1px 4px rgba(180,140,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <span className="text-lg flex-shrink-0">{icon}</span>
                    <span
                      className="text-sm font-medium leading-tight"
                      style={{ color: premium ? '#7c4a00' : '#374151' }}
                    >
                      {appliance}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── 2. Climate Control Cards ── */}
        {(cooling.length > 0 || heating.length > 0) && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Climate Control</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cooling.length > 0 && (
                <div
                  className="rounded-xl p-4 border"
                  style={{
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f4ff 100%)',
                    borderColor: '#bae6fd',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">❄️</span>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0c4a6e' }}>Cooling</p>
                  </div>
                  <p className="text-sm font-semibold mb-2" style={{ color: '#0369a1' }}>
                    {cooling.join(', ')}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ background: '#bae6fd', color: '#0c4a6e' }}
                  >
                    ✅ Active
                  </span>
                </div>
              )}
              {heating.length > 0 && (
                <div
                  className="rounded-xl p-4 border"
                  style={{
                    background: 'linear-gradient(135deg, #fff8f0 0%, #ffe8d6 100%)',
                    borderColor: '#fed7aa',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🔥</span>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#7c2d12' }}>Heating</p>
                  </div>
                  <p className="text-sm font-semibold mb-2" style={{ color: '#9a3412' }}>
                    {heating.join(', ')}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ background: '#fed7aa', color: '#7c2d12' }}
                  >
                    ✅ Active
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── 3. Utilities Badges ── */}
        {(allUtilities.length > 0 || sewer.length > 0 || waterSource.length > 0) && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Utilities &amp; Services</p>
            <div className="flex flex-wrap gap-2">
              {[...allUtilities, ...sewer, ...waterSource].map((util, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    background: '#1e3a5f',
                    color: '#ffffff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                  }}
                >
                  {getUtilityIcon(util)} {util}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── 4. Remaining Systems Fields ── */}
        {remainingFields.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>More Details</p>
            <FieldGrid fields={remainingFields} />
          </div>
        )}

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   EXTERIOR & OUTDOOR CARD — visual redesign
───────────────────────────────────────────────*/

const EXTERIOR_FEATURE_ICONS = {
  'pool': '🏊',
  'spa': '♨️',
  'hot tub': '♨️',
  'jacuzzi': '♨️',
  'waterfront': '🌊',
  'water view': '🌊',
  'ocean view': '🌊',
  'lake': '🌊',
  'canal': '⛵',
  'dock': '⛵',
  'boat': '⛵',
  'garden': '🌿',
  'patio': '🌿',
  'lanai': '🌴',
  'balcony': '🌇',
  'deck': '🪵',
  'porch': '🏠',
  'fence': '🔒',
  'gated': '🔒',
  'gate': '🔒',
  'garage': '🚗',
  'carport': '🚗',
  'covered parking': '🚗',
  'driveway': '🛣️',
  'tennis': '🎾',
  'basketball': '🏀',
  'summer kitchen': '🍳',
  'outdoor kitchen': '🍳',
  'bbq': '🍳',
  'firepit': '🔥',
  'fire pit': '🔥',
  'hurricane': '🛡️',
  'impact': '🛡️',
  'generator': '⚡',
  'solar': '☀️',
  'golf': '⛳',
  'playground': '🎡',
  'sprinkler': '💧',
  'irrigation': '💧',
}

function getExteriorIcon(featureName) {
  const lower = featureName.toLowerCase()
  for (const [keyword, icon] of Object.entries(EXTERIOR_FEATURE_ICONS)) {
    if (lower.includes(keyword)) return icon
  }
  return '🏡'
}

const EXTERIOR_PREMIUM_KEYWORDS = [
  'pool', 'spa', 'hot tub', 'waterfront', 'water view', 'ocean view', 'lake view',
  'dock', 'boat', 'tennis', 'basketball', 'outdoor kitchen', 'summer kitchen',
  'generator', 'solar', 'golf', 'gated',
]

function isExteriorPremium(name) {
  const lower = name.toLowerCase()
  return EXTERIOR_PREMIUM_KEYWORDS.some(k => lower.includes(k))
}

// Parking icons
function getParkingIcon(feature) {
  const lower = feature.toLowerCase()
  if (lower.includes('garage')) return '🏠'
  if (lower.includes('circular') || lower.includes('driveway')) return '🛣️'
  if (lower.includes('covered')) return '☂️'
  if (lower.includes('street')) return '🚗'
  if (lower.includes('golf cart')) return '⛳'
  return '🅿️'
}

function ExteriorCard({ listing, exteriorFields }) {
  const arr = (key) => {
    const v = listing[key]
    if (!v) return []
    if (Array.isArray(v)) return v.filter(Boolean)
    if (typeof v === 'string') return [v]
    return []
  }
  const val = (key) => listing[key]
  const bool = (key) => {
    const v = val(key)
    if (v === true || v === 'true' || v === 'Yes') return true
    return false
  }

  const exteriorFeatures = arr('ExteriorFeatures')
  const poolFeatures = arr('PoolFeatures')
  const spaFeatures = arr('SpaFeatures')
  const patio = arr('PatioAndPorchFeatures')
  const lotFeatures = arr('LotFeatures')
  const view = arr('View')
  const fencing = arr('Fencing')
  const parkingFeatures = arr('ParkingFeatures')
  const waterfrontFeatures = arr('WaterfrontFeatures')
  const stormProtection = arr('Storm_sp_Protection_sp_Details_co_Storm_sp_Protection_sp_Details')
  const otherStructures = arr('OtherStructures')

  const hasPool = bool('PoolPrivateYN') || bool('General_sp_Property_sp_Information_co_Pool_sp_Private_sp_YN') || poolFeatures.length > 0
  const hasSpa = bool('SpaYN') || spaFeatures.length > 0
  const isWaterfront = bool('WaterfrontYN') || waterfrontFeatures.length > 0
  const isGated = bool('General_sp_Property_sp_Information_co_Gated_sp_Community_sp_YN2')
  const hasOutdoorLiving = bool('General_sp_Property_sp_Information_co_Outdoor_sp_Living_sp_Spaces_sp_YN')

  const garageSpaces = val('GarageSpaces')
  const parkingTotal = val('ParkingTotal')
  const lotSizeAcres = val('LotSizeAcres')
  const lotSizeDim = val('LotSizeDimensions')
  const direction = val('DirectionFaces')

  // Build highlights: pool/spa/waterfront/views
  const highlights = []
  if (hasPool) highlights.push({ icon: '🏊', label: 'Private Pool', detail: poolFeatures.slice(0, 2).join(', ') || null })
  if (hasSpa) highlights.push({ icon: '♨️', label: 'Spa / Hot Tub', detail: spaFeatures.slice(0, 1).join(', ') || null })
  if (isWaterfront) highlights.push({ icon: '🌊', label: 'Waterfront', detail: waterfrontFeatures.slice(0, 2).join(', ') || null })
  if (view.length > 0) highlights.push({ icon: '🌄', label: 'Views', detail: view.slice(0, 2).join(', ') })
  if (isGated) highlights.push({ icon: '🔒', label: 'Gated Community', detail: null })
  if (stormProtection.length > 0) highlights.push({ icon: '🛡️', label: 'Storm Protection', detail: stormProtection.slice(0, 2).join(', ') })

  // Exterior features — split premium/regular
  const allExtFeatures = [...exteriorFeatures, ...patio, ...lotFeatures]
  const premiumExt = allExtFeatures.filter(f => isExteriorPremium(f))
  const regularExt = allExtFeatures.filter(f => !isExteriorPremium(f))

  const hasAnyData = highlights.length > 0 || exteriorFeatures.length > 0 || parkingFeatures.length > 0 || view.length > 0

  if (!hasAnyData && exteriorFields.length === 0) return null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-50 flex items-center gap-3">
        <span className="text-xl">🏡</span>
        <h2 className="font-display font-bold text-gray-900 text-lg">Exterior &amp; Outdoor</h2>
      </div>

      <div className="px-6 py-5 space-y-6">

        {/* ── Quick Stats ── */}
        {(garageSpaces || parkingTotal || lotSizeAcres || direction) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {garageSpaces != null && garageSpaces > 0 && (
              <div className="rounded-xl px-4 py-3 text-center border"
                style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)', borderColor: '#c7d2fe' }}>
                <p className="text-lg font-bold" style={{ color: '#1e3a5f' }}>{garageSpaces}</p>
                <p className="text-xs mt-0.5" style={{ color: '#4469a0' }}>🚗 Garage</p>
              </div>
            )}
            {parkingTotal != null && parkingTotal > 0 && (
              <div className="rounded-xl px-4 py-3 text-center border"
                style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)', borderColor: '#c7d2fe' }}>
                <p className="text-lg font-bold" style={{ color: '#1e3a5f' }}>{parkingTotal}</p>
                <p className="text-xs mt-0.5" style={{ color: '#4469a0' }}>🅿️ Parking</p>
              </div>
            )}
            {lotSizeAcres != null && (
              <div className="rounded-xl px-4 py-3 text-center border"
                style={{ background: 'linear-gradient(135deg, #f0fef4 0%, #dcfce7 100%)', borderColor: '#bbf7d0' }}>
                <p className="text-lg font-bold" style={{ color: '#14532d' }}>{Number(lotSizeAcres).toFixed(2)}</p>
                <p className="text-xs mt-0.5" style={{ color: '#166534' }}>🌳 Acres</p>
              </div>
            )}
            {direction && (
              <div className="rounded-xl px-4 py-3 text-center border"
                style={{ background: 'linear-gradient(135deg, #fef9f0 0%, #fef3e0 100%)', borderColor: '#fcd68a' }}>
                <p className="text-sm font-bold" style={{ color: '#7c4a00' }}>{direction}</p>
                <p className="text-xs mt-0.5" style={{ color: '#a06020' }}>🧭 Faces</p>
              </div>
            )}
          </div>
        )}

        {/* ── Outdoor Highlights ── */}
        {highlights.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Outdoor Highlights</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {highlights.map((h, i) => (
                <div key={i} className="rounded-xl p-3 border flex items-start gap-3"
                  style={{
                    background: 'linear-gradient(135deg, #fffbeb 0%, #fef9f3 100%)',
                    borderColor: '#fcd68a',
                  }}>
                  <span className="text-2xl flex-shrink-0">{h.icon}</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#7c3a00' }}>{h.label}</p>
                    {h.detail && <p className="text-xs mt-0.5" style={{ color: '#9a6020' }}>{h.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Premium Exterior Features ── */}
        {premiumExt.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Outdoor Features</p>
            <div className="flex flex-wrap gap-2">
              {premiumExt.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border"
                  style={{ background: '#fffbeb', color: '#7c3a00', borderColor: '#fcd68a' }}>
                  <span>{getExteriorIcon(f)}</span> {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Regular Exterior Features ── */}
        {regularExt.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Lot &amp; Property</p>
            <div className="flex flex-wrap gap-2">
              {regularExt.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={{ background: '#f0fef4', color: '#14532d', borderColor: '#bbf7d0' }}>
                  <span>{getExteriorIcon(f)}</span> {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Parking ── */}
        {parkingFeatures.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Parking</p>
            <div className="flex flex-wrap gap-2">
              {parkingFeatures.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={{ background: '#f0f4ff', color: '#2d4a8a', borderColor: '#c7d2fe' }}>
                  <span>{getParkingIcon(f)}</span> {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Fencing ── */}
        {fencing.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Fencing</p>
            <div className="flex flex-wrap gap-2">
              {fencing.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={{ background: '#f0f4ff', color: '#2d4a8a', borderColor: '#c7d2fe' }}>
                  🔒 {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Other Structures ── */}
        {otherStructures.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Other Structures</p>
            <div className="flex flex-wrap gap-2">
              {otherStructures.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={{ background: '#f8faff', color: '#1e3a5f', borderColor: '#dde4f5' }}>
                  🏗️ {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Remaining scalar exterior fields ── */}
        {(() => {
          const renderedKeys = new Set([
            'ExteriorFeatures', 'PoolFeatures', 'PoolPrivateYN',
            'SpaFeatures', 'SpaYN', 'PatioAndPorchFeatures', 'Fencing',
            'LotFeatures', 'LotSizeArea', 'LotSizeAcres', 'LotSizeDimensions',
            'View', 'WaterfrontFeatures', 'WaterfrontYN',
            'ParkingFeatures', 'ParkingTotal', 'GarageSpaces', 'GarageYN',
            'CoveredSpaces', 'CarportSpaces', 'CarportYN', 'OpenParkingSpaces',
            'AttachedGarageYN', 'DirectionFaces',
            'General_sp_Property_sp_Information_co_Gated_sp_Community_sp_YN2',
            'General_sp_Property_sp_Information_co_Outdoor_sp_Living_sp_Spaces_sp_YN',
            'General_sp_Property_sp_Information_co_Pool_sp_Private_sp_YN',
            'General_sp_Property_sp_Information_co_Senior_sp_Community_sp_YN',
            'General_sp_Property_sp_Information_co_Unit_sp_Floor_sp__pound_2',
            'Storm_sp_Protection_sp_Details_co_Storm_sp_Protection_sp_Details',
            'OtherStructures', 'HorseAmenities', 'HorseYN', 'Vegetation',
          ])
          const remaining = exteriorFields.filter(([key]) => !renderedKeys.has(key))
          if (!remaining.length) return null
          return (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>More Details</p>
              <FieldGrid fields={remaining} />
            </div>
          )
        })()}

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CONSTRUCTION CARD — visual redesign
───────────────────────────────────────────────*/

function ConstructionCard({ listing, constructFields }) {
  const arr = (key) => {
    const v = listing[key]
    if (!v) return []
    if (Array.isArray(v)) return v.filter(Boolean)
    if (typeof v === 'string') return [v]
    return []
  }
  const val = (key) => listing[key]
  const bool = (key) => {
    const v = val(key)
    if (v === true || v === 'true' || v === 'Yes') return true
    return false
  }

  const materials = arr('ConstructionMaterials')
  const roof = arr('Roof')
  const foundation = arr('FoundationDetails')
  const archStyle = arr('ArchitecturalStyle')
  const condition = val('PropertyCondition')
  const isNew = bool('NewConstructionYN')
  const builderName = val('BuilderName')
  const builderModel = val('BuilderModel') || val('Model')
  const buildingName = val('BuildingName')
  const structureType = arr('StructureType')
  const buildingArea = val('BuildingAreaTotal')
  const yearBuilt = val('YearBuilt')  // from listing directly since it's in hero but useful context
  const yearActual = listing.YearBuilt

  // Age calculation
  const currentYear = new Date().getFullYear()
  const age = yearActual ? currentYear - yearActual : null
  const ageLabel = age != null ? (age === 0 ? 'New' : `${age} yrs old`) : null

  // Material icons
  const getMaterialIcon = (m) => {
    const lower = m.toLowerCase()
    if (lower.includes('block') || lower.includes('concrete')) return '🧱'
    if (lower.includes('stucco')) return '🏛️'
    if (lower.includes('wood') || lower.includes('frame')) return '🪵'
    if (lower.includes('stone')) return '🪨'
    if (lower.includes('brick')) return '🧱'
    if (lower.includes('metal') || lower.includes('steel')) return '⚙️'
    if (lower.includes('vinyl') || lower.includes('siding')) return '🏠'
    if (lower.includes('impact') || lower.includes('glass')) return '🪟'
    return '🏗️'
  }

  const getRoofIcon = (r) => {
    const lower = r.toLowerCase()
    if (lower.includes('tile')) return '🏺'
    if (lower.includes('metal')) return '⚙️'
    if (lower.includes('shingle')) return '🏠'
    if (lower.includes('flat')) return '📐'
    if (lower.includes('hip') || lower.includes('gable')) return '🏡'
    return '🏠'
  }

  const hasAnyData = materials.length > 0 || roof.length > 0 || archStyle.length > 0 || condition || isNew

  if (!hasAnyData && constructFields.length === 0) return null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-50 flex items-center gap-3">
        <span className="text-xl">🏗️</span>
        <h2 className="font-display font-bold text-gray-900 text-lg">Construction &amp; Structure</h2>
      </div>

      <div className="px-6 py-5 space-y-6">

        {/* ── Build Stats Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {yearActual && (
            <div className="rounded-xl px-4 py-3 text-center border"
              style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)', borderColor: '#c7d2fe' }}>
              <p className="text-lg font-bold" style={{ color: '#1e3a5f' }}>{yearActual}</p>
              <p className="text-xs mt-0.5" style={{ color: '#4469a0' }}>📅 Year Built</p>
            </div>
          )}
          {ageLabel && (
            <div className="rounded-xl px-4 py-3 text-center border"
              style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)', borderColor: '#c7d2fe' }}>
              <p className="text-sm font-bold" style={{ color: '#1e3a5f' }}>{ageLabel}</p>
              <p className="text-xs mt-0.5" style={{ color: '#4469a0' }}>🏚️ Property Age</p>
            </div>
          )}
          {buildingArea && (
            <div className="rounded-xl px-4 py-3 text-center border"
              style={{ background: 'linear-gradient(135deg, #fef9f0 0%, #fef3e0 100%)', borderColor: '#fcd68a' }}>
              <p className="text-sm font-bold" style={{ color: '#7c4a00' }}>{buildingArea.toLocaleString()} sf</p>
              <p className="text-xs mt-0.5" style={{ color: '#a06020' }}>📐 Building Area</p>
            </div>
          )}
          {isNew && (
            <div className="rounded-xl px-4 py-3 text-center border"
              style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', borderColor: '#86efac' }}>
              <p className="text-base font-bold" style={{ color: '#14532d' }}>✨ New</p>
              <p className="text-xs mt-0.5" style={{ color: '#166534' }}>New Construction</p>
            </div>
          )}
          {condition && (
            <div className="rounded-xl px-4 py-3 text-center border"
              style={{ background: 'linear-gradient(135deg, #f0fef4 0%, #dcfce7 100%)', borderColor: '#bbf7d0' }}>
              <p className="text-sm font-bold leading-tight" style={{ color: '#14532d' }}>{condition}</p>
              <p className="text-xs mt-0.5" style={{ color: '#166534' }}>🔍 Condition</p>
            </div>
          )}
        </div>

        {/* ── Architectural Style ── */}
        {archStyle.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Style</p>
            <div className="flex flex-wrap gap-2">
              {archStyle.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border"
                  style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', color: '#7c4a00', borderColor: '#fcd34d' }}>
                  🏛️ {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Construction Materials ── */}
        {materials.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Construction Materials</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {materials.map((m, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-2.5 border"
                  style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4fc 100%)', borderColor: '#dde4f5' }}>
                  <span className="text-xl flex-shrink-0">{getMaterialIcon(m)}</span>
                  <span className="text-sm font-medium" style={{ color: '#1e3a5f' }}>{m}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Roof ── */}
        {roof.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Roof</p>
            <div className="flex flex-wrap gap-2">
              {roof.map((r, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={{ background: '#f8faff', color: '#1e3a5f', borderColor: '#dde4f5' }}>
                  <span>{getRoofIcon(r)}</span> {r}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Foundation ── */}
        {foundation.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Foundation</p>
            <div className="flex flex-wrap gap-2">
              {foundation.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={{ background: '#f8faff', color: '#1e3a5f', borderColor: '#dde4f5' }}>
                  ⛏️ {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Builder Info ── */}
        {(builderName || builderModel || buildingName) && (
          <div className="rounded-xl p-4 border"
            style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4fc 100%)', borderColor: '#dde4f5' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#6b7280' }}>Builder</p>
            {builderName && <p className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>🏢 {builderName}</p>}
            {builderModel && <p className="text-sm mt-1" style={{ color: '#4469a0' }}>Model: {builderModel}</p>}
            {buildingName && <p className="text-sm mt-1" style={{ color: '#4469a0' }}>Building: {buildingName}</p>}
          </div>
        )}

        {/* ── Remaining scalar construction fields ── */}
        {(() => {
          const renderedKeys = new Set([
            'ConstructionMaterials', 'Roof', 'FoundationDetails', 'ArchitecturalStyle',
            'BuildingAreaTotal', 'BuildingAreaSource', 'BuildingName',
            'BuilderName', 'BuilderModel', 'Model', 'StructureType',
            'PropertyCondition', 'NewConstructionYN',
          ])
          const remaining = constructFields.filter(([key]) => !renderedKeys.has(key))
          if (!remaining.length) return null
          return (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>More Details</p>
              <FieldGrid fields={remaining} />
            </div>
          )
        })()}

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   LOCATION & COMMUNITY CARD — beautiful redesign
───────────────────────────────────────────────*/

// Amenity → emoji icon map
const AMENITY_ICONS = {
  'billiard': '🎱',
  'pool table': '🎱',
  'clubhouse': '🏢',
  'club house': '🏢',
  'car wash': '🚗',
  'fitness': '💪',
  'exercise': '💪',
  'gym': '💪',
  'pool': '🏊',
  'spa': '🧖',
  'hot tub': '🧖',
  'jacuzzi': '🧖',
  'storage': '📦',
  'trash chute': '🗑️',
  'trash': '🗑️',
  'garbage': '🗑️',
  'bike': '🚲',
  'bicycle': '🚲',
  'internet': '📶',
  'wifi': '📶',
  'cable': '📺',
  'kitchen': '🍳',
  'catering': '🍳',
  'maintenance': '🔧',
  'repair': '🔧',
  'tennis': '🎾',
  'pickleball': '🏓',
  'racquet': '🎾',
  'golf': '⛳',
  'dog park': '🐕',
  'dog': '🐕',
  'pet': '🐾',
  'playground': '🎠',
  'play area': '🎠',
  'bbq': '🍖',
  'picnic': '🍖',
  'grill': '🍖',
  'concierge': '🛎️',
  'doorman': '🛎️',
  'marina': '⛵',
  'dock': '⛵',
  'boat': '⛵',
  'beach': '🏖️',
  'sauna': '🧖',
  'steam': '🧖',
  'library': '📚',
  'meeting': '🤝',
  'conference': '🤝',
  'community room': '🏛️',
  'laundry': '👕',
  'elevator': '🛗',
  'parking': '🅿️',
  'garage': '🚘',
  'recreation': '🎯',
  'shuffleboard': '🏸',
  'volleyball': '🏐',
  'basketball': '🏀',
  'security': '🔒',
  'gate': '🔒',
  'guard': '👮',
  'handicap': '♿',
  'accessible': '♿',
  'wheelchair': '♿',
  'management': '📋',
  'manager': '📋',
  'electric': '⚡',
  'ev': '⚡',
  'charging': '⚡',
}

// Premium amenities that get gold treatment
const PREMIUM_AMENITY_KEYWORDS = [
  'pool', 'spa', 'hot tub', 'fitness', 'gym', 'tennis', 'golf',
  'marina', 'dock', 'beach', 'concierge', 'sauna', 'steam',
]

function getAmenityIcon(name) {
  const lower = name.toLowerCase()
  for (const [keyword, icon] of Object.entries(AMENITY_ICONS)) {
    if (lower.includes(keyword)) return icon
  }
  return '✦'
}

function isAmenityPremium(name) {
  const lower = name.toLowerCase()
  return PREMIUM_AMENITY_KEYWORDS.some(k => lower.includes(k))
}

// Security feature → icon map
const SECURITY_ICONS = {
  'closed circuit': '📹',
  'cctv': '📹',
  'camera': '📹',
  'fire alarm': '🔥',
  'smoke': '🔔',
  'sprinkler': '💧',
  'security guard': '👮',
  'guard': '👮',
  'gated': '🔒',
  'key card': '🗝️',
  'intercom': '📞',
  'alarm': '🚨',
  'patrol': '👮',
  'doorman': '🛎️',
  'lobby': '🏢',
  'fob': '🗝️',
  'phone entry': '📱',
}

function getSecurityIcon(name) {
  const lower = name.toLowerCase()
  for (const [keyword, icon] of Object.entries(SECURITY_ICONS)) {
    if (lower.includes(keyword)) return icon
  }
  return '🛡️'
}

function LocationCommunityCard({ listing, locationFields }) {
  const [copyDone, setCopyDone] = React.useState(false)

  const arr = (key) => {
    const v = listing[key]
    if (!v) return []
    if (Array.isArray(v)) return v.filter(x => x && String(x) !== 'None')
    if (typeof v === 'string' && v !== 'None') return [v]
    return []
  }
  const val = (key) => listing[key]

  const lat = val('Latitude')
  const lng = val('Longitude')
  const directions = val('Directions')
  const amenities = arr('AssociationAmenities')
  const security = arr('SecurityFeatures')
  const roadFrontage = arr('RoadFrontageType')
  const elementary = val('ElementarySchool')
  const middle = val('MiddleOrJuniorSchool')
  const high = val('HighSchool')
  const county = val('CountyOrParish') || listing['Location_sp_and_sp_Legal_co_County_sp_Parish_sp_Name']
  const specialConds = arr('SpecialListingConditions')

  const address = formatAddress(listing)
  const cityStateZip = formatCityStateZip(listing)
  const fullAddr = cityStateZip ? `${address}, ${cityStateZip}` : address

  const googleMapsUrl = (lat && lng) ? `https://www.google.com/maps?q=${lat},${lng}` : null
  const appleMapsUrl = (lat && lng) ? `https://maps.apple.com/?q=${lat},${lng}` : null
  const embedUrl = (lat && lng) ? `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed` : null

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddr).then(() => {
      setCopyDone(true)
      setTimeout(() => setCopyDone(false), 2500)
    })
  }

  // Community / neighborhood info
  const subdivision = val('SubdivisionName')
  const zoning = val('Zoning')
  const petsAllowed = val('PetsAllowed')
  const seniorCommunity = val('SeniorCommunityYN')
  const restrictions = val('Restrictions_co_Restrictions')
  const virtualTourUnbranded = val('VirtualTourURLUnbranded')
  const virtualTourBranded = val('VirtualTourURLBranded')
  const virtualTourUrl = virtualTourUnbranded || virtualTourBranded

  // Fields already rendered visually — exclude from field grid
  const RENDERED_LOCATION_KEYS = new Set([
    'Latitude', 'Longitude', 'Country',
    'Directions', 'AssociationAmenities', 'SecurityFeatures',
    'ElementarySchool', 'MiddleOrJuniorSchool', 'HighSchool',
    'RoadFrontageType', 'SpecialListingConditions',
    // Address parts also shown in hero
    'UnparsedAddress', 'City', 'StateOrProvince', 'PostalCode',
    'CountyOrParish', 'StreetName', 'StreetNumber', 'StreetNumberNumeric',
    'StreetDirPrefix', 'StreetDirSuffix', 'StreetSuffix', 'UnitNumber', 'PostalCodePlus4',
    'Location_sp_and_sp_Legal_co_County_sp_Parish_sp_Name',
    // Community info — rendered as visual cards below
    'SubdivisionName', 'Zoning', 'PetsAllowed', 'SeniorCommunityYN',
    'Restrictions_co_Restrictions',
    // Virtual tour — rendered as CTA card
    'VirtualTourURLUnbranded', 'VirtualTourURLBranded',
    // Internal MLS fields — hidden
    'MLSAreaMajor', 'MLSAreaMinor', 'RoadSurfaceType',
    'Location_sp_and_sp_Legal_co_Special_sp_Assessment_sp_YN2',
  ])

  const remainingFields = locationFields.filter(([key]) => !RENDERED_LOCATION_KEYS.has(key))

  const hasSchools = elementary || middle || high
  const hasAmenities = amenities.length > 0
  const hasSecurity = security.length > 0
  const hasSpecial = specialConds.length > 0 && !(specialConds.length === 1 && specialConds[0] === 'None')
  const hasCommunityInfo = subdivision || zoning || petsAllowed || seniorCommunity !== undefined || restrictions
  const hasAnyData = embedUrl || hasSchools || hasAmenities || hasSecurity || directions || remainingFields.length > 0 || hasCommunityInfo || virtualTourUrl

  if (!hasAnyData) return null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-50 flex items-center gap-3">
        <span className="text-xl">📍</span>
        <h2 className="font-display font-bold text-gray-900 text-lg">Location &amp; Community</h2>
      </div>

      <div className="px-6 py-5 space-y-6">

        {/* ── 1. Embedded Map ── */}
        {embedUrl && (
          <div>
            <div
              className="w-full overflow-hidden"
              style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', height: '300px' }}
            >
              <iframe
                src={embedUrl}
                width="100%"
                height="300"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                title="Property Location Map"
              />
            </div>

            {/* ── 2. Map Action Buttons ── */}
            <div className="flex flex-wrap gap-2 mt-3">
              {googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-white font-semibold rounded-xl text-sm transition-all hover:opacity-90 shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5282 100%)' }}
                >
                  📍 Google Maps
                </a>
              )}
              {appleMapsUrl && (
                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-white font-semibold rounded-xl text-sm transition-all hover:opacity-90 shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #374151 0%, #6b7280 100%)' }}
                >
                  🗺️ Apple Maps
                </a>
              )}
              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl text-sm transition-all hover:opacity-90 border"
                style={{
                  background: copyDone ? '#dcfce7' : '#f9fafb',
                  color: copyDone ? '#166534' : '#374151',
                  borderColor: copyDone ? '#86efac' : '#d1d5db',
                }}
              >
                {copyDone ? '✅ Copied!' : '📋 Copy Address'}
              </button>
            </div>
          </div>
        )}

        {/* ── 3. Neighborhood Info Card ── */}
        {(fullAddr || county || directions) && (
          <div
            className="rounded-xl p-4 border"
            style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4fc 100%)', borderColor: '#dde4f5' }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">📍</span>
              <div className="min-w-0">
                <p className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>{fullAddr}</p>
                {county && (
                  <p className="text-xs mt-1" style={{ color: '#4469a0' }}>
                    {county} County
                  </p>
                )}
                {directions && (
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: '#dde4f5' }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#6b7280' }}>Directions</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
                      {/* Normalize ALL CAPS directions to sentence case */}
                      {directions === directions.toUpperCase()
                        ? directions.charAt(0) + directions.slice(1).toLowerCase()
                        : directions}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── 4. Special Listing Conditions Badge ── */}
        {hasSpecial && (
          <div
            className="rounded-xl px-4 py-3 border flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', borderColor: '#fcd34d' }}
          >
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#92400e' }}>Special Conditions</p>
              <p className="font-semibold text-sm mt-0.5" style={{ color: '#7c4a00' }}>
                {specialConds.filter(c => c !== 'None').join(', ')}
              </p>
            </div>
          </div>
        )}

        {/* ── 5. Schools — Visual Cards ── */}
        {hasSchools && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Nearby Schools</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { level: 'Elementary', name: elementary, emoji: '📚' },
                { level: 'Middle', name: middle, emoji: '🏫' },
                { level: 'High', name: high, emoji: '🎓' },
              ].map(({ level, name, emoji }) => name && (
                <div
                  key={level}
                  className="rounded-xl p-3.5 border flex flex-col gap-2"
                  style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)', borderColor: '#c7d2fe' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{emoji}</span>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#4469a0' }}>{level}</span>
                  </div>
                  <p className="font-semibold text-sm leading-tight" style={{ color: '#1e3a5f' }}>{name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 6. Community Amenities — Icon Grid ── */}
        {hasAmenities && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>Community Amenities</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {amenities.map((amenity, i) => {
                const icon = getAmenityIcon(amenity)
                const premium = isAmenityPremium(amenity)
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 border transition-shadow hover:shadow-md"
                    style={{
                      background: premium
                        ? 'linear-gradient(135deg, #fffbeb 0%, #fef9e0 100%)'
                        : 'linear-gradient(135deg, #f8faff 0%, #f0f4fc 100%)',
                      borderColor: premium ? '#fcd68a' : '#dde4f5',
                      boxShadow: premium ? '0 1px 4px rgba(180,140,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <span className="text-lg flex-shrink-0">{icon}</span>
                    <span
                      className="text-sm font-medium leading-tight"
                      style={{ color: premium ? '#7c4a00' : '#1e3a5f' }}
                    >
                      {amenity}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── 7. Security Features — Shield Cards ── */}
        {hasSecurity && (
          <div>
            <div
              className="rounded-xl p-4 border"
              style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', borderColor: '#86efac' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🛡️</span>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#166534' }}>Security Features</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {security.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-base flex-shrink-0">{getSecurityIcon(feature)}</span>
                    <span className="text-sm font-medium" style={{ color: '#14532d' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── 8. Road Frontage ── */}
        {roadFrontage.length > 0 && (
          <div>
            <p className="text-xs font-semibold tracking-wide mb-2" style={{ color: '#6b7280' }}>🛣️ Road Frontage</p>
            <div className="flex flex-wrap gap-2">
              {roadFrontage.map((r, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={{ background: '#f8faff', color: '#1e3a5f', borderColor: '#dde4f5' }}
                >
                  🛣️ {r}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── 9. Community & Neighborhood Info ── */}
        {(subdivision || zoning || petsAllowed != null || seniorCommunity != null || restrictions) && (() => {
          const petsArr = petsAllowed
            ? (Array.isArray(petsAllowed) ? petsAllowed.filter(x => x && x !== 'None') : [petsAllowed])
            : []
          const petsLabel = petsArr.length > 0 ? petsArr.join(', ') : null
          const petsNone = petsAllowed && (petsArr.length === 0 || (petsArr.length === 1 && petsArr[0].toLowerCase().includes('no')))
          const seniorYN = seniorCommunity === true || seniorCommunity === 'true' || seniorCommunity === 'Yes'
          const restrictionsText = (() => {
            if (!restrictions) return null
            if (typeof restrictions === 'string') {
              if (restrictions === 'None' || restrictions.toLowerCase().includes('no restriction')) return 'None'
              return restrictions
            }
            if (Array.isArray(restrictions)) {
              const filtered = restrictions.filter(r => r && r !== 'None')
              return filtered.length > 0 ? filtered.join(', ') : 'None'
            }
            return String(restrictions)
          })()

          const tiles = [
            subdivision && { icon: '🏡', label: 'Subdivision', value: subdivision },
            zoning && { icon: '📋', label: 'Zoning', value: zoning.charAt(0).toUpperCase() + zoning.slice(1) },
            petsLabel && { icon: '🐕', label: 'Pets', value: petsLabel, highlight: true },
          ].filter(Boolean)

          return (
            <div
              className="rounded-xl p-4 border"
              style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f0f4fc 100%)', borderColor: '#dde4f5' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🏘️</span>
                <p className="text-sm font-bold tracking-wide" style={{ color: '#1e3a5f' }}>Community &amp; Neighborhood</p>
              </div>

              {/* Metric tiles */}
              {tiles.length > 0 && (
                <div className={`grid gap-3 mb-4 ${tiles.length === 1 ? 'grid-cols-1' : tiles.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
                  {tiles.map(({ icon, label, value, highlight }) => (
                    <div
                      key={label}
                      className="rounded-xl p-3 border flex flex-col gap-1"
                      style={{
                        background: highlight ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : '#ffffff',
                        borderColor: highlight ? '#86efac' : '#dde4f5',
                      }}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: highlight ? '#166534' : '#6b7280' }}>
                        {icon} {label}
                      </span>
                      <span className="text-sm font-semibold leading-tight" style={{ color: highlight ? '#14532d' : '#1e3a5f' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Secondary info pills */}
              <div className="flex flex-wrap gap-2">
                {seniorCommunity != null && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{
                      background: seniorYN ? '#fffbeb' : '#f9fafb',
                      color: seniorYN ? '#7c4a00' : '#374151',
                      borderColor: seniorYN ? '#fcd34d' : '#d1d5db',
                    }}
                  >
                    👴 Senior 55+ Community: {seniorYN ? 'Yes' : 'No'}
                  </span>
                )}
                {restrictionsText && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{ background: '#f9fafb', color: '#374151', borderColor: '#d1d5db' }}
                  >
                    📜 Restrictions: {restrictionsText}
                  </span>
                )}
                {petsNone && !petsLabel && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{ background: '#f9fafb', color: '#374151', borderColor: '#d1d5db' }}
                  >
                    🚫 No Pets
                  </span>
                )}
              </div>
            </div>
          )
        })()}

        {/* ── 10. Virtual Tour CTA ── */}
        {virtualTourUrl && (
          <div
            className="rounded-2xl p-5 border"
            style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5282 50%, #1a3352 100%)',
              borderColor: '#c9a84c',
              boxShadow: '0 4px 20px rgba(30,58,95,0.3)',
            }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">🎥</span>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold mb-1" style={{ color: '#f5d87a' }}>Virtual Tour Available!</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#c7d8f0' }}>
                  Take a 3D walkthrough of this property from anywhere — no visit required.
                </p>
                <a
                  href={virtualTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #c9a84c 0%, #f5d87a 100%)',
                    color: '#1e3a5f',
                    boxShadow: '0 2px 12px rgba(201,168,76,0.4)',
                  }}
                >
                  🎬 Start Virtual Tour →
                </a>
                {virtualTourUnbranded && virtualTourBranded && virtualTourBranded !== virtualTourUnbranded && (
                  <a
                    href={virtualTourBranded}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-80 ml-2"
                    style={{ color: '#c7d8f0', borderColor: '#4469a0', border: '1px solid' }}
                  >
                    Branded Version
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── 11. Remaining location fields (catch-all, if any slip through) ── */}
        {remainingFields.length > 0 && (
          <div>
            <FieldGrid fields={remainingFields} />
          </div>
        )}

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CATCH-ALL SECTION
   Renders every field NOT handled above
───────────────────────────────────────────────*/
function CatchAllSection({ listing }) {
  const handled = new Set([...Object.keys(SECTION_MAP), ...SKIP_FIELDS])

  const rows = Object.entries(listing)
    .filter(([key, val]) => {
      if (handled.has(key)) return false
      if (isPermissionField(key)) return false // skip @Core.Permissions == 'None' markers
      if (isEmptyValue(val)) return false
      if (key === '@odata.id') return false
      if (key === 'Media') return false
      return true
    })
    .sort(([a], [b]) => a.localeCompare(b))

  if (!rows.length) return null

  return (
    <Section title="All Other Fields" icon="🗂️" defaultOpen={false}>
      <p className="text-xs text-gray-400 mb-4 italic">Every remaining field with a non-empty value, sorted alphabetically.</p>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {rows.map(([key, val]) => (
          <div key={key} className="flex flex-col gap-0.5 min-w-0">
            <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider truncate font-mono">{key}</dt>
            <dd className="text-sm text-gray-800 break-words">
              {typeof val === 'string' && (val.startsWith('http://') || val.startsWith('https://'))
                ? <a href={val} target="_blank" rel="noopener noreferrer" className="text-navy-600 underline break-all">{val}</a>
                : formatValue(val)
              }
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

/* ─────────────────────────────────────────────
   CONTACT SIDEBAR
───────────────────────────────────────────────*/
function ContactCard({ listing }) {
  const { isSelected, addProperty, removeProperty, selectedProperties } = usePropertyContext()
  const key = listing?.ListingKey || listing?.ListingId
  const selected = key ? isSelected(key) : false
  const atMax = selectedProperties.length >= 4 && !selected

  const handleCompare = () => {
    if (!key) return
    if (selected) removeProperty(key)
    else if (!atMax) addProperty(listing)
  }

  // Build financing URL with pre-filled params
  const buildFinancingUrl = () => {
    const address = listing?.UnparsedAddress || ''
    const price = listing?.ListPrice || ''
    const params = new URLSearchParams()
    if (address) params.set('address', address)
    if (price) {
      params.set('price', price)
      params.set('arv', price) // default ARV to list price
    }
    const qs = params.toString()
    return `/financing${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="bg-gradient-to-br from-navy-700 to-navy-800 rounded-2xl p-6 text-white shadow-xl">
      <h3 className="font-display font-bold text-xl mb-1">Interested in this property?</h3>
      <p className="text-white/70 text-sm mb-5">Schedule a viewing or ask us anything.</p>
      <Link
        to="/contact"
        className="block w-full text-center py-3 bg-gold-500 hover:bg-gold-400 text-white font-bold rounded-xl transition-colors duration-200 shadow-lg mb-3"
      >
        Schedule a Viewing
      </Link>

      {/* Financing CTA */}
      <Link
        to={buildFinancingUrl()}
        className="block w-full text-center py-3 rounded-xl font-bold text-sm mb-3 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
        style={{
          background: 'linear-gradient(135deg, rgba(180,151,80,0.25) 0%, rgba(196,163,90,0.3) 100%)',
          border: '1.5px solid rgba(180,151,80,0.5)',
          color: '#d4bc7e',
        }}
      >
        💰 Get Financing →
      </Link>
      <a
        href="tel:9546004976"
        className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors duration-200"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        (954) 600-4976
      </a>

      {/* Add to Compare */}
      <button
        onClick={handleCompare}
        disabled={atMax}
        className={`flex items-center justify-center gap-2 w-full py-2.5 mt-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
          selected
            ? 'bg-gold-500/20 border-gold-400/50 text-gold-300 hover:bg-gold-500/30'
            : atMax
            ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
        }`}
      >
        {selected ? (
          <>
            <svg className="w-4 h-4 text-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            ✓ In Your List — Remove
          </>
        ) : atMax ? (
          <>Max 4 properties selected</>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Add to Compare
          </>
        )}
      </button>
      <a
        href="mailto:info@virtusrealtygroup.com"
        className="flex items-center justify-center gap-2 w-full py-2.5 mt-2 text-white/70 hover:text-white text-sm transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        info@virtusrealtygroup.com
      </a>

      {/* Agent info — HIDDEN for public users. TODO: Show for logged-in agents/admins */}

      {/* Compliance */}
      <p className="mt-5 text-white/35 text-xs leading-relaxed">
        Brokered by Virtus Realty Group. Listing data provided by {listing?.OriginatingSystemName || 'MLS'}.
        Information deemed reliable but not guaranteed.
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FINANCIAL & TAX CARD — visual redesign
───────────────────────────────────────────────*/
function calcMonthlyMortgage(listPrice, downPct = 0.20, annualRate = 0.065, years = 30) {
  if (!listPrice) return null
  const principal = listPrice * (1 - downPct)
  const r = annualRate / 12
  const n = years * 12
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

function normalizeHoaMonthly(fee, frequency) {
  if (!fee) return null
  const f = (frequency || '').toLowerCase()
  if (f.includes('annual') || f.includes('year')) return fee / 12
  if (f.includes('quarter')) return fee / 3
  if (f.includes('semi') || f.includes('bi-annual')) return fee / 6
  // Default: assume monthly
  return fee
}

function FinancialCard({ listing }) {
  const listPrice      = listing.ListPrice
  const assocFee       = listing.AssociationFee
  const assocFee2      = listing.AssociationFee2
  const assocFreq      = listing.AssociationFeeFrequency
  const assocFreq2     = listing.AssociationFee2Frequency
  const assocIncludes  = listing.AssociationFeeIncludes
  const assocName      = listing.AssociationName
  const taxAnnual      = listing.TaxAnnualAmount
  const taxAssessed    = listing.TaxAssessedValue
  const taxYear        = listing.TaxYear
  const parcelNumber   = listing.ParcelNumber
  const listingTerms   = listing.ListingTerms
  const appFee         = listing['Application_sp_Fee_sp_Details_co_Application_sp_Fee']
  const homeWarranty   = listing.HomeWarrantyYN
  const landLeaseAmt   = listing.LandLeaseAmount
  const priceSqft      = listing['Price_sp_Calculations_co_Current_sp_Price_sp_To_sp_SqFt']
  const specialConds   = listing.SpecialListingConditions
  const concessions    = listing.Concessions
  const concessionsAmt = listing.ConcessionsAmount
  const closePrice     = listing.ClosePrice
  const closeDate      = listing.CloseDate

  // ── Monthly Cost Estimator ──
  const monthlyMortgage = calcMonthlyMortgage(listPrice)
  const hoaMonthly1     = normalizeHoaMonthly(assocFee, assocFreq)
  const hoaMonthly2     = normalizeHoaMonthly(assocFee2, assocFreq2)
  const hoaMonthly      = (hoaMonthly1 || 0) + (hoaMonthly2 || 0)
  const taxMonthly      = taxAnnual ? taxAnnual / 12 : null
  const hasEstimator    = monthlyMortgage != null

  const totalMonthly = (monthlyMortgage || 0) + (hoaMonthly || 0) + (taxMonthly || 0)

  // ── HOA includes list ──
  const hoaIncludesList = Array.isArray(assocIncludes)
    ? assocIncludes
    : (typeof assocIncludes === 'string' && assocIncludes)
      ? assocIncludes.split(',').map(s => s.trim()).filter(Boolean)
      : []

  // ── Listing Terms badges ──
  const termsList = Array.isArray(listingTerms)
    ? listingTerms
    : (typeof listingTerms === 'string' && listingTerms)
      ? listingTerms.split(',').map(s => s.trim()).filter(Boolean)
      : []

  // ── Has any financial info at all? ──
  const hasAnyFinancial = listPrice || assocFee || taxAnnual || parcelNumber || appFee || termsList.length

  if (!hasAnyFinancial) return null

  const fmt = (n) => n != null ? `$${Math.round(n).toLocaleString()}` : '—'
  const fmtDec = (n, dec = 0) => n != null ? `$${n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })}` : '—'

  return (
    <Section title="Financial &amp; Tax" icon="💰" defaultOpen={false}>
      {/* ── Monthly Cost Estimator ── */}
      {hasEstimator && (
        <div
          className="rounded-2xl p-5 mb-6"
          style={{ background: 'linear-gradient(135deg, #b49750 0%, #c4a35a 40%, #d4bc7e 100%)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💰</span>
            <h3 className="font-display font-bold text-white text-lg leading-tight">Estimated Monthly Costs</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {/* Mortgage */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white leading-none mb-1">{fmt(monthlyMortgage)}</div>
              <div className="text-xs text-white/80 font-medium">Mortgage</div>
            </div>
            {/* HOA */}
            {hoaMonthly > 0 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-white leading-none mb-1">{fmt(hoaMonthly)}</div>
                <div className="text-xs text-white/80 font-medium">HOA / Assoc</div>
              </div>
            )}
            {/* Taxes */}
            {taxMonthly != null && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-white leading-none mb-1">{fmt(taxMonthly)}</div>
                <div className="text-xs text-white/80 font-medium">Property Tax</div>
              </div>
            )}
            {/* Total */}
            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 text-center border-2 border-white/40">
              <div className="text-2xl font-bold text-white leading-none mb-1">~{fmt(totalMonthly)}</div>
              <div className="text-xs text-white/90 font-bold uppercase tracking-wide">Total / mo</div>
            </div>
          </div>

          <p className="text-white/70 text-xs">
            * Mortgage estimate: 20% down, 30-yr fixed at 6.5%. Does not include insurance or utilities.
          </p>
        </div>
      )}

      {/* ── Key Financial Metrics ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {priceSqft != null && (
          <div className="bg-navy-800 rounded-xl p-4 text-white text-center">
            <div className="text-xl font-bold leading-none mb-1">{fmtDec(priceSqft, 2)}/sqft</div>
            <div className="text-xs text-navy-200 mt-1">Price per Sq Ft</div>
          </div>
        )}
        {taxAnnual != null && (
          <div className="bg-navy-800 rounded-xl p-4 text-white text-center">
            <div className="text-xl font-bold leading-none mb-1">{fmtDec(taxAnnual)}/yr</div>
            <div className="text-xs text-navy-200 mt-1">Property Tax</div>
          </div>
        )}
        {taxAssessed != null && (
          <div className="bg-navy-700 rounded-xl p-4 text-white text-center">
            <div className="text-xl font-bold leading-none mb-1">{fmtDec(taxAssessed)}</div>
            <div className="text-xs text-navy-200 mt-1">Assessed Value</div>
          </div>
        )}
        {(assocFee != null) && (
          <div className="bg-navy-800 rounded-xl p-4 text-white text-center">
            <div className="text-xl font-bold leading-none mb-1">
              {fmtDec(assocFee)}<span className="text-sm font-normal text-navy-200">/{(assocFreq || 'mo').toLowerCase().replace('monthly','mo').replace('annually','yr').replace('annual','yr')}</span>
            </div>
            <div className="text-xs text-navy-200 mt-1">HOA / Association</div>
          </div>
        )}
        {homeWarranty === true && (
          <div className="bg-green-700 rounded-xl p-4 text-white text-center">
            <div className="text-xl font-bold leading-none mb-1">✅ Yes</div>
            <div className="text-xs text-green-200 mt-1">Home Warranty</div>
          </div>
        )}
        {landLeaseAmt != null && landLeaseAmt > 0 && (
          <div className="bg-navy-700 rounded-xl p-4 text-white text-center">
            <div className="text-xl font-bold leading-none mb-1">{fmtDec(landLeaseAmt)}</div>
            <div className="text-xs text-navy-200 mt-1">Land Lease</div>
          </div>
        )}
      </div>

      {/* ── HOA Includes Checklist ── */}
      {hoaIncludesList.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-base">🏠</span> HOA Includes
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
            {hoaIncludesList.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-500 flex-shrink-0 text-base">✅</span>
                <span className="leading-tight">{item}</span>
              </div>
            ))}
          </div>
          {assocName && (
            <p className="text-xs text-gray-400 mt-3">Association: {assocName}</p>
          )}
        </div>
      )}

      {/* ── Tax Info ── */}
      {(taxAnnual != null || taxAssessed != null || parcelNumber) && (
        <div
          className="rounded-xl p-4 mb-5"
          style={{ background: '#f8f7f4', border: '1px solid #e5d5ac' }}
        >
          <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <span>🏛️</span> Property Tax Details
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
            {taxAnnual != null && <span>Annual: <strong className="text-gray-900">{fmtDec(taxAnnual)}</strong></span>}
            {taxAssessed != null && <span>Assessed: <strong className="text-gray-900">{fmtDec(taxAssessed)}</strong></span>}
            {taxYear && <span>Tax Year: <strong className="text-gray-900">{taxYear}</strong></span>}
          </div>
          {parcelNumber && (
            <p className="text-xs text-gray-400 mt-2">Parcel: {parcelNumber}</p>
          )}
        </div>
      )}

      {/* ── Application Fee ── */}
      {appFee != null && appFee > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-5 bg-blue-50 rounded-lg px-4 py-3 border border-blue-100">
          <span className="text-base">📋</span>
          <span>Application required: <strong>{fmtDec(appFee)} fee</strong></span>
        </div>
      )}

      {/* ── Listing Terms ── */}
      {termsList.length > 0 && (
        <div className="mb-5">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Listing Terms</span>
          {termsList.map((term, i) => (
            <span key={i} className="inline-block bg-navy-50 text-navy-700 text-xs font-medium px-3 py-1 rounded-full border border-navy-100 mr-1.5 mb-1">
              {term}
            </span>
          ))}
        </div>
      )}

      {/* ── Special Listing Conditions ── */}
      {specialConds && specialConds !== 'None' && (
        <div className="mb-5">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Special Conditions</span>
          <span className="inline-block bg-amber-50 text-amber-800 text-xs font-medium px-3 py-1 rounded-full border border-amber-200">
            {specialConds}
          </span>
        </div>
      )}

      {/* ── Concessions ── */}
      {(concessions || concessionsAmt) && (
        <div className="mb-5 text-sm text-gray-600">
          <span className="font-semibold text-gray-700">Concessions: </span>
          {concessions && <span>{concessions}</span>}
          {concessionsAmt > 0 && <span> — {fmtDec(concessionsAmt)}</span>}
        </div>
      )}

      {/* ── Close Info (if sold) ── */}
      {(closePrice || closeDate) && (
        <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-600">
          <span className="font-semibold text-gray-700">Closed: </span>
          {closePrice && <span>{fmtDec(closePrice)}</span>}
          {closeDate && <span className="ml-2 text-gray-400">on {new Date(closeDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>}
        </div>
      )}
    </Section>
  )
}

/* ─────────────────────────────────────────────
   PRICE HISTORY CARD
───────────────────────────────────────────────*/
function formatPriceShort(n) {
  if (!n) return ''
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n.toLocaleString()}`
}

function PriceHistoryCard({ listing }) {
  const orig   = listing.OriginalListPrice
  const prev   = listing.PreviousListPrice
  const curr   = listing.ListPrice
  const changeType    = listing.MajorChangeType || ''
  const changeTs      = listing.MajorChangeTimestamp || listing.PriceChangeTimestamp
  const contractDate  = listing.ListingContractDate

  // Only show when there is a meaningful price change
  const hasReduction = orig && curr && orig !== curr
  if (!hasReduction) return null

  const isPriceReduced = curr < orig
  const totalDrop      = orig - curr
  const dropPct        = ((totalDrop / orig) * 100).toFixed(1)
  const prevDrop       = (prev && prev !== orig && prev !== curr) ? (orig - prev) : null
  const numReductions  = prevDrop != null ? 2 : 1

  // Progress bar: how much of orig has been dropped (shown as "reduced" fill)
  const barPct = Math.min(100, Math.round((totalDrop / orig) * 100))

  // Date helpers
  const fmtDate = (ts) => {
    if (!ts) return null
    try {
      return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch { return null }
  }
  const fmtMonthYear = (ts) => {
    if (!ts) return null
    try {
      return new Date(ts).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    } catch { return null }
  }
  const daysSince = (ts) => {
    if (!ts) return null
    const ms = Date.now() - new Date(ts).getTime()
    return Math.max(0, Math.floor(ms / 86_400_000))
  }

  const lastReducedDate  = fmtDate(changeTs)
  const daysSinceReduce  = daysSince(changeTs)
  const listedSince      = fmtMonthYear(contractDate)

  // Build timeline steps
  const steps = []
  if (orig) steps.push({ label: 'Original', price: orig, isOrig: true })
  if (prev && prev !== orig && prev !== curr) steps.push({ label: 'Previous', price: prev, isPrev: true })
  if (curr) steps.push({ label: 'Current', price: curr, isCurr: true })

  // Insight text
  let insight = ''
  if (isPriceReduced) {
    if (numReductions >= 2) {
      insight = `💡 Originally listed at ${formatPriceShort(orig)}, this home has been reduced ${numReductions} times — saving buyers $${totalDrop.toLocaleString()} (${dropPct}%). The seller may be motivated to negotiate.`
    } else {
      insight = `💡 Price dropped $${totalDrop.toLocaleString()} (${dropPct}%) from the original asking price — a potential negotiation opportunity.`
    }
  }

  const badge = isPriceReduced ? '📉 Price Reduced' : curr > orig ? '📈 Price Increased' : null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">📊</span>
          <h2 className="font-display font-bold text-gray-900 text-lg">Price History</h2>
        </div>
        {badge && (
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
            style={{
              background: isPriceReduced
                ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)'
                : 'linear-gradient(135deg, #fef9c3 0%, #fde68a 100%)',
              color: isPriceReduced ? '#166534' : '#92400e',
              animation: 'priceBadgePulse 2.5s ease-in-out infinite',
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* ── Timeline ── */}
        <div className="flex items-center justify-center gap-0 flex-wrap sm:flex-nowrap">
          {steps.map((step, i) => (
            <React.Fragment key={step.label}>
              {/* Price node */}
              <div className="flex flex-col items-center gap-2 min-w-[88px]">
                {/* Dot + price bubble */}
                <div
                  className="relative flex flex-col items-center gap-1.5"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-md font-bold text-sm leading-tight text-center"
                    style={
                      step.isCurr
                        ? { background: 'linear-gradient(135deg, #166534 0%, #16a34a 100%)', color: '#fff', boxShadow: '0 0 0 3px #bbf7d0, 0 4px 12px rgba(22,101,52,0.3)' }
                        : step.isOrig
                        ? { background: 'linear-gradient(135deg, #374151 0%, #6b7280 100%)', color: '#fff' }
                        : { background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)', color: '#fff' }
                    }
                  >
                    {formatPriceShort(step.price)}
                  </div>
                  {/* Arrow down to label */}
                  <span
                    className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                    style={
                      step.isCurr
                        ? { background: '#dcfce7', color: '#166534' }
                        : step.isOrig
                        ? { background: '#f3f4f6', color: '#374151' }
                        : { background: '#fef3c7', color: '#92400e' }
                    }
                  >
                    {step.label}
                  </span>
                </div>
              </div>

              {/* Arrow between nodes */}
              {i < steps.length - 1 && (
                <div className="flex-1 flex items-center justify-center px-1 mb-6 min-w-[32px]">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #d1d5db, #9ca3af)' }} />
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Progress bar ── */}
        {isPriceReduced && (
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Price Reduction</span>
              <span className="text-sm font-bold" style={{ color: '#166534' }}>
                −${totalDrop.toLocaleString()} &nbsp;(−{dropPct}%)
              </span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: '#f3f4f6' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${barPct}%`,
                  background: 'linear-gradient(90deg, #166534 0%, #16a34a 60%, #4ade80 100%)',
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatPriceShort(curr)} current</span>
              <span>{barPct}% off original</span>
              <span>{formatPriceShort(orig)} original</span>
            </div>
          </div>
        )}

        {/* ── Key metrics ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {isPriceReduced && (
            <div className="bg-green-50 rounded-xl px-4 py-3 text-center border border-green-100">
              <p className="text-lg font-bold text-green-800">−${totalDrop >= 1000 ? `${(totalDrop/1000).toFixed(0)}K` : totalDrop.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-0.5">Total Reduction</p>
            </div>
          )}
          {isPriceReduced && (
            <div className="bg-green-50 rounded-xl px-4 py-3 text-center border border-green-100">
              <p className="text-lg font-bold text-green-800">−{dropPct}%</p>
              <p className="text-xs text-green-600 mt-0.5">Below Original</p>
            </div>
          )}
          {daysSinceReduce != null && (
            <div className="bg-navy-50 rounded-xl px-4 py-3 text-center border border-navy-100">
              <p className="text-lg font-bold text-navy-800">{daysSinceReduce}d</p>
              <p className="text-xs text-navy-600 mt-0.5">Since Last Reduction</p>
            </div>
          )}
          {numReductions > 1 && (
            <div className="bg-amber-50 rounded-xl px-4 py-3 text-center border border-amber-100">
              <p className="text-lg font-bold text-amber-800">{numReductions}×</p>
              <p className="text-xs text-amber-600 mt-0.5">Price Reductions</p>
            </div>
          )}
        </div>

        {/* ── Meta line ── */}
        {(lastReducedDate || listedSince) && (
          <p className="text-xs text-gray-400 flex flex-wrap gap-x-3 gap-y-1">
            {lastReducedDate && <span>Last reduced: <strong className="text-gray-600">{lastReducedDate}</strong></span>}
            {listedSince && <span>Listed since: <strong className="text-gray-600">{listedSince}</strong></span>}
          </p>
        )}

        {/* ── Insight ── */}
        {insight && (
          <div
            className="rounded-xl px-4 py-3 text-sm leading-relaxed"
            style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', color: '#166534', border: '1px solid #bbf7d0' }}
          >
            {insight}
          </div>
        )}
      </div>

      {/* Keyframe for badge pulse (injected inline once) */}
      <style>{`
        @keyframes priceBadgePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PROPERTY OVERVIEW CARD — beautiful sidebar card
───────────────────────────────────────────────*/

/** Convert ALL-CAPS strings to Title Case */
function toTitleCase(str) {
  if (!str) return str
  // If the string is all uppercase (or close to it), convert it
  const upperCount = (str.match(/[A-Z]/g) || []).length
  const letterCount = (str.match(/[A-Za-z]/g) || []).length
  if (letterCount > 0 && upperCount / letterCount > 0.7) {
    return str
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase())
  }
  return str
}

/** Status → badge color */
function StatusBadge({ status }) {
  if (!status) return null
  const lower = status.toLowerCase()
  let bg, text, dot
  if (lower === 'active') {
    bg = '#dcfce7'; text = '#166534'; dot = '#16a34a'
  } else if (lower.includes('pending') || lower.includes('contingent')) {
    bg = '#fef3c7'; text = '#92400e'; dot = '#d97706'
  } else if (lower.includes('sold') || lower.includes('closed')) {
    bg = '#fee2e2'; text = '#991b1b'; dot = '#dc2626'
  } else {
    bg = '#f3f4f6'; text = '#374151'; dot = '#9ca3af'
  }
  return (
    <span style={{ background: bg, color: text }} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold">
      <span style={{ background: dot }} className="w-1.5 h-1.5 rounded-full inline-block" />
      {status}
    </span>
  )
}

function PropertyOverviewCard({ listing }) {
  // ── Highlight badges ──
  const highlights = []
  if (listing.WaterfrontYN === true || (typeof listing.WaterfrontYN === 'string' && listing.WaterfrontYN.toLowerCase() === 'true')) {
    highlights.push({ emoji: '🌊', label: 'Waterfront', gold: true })
  }
  const furnished = listing.Furnished
  if (furnished && typeof furnished === 'string' && furnished.toLowerCase().includes('furnished')) {
    highlights.push({ emoji: '🪑', label: 'Furnished', gold: true })
  }
  // Pool — check exterior pool field
  const poolFeatures = listing.PoolFeatures
  const poolPrivate = listing.PoolPrivateYN || listing['General_sp_Property_sp_Information_co_Pool_sp_Private_sp_YN']
  if (poolPrivate === true || (Array.isArray(poolFeatures) && poolFeatures.length > 0 && !poolFeatures.includes('None'))) {
    highlights.push({ emoji: '🏊', label: 'Pool', gold: true })
  }
  const petsAllowed = listing.PetsAllowed
  const petsStr = Array.isArray(petsAllowed) ? petsAllowed.join(', ') : String(petsAllowed || '')
  if (petsAllowed && !petsStr.toLowerCase().includes('no pets') && !petsStr.toLowerCase().includes('none')) {
    highlights.push({ emoji: '🐕', label: 'Pet Friendly', gold: false })
  }
  const subType = listing.PropertySubType
  if (subType) {
    const subLower = (Array.isArray(subType) ? subType[0] : subType).toLowerCase()
    if (subLower.includes('condo') || subLower.includes('condominium')) {
      highlights.push({ emoji: '🏛️', label: 'Condominium', gold: false })
    } else if (subLower.includes('townhouse') || subLower.includes('townhome')) {
      highlights.push({ emoji: '🏘️', label: 'Townhouse', gold: false })
    } else if (subLower.includes('villa')) {
      highlights.push({ emoji: '🏡', label: 'Villa', gold: false })
    }
  }

  // ── Spec tiles ──
  const hoaFee = listing.AssociationFee
  const hoaFreq = listing.AssociationFeeFrequency
  const hoaLabel = hoaFreq ? (hoaFreq.toLowerCase().startsWith('month') ? 'HOA/mo' : `HOA/${hoaFreq.slice(0,2).toLowerCase()}`) : 'HOA'
  const hoaDisplay = hoaFee != null ? formatPrice(hoaFee) : null

  const sqft = listing.LivingArea
  const bldg = listing.BuildingAreaTotal
  const yearBuilt = listing.YearBuilt
  const taxes = listing.TaxAnnualAmount

  const specTiles = [
    sqft ? { value: sqft.toLocaleString(), label: 'Sq Ft', navy: true } : null,
    bldg ? { value: bldg.toLocaleString(), label: 'Bldg Area', navy: true } : null,
    yearBuilt ? { value: yearBuilt, label: 'Built', navy: true } : null,
    hoaDisplay ? { value: hoaDisplay, label: hoaLabel, navy: false, gold: true } : null,
    taxes ? { value: formatPrice(taxes), label: 'Taxes/yr', navy: false, gold: true } : null,
  ].filter(Boolean)

  // ── Detail rows ──
  const mlsId = listing.ListingId
  const propType = listing.PropertyType
  const propSubType = listing.PropertySubType ? (Array.isArray(listing.PropertySubType) ? listing.PropertySubType.join(', ') : listing.PropertySubType) : null
  const typeDisplay = propType && propSubType ? `${propType} · ${propSubType}` : propType || propSubType || null
  const county = listing.CountyOrParish
  const subdivision = toTitleCase(listing.SubdivisionName)
  const zoning = listing.Zoning
  const listed = listing.ListingContractDate ? (() => {
    try { return new Date(listing.ListingContractDate + (listing.ListingContractDate.includes('T') ? '' : 'T00:00:00')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) } catch { return listing.ListingContractDate }
  })() : null
  const seniorCommunity = listing.SeniorCommunityYN === true ? 'Yes' : listing.SeniorCommunityYN === false ? 'No' : null
  const parcel = listing.ParcelNumber

  const detailRows = [
    mlsId ? { icon: '📋', label: 'MLS #', value: mlsId, parcel: false } : null,
    typeDisplay ? { icon: '🏠', label: 'Type', value: typeDisplay, parcel: false } : null,
    county ? { icon: '📍', label: 'County', value: county, parcel: false } : null,
    subdivision ? { icon: '🏘️', label: 'Subdivision', value: subdivision, parcel: false } : null,
    zoning ? { icon: '📐', label: 'Zoning', value: zoning, parcel: false } : null,
    listed ? { icon: '📅', label: 'Listed', value: listed, parcel: false } : null,
    taxes ? { icon: '🏛️', label: 'Taxes', value: `${formatPrice(taxes)} / year`, parcel: false } : null,
    seniorCommunity !== null ? { icon: '👴', label: 'Senior 55+', value: seniorCommunity, parcel: false } : null,
    parcel ? { icon: '🔑', label: 'Parcel', value: parcel, parcel: true } : null,
  ].filter(Boolean)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏡</span>
          <h3 className="font-display font-bold text-gray-900 text-base">Property Overview</h3>
        </div>
        <StatusBadge status={listing.StandardStatus} />
      </div>

      <div className="px-5 py-4 space-y-4">

        {/* ── Highlight Badges ── */}
        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {highlights.map(({ emoji, label, gold }) => (
              <span
                key={label}
                style={gold
                  ? { background: 'linear-gradient(135deg, #fef3c7, #fde68a)', color: '#78350f', borderColor: '#fbbf24' }
                  : { background: '#f0fdf4', color: '#166534', borderColor: '#bbf7d0' }
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
              >
                <span>{emoji}</span>
                {label}
              </span>
            ))}
          </div>
        )}

        {/* ── Spec Tiles ── */}
        {specTiles.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {specTiles.map(({ value, label, navy, gold }) => (
              <div
                key={label}
                style={gold
                  ? { background: 'linear-gradient(135deg, #fef9f0, #fef3e0)', borderColor: '#fcd68a' }
                  : { background: 'linear-gradient(135deg, #1e3a5f, #243f6b)', borderColor: '#1e3a5f' }
                }
                className="rounded-xl px-3 py-2.5 text-center border"
              >
                <p
                  style={{ color: gold ? '#7c4a00' : '#fff' }}
                  className="text-base font-bold leading-tight"
                >{value}</p>
                <p
                  style={{ color: gold ? '#a06020' : '#93bbdd' }}
                  className="text-xs mt-0.5"
                >{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Detail Rows ── */}
        {detailRows.length > 0 && (
          <dl className="space-y-0">
            {detailRows.map(({ icon, label, value, parcel: isParcel }) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-2 py-2 border-b border-gray-50 last:border-0"
              >
                <dt className="flex items-center gap-1.5 text-xs text-gray-400 flex-shrink-0 min-w-0">
                  <span className="text-sm">{icon}</span>
                  <span>{label}</span>
                </dt>
                <dd
                  style={isParcel ? { color: '#9ca3af', fontSize: '0.7rem' } : {}}
                  className={`font-medium text-right break-all min-w-0 ${isParcel ? '' : 'text-sm text-gray-800'}`}
                >{value}</dd>
              </div>
            ))}
          </dl>
        )}

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────*/
export default function PropertyDetail() {
  const { listingKey } = useParams()
  const navigate = useNavigate()
  const { listing, photos, loading, error } = usePropertyDetail(listingKey)

  // SEO Meta Tags - Dynamic based on property
  useEffect(() => {
    if (listing) {
      const address = listing.UnparsedAddress || listing.FullStreetAddress || 'Property'
      const city = listing.City || ''
      const state = listing.StateOrProvince || 'FL'
      const price = listing.ListPrice ? `$${listing.ListPrice.toLocaleString()}` : ''
      
      document.title = `${address} ${city}, ${state} | Property Details | Virtus Realty Group`
      const meta = document.querySelector('meta[name="description"]')
      if (meta) {
        const desc = `${price ? price + ' ' : ''}${listing.BedroomsTotal || ''} bed, ${listing.BathroomsTotalDecimal || ''} bath property in ${city}, ${state}. ${listing.PublicRemarks ? listing.PublicRemarks.substring(0, 120) + '...' : 'View property details, photos, and pricing. Contact Virtus Realty Group for showings and investment analysis.'}`
        meta.setAttribute('content', desc)
      }
      // OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', `${address} ${city}, ${state} | Property Details | Virtus Realty Group`)
      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) {
        const ogDescText = `${price ? price + ' ' : ''}${listing.BedroomsTotal || ''} bed, ${listing.BathroomsTotalDecimal || ''} bath property in ${city}, ${state}. View details and schedule a showing.`
        ogDesc.setAttribute('content', ogDescText)
      }
      const ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) ogUrl.setAttribute('content', `https://virtusrealtygroup.com/property/${listingKey}`)
    } else {
      // Fallback SEO
      document.title = 'Property Details | Virtus Realty Group'
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', 'View property details, photos, and pricing. Contact Virtus Realty Group for showings and investment analysis.')
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', 'Property Details | Virtus Realty Group')
      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.setAttribute('content', 'View property details, photos, and pricing. Contact Virtus Realty Group for showings and investment analysis.')
      const ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) ogUrl.setAttribute('content', 'https://virtusrealtygroup.com/property')
    }
  }, [listing, listingKey])

  if (loading) return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <SkeletonDetail />
    </div>
  )

  if (error || !listing) return (
    <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Listing Not Found</h2>
        <p className="text-gray-500 mb-6">{error || 'This listing may no longer be available.'}</p>
        <button onClick={() => navigate('/listings')} className="btn-primary">← Back to Listings</button>
      </div>
    </div>
  )

  const address = formatAddress(listing)
  const cityStateZip = formatCityStateZip(listing)
  const fullAddress = cityStateZip ? `${address}, ${cityStateZip}` : address
  const price = formatPrice(listing.ListPrice)

  // ── collect fields per section ──
  const fieldsForSection = (sectionKey) =>
    Object.entries(listing)
      .filter(([k, v]) => SECTION_MAP[k] === sectionKey && !isEmptyValue(v) && !isPermissionField(k))
      .map(([k, v]) => [k, humanizeKey(k), v])
      .sort(([a], [b]) => a.localeCompare(b))

  const interiorFields   = fieldsForSection('interior')
  const exteriorFields   = fieldsForSection('exterior')
  const systemsFields    = fieldsForSection('systems')
  const constructFields  = fieldsForSection('construction')
  const locationFields   = fieldsForSection('location')
  // Hide other agents' info from public view — TODO: show for logged-in agents/admins
  const HIDDEN_AGENT_PREFIXES = ['ListAgent', 'ListOffice', 'CoListAgent', 'CoListOffice']
  const listingFields    = fieldsForSection('listing').filter(([key]) => !HIDDEN_AGENT_PREFIXES.some(p => key.startsWith(p)))

  const lat = listing.Latitude
  const lng = listing.Longitude
  const mapsUrl = (lat && lng) ? `https://www.google.com/maps?q=${lat},${lng}` : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top Nav Bar ── */}
      <div className="pt-20 pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-800 font-semibold text-sm transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Listings
            </button>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:text-navy-700 hover:border-navy-300 rounded-lg text-sm font-medium transition-all shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:text-gold-600 hover:border-gold-300 rounded-lg text-sm font-medium transition-all shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* ── Photo Gallery ── */}
        <PhotoGallery photos={photos} address={address} />

        {/* ── Main Layout ── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─── LEFT / MAIN COLUMN ─────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* HERO STATS BAR */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Price */}
              <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                <div>
                  <div className="flex items-center flex-wrap gap-3">
                    <p className="font-display text-4xl font-bold text-gray-900 leading-none">{price}</p>
                    {/* Price reduction badge — inline next to price */}
                    {listing.OriginalListPrice && listing.ListPrice && listing.OriginalListPrice > listing.ListPrice && (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                          color: '#166534',
                          animation: 'priceBadgePulse 2.5s ease-in-out infinite',
                        }}
                      >
                        📉 Price Reduced
                      </span>
                    )}
                  </div>
                  {/* Show original price with strikethrough if reduced */}
                  {listing.OriginalListPrice && listing.ListPrice && listing.OriginalListPrice > listing.ListPrice && (
                    <p className="text-sm text-gray-400 mt-1">
                      Was <span className="line-through">{formatPrice(listing.OriginalListPrice)}</span>
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-navy-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {fullAddress}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {listing.StandardStatus && (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                      {listing.StandardStatus}
                    </span>
                  )}
                  {listing.PropertySubType && (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-navy-100 text-navy-800">
                      {listing.PropertySubType}
                    </span>
                  )}
                  {listing.PropertyType && listing.PropertyType !== listing.PropertySubType && (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                      {listing.PropertyType}
                    </span>
                  )}
                </div>
              </div>

              {/* Key stats row */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                {listing.BedroomsTotal != null && (
                  <div className="flex flex-col items-center bg-navy-50 rounded-xl px-4 py-3 min-w-[72px]">
                    <span className="text-2xl font-bold text-navy-700">{listing.BedroomsTotal}</span>
                    <span className="text-xs text-gray-500 mt-0.5">Beds</span>
                  </div>
                )}
                {listing.BathroomsTotalInteger != null && (
                  <div className="flex flex-col items-center bg-gold-50 rounded-xl px-4 py-3 min-w-[72px]">
                    <span className="text-2xl font-bold text-gold-700">{listing.BathroomsTotalInteger}</span>
                    <span className="text-xs text-gray-500 mt-0.5">Baths</span>
                  </div>
                )}
                {listing.BathroomsFull != null && listing.BathroomsHalf != null && (
                  <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-3 min-w-[72px]">
                    <span className="text-xl font-bold text-gray-700">{listing.BathroomsFull}/{listing.BathroomsHalf}</span>
                    <span className="text-xs text-gray-500 mt-0.5">Full/Half</span>
                  </div>
                )}
                {listing.LivingArea != null && (
                  <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-3 min-w-[72px]">
                    <span className="text-2xl font-bold text-gray-700">{formatSqft(listing.LivingArea)}</span>
                    <span className="text-xs text-gray-500 mt-0.5">Sq Ft</span>
                  </div>
                )}
                {listing.YearBuilt != null && (
                  <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-3 min-w-[72px]">
                    <span className="text-2xl font-bold text-gray-700">{listing.YearBuilt}</span>
                    <span className="text-xs text-gray-500 mt-0.5">Year Built</span>
                  </div>
                )}
                {listing.GarageSpaces != null && listing.GarageSpaces > 0 && (
                  <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-3 min-w-[72px]">
                    <span className="text-2xl font-bold text-gray-700">{listing.GarageSpaces}</span>
                    <span className="text-xs text-gray-500 mt-0.5">Garage</span>
                  </div>
                )}
                {listing.DaysOnMarket != null && (
                  <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-3 min-w-[72px]">
                    <span className="text-2xl font-bold text-gray-700">{listing.DaysOnMarket}</span>
                    <span className="text-xs text-gray-500 mt-0.5">Days on Market</span>
                  </div>
                )}
                {listing['Price_sp_Calculations_co_Current_sp_Price_sp_To_sp_SqFt'] != null && (
                  <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-3 min-w-[80px]">
                    <span className="text-xl font-bold text-gray-700">${listing['Price_sp_Calculations_co_Current_sp_Price_sp_To_sp_SqFt']?.toFixed(0)}</span>
                    <span className="text-xs text-gray-500 mt-0.5">$/Sq Ft</span>
                  </div>
                )}
              </div>
            </div>

            {/* PRICE HISTORY — shown before description when price change data is present */}
            <PriceHistoryCard listing={listing} />

            {/* DESCRIPTION */}
            {listing.PublicRemarks && (
              <Section title="Description" icon="📝" defaultOpen={true}>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">{listing.PublicRemarks}</p>
              </Section>
            )}

            {/* INTERIOR — Visual redesign */}
            <InteriorFeaturesCard listing={listing} interiorFields={interiorFields} />

            {/* EXTERIOR — Visual redesign */}
            <ExteriorCard listing={listing} exteriorFields={exteriorFields} />

            {/* SYSTEMS — Visual redesign */}
            <AppliancesSystemsCard listing={listing} systemsFields={systemsFields} />

            {/* CONSTRUCTION — Visual redesign */}
            <ConstructionCard listing={listing} constructFields={constructFields} />

            {/* FINANCIAL — visual redesign */}
            <FinancialCard listing={listing} />

            {/* LOCATION — Beautiful redesign with embedded map */}
            <LocationCommunityCard listing={listing} locationFields={locationFields} />

            {/* VIRTUAL TOUR — now rendered inside LocationCommunityCard as a gold CTA card */}

            {/* LISTING INFO — hidden per Lex (2026-04-04). TODO: show for logged-in agents/admins */}

            {/* CATCH-ALL — hidden per Lex (2026-04-04). TODO: show for agents/admins */}

          </div>

          {/* ─── RIGHT / SIDEBAR ────────────────────────────── */}
          <div className="space-y-6">

            {/* Contact card */}
            <ContactCard listing={listing} />

            {/* Property Overview Card — beautified */}
            <PropertyOverviewCard listing={listing} />

            {/* Agent cards — HIDDEN for public users. TODO: Show for logged-in agents/admins */}
            {/* Listing agent and co-list agent info will be visible when auth system is built */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <p className="text-xs text-gray-400 leading-relaxed">
                Listing presented by Virtus Realty Group. Data courtesy of {listing?.OriginatingSystemName || 'BeachesMLS'}.
                Information deemed reliable but not guaranteed.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
