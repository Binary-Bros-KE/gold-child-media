"use client"

import { motion } from "framer-motion"
import { FaStar, FaCrown } from "react-icons/fa"

const testimonials = [
  {
    id: 1,
    name: "Grace Wanjiku",
    role: "Student",
    rating: 5,
    score: "98",
    text: "Goldchild Media Institute transformed my passion for photography into a professional career. The hands-on training with industry-standard equipment gave me the confidence to start my own photography business.",
    image: "",
  },
  {
    id: 2,
    name: "Kevin Mwangi",
    role: "Student",
    rating: 5,
    score: "99",
    text: "The web development course exceeded my expectations. The instructors are industry experts who provided practical skills that landed me a job at a top tech company in Nairobi.",
    image: "",
  },
  {
    id: 3,
    name: "Mercy Akinyi",
    role: "Student",
    rating: 5,
    score: "97",
    text: "Learning graphic design at Goldchild was the best decision I made. The creative studios and modern software access helped me build an impressive portfolio that clients love.",
    image: "",
  },
  {
    id: 4,
    name: "Brian Ochieng",
    role: "Student",
    rating: 5,
    score: "99",
    text: "The videography program gave me skills I never thought possible. From camera work to post-production, I now create content for major brands and events across Kenya.",
    image: "",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-slate-800/90 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('')", // Background image placeholder
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaCrown className="text-primary text-lg" />
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Students <span className="text-primary">Say's</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover how Goldchild Media Institute has transformed the careers and lives of our students through
            hands-on digital skills training.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-xl relative border-b-4 border-primary"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Score Badge */}
              <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                {testimonial.score}
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-primary text-lg" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

              {/* Student Profile */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-primary text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
