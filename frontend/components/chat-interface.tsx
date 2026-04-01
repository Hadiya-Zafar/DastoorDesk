"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, FileCheck, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EvidencePanel } from "@/components/evidence-panel";
import { DepartmentIcon } from "@/components/department-icon";
import { askLegalAI } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import type { LegalDepartment } from "@/lib/legal-departments";

interface ChatInterfaceProps {
  department: LegalDepartment;
}

export function ChatInterface({ department }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);

  // 🎤 VOICE INPUT
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 🔊 VOICE OUTPUT FUNCTION
  const speakText = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();

    let cleanText = text
      // 🔥 remove markdown symbols
      .replace(/[#*`>-]/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")

      // 🔥 FIX COLONS + STRUCTURE
      .replace(/:/g, ".")          // colon → pause
      .replace(/\n+/g, ". ")       // new lines → pauses

      // 🔥 clean spaces
      .replace(/\s+/g, " ")
      .trim();

    console.log("🔊 CLEAN SPEECH:", cleanText);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }
};

  // Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🎤 SPEECH RECOGNITION SETUP
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setSpeechSupported(true);

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          let transcript = "";

          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }

          // CLEAN TEXT
          transcript = transcript.replace(/\s+/g, " ").trim();

          const isUrduScript = /[\u0600-\u06FF]/.test(transcript);

          if (!isUrduScript) {
            const lower = transcript.toLowerCase();
            transcript = lower.charAt(0).toUpperCase() + lower.slice(1);
          }

          setInput(transcript);
        };

        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // 🎤 TOGGLE VOICE INPUT
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      const text = input.toLowerCase();

      if (/[؀-ۿ]/.test(text)) {
        recognitionRef.current.lang = "ur-PK";
      } else {
        recognitionRef.current.lang = "en-US";
      }

      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // 🔥 MAIN CHAT FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const data = await askLegalAI(input, department.id);

      const botMessage = {
        role: "assistant",
        content: data.answer,
        evidence: data.evidence_list,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error connecting to backend." },
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
                <div className="flex justify-between items-start gap-2">
                <div className="prose prose-sm max-w-none">
  <ReactMarkdown
    components={{
      h3: ({ ...props }) => <h3 className="font-bold mt-3" {...props} />,
      strong: ({ ...props }) => <strong className="font-semibold" {...props} />,
      li: ({ ...props }) => <li className="ml-4 list-disc" {...props} />,
      p: ({ ...props }) => <p className="mb-2" {...props} />,
    }}
  >
    {message.content}
  </ReactMarkdown>
</div>

                  {message.role === "assistant" && (
                    <button
                      onClick={() => speakText(message.content)}
                      className="text-sm text-gray-500 hover:text-black"
                    >
                      🔊
                    </button>
                  )}
                </div>

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
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2 rounded-xl border p-2">

            {/* 🎤 MIC */}
            {speechSupported && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleListening}
                className={`h-10 w-10 ${
                  isListening ? "text-red-500 bg-red-100" : ""
                }`}
                disabled={isLoading}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            )}

            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isListening
                  ? "Listening..."
                  : `Describe your ${department.name.toLowerCase()} issue...`
              }
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

      <EvidencePanel
        departmentId={department.id}
        isOpen={showEvidence}
        onClose={() => setShowEvidence(false)}
      />
    </div>
  );
}