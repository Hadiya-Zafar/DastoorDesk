import { streamText, convertToModelMessages, UIMessage } from "ai"
import { getDepartmentById } from "@/lib/legal-departments"

export async function POST(req: Request) {
  const { messages, departmentId }: { messages: UIMessage[]; departmentId: string } = await req.json()

  const department = getDepartmentById(departmentId)

  const systemPrompt = department?.systemPrompt || `You are Dastoor Desk, an AI-powered legal awareness assistant. 
Help users understand their legal rights and possible legal actions. 
Provide simplified explanations of laws and guide users on appropriate steps.
Always recommend consulting a qualified lawyer for specific cases.
Be empathetic, use simple language, and avoid legal jargon where possible.`

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
