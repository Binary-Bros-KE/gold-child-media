"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  FaPlay,
  FaUsers,
  FaAward,
  FaGraduationCap,
  FaCamera,
  FaCode,
  FaPalette,
  FaMusic,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaPaintBrush,
  FaLaptopCode,
} from "react-icons/fa"
import VideoModal from "../../components/VideoModal"
import useVideoModal from "../../hooks/useVideoModal"
import FeaturesSection from "../home/components/FeaturesSection"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission")
  const { isOpen, openModal, closeModal } = useVideoModal()


  const values = [
    {
      icon: <FaPaintBrush className="text-2xl" />,
      title: "Creativity",
      description:
        "We encourage original thought, self-expression, and bold ideas.",
    },
    {
      icon: <FaAward className="text-2xl" />,
      title: "Professionalism",
      description:
        "We uphold high standards in conduct, work ethic, and delivery.",
    },
    {
      icon: <FaLaptopCode className="text-2xl" />,
      title: "Innovation",
      description:
        " We embrace new technologies and evolving media trends.",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Community",
      description:
        "We foster inclusivity, collaboration, and mentorship within our learning environment.",
    },
  ]



  const facilities = [
    {
      icon: <FaCamera className="text-3xl text-primary" />,
      title: "Professional Studios",
      description: "State-of-the-art photography and videography studios with professional lighting and equipment.",
    },
    {
      icon: <FaCode className="text-3xl text-primary" />,
      title: "Computer Labs",
      description: "Modern computer labs equipped with latest software for design, development, and digital marketing.",
    },
    {
      icon: <FaPalette className="text-3xl text-primary" />,
      title: "Creative Spaces",
      description: "Collaborative workspaces designed to inspire creativity and foster innovation among students.",
    },
    {
      icon: <FaMusic className="text-3xl text-primary" />,
      title: "Audio Production",
      description: "Professional audio recording and production facilities for music and sound design courses.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-80"
        style={{ backgroundImage: `url('/index/graduate-feature-img.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute max-w-7xl mx-auto px-4 flex flex-col gap-5 justify-center h-full lg:pl-10">
          <h1 className="text-white text-4xl font-extrabold">About US</h1>
          <p className="text-white text-xl">Home / About US</p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="/courses/digital-marketing/digital-marketing-1.png"
                  alt="Goldchild Media Institute Story"
                  className="w-full h-96 object-cover rounded-lg shadow-lg bg-gray-200"
                />
                <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
                <button onClick={openModal} className="absolute inset-0 flex items-center justify-center group cursor-pointer">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:bg-orange-600 transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <FaPlay className="text-white ml-1" />
                  </div>
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Goldchild Media Training Institute (GMTI) was officially founded on 19th March 2024 with a
                transformative vision: to empower Africa’s next wave of visual storytellers, content creators,
                and artists through practical, industry-aligned media education.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Located in the heart of Nairobi, GMTI was established in response to a growing demand for
                creative professionals who are both technically skilled and artistically driven. From its
                inception, the institute has been guided by a mission to bridge the gap between talent and
                opportunity in the creative economy.
              </p>
              <p className="text-gray-600 leading-relaxed">
                GMTI is fully accredited by the National Industrial Training Authority (NITA), a testament to our
                commitment to delivering high-quality, vocationally focused training that meets Kenya’s
                national standards and international creative industry benchmarks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Mission & Vision</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Driving digital transformation through education and empowering creative minds
            </p>
          </div>

          <div className="max-w-6xl mx-auto">

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-8 shadow-lg text-center flex gap-10 max-md:flex-col"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To nurture, mentor, and empower a new generation of African creatives through experiential
                  training, innovation, and industry-aligned learning experiences.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-teal-600">Our Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To become Africa’s leading media training institute—renowned for producing world-class
                  digital content creators, artists, and creative entrepreneurs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Goldchild Media Institute
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <FeaturesSection />
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Facilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Modern facilities equipped with industry-standard tools and technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 w-fit mx-auto">{facility.icon}</div>
                <h3 className="text-xl font-bold mb-3">{facility.title}</h3>
                <p className="text-gray-600 leading-relaxed">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of students who have transformed their careers through our programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/courses" className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                View Our Courses
              </a>
              <a href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors">
                Contact Us Today
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VideoModal Component */}
      <VideoModal isOpen={isOpen} onClose={closeModal} />
    </div>
  )
}
