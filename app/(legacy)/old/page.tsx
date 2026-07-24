import { Nav } from "@/components/lander/nav"
import {
  Closing,
  Footer,
  Hero,
  Problem,
  QuoteA,
  Quickstart,
  Rack,
  SeeWake,
  Stack,
  Surface,
  Verbs,
} from "@/components/lander/sections"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Rack />
        <Problem />
        <Surface />
        <Verbs />
        <QuoteA />
        <SeeWake />
        <Stack />
        <Quickstart />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}
