"use client"

import { useState } from "react"
import Image from "next/image"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function Features() {
  const [loanAmount, setLoanAmount] = useState<number | null>(null)
  const [interestRate, setInterestRate] = useState<number | null>(null)
  const [loanTerm, setLoanTerm] = useState<number | null>(null)
  const [view, setView] = useState<"table" | "graph" | null>(null)

  // Function to calculate the monthly payment
  const calculateMonthlyPayment = (
    principal: number | null,
    rate: number | null,
    term: number | null
  ): number => {
    if (principal === null || rate === null || term === null) {
      return 0
    }

    const monthlyRate = rate / 100 / 12
    const n = term
    const payment =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n))
    return payment
  }

  const generateAmortizationSchedule = () => {
    if (loanAmount === null || interestRate === null || loanTerm === null) {
      return []
    }

    const monthlyPayment = calculateMonthlyPayment(
      loanAmount,
      interestRate,
      loanTerm
    )
    const monthlyRate = interestRate / 100 / 12
    const schedule = []
    let remainingBalance = loanAmount
    let totalInterest = 0
    let amountPaidTill = 0
    const today = new Date()

    for (let i = 1; i <= loanTerm; i++) {
      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      remainingBalance -= principalPayment
      totalInterest += interestPayment
      amountPaidTill += monthlyPayment

      const paymentDate = new Date(today.getFullYear(), today.getMonth() + i, 1)
      const formattedDate = paymentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })

      schedule.push({
        paymentDate: formattedDate,
        payment: monthlyPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        remainingBalance: remainingBalance.toFixed(2),
        amountPaidTill: amountPaidTill.toFixed(2),
      })
    }

    return schedule
  }

  const amortizationSchedule = generateAmortizationSchedule()

  // Prepare data for the chart
  const chartData = amortizationSchedule.map((entry) => ({
    date: entry.paymentDate,
    totalPaid: parseFloat(entry.amountPaidTill),
    interestPaid: parseFloat(entry.totalInterest),
    remainingBalance: parseFloat(entry.remainingBalance),
  }))

  return (
    <section className="bg-white" id="features">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-16 pb-12 md:pt-52 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">
              {/* Content */}
              <div
                className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center"
                data-aos="fade-down"
              >
                <h3
                  className="h3 bg-clip-text text-customBlue bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3"
                  data-aos="fade-down"
                  data-aos-delay="400"
                >
                  Calculate Your Loan Payments Instantly
                </h3>
                <p className="text-lg text-slate-600 mb-8">
                  Use our calculator to estimate your monthly loan payments and
                  see how different interest rates and terms affect your
                  payment.
                </p>
              </div>

              {/* Personal Loan Calculator Section */}
              <div
                className="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center rounded-lg flex flex-col items-center justify-center bg-gray-50 p-6 shadow-lg"
                data-aos="fade-down"
              >
                <h4 className="text-xl font-semibold text-customBlue mb-6">
                  Personal Loan Calculator
                </h4>

                <div className="mt-4 max-w-xs w-full space-y-4">
                  <input
                    type="number"
                    value={loanAmount !== null ? loanAmount : ""}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === "") {
                        setLoanAmount(null) // If the input is empty, set the state to null
                      } else if (!isNaN(Number(value))) {
                        setLoanAmount(Number(value)) // If the input is a valid number, update the state
                      }
                    }}
                    placeholder="Enter loan amount"
                    className="text-sm font-medium text-slate-900 rounded border bg-white w-full px-3 py-2 transition duration-150 ease-in-out placeholder-slate-400"
                  />
                  <input
                    type="number"
                    value={interestRate !== null ? interestRate : ""}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === "") {
                        setInterestRate(null) // If the input is empty, set the state to null
                      } else if (!isNaN(Number(value))) {
                        setInterestRate(Number(value)) // If the input is a valid number, update the state
                      }
                    }}
                    placeholder="Enter interest rate (%)"
                    className="text-sm font-medium text-slate-900 rounded border bg-white w-full px-3 py-2 transition duration-150 ease-in-out placeholder-slate-400"
                  />
                  <input
                    type="number"
                    value={loanTerm !== null ? loanTerm : ""}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === "") {
                        setLoanTerm(null) // If the input is empty, set the state to null
                      } else if (!isNaN(Number(value))) {
                        setLoanTerm(Number(value)) // If the input is a valid number, update the state
                      }
                    }}
                    placeholder="Enter loan term (months)"
                    className="text-sm font-medium text-slate-900 rounded border bg-white w-full px-3 py-2 transition duration-150 ease-in-out placeholder-slate-400"
                  />

                  <div className="mt-4">
                    <p className="text-lg font-semibold text-customBlue">
                      Estimated Monthly Payment:
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {loanAmount && interestRate && loanTerm
                        ? `$${calculateMonthlyPayment(
                            loanAmount,
                            interestRate,
                            loanTerm
                          ).toFixed(2)}`
                        : "$"}
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => setView("table")}
                    className="btn text-white font-semibold bg-customGreen hover:bg-customGreen-dark px-4 py-2 rounded-lg shadow-lg transition duration-150 ease-in-out transform hover:-translate-y-1 hover:shadow-xl group"
                  >
                    Detailed View (Table)
                  </button>
                  <button
                    onClick={() => setView("graph")}
                    className="btn text-white font-semibold bg-customBlue hover:bg-customBlue-dark px-4 py-2 rounded-lg shadow-lg transition duration-150 ease-in-out transform hover:-translate-y-1 hover:shadow-xl group"
                  >
                    Graph Representation
                  </button>
                </div>
              </div>
            </div>

            {/* Detailed View */}
            {/* Detailed View */}
            {view === "table" && (
              <div className="mt-12 max-w-4xl mx-auto">
                <h4 className="text-xl font-semibold text-customBlue mb-4">
                  Detailed Loan Amortization Schedule
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white shadow-md rounded-lg text-black min-w-max">
                    <thead>
                      <tr className="text-left bg-customBlue text-white">
                        <th className="p-4">Payment Date</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Principal</th>
                        <th className="p-4">Interest</th>
                        <th className="p-4">Total Interest</th>
                        <th className="p-4">Balance</th>
                        <th className="p-4">Amount Paid Till</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.map((entry, index) => (
                        <tr key={index} className="border-b border-gray-600">
                          <td className="p-4">{entry.paymentDate}</td>
                          <td className="p-4">${entry.payment}</td>
                          <td className="p-4">${entry.principalPayment}</td>
                          <td className="p-4">${entry.interestPayment}</td>
                          <td className="p-4">${entry.totalInterest}</td>
                          <td className="p-4">${entry.remainingBalance}</td>
                          <td className="p-4">${entry.amountPaidTill}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Graph View */}
            {view === "graph" && (
              <div className="mt-12 max-w-4xl mx-auto">
                <h4 className="text-xl font-semibold text-customBlue mb-4">
                  Graphical Representation of Payments
                </h4>
                <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="totalPaid"
                        fill="#8884d8"
                        name="Total Amount Paid"
                      />
                      <Bar
                        dataKey="interestPaid"
                        fill="#82ca9d"
                        name="Total Interest Paid"
                      />
                      <Bar
                        dataKey="remainingBalance"
                        fill="#ffc658"
                        name="Remaining Balance"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
