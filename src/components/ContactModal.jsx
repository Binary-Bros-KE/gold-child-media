"use client"
import { FaWhatsapp, FaPhone, FaEnvelope, FaFacebook, FaTimes, FaMapMarkerAlt, FaClock } from "react-icons/fa"

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

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
    window.open("https://www.facebook.com/p/Goldchild-MEDIA-Institute-61557393388520/", "_blank")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-secondary p-4 rounded-t-2xl text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors cursor-pointer">
            <FaTimes className="text-xl" />
          </button>

          <div className="text-center">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="/favicon.ico" alt="Goldchild Media Institute" className="w-5 h-5 object-contain" />
            </div>
            <h2 className="text-xl font-bold mb-2">Contact Goldchild Media Institute</h2>
            <p className="text-orange-100 text-sm">
              Ready to start your digital media journey? Get in touch with us through any of these convenient methods.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* School Info */}
          {/* <div className="mb-6">

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-700">
                <FaMapMarkerAlt className="text-primary" />
                <span className="text-sm">11th Floor, Development Hse. Moi Avenue, Nairobi CBD</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaClock className="text-primary" />
                <span className="text-sm">Mon - Fri: 8:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div> */}

          {/* Contact Methods */}
          <div className="space-y-3">
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center gap-4 p-2 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaWhatsapp className="text-xl text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-gray-900">WhatsApp</div>
                <div className="text-sm text-gray-600">+254 798 475 554</div>
              </div>
            </button>

            <button
              onClick={handleCall}
              className="w-full flex items-center gap-4 p-2 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaPhone className="text-xl text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-gray-900">Call Us</div>
                <div className="text-sm text-gray-600">+254 798 475 554</div>
              </div>
            </button>

            <button
              onClick={handleEmail}
              className="w-full flex items-center gap-4 p-2 border-2 border-primary rounded-lg hover:bg-orange-50 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaEnvelope className="text-xl text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-gray-900">Email</div>
                <div className="text-sm text-gray-600">info@goldchildmedia.com</div>
              </div>
            </button>

            <button
              onClick={handleFacebook}
              className="w-full flex items-center gap-4 p-2 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaFacebook className="text-xl text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-gray-900">Facebook</div>
                <div className="text-sm text-gray-600">@goldchildmediainstitute</div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">We typically respond within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactModal
