import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "@/components/chat-interface"
import { DepartmentIcon } from "@/components/department-icon"
import { getDepartmentById, legalDepartments } from "@/lib/legal-departments"

interface ChatPageProps {
  params: Promise<{ departmentId: string }>
}

export async function generateStaticParams() {
  return legalDepartments.map((dept) => ({
    departmentId: dept.id,
  }))
}

export async function generateMetadata({ params }: ChatPageProps) {
  const { departmentId } = await params
  const department = getDepartmentById(departmentId)

  if (!department) {
    return { title: "Not Found - Dastoor Desk" }
  }

  return {
    title: `${department.name} - Dastoor Desk`,
    description: `Get AI-powered legal guidance for ${department.name.toLowerCase()}. ${department.description}`,
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { departmentId } = await params
  const department = getDepartmentById(departmentId)

  if (!department) {
    notFound()
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to home</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${department.color}`}>
              <DepartmentIcon name={department.iconName} className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">{department.name}</h1>
              <p className="text-xs text-muted-foreground">AI Legal Assistant</p>
            </div>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Scale className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden text-sm font-semibold sm:inline">Dastoor Desk</span>
        </Link>
      </header>

      {/* Chat Interface */}
      <main className="flex-1 overflow-hidden">
        <ChatInterface department={department} />
      </main>
    </div>
  )
}
