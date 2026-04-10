import { FaChalkboardTeacher, FaLaptop, FaBriefcase, FaCertificate } from "react-icons/fa";

export default function HeroSection() {
  const features = [
    {
      icon: <FaChalkboardTeacher className="w-8 h-8 text-primary" />,
      title: "Experienced Tutors",
      description: "Learn from industry professionals with years of real-world experience.",
      bg: "bg-[#fff1eeff]",
    },
    {
      icon: <FaLaptop className="w-8 h-8 text-primary" />,
      title: "Flexible Learning",
      description: "Choose from online, evening, or weekend classes to fit your schedule.",
      bg: "bg-[#eef8ffff]",
    },
    {
      icon: <FaBriefcase className="w-8 h-8 text-primary" />,
      title: "High Employment Rate",
      description: "99% of our graduates secure jobs or start their own businesses.",
      bg: "bg-[#fffaeeff]",
    },
    {
      icon: <FaCertificate className="w-8 h-8 text-primary" />,
      title: "Recognized Certification",
      description: "Graduate with credentials that are respected by employers worldwide.",
      bg: "bg-[#eefffbff]",
    },
  ];

  return (
    <section className="relative">
      {/* Hero Section with Background Image */}
      <div className="relative h-150 flex items-center justify-center overflow-hidden">
        {/* Background Image - User will add their curved bottom image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/index/banner-alt.png')`, // User will fill this
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-7xl mx-auto">
          {/* Welcome Text */}
          <p className="text-sm md:text-base font-medium tracking-wider uppercase mb-4 opacity-90">
            Welcome to Goldchild Media Institute
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight mb-4">
            Master{" "}
            <span className="text-primary capitalize">
              digital skills
            </span>{" "}
            for
            Creative success.
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Transform your passion into profession with hands-on training in videography, photography, graphic design,
            music production, and web development.
          </p>

          {/* CTA Button */}
          <a
            href="/apply"
            className="bg-primary hover:bg-secondary text-white font-bold px-8 py-4 rounded-lg transition-colors duration-300 text-lg">
            APPLY NOW ONLINE →
          </a>
        </div>
      </div>

      {/* Feature Cards - Positioned at boundary */}
      <div className="relative -mt-20 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.bg} rounded-md p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center`}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer for next section */}
      <div className="h-20"></div>
    </section>
  )
}
