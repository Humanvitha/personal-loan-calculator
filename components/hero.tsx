import Image from "next/image"
import Illustration from "@/public/images/calculator-illustration.png" // Update with the path to your illustration image

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Illustration */}
        <div
          className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image
              src={Illustration}
              className="max-w-none"
              width="200"
              height="200"
              priority
              alt="Hero Illustration"
            />
          </div>
        </div>

        <div className="pt-16 pb-8 md:pt-32 md:pb-24">
          {/* Hero content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Text Content */}
            <div className="flex flex-col justify-center text-center md:text-left">
              <h1
                className="text-4xl font-extrabold text-customBlue leading-tight"
                data-aos="fade-down"
              >
                Personal Loan Calculator
              </h1>
              <p
                className="text-lg text-gray-600 mt-4"
                data-aos="fade-down"
                data-aos-delay="200"
              >
                Our Personal Loan Calculator helps you estimate your monthly payments,
                total interest payable, and the overall cost of your loan. Simply input
                the loan amount, term, and interest rate to get an instant calculation.
              </p>
              <p
                className="text-lg text-gray-600 mt-2"
                data-aos="fade-down"
                data-aos-delay="300"
              >
                Whether you're planning home improvements, consolidating debt, or 
                covering personal expenses, use this calculator to explore your 
                loan options and find the plan that fits your needs.
              </p>
              <div
                className="mt-8"
                data-aos="fade-down"
                data-aos-delay="400"
              >
                <a
                  className="btn text-white font-semibold bg-customBlue hover:bg-customBlue-dark px-4 py-2 rounded-lg shadow-lg transition duration-150 ease-in-out transform hover:-translate-y-1 hover:shadow-xl group"
                  href="#features"
                >
                  Get Started Now
                </a>
              </div>
            </div>

            {/* Visual Diagram */}
            <div className="flex justify-center items-center">
              <Image
                src="/images/calculator-illustration.png" // Replace with your actual image path
                alt="Loan Calculator Diagram"
                width={500}
                height={500}
                className="rounded-lg"
                data-aos="fade-up"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
