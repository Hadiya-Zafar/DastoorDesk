"use client"

import { DepartmentCard } from "@/components/department-card"
import { legalDepartments } from "@/lib/legal-departments"

export function DepartmentsSection() {
  return (
    <section id="departments" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Legal Departments
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Select a legal area to start a conversation with our AI assistant. 
            Get simplified explanations and guidance tailored to your situation.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {legalDepartments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
      </div>
    </section>
  )
}
