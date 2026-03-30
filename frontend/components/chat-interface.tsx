"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EvidencePanel } from "@/components/evidence-panel";
import { DepartmentIcon } from "@/components/department-icon";
import { askLegalAI } from "@/lib/api";

import type { LegalDepartment } from "@/lib/legal-departments";

interface ChatInterfaceProps {
  department: LegalDepartment;
}

export function ChatInterface({ department }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 MAIN FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input;

    const userMessage = {
      role: "user",
      content: currentInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const data = await askLegalAI(currentInput, department.id);

      console.log("BACKEND RESPONSE:", data);

      const botMessage = {
        role: "assistant",
        content: data.answer,
        evidence: data.evidence_list, // 🔥 IMPORTANT
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error connecting to backend.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex justify-end border-b px-4 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowEvidence(!showEvidence)}
        >
          <FileCheck className="h-4 w-4 mr-1" />
          Evidence Guide
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border">
              <DepartmentIcon name={department.iconName} className="h-8 w-8" />
            </div>

            <h2 className="mb-2 text-xl font-semibold">
              {department.name}
            </h2>

            <p className="text-sm text-muted-foreground">
              {department.description}
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {/* MAIN ANSWER */}
                  <div>{message.content}</div>

                  {/* 🔥 EVIDENCE LIST */}
                  {message.evidence && (
                    <div className="mt-2 text-xs text-gray-700">
                      <strong>Evidence:</strong>
                      <ul className="list-disc ml-4">
                        {message.evidence.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Analyzing your query...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2 rounded-xl border p-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Describe your ${department.name.toLowerCase()} issue...`}
              className="flex-1 resize-none border-0 bg-transparent"
              disabled={isLoading}
            />

            <Button type="submit" disabled={!input.trim() || isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Evidence Panel */}
      <EvidencePanel
        departmentId={department.id}
        isOpen={showEvidence}
        onClose={() => setShowEvidence(false)}
      />
    </div>
  );
}