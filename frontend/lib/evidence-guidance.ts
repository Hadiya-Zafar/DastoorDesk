export type EvidenceIconName =
  | "FileText"
  | "Camera"
  | "MessageSquare"
  | "Receipt"
  | "CreditCard"
  | "Smartphone"
  | "Mail"
  | "Video"
  | "User"
  | "MapPin"
  | "Clock"

export interface EvidenceType {
  id: string
  name: string
  description: string
  iconName: EvidenceIconName
  tips: string[]
}

export interface DepartmentEvidence {
  departmentId: string
  title: string
  description: string
  evidenceTypes: EvidenceType[]
  importantNotes: string[]
}

export const evidenceGuidance: DepartmentEvidence[] = [
  {
    departmentId: "property",
    title: "Property Dispute Evidence",
    description: "Documents and records needed for property-related legal matters.",
    evidenceTypes: [
      {
        id: "property-docs",
        name: "Property Documents",
        description: "Ownership proof and registration papers",
        iconName: "FileText",
        tips: [
          "Sale deed or title deed",
          "Property registration certificate",
          "Encumbrance certificate",
          "Mutation records",
          "Previous ownership chain documents",
        ],
      },
      {
        id: "photos",
        name: "Photographs",
        description: "Visual evidence of the property",
        iconName: "Camera",
        tips: [
          "Current property photos with timestamps",
          "Photos showing boundary markers",
          "Evidence of encroachment if any",
          "Condition of property before/after",
        ],
      },
      {
        id: "correspondence",
        name: "Communication Records",
        description: "Written exchanges with other parties",
        iconName: "MessageSquare",
        tips: [
          "Letters exchanged with other party",
          "Notices sent/received",
          "Email communications",
          "WhatsApp or SMS messages",
        ],
      },
      {
        id: "payments",
        name: "Payment Records",
        description: "Financial transactions related to property",
        iconName: "Receipt",
        tips: [
          "Bank transaction receipts",
          "Payment receipts for property",
          "Tax payment records",
          "Maintenance fee receipts",
        ],
      },
    ],
    importantNotes: [
      "Keep original documents safe; submit certified copies",
      "Get documents attested by a notary if required",
      "Maintain a timeline of all events",
      "Preserve all communication records",
    ],
  },
  {
    departmentId: "cybercrime",
    title: "Cybercrime Evidence",
    description: "Digital evidence for online fraud, harassment, and cyber offenses.",
    evidenceTypes: [
      {
        id: "screenshots",
        name: "Screenshots",
        description: "Capture of digital evidence",
        iconName: "Smartphone",
        tips: [
          "Full page screenshots with URL visible",
          "Include date and time in screenshots",
          "Screenshot of profile/account involved",
          "Capture before content is deleted",
        ],
      },
      {
        id: "emails",
        name: "Email Records",
        description: "Suspicious or threatening emails",
        iconName: "Mail",
        tips: [
          "Download complete email with headers",
          "Save as PDF or EML format",
          "Include sender details",
          "Screenshot email if deletion is possible",
        ],
      },
      {
        id: "transactions",
        name: "Transaction Details",
        description: "Financial fraud evidence",
        iconName: "CreditCard",
        tips: [
          "Bank statements showing fraudulent transactions",
          "UPI/Payment app transaction history",
          "Wallet transaction records",
          "Account details of fraudster if available",
        ],
      },
      {
        id: "messages",
        name: "Message Records",
        description: "Chat and messaging evidence",
        iconName: "MessageSquare",
        tips: [
          "Export chat history if possible",
          "Screenshot conversations with timestamps",
          "Save voice notes separately",
          "Note profile names and IDs",
        ],
      },
    ],
    importantNotes: [
      "Do not delete any evidence from your devices",
      "File complaints within 24-48 hours for best results",
      "Report to cybercrime.gov.in portal",
      "Keep copies on multiple devices/cloud",
    ],
  },
  {
    departmentId: "traffic",
    title: "Traffic Incident Evidence",
    description: "Documentation needed for accidents and traffic violations.",
    evidenceTypes: [
      {
        id: "scene-photos",
        name: "Accident Scene Photos",
        description: "Visual documentation of the incident",
        iconName: "Camera",
        tips: [
          "Photos of all vehicles involved",
          "Damage to vehicles from multiple angles",
          "Road conditions and traffic signs",
          "Skid marks or debris",
        ],
      },
      {
        id: "videos",
        name: "Video Evidence",
        description: "CCTV or dashcam footage",
        iconName: "Video",
        tips: [
          "Dashcam footage if available",
          "Request CCTV footage from nearby shops",
          "Traffic camera footage through police",
          "Witness recorded videos",
        ],
      },
      {
        id: "witness",
        name: "Witness Information",
        description: "Contact details of eyewitnesses",
        iconName: "User",
        tips: [
          "Name and contact of witnesses",
          "Written statements if possible",
          "Contact info of other drivers",
          "Traffic police officer badge numbers",
        ],
      },
      {
        id: "location",
        name: "Location Details",
        description: "Geographic information",
        iconName: "MapPin",
        tips: [
          "Exact GPS coordinates",
          "Landmark references",
          "Note the road name and area",
          "Date, time, and weather conditions",
        ],
      },
    ],
    importantNotes: [
      "Get FIR copy immediately after reporting",
      "Do not move vehicles before police arrive (if safe)",
      "Get MLC (Medico Legal Certificate) if injured",
      "Note vehicle registration numbers of all parties",
    ],
  },
  {
    departmentId: "consumer",
    title: "Consumer Complaint Evidence",
    description: "Documentation for product/service complaints.",
    evidenceTypes: [
      {
        id: "purchase-proof",
        name: "Purchase Proof",
        description: "Evidence of transaction",
        iconName: "Receipt",
        tips: [
          "Original purchase receipt/invoice",
          "Online order confirmation",
          "Payment transaction proof",
          "Warranty card if applicable",
        ],
      },
      {
        id: "product-evidence",
        name: "Product Evidence",
        description: "Documentation of defective product",
        iconName: "Camera",
        tips: [
          "Photos of defective product",
          "Video showing the defect",
          "Original packaging with batch/serial number",
          "Before and after comparison if applicable",
        ],
      },
      {
        id: "communication",
        name: "Seller Communication",
        description: "Record of complaints made",
        iconName: "MessageSquare",
        tips: [
          "Complaint emails to company",
          "Customer service chat logs",
          "Call recordings if legal",
          "Written complaint copies",
        ],
      },
      {
        id: "timeline",
        name: "Timeline Records",
        description: "Chronology of events",
        iconName: "Clock",
        tips: [
          "Date of purchase",
          "Date defect was noticed",
          "Dates of complaints made",
          "Response timeline from seller",
        ],
      },
    ],
    importantNotes: [
      "File complaint within 2 years of purchase",
      "Send written complaint via registered post",
      "Keep all original documents safe",
      "Consumer forum filing fee is nominal",
    ],
  },
  {
    departmentId: "family",
    title: "Family Law Evidence",
    description: "Documentation for divorce, custody, and domestic matters.",
    evidenceTypes: [
      {
        id: "marriage-docs",
        name: "Marriage Documents",
        description: "Proof of marriage",
        iconName: "FileText",
        tips: [
          "Marriage certificate",
          "Wedding photos",
          "Invitation cards",
          "Joint account documents",
        ],
      },
      {
        id: "financial",
        name: "Financial Records",
        description: "Income and asset documentation",
        iconName: "CreditCard",
        tips: [
          "Salary slips and bank statements",
          "Property documents",
          "Tax returns",
          "Joint investments records",
        ],
      },
      {
        id: "communication-evidence",
        name: "Communication Evidence",
        description: "Record of interactions",
        iconName: "MessageSquare",
        tips: [
          "Messages showing behavior",
          "Email correspondence",
          "Call records if relevant",
          "Witness statements",
        ],
      },
      {
        id: "child-evidence",
        name: "Child-Related Documents",
        description: "For custody matters",
        iconName: "User",
        tips: [
          "Birth certificates",
          "School records and report cards",
          "Medical records",
          "Photos showing care and involvement",
        ],
      },
    ],
    importantNotes: [
      "Domestic violence cases: File DIR (Domestic Incident Report)",
      "Keep evidence of cruelty if applicable",
      "Financial evidence is crucial for maintenance claims",
      "Seek mediation before litigation when possible",
    ],
  },
  {
    departmentId: "labor",
    title: "Labor Dispute Evidence",
    description: "Employment-related documentation.",
    evidenceTypes: [
      {
        id: "employment-docs",
        name: "Employment Documents",
        description: "Proof of employment",
        iconName: "FileText",
        tips: [
          "Appointment letter",
          "Employment contract",
          "ID card or access card",
          "Offer letter and acceptance",
        ],
      },
      {
        id: "salary-records",
        name: "Salary Records",
        description: "Payment documentation",
        iconName: "CreditCard",
        tips: [
          "Salary slips/pay stubs",
          "Bank statements showing salary credits",
          "Tax deduction certificates",
          "PF/ESI contribution records",
        ],
      },
      {
        id: "communication-work",
        name: "Work Communication",
        description: "Official correspondence",
        iconName: "Mail",
        tips: [
          "Official emails from employer",
          "Warning letters or notices",
          "Performance reviews",
          "Termination letter if applicable",
        ],
      },
      {
        id: "workplace-evidence",
        name: "Workplace Evidence",
        description: "Documentation of incidents",
        iconName: "Camera",
        tips: [
          "Photos/videos of unsafe conditions",
          "Harassment evidence if applicable",
          "Attendance records",
          "Colleague witness statements",
        ],
      },
    ],
    importantNotes: [
      "File complaint with Labor Commissioner within limitation period",
      "Maintain copies of all documents provided to employer",
      "Keep record of verbal communications via email confirmation",
      "PF disputes can be filed online on EPFO portal",
    ],
  },
  {
    departmentId: "criminal",
    title: "Criminal Case Evidence",
    description: "Evidence for criminal complaints and FIR.",
    evidenceTypes: [
      {
        id: "incident-docs",
        name: "Incident Documentation",
        description: "Record of the criminal act",
        iconName: "FileText",
        tips: [
          "Written account of incident",
          "Time, date, and location details",
          "Names of persons involved",
          "Sequence of events",
        ],
      },
      {
        id: "physical-evidence",
        name: "Physical Evidence",
        description: "Tangible proof",
        iconName: "Camera",
        tips: [
          "Photos of injuries or damage",
          "Preserve any physical evidence",
          "Medical reports of injuries",
          "Damaged property photos",
        ],
      },
      {
        id: "witness-info",
        name: "Witness Information",
        description: "Eyewitness details",
        iconName: "User",
        tips: [
          "Names and contacts of witnesses",
          "Written statements",
          "Video/audio recordings if any",
          "CCTV footage locations",
        ],
      },
      {
        id: "digital-evidence",
        name: "Digital Evidence",
        description: "Electronic records",
        iconName: "Smartphone",
        tips: [
          "Call records",
          "Messages and chats",
          "Location data",
          "Social media posts",
        ],
      },
    ],
    importantNotes: [
      "Zero FIR can be filed at any police station",
      "Get FIR copy and note the FIR number",
      "Medical examination within 24 hours for assault cases",
      "Right to free legal aid if unable to afford lawyer",
    ],
  },
  {
    departmentId: "constitutional",
    title: "Constitutional Rights Evidence",
    description: "Documentation for rights violations and RTI.",
    evidenceTypes: [
      {
        id: "rti-docs",
        name: "RTI Documents",
        description: "For Right to Information",
        iconName: "FileText",
        tips: [
          "RTI application copy with receipt",
          "Previous correspondence if any",
          "Public authority details",
          "Specific information sought",
        ],
      },
      {
        id: "violation-proof",
        name: "Rights Violation Proof",
        description: "Evidence of violation",
        iconName: "Camera",
        tips: [
          "Photos/videos of incident",
          "Witness statements",
          "Official communications",
          "News reports if applicable",
        ],
      },
      {
        id: "official-response",
        name: "Official Responses",
        description: "Government communications",
        iconName: "Mail",
        tips: [
          "Replies received from authorities",
          "Rejection letters if any",
          "Appeal correspondence",
          "Timeline of responses",
        ],
      },
      {
        id: "supporting-docs",
        name: "Supporting Documents",
        description: "Additional evidence",
        iconName: "FileText",
        tips: [
          "Legal provisions being violated",
          "Similar case precedents",
          "Expert opinions if available",
          "Media coverage",
        ],
      },
    ],
    importantNotes: [
      "RTI response must be provided within 30 days",
      "First appeal to senior officer, then Information Commission",
      "PIL can be filed directly in High Court or Supreme Court",
      "Keep all postal receipts and acknowledgments",
    ],
  },
]

export function getEvidenceByDepartment(departmentId: string): DepartmentEvidence | undefined {
  return evidenceGuidance.find((e) => e.departmentId === departmentId)
}
