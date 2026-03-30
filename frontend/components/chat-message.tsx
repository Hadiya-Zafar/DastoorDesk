"use client"

import { cn } from "@/lib/utils"
import { Scale, User, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UIMessage } from "ai"

interface ChatMessageProps {
  message: UIMessage
  onSpeak?: (text: string) => void
}

function getMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function ChatMessage({ message, onSpeak }: ChatMessageProps) {
  const isUser = message.role === "user"
  const text = getMessageText(message)

  return (
    <div
      className={cn(
        "flex w-full gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary" : "bg-accent"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Scale className="h-4 w-4 text-accent-foreground" />
        )}
      </div>

      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-1 rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium">
            {isUser ? "You" : "Dastoor Desk"}
          </p>
          {onSpeak && !isUser && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={() => onSpeak(text)}
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span className="sr-only">Read aloud</span>
            </Button>
          )}
        </div>
        <div className="prose prose-sm max-w-none text-inherit dark:prose-invert">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  )
}
