import { MessageSquare, Brain, FileText, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Describe Your Issue",
    description: "Tell us about your legal problem in your own words. No legal jargon needed.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our AI analyzes your query and matches it with relevant legal knowledge.",
  },
  {
    icon: FileText,
    title: "Get Guidance",
    description: "Receive simplified explanations of applicable laws and possible actions.",
  },
  {
    icon: CheckCircle,
    title: "Take Action",
    description: "Know what evidence to collect and which authorities to approach.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-border bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get legal guidance in four simple steps
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent lg:block" />
                )}
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
