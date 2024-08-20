import Link from "next/link"
import Image from "next/image"
import LogoImg from "@/public/images/logo.png"

export default function Logo() {
  return (
    <Link className="inline-flex" href="/" aria-label="ai.com">
      <Image
        className="max-w-none"
        src={LogoImg}
        width={150}
        height={40}
        priority
        alt="Stellar"
      />
    </Link>
  )
}
