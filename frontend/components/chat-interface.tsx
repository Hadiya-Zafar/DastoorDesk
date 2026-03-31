"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, FileCheck, Mic, MicOff } from "lucide-react";
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

  // 🎤 VOICE STATES
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🎤 SETUP SPEECH RECOGNITION
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
  console.log("VOICE EVENT:", event);

  let transcript = "";

  for (let i = 0; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }

  //  CLEAN SPACES
  transcript = transcript.replace(/\s+/g, " ").trim();

  //  CHECK IF URDU SCRIPT
  const isUrduScript = /[\u0600-\u06FF]/.test(transcript);

  if (!isUrduScript) {
    // 👉 Handle English + Roman Urdu

    const lower = transcript.toLowerCase();

    const englishWords = [
      "account", "social", "media", "hacked", "what", "should", "do",
      "how", "help", "email", "password", "someone", "my"
    ];

    const isEnglish = englishWords.some(word => lower.includes(word));

    if (isEnglish) {
      //  Capitalize first letter (English)
      transcript = lower.charAt(0).toUpperCase() + lower.slice(1);
    } else {
      //  Roman Urdu → keep lowercase
      transcript = lower;
    }
  }

  console.log("VOICE FINAL:", transcript);

  setInput(transcript);
};

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

// 🎤 TOGGLE VOICE
const toggleListening = () => {
  if (!recognitionRef.current) return;

  if (isListening) {
    recognitionRef.current.stop();
    setIsListening(false);
  } else {
    // 🔥 Detect language from input
    const text = input.toLowerCase();

    if (/[؀-ۿ]/.test(text)) {
      recognitionRef.current.lang = "ur-PK"; // Urdu script
    } else {
      recognitionRef.current.lang = "en-US"; // English + Roman Urdu
    }

    console.log("🎤 Language set to:", recognitionRef.current.lang);

    recognitionRef.current.start();
    setIsListening(true);
  }
};

  //  MAIN FUNCTION
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

      const botMessage = {
        role: "assistant",
        content: data.answer,
        evidence: data.evidence_list,
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
                  <div>{message.content}</div>

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

            {/* 🎤 VOICE BUTTON */}
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

      {/* Evidence Panel */}
      <EvidencePanel
        departmentId={department.id}
        isOpen={showEvidence}
        onClose={() => setShowEvidence(false)}
      />
    </div>
  );
}