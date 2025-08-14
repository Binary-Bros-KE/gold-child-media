"use client"

import { motion } from "framer-motion"
import { FaCamera, FaLaptopCode, FaUsers } from "react-icons/fa"

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaCamera className="w-6 h-6" />,
      title: "Creative Studios",
      description: "State-of-the-art studios and classrooms designed for hands-on learning in media production.",
    },
    {
      icon: <FaLaptopCode className="w-6 h-6" />,
      title: "Modern Equipment",
      description:
        "Access to industry-standard tools, including Adobe Creative Suite, DSLR cameras, and audio production gear.",
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Collaborative Spaces",
      description: "Innovative spaces for students to collaborate, create, and network with peers.",
    },
  ]

  return (
    <section className="pt-10 bg-white">
        <div className="bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden">
          {/* Left Side - Content */}
          <div className="bg-secondary p-8 lg:p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Learning Environment & Facilities</h2>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Our dynamic learning environment is equipped with modern facilities to ensure students gain hands-on
                experience and develop their skills to industry standards.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <div className="relative min-h-[400px] lg:min-h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute inset-0"
            >
              <img
                src="/index/equipment.png"
                alt="Students learning in modern facilities"
                className="w-full h-full object-cover"
              />
    
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
