"use client"
import { useState } from "react"
import { FaChevronDown } from "react-icons/fa";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      id: 1,
      question: "What are the admission requirements for Goldchild Media Institute?",
      answer:
        "We welcome students with a passion for digital media. Basic requirements include a high school certificate or equivalent, and a genuine interest in creative fields like videography, photography, or graphic design.",
    },
    {
      id: 2,
      question: "How long are the certificate and diploma programs?",
      answer:
        "Our certificate programs typically run for 3-6 months, while diploma programs are 12-18 months. We also offer intensive weekend and evening classes for working professionals.",
    },
    {
      id: 3,
      question: "Do you provide job placement assistance after graduation?",
      answer:
        "Yes! We have strong industry partnerships and provide career guidance, portfolio development, internship opportunities, and job placement assistance to help our graduates launch successful careers.",
    },
    {
      id: 4,
      question: "What equipment and software do students have access to?",
      answer:
        "Students get hands-on experience with professional DSLR cameras, audio equipment, Adobe Creative Suite, Final Cut Pro, and access to our fully equipped studios and editing suites.",
    },
    {
      id: 5,
      question: "Are there flexible payment options available?",
      answer:
        "We offer flexible payment plans, installment options, and scholarship opportunities. Contact our admissions team to discuss the best payment plan for your situation.",
    },
  ]

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Get every single answer here.</h2>
      <p className="text-gray-600 mb-8">
        Find answers to the most commonly asked questions about our programs, admissions process, and what makes
        Goldchild Media Institute the right choice for your creative journey.
      </p>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">
                {String(faq.id).padStart(2, "0")} {faq.question}
              </span>
              <FaChevronDown 
                className={`w-5 h-5 text-gray-500 transition-transform ${openFAQ === faq.id ? "rotate-180" : ""}`}
              />
            </button>
            {openFAQ === faq.id && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQSection
