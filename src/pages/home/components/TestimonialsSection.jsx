"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react";
import { FaStar, FaCrown } from "react-icons/fa"

const testimonials = [
  {
    id: 1,
    name: "Grace Wanjiku",
    role: "Videography & Photography Student",
    rating: 5,
    score: "98",
    text: "Goldchild Media Institute's hands-on training with professional equipment gave me the confidence to transform my passion into a professional career. The focus on portfolio creation was key to starting my own photography business.",
    image: "",
  },
  {
    id: 2,
    name: "Kevin Mwangi",
    role: "Web Design & Development Student",
    rating: 5,
    score: "99",
    text: "The web development course exceeded my expectations. The instructors are industry experts who provided practical, project-based skills that prepared me for my internship opportunity with a leading tech company in Nairobi.",
    image: "",
  },
  {
    id: 3,
    name: "Mercy Akinyi",
    role: "Graphic Design Student",
    rating: 5,
    score: "97",
    text: "Learning graphic design at Goldchild was the best decision. The creative studios and access to modern software like Adobe Creative Suite helped me build an impressive portfolio that clients love.",
    image: "",
  },
  {
    id: 4,
    name: "Brian Ochieng",
    role: "Digital Marketing Student",
    rating: 5,
    score: "99",
    text: "The digital marketing program was fantastic. I now understand how to run effective social media campaigns, optimize content for search engines, and use analytics to drive real business results. The skills I learned are directly applicable to the job market.",
    image: "",
  },
  {
    id: 5,
    name: "Cynthia Gacheru",
    role: "Music Production Student",
    rating: 5,
    score: "98",
    text: "The music production course gave me the skills to create professional-grade tracks from scratch. The instructors are amazing and the access to the audio production room was a game-changer for my sound.",
    image: "",
  },
  {
    id: 6,
    name: "Joseph Kamau",
    role: "Deejaying Student",
    rating: 5,
    score: "97",
    text: "The Deejaying program was exactly what I needed to kickstart my career. I mastered industry-standard equipment and learned essential performance skills, which gave me the confidence to start getting bookings for events.",
    image: "",
  },
  {
    id: 7,
    name: "Fiona Adhiambo",
    role: "Vlogging & Digital Content Creation Student",
    rating: 5,
    score: "99",
    text: "I learned how to create high-impact, story-driven content for social media. Goldchild taught me everything from scripting to editing and audience engagement, which helped me grow my YouTube channel rapidly.",
    image: "",
  },
  {
    id: 8,
    name: "Dennis Otieno",
    role: "Fine Art & Illustration Student",
    rating: 5,
    score: "98",
    text: "The Fine Art program allowed me to explore both traditional and digital mediums. My portfolio, developed with the guidance of my instructors, helped me get my work featured in an art gallery.",
    image: "",
  },
];


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
                <Quote />
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
