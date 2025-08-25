"use client"
import { useState } from "react"
import { FaLinkedin, FaTwitter, FaEnvelope, FaGraduationCap, FaUsers, FaChalkboardTeacher } from "react-icons/fa"

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("board")

  const boardMembers = [
    {
      id: 1,
      name: "Rose Nyamoita Nyaswenta",
      position: "Director & Legal Advisor",
      image: "", // Placeholder for image
      bio: "Rose is a qualified lawyer with a passion for youth empowerment and education. Her legal expertise ensures the institute operates with integrity, compliance, and a strong governance framework. Rose also plays a key role in shaping institutional policy, external partnerships, and strategic direction.",
      expertise: ["Legal Affairs", "Youth Empowerment", "Strategic Planning", "Governance"],
      social: {
        linkedin: "#",
        email: "rose@goldchildmedia.com",
      },
    },
    {
      id: 2,
      name: "Lesly Daniel Oyola",
      position: "Director & Creative Programs Lead",
      image: "", // Placeholder for image
      bio: "Lesly is a seasoned fitness professional and musician with deep roots in Kenya's creative and performing arts scene. His artistic insight and industry experience inform the development of GMTI's training programs, with a strong emphasis on hands-on learning, creative freedom, and personal growth.",
      expertise: ["Creative Arts", "Music Production", "Program Development", "Fitness Training"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "lesly@goldchildmedia.com",
      },
    },
  ]

  const academicTeam = [
    {
      id: 1,
      name: "Henry Nyabuto",
      position: "Lead Lecturer, Media & Communication",
      image: "", // Placeholder for image
      qualification: "Bachelor's Degree in Journalism",
      bio: "Henry brings years of experience in both teaching and professional content creation. He plays a central role in curriculum delivery, academic mentorship, and quality assurance across media-related programs.",
      expertise: ["Journalism", "Content Creation", "Academic Mentorship", "Curriculum Development"],
      social: {
        linkedin: "#",
        email: "henry@goldchildmedia.com",
      },
    },
    {
      id: 2,
      name: "Nicholas Adipo",
      position: "Lecturer, Media Studies",
      image: "", // Placeholder for image
      qualification: "Diploma in Journalism",
      bio: "Nicholas has practical experience in broadcast production and creative writing. He is instrumental in guiding learners through foundational and intermediate media coursework.",
      expertise: ["Broadcast Production", "Creative Writing", "Media Studies", "Student Mentoring"],
      social: {
        linkedin: "#",
        email: "nicholas@goldchildmedia.com",
      },
    },
  ]

  const specialistAreas = [
    "Videography & Photography",
    "Graphic Design",
    "Music Production",
    "Deejaying",
    "Fine Art & Illustration",
    "Vlogging & Digital Content Creation",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-80"
        style={{ backgroundImage: `url('/team/team.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute max-w-7xl mx-auto px-4 flex flex-col gap-5 justify-center h-full lg:pl-20">
          <h1 className="text-white text-4xl font-extrabold">Governance & Leadership</h1>
          <p className="text-white text-xl">Home / Our Team</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <button
              onClick={() => setActiveTab("board")}
              className={`cursor-pointer px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "board"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-orange-50 hover:text-primary"
                }`}
            >
              <FaGraduationCap className="inline mr-2" />
              Board of Directors
            </button>
            <button
              onClick={() => setActiveTab("academic")}
              className={`cursor-pointer px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "academic"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-orange-50 hover:text-primary"
                }`}
            >
              <FaChalkboardTeacher className="inline mr-2" />
              Academic Team
            </button>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      {activeTab === "board" && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Board of Directors</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our board provides visionary leadership ensuring GMTI remains student-focused, future-ready, and aligned
                with the dynamic demands of the creative economy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {boardMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="h-80 bg-gradient-to-br from-teal-400 to-teal-600 relative">
                    {member.image ? (
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                          <FaUsers className="text-6xl text-white/80" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-4">{member.position}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <FaLinkedin className="text-xl" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                          <FaTwitter className="text-xl" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          <FaEnvelope className="text-xl" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Academic Team */}
      {activeTab === "academic" && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Academic Team</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our academic delivery is powered by passionate lecturers and instructors who combine deep academic
                knowledge with real-world creative industry experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
              {academicTeam.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="h-80 bg-gradient-to-br from-primary to-orange-600 relative">
                    {member.image ? (
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                          <FaChalkboardTeacher className="text-6xl text-white/80" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-2">{member.position}</p>
                    <p className="text-teal-600 font-medium mb-4">{member.qualification}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <FaLinkedin className="text-xl" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          <FaEnvelope className="text-xl" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Specialist Areas */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Faculty Specializes In:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specialistAreas.map((area, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow"
                  >
                    <p className="font-semibold text-gray-800">{area}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-teal-600 to-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Learn from Industry Experts?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join Goldchild Media Institute and learn from passionate educators committed to your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Our Courses
            </a>
            <a
              href="/about-us"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-colors"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
