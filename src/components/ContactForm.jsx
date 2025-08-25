"use client"
import { useState } from "react"
import { FaWhatsapp, FaEnvelope, FaGlobe } from "react-icons/fa"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    message: "",
  })

  const [showSubmissionOptions, setShowSubmissionOptions] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSubmissionOptions(true)
  }

  const handleWhatsAppSubmit = () => {
    const message = `Hello Goldchild Media Institute!

*Contact Form Submission*
Name: ${formData.firstName}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}

I'm interested in learning more about your programs.`

    const whatsappUrl = `https://wa.me/254798475554?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setShowSubmissionOptions(false)
    resetForm()
  }

  const handleEmailSubmit = () => {
    const subject = `Contact Form Submission from ${formData.firstName}`
    const body = `Name: ${formData.firstName}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}`

    const mailtoUrl = `mailto:info@goldchildmedia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    setShowSubmissionOptions(false)
    resetForm()
  }

  const handleWebFormSubmit = async () => {
    try {
      const response = await fetch("https://formsubmit.co/info@playbox.co.ke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: "New Contact Form Submission - Goldchild Media Institute",
          _captcha: "false",
        }),
      })

      if (response.ok) {
        alert("Message sent successfully!")
      } else {
        alert("Failed to send message. Please try another method.")
      }
    } catch (error) {
      alert("Failed to send message. Please try another method.")
    }

    setShowSubmissionOptions(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  return (
    <>
      <div className="bg-slate-800 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-8">Make An Contact</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... existing form fields ... */}
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
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            Submit Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>

      {showSubmissionOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose How to Send</h3>
            <p className="text-gray-600 mb-6">Select your preferred method to send your message:</p>

            <div className="space-y-4">
              <button
                onClick={handleWhatsAppSubmit}
                className="w-full flex items-center gap-4 p-4 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-colors cursor-pointer"
              >
                <FaWhatsapp className="text-2xl text-green-500" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">WhatsApp</div>
                  <div className="text-sm text-gray-600">Send via WhatsApp message</div>
                </div>
              </button>

              <button
                onClick={handleEmailSubmit}
                className="w-full flex items-center gap-4 p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <FaEnvelope className="text-2xl text-blue-500" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-sm text-gray-600">Send via your email client</div>
                </div>
              </button>

              <button
                onClick={handleWebFormSubmit}
                className="w-full flex items-center gap-4 p-4 border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
              >
                <FaGlobe className="text-2xl text-orange-500" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Web Form</div>
                  <div className="text-sm text-gray-600">Send directly through website</div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowSubmissionOptions(false)}
              className="w-full mt-6 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ContactForm
