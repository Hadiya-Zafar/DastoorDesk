import {
  FileText,
  Camera,
  MessageSquare,
  Receipt,
  CreditCard,
  Smartphone,
  Mail,
  Video,
  User,
  MapPin,
  Clock,
} from "lucide-react"
import type { EvidenceIconName } from "@/lib/evidence-guidance"

const iconMap = {
  FileText,
  Camera,
  MessageSquare,
  Receipt,
  CreditCard,
  Smartphone,
  Mail,
  Video,
  User,
  MapPin,
  Clock,
} as const

interface EvidenceIconProps {
  name: EvidenceIconName
  className?: string
}

export function EvidenceIcon({ name, className }: EvidenceIconProps) {
  const Icon = iconMap[name]
  return <Icon className={className} />
}
