"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DepartmentIcon } from "@/components/department-icon"
import type { LegalDepartment } from "@/lib/legal-departments"

interface DepartmentCardProps {
  department: LegalDepartment
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link href={`/chat/${department.id}`}>
      <Card className="group h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/30">
        <CardHeader className="pb-3">
          <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl border ${department.color}`}>
            <DepartmentIcon name={department.iconName} className="h-6 w-6" />
          </div>
          <CardTitle className="flex items-center justify-between text-lg">
            {department.name}
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {department.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Common questions:</p>
            <ul className="space-y-1.5">
              {department.examples.map((example, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
