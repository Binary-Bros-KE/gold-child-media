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
            <div className="flex items-center space-x-3 transform -translate-x-5">
              <img src="/main-logo-dark.png" alt="" />
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
                <a href="/courses" className="text-gray-300 hover:text-primary transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/about-us" className="text-gray-300 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-gray-300 hover:text-primary transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/management" className="text-gray-300 hover:text-primary transition-colors">
                  Management
                </a>
              </li>
            </ul>
          </div>

          {/* Latest Posts Column */}
          <div className="space-y-6">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8096359867473!2d36.82498897404561!3d-1.2883915356264843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1127cc53f877%3A0x923a4f651ef68033!2sDevelopment%20House%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1755718043200!5m2!1sen!2ske" width="600" height="450" loading="lazy" className="w-full h-full"></iframe>
          </div>

          {/* Contact Us Column */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <FaPhone className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium">+254 798 475 554</p>
                  <p className="text-gray-300 text-sm">Call/Whatsapp Us</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium">info@goldchildmedia.com</p>
                  <p className="text-gray-300 text-sm">admissions@goldchildmedia.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mt-1">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium">Moi Avenue, Nairobi CBD</p>
                  <p className="text-gray-300 text-sm">11th Floor, Development Hse.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="bg-primary py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">GOLDCHILD MEDIA INSTITUTE</h3>
              </div>
            </div>
            <p className="text-white text-sm">Copyright © Goldchild Media Institute 2024. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
