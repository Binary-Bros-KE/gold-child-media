"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaGraduationCap,
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [isPagesOpen, setIsPagesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const courses = [
    "Videography & Photography",
    "Graphic Design",
    "Music Production",
    "Software Development",
    "Digital Marketing",
    "Content Creation",
  ]

  const pages = ["About Us", "Our Team", "Gallery", "Events", "Blog", "FAQ", "Contact"]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-secondary text-white">
        <div className="container mx-auto flex flex-row-reverse max-md:px-4 max-md:order-1 md:flex-row justify-between items-center text-sm max-md:py-2">
          {/* Social Links */}
          <div className="flex items-center space-x-4 mb-2 md:mb-0 bg-[url('/graphics/rectangle.png')] bg-cover bg-center py-6 px-20 max-md:px-1 max-md:py-2 max-md:bg-none max-md:rounded-md">
            <span className="hidden md:inline">Follow us:</span>
            <div className="flex space-x-2">
              <a href="https://www.facebook.com/p/Goldchild-MEDIA-Institute-61557393388520/" className="hover:text-orange-200 transition-colors">
                <FaFacebookF size={16} />
              </a>
              <a href="https://www.instagram.com/goldchild_mediainstitute/?hl=en" className="hover:text-orange-200 transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="https://www.youtube.com/channel/UCwmO6jZYVtLW4V8st5xIAYw" className="hover:text-orange-200 transition-colors">
                <FaXTwitter size={16} />
              </a>
              <a href="#" className="hover:text-orange-200 transition-colors">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-co md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-2">
              <FaPhone size={14} />
              <span>Call Now! +254 798 475 554</span>
            </div>
            <div className="flex items-center space-x-2 max-md:hidden">
              <FaEnvelope size={14} />
              <span>info@goldchildmedia.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-xl" : "shadow-lg"
          }`}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center h-15">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src="/main-logo-light.png" alt="" className="h-10" />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">
                About Us
              </a>

              {/* Courses Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCoursesOpen(true)}
                onMouseLeave={() => setIsCoursesOpen(false)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors">
                  <span>Courses</span>
                  <FaChevronDown className={`text-xs transition-transform ${isCoursesOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isCoursesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border py-2 z-50"
                    >
                      {courses.map((course, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          {course}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pages Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsPagesOpen(true)}
                onMouseLeave={() => setIsPagesOpen(false)}
              >
                <button className="flex items-center space-x-1 text-primary font-medium transition-colors">
                  <span>Pages</span>
                  <FaChevronDown className={`text-xs transition-transform ${isPagesOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isPagesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 z-50"
                    >
                      {pages.map((page, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          {page}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Blog
              </a>
              <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Contact
              </a>
            </div>

            {/* CTA Button & Mobile Menu */}
            <div className="flex space-x-4 h-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-6 py-2 cursor-pointer font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg max-md:hidden"
              >
                ADMISSION OPEN
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-gray-700 hover:text-primary transition-colors max-md:pr-4"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <a href="/" className="block text-gray-700 hover:text-primary font-medium transition-colors">
                  Home
                </a>
                <a href="#" className="block text-gray-700 hover:text-primary font-medium transition-colors">
                  About Us
                </a>

                {/* Mobile Courses */}
                <div>
                  <button
                    onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-primary font-medium transition-colors"
                  >
                    <span>Courses</span>
                    <FaChevronDown className={`text-xs transition-transform ${isCoursesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isCoursesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pl-4 space-y-2"
                      >
                        {courses.map((course, index) => (
                          <a
                            key={index}
                            href="#"
                            className="block text-gray-600 hover:text-primary transition-colors"
                          >
                            {course}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Pages */}
                <div>
                  <button
                    onClick={() => setIsPagesOpen(!isPagesOpen)}
                    className="flex items-center justify-between w-full text-primary font-medium transition-colors"
                  >
                    <span>Pages</span>
                    <FaChevronDown className={`text-xs transition-transform ${isPagesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isPagesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pl-4 space-y-2"
                      >
                        {pages.map((page, index) => (
                          <a
                            key={index}
                            href="#"
                            className="block text-gray-600 hover:text-primary transition-colors"
                          >
                            {page}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a href="#" className="block text-gray-700 hover:text-primary font-medium transition-colors">
                  Blog
                </a>
                <a href="#" className="block text-gray-700 hover:text-primary font-medium transition-colors">
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

export default Navbar
