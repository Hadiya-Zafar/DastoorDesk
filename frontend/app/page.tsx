import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DepartmentsSection } from "@/components/departments-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DepartmentsSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}
