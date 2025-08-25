import { Phone, MessageCircle, Mail, Facebook } from "lucide-react"

export default function ContactSection() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our admissions team",
      action: "0798 475 554",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick chat for instant responses",
      action: "+254 798 475 554",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      hoverColor: "hover:bg-green-100",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us your detailed inquiries",
      action: "info@goldchild.co.ke",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      hoverColor: "hover:bg-orange-100",
    },
    {
      icon: Facebook,
      title: "Facebook",
      description: "Connect with us on social media",
      action: "Follow Us",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      hoverColor: "hover:bg-purple-100",
    },
  ]

  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Left side - Celebrity Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src="/index/oga-obina.png"
                alt="Oga Obina - Goldchild Media Institute Celebrity Endorser"
                className="w-full max-w-md h-auto object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                So, What are you waiting for? <span className="text-primary">Join Goldchild Institute Today</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Take the first step towards your creative career. Our team is ready to guide you through our programs
                and help you discover the perfect path to digital media mastery.
              </p>
            </div>

            {/* Contact Method Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <div
                    key={index}
                    className={`${method.bgColor} ${method.hoverColor} p-6 rounded-xl border border-gray-300 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`${method.iconColor} p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow`}
                      >
                        <IconComponent size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                        <p className={`text-sm font-medium ${method.iconColor}`}>{method.action}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Call to Action */}
            <div className="text-center lg:text-left">
              <a href="/courses" className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
