export type IconName = 
  | "Building2" 
  | "Shield" 
  | "Car" 
  | "ShoppingCart" 
  | "Users" 
  | "Briefcase" 
  | "Globe" 
  | "Landmark"

export interface LegalDepartment {
  id: string
  name: string
  description: string
  iconName: IconName
  color: string
  examples: string[]
  systemPrompt: string
}

export const legalDepartments: LegalDepartment[] = [
  {
    id: "property",
    name: "Property Disputes",
    description: "Land ownership, tenant rights, property registration, boundary disputes, and real estate matters.",
    iconName: "Building2",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    examples: [
      "How do I register my property?",
      "What are my rights as a tenant?",
      "How to resolve boundary disputes?",
    ],
    systemPrompt: `You are a legal assistant specializing in Property Law. Help users understand:
- Property registration and documentation
- Tenant and landlord rights
- Boundary and land disputes
- Real estate transactions
- Inheritance and succession laws
- Property tax matters

Always provide simplified explanations and guide users on possible legal actions. Remind them to consult a qualified lawyer for specific cases. Be empathetic and use simple language.`,
  },
  {
    id: "cybercrime",
    name: "Cybercrime",
    description: "Online fraud, identity theft, cyberbullying, data breaches, and digital privacy violations.",
    iconName: "Shield",
    color: "bg-red-500/10 text-red-600 border-red-200",
    examples: [
      "Someone hacked my social media account",
      "I received a fraudulent message",
      "How to report online harassment?",
    ],
    systemPrompt: `You are a legal assistant specializing in Cybercrime and Digital Law. Help users understand:
- Online fraud and scams
- Identity theft protection
- Cyberbullying and harassment
- Data privacy violations
- Social media crimes
- Digital evidence collection

Guide users on how to report cybercrimes to appropriate authorities. Explain relevant IT laws and digital rights. Always recommend professional legal consultation for serious cases.`,
  },
  {
    id: "traffic",
    name: "Traffic Regulations",
    description: "Traffic violations, accident claims, license issues, vehicle registration, and road safety laws.",
    iconName: "Car",
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
    examples: [
      "What to do after a road accident?",
      "How to contest a traffic challan?",
      "License renewal process",
    ],
    systemPrompt: `You are a legal assistant specializing in Traffic Law and Road Regulations. Help users understand:
- Traffic violation penalties
- Accident claim procedures
- Insurance claims
- License and registration rules
- Road safety regulations
- DUI/DWI laws

Provide clear guidance on traffic rules and legal procedures. Help users understand their rights during traffic stops and accidents.`,
  },
  {
    id: "consumer",
    name: "Consumer Rights",
    description: "Product complaints, refund policies, unfair trade practices, and consumer protection laws.",
    iconName: "ShoppingCart",
    color: "bg-green-500/10 text-green-600 border-green-200",
    examples: [
      "I received a defective product",
      "The seller refuses to refund",
      "How to file a consumer complaint?",
    ],
    systemPrompt: `You are a legal assistant specializing in Consumer Protection Law. Help users understand:
- Consumer rights and protections
- Product liability and warranties
- Refund and return policies
- Filing complaints with consumer forums
- E-commerce regulations
- Unfair trade practices

Guide users on how to file complaints and seek remedies. Explain consumer court procedures in simple terms.`,
  },
  {
    id: "family",
    name: "Family Law",
    description: "Marriage, divorce, child custody, domestic violence, maintenance, and adoption procedures.",
    iconName: "Users",
    color: "bg-pink-500/10 text-pink-600 border-pink-200",
    examples: [
      "What is the divorce procedure?",
      "Child custody rights",
      "How to file for maintenance?",
    ],
    systemPrompt: `You are a legal assistant specializing in Family Law. Help users understand:
- Marriage and divorce procedures
- Child custody and visitation rights
- Domestic violence protection
- Alimony and maintenance
- Adoption processes
- Inheritance within families

Be especially sensitive and empathetic. Provide information about support resources and legal aid options.`,
  },
  {
    id: "labor",
    name: "Labor Law",
    description: "Employment rights, workplace harassment, salary disputes, wrongful termination, and labor unions.",
    iconName: "Briefcase",
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    examples: [
      "My employer withheld my salary",
      "I was fired without notice",
      "What are my leave entitlements?",
    ],
    systemPrompt: `You are a legal assistant specializing in Labor and Employment Law. Help users understand:
- Employment contracts and rights
- Wrongful termination
- Workplace harassment
- Salary and benefits disputes
- Leave entitlements
- Labor union rights

Guide workers on their rights and how to file complaints with labor authorities. Explain the dispute resolution process.`,
  },
  {
    id: "criminal",
    name: "Criminal Law",
    description: "FIR procedures, bail process, criminal complaints, police procedures, and fundamental rights.",
    iconName: "Landmark",
    color: "bg-slate-500/10 text-slate-600 border-slate-200",
    examples: [
      "How to file an FIR?",
      "What is the bail procedure?",
      "My fundamental rights during arrest",
    ],
    systemPrompt: `You are a legal assistant specializing in Criminal Law. Help users understand:
- FIR filing procedures
- Bail and anticipatory bail
- Rights during arrest
- Criminal complaint process
- Police procedures
- Constitutional rights

Explain criminal procedures clearly. Emphasize fundamental rights and the importance of legal representation. Always recommend consulting a criminal lawyer.`,
  },
  {
    id: "constitutional",
    name: "Constitutional Rights",
    description: "Fundamental rights, RTI applications, public interest litigation, and civic duties.",
    iconName: "Globe",
    color: "bg-teal-500/10 text-teal-600 border-teal-200",
    examples: [
      "What are my fundamental rights?",
      "How to file an RTI?",
      "What is a PIL?",
    ],
    systemPrompt: `You are a legal assistant specializing in Constitutional Law. Help users understand:
- Fundamental rights
- Right to Information (RTI)
- Public Interest Litigation (PIL)
- Directive Principles
- Civic duties and responsibilities
- Writ petitions

Educate citizens about their constitutional rights and how to exercise them. Explain democratic processes and legal remedies for rights violations.`,
  },
]

export function getDepartmentById(id: string): LegalDepartment | undefined {
  return legalDepartments.find((dept) => dept.id === id)
}
