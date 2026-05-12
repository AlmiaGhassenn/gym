import { CTA } from '@/components/cta'
import { Features } from '@/components/features'
import { Footer } from '@/components/footer'
import { Gallery } from '@/components/gallery'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Membership } from '@/components/membership'

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <Features />
      <Gallery />
      <Membership />
      <CTA />
      <Footer />
    </main>
  )
}
