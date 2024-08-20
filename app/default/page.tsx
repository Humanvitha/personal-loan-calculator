import Hero from "@/components/hero"
import Features from "@/components/features"
import Header from "@/components/ui/header"


const sections = [
  Header,
  Hero,
  Features
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
