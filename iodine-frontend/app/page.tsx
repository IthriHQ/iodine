import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <CallToAction />
        <Faqs />
      </main>
    </>
  )
}
