import {
  Building2,
  Shield,
  Car,
  ShoppingCart,
  Users,
  Briefcase,
  Globe,
  Landmark,
} from "lucide-react"
import type { IconName } from "@/lib/legal-departments"

const iconMap = {
  Building2,
  Shield,
  Car,
  ShoppingCart,
  Users,
  Briefcase,
  Globe,
  Landmark,
} as const

interface DepartmentIconProps {
  name: IconName
  className?: string
}

export function DepartmentIcon({ name, className }: DepartmentIconProps) {
  const Icon = iconMap[name]
  return <Icon className={className} />
}
