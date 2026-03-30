"use client"

import { useState } from "react"
import { FileCheck, ChevronDown, ChevronUp, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { EvidenceIcon } from "@/components/evidence-icon"
import { getEvidenceByDepartment, type EvidenceType } from "@/lib/evidence-guidance"

interface EvidencePanelProps {
  departmentId: string
  isOpen: boolean
  onClose: () => void
}

function EvidenceTypeCard({ evidence }: { evidence: EvidenceType }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <EvidenceIcon name={evidence.iconName} className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{evidence.name}</p>
              <p className="text-xs text-muted-foreground">{evidence.description}</p>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="mt-2 space-y-1.5 pl-12 pr-3">
          {evidence.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
              {tip}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function EvidencePanel({ departmentId, isOpen, onClose }: EvidencePanelProps) {
  const evidence = getEvidenceByDepartment(departmentId)

  if (!isOpen || !evidence) return null

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-border bg-background shadow-xl sm:w-96">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-semibold">Evidence Guide</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close panel</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <Card className="mb-4 border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{evidence.title}</CardTitle>
              <CardDescription className="text-xs">
                {evidence.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-3">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Types of Evidence
            </h3>
            {evidence.evidenceTypes.map((type) => (
              <EvidenceTypeCard key={type.id} evidence={type} />
            ))}
          </div>

          <div className="mt-6">
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <div>
                <h4 className="text-xs font-medium text-amber-900 dark:text-amber-100">
                  Important Notes
                </h4>
                <ul className="mt-2 space-y-1">
                  {evidence.importantNotes.map((note, index) => (
                    <li key={index} className="text-xs text-amber-800 dark:text-amber-200">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
