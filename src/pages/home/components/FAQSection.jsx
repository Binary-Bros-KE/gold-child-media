"use client"
import { useState } from "react"
import { FaChevronDown } from "react-icons/fa";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      id: 1,
      question: "What are the official entry requirements?",
      answer:
        "To enroll, you need a KCSE certificate with a minimum of any grade, be 18 years or older, and have good communication skills in either English or Kiswahili. A strong interest or prior experience in creative disciplines is also highly encouraged.",
    },
    {
      id: 2,
      question: "What is the mode of study?",
      answer:
        "Full-Time classes held 3 to 4 days per week for an immersive learning experience, and Part-Time evening and weekend sessions for working professionals. All programs are based on a practical, project-based model."
    },
    {
      id: 3,
      question: "What kind of facilities and equipment do students have access to?",
      answer:
        "Students have access to multimedia-enabled classrooms, creative studios, and a student lounge for collaboration. Facilities include a Photography Studio with professional gear, a Deejaying Studio with industry-standard controllers, an Audio Production Room, and a Video Editing Suite with licensed software like Adobe Premiere Pro. We also provide high-performance computers and software such as Adobe Creative Suite, FL Studio, and Logic Pro X."
    },
    {
      id: 4,
      question: "How long are the programs?",
      answer:
        "Program durations vary: the Diploma in Videography & Photography is 6 months , the Diploma in Graphic Design is 3 months , and the Professional Deejaying Diploma is 1 month. Certificate courses range from 2 to 3 months."
    },
    {
      id: 5,
      question: "Is the institute officially accredited?",
      answer:
        "Yes, Goldchild Media Training Institute is fully accredited by the National Industrial Training Authority (NITA). Upon successful completion, students are awarded a certificate endorsed by the institution and recognized under our NITA accreditation."
    },
  ]

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }



  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get every single answer here.</h2>
          <p className="text-gray-600 mb-8">
            Find answers to the most commonly asked questions about our programs, admissions process, and what makes
            Goldchild Media Institute the right choice for your creative journey.
          </p>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg cursor-pointer">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
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

        <div className="bg-slate-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8">Make An Contact</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone No."
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Write comments"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              Submit Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
