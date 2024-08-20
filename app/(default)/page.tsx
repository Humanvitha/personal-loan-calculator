import Hero from "@/components/hero"
import Features from "@/components/features"

const sections = [
  Hero,
  Features,
]
export default async function Home() {
  return (
    <>
      {sections.map((Section) => (
        <Section />
      ))}
    </>
  )
}
