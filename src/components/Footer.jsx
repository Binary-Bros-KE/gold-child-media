import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Column */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">GOLDCHILD</h3>
                <p className="text-sm text-gray-300">MEDIA INSTITUTE</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Empowering the next generation of digital creators through comprehensive media education. We provide
              hands-on training in videography, photography, graphic design, and more.
            </p>
          </div>

          {/* Our Links Column */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Our Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Latest Posts Column */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Latest Posts</h4>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <img src="/placeholder.svg" alt="Blog post" className="w-16 h-16 rounded-lg object-cover bg-gray-600" />
                <div>
                  <h5 className="text-sm font-medium text-white hover:text-orange-500 cursor-pointer">
                    Top 5 Photography Tips for Beginners
                  </h5>
                  <p className="text-xs text-orange-500 mt-1">15 March, 2024</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <img src="/placeholder.svg" alt="Blog post" className="w-16 h-16 rounded-lg object-cover bg-gray-600" />
                <div>
                  <h5 className="text-sm font-medium text-white hover:text-orange-500 cursor-pointer">
                    The Future of Digital Marketing in Kenya
                  </h5>
                  <p className="text-xs text-orange-500 mt-1">12 March, 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Us Column */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <FaPhone className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium">+254 798 475 554</p>
                  <p className="text-gray-300 text-sm">+254 712 345 678</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium">info@goldchildmedia.com</p>
                  <p className="text-gray-300 text-sm">admissions@goldchildmedia.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mt-1">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium">Nairobi, Kenya</p>
                  <p className="text-gray-300 text-sm">Westlands, ABC Place</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="bg-orange-500 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">GOLDCHILD</h3>
              </div>
            </div>
            <p className="text-white text-sm">Copyright © Goldchild Media Institute 2024. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
