"use client"
import { FaWhatsapp, FaPhone, FaEnvelope, FaFacebook, FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa"
import ContactForm from "../../components/ContactForm"

const ContactPage = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/254798475554", "_blank")
  }

  const handleCall = () => {
    window.location.href = "tel:+254798475554"
  }

  const handleEmail = () => {
    window.location.href = "mailto:info@goldchildmedia.com"
  }

  const handleFacebook = () => {
    window.open("https://facebook.com/goldchildmediainstitute", "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch With Us</h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Ready to start your digital media journey? We're here to help you every step of the way. Choose your
            preferred method to connect with us.
          </p>
        </div>
      </div>

      {/* Main Contact Methods */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us Directly</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the most convenient way to reach out to us. We're available through multiple channels to ensure you
              get the support you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500 group"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaWhatsapp className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Quick responses via WhatsApp</p>
              <p className="text-green-600 font-semibold">+254 798 475 554</p>
            </button>

            {/* Phone */}
            <button
              onClick={handleCall}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 group"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaPhone className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak directly with our team</p>
              <p className="text-blue-600 font-semibold">+254 798 475 554</p>
            </button>

            {/* Email */}
            <button
              onClick={handleEmail}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-500 group"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaEnvelope className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <p className="text-orange-600 font-semibold">info@goldchildmedia.com</p>
            </button>

            {/* Facebook */}
            <button
              onClick={handleFacebook}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-600 group"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FaFacebook className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Facebook</h3>
              <p className="text-gray-600 mb-4">Connect on social media</p>
              <p className="text-blue-600 font-semibold">@goldchildmediainstitute</p>
            </button>
          </div>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <FaClock className="text-xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold text-gray-900">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold text-gray-900">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-gray-900">Closed</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Location</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We're located in the heart of Nairobi, easily accessible by public transport.
                </p>
                <p className="font-semibold text-gray-900">Nairobi, Kenya</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
