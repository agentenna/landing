// import { Architecture } from "@/components/launch/architecture"
import { Channels } from "@/components/launch/channels"
import { Demo } from "@/components/launch/demo"
import { Features } from "@/components/launch/features"
import { Footer } from "@/components/launch/footer"
import { Hero } from "@/components/launch/hero"
import { Nav } from "@/components/launch/nav"
import { Quickstart } from "@/components/launch/quickstart"
import { StructuredData } from "@/components/launch/structured-data"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <StructuredData />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Demo />
        <Features />
        {/* Not release-ready yet. */}
        {/* <Architecture /> */}
        <Channels />
        <Quickstart />
      </main>
      <Footer />
    </div>
  )
}
