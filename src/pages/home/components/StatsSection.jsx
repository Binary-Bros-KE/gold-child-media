import { Calendar, BookOpen, Users, Handshake } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      number: "5+",
      label: "Years of Excellence",
      icon: Calendar,
    },
    {
      number: "15+",
      label: "Digital Programs",
      icon: BookOpen,
    },
    {
      number: "200+",
      label: "Skilled Students",
      icon: Users,
    },
    {
      number: "30+",
      label: "Industry Partners",
      icon: Handshake,
    },
  ]

  return (
    <section className="relative py-10 overflow-hidden">
      {/* Fixed parallax background */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/index/graduate-feature-img.jpg')`, // You'll add your background image here
          backgroundAttachment: "fixed",
        }}
      />

      {/* Teal overlay */}
      <div className="absolute inset-0 bg-primary/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center">
                {/* Orange circular icon background */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
                  <IconComponent className="w-10 h-10 text-white" />
                </div>

                {/* Large number */}
                <div className="text-5xl lg:text-6xl font-bold text-white mb-2">{stat.number}</div>

                {/* Label */}
                <div className="text-lg text-white font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
