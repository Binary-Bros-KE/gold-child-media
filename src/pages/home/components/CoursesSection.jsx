import { ArrowRight } from "lucide-react"
import { courses } from "../../../data/courses"

export default function CoursesSection() {

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-primary font-medium">Our Courses</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Digital Skills Programs</h2>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {courses.map((course) => (
            <a
              href={`/courses/${course.name}`}
              key={course.id}
              className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
            >
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Category Tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6 relative">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{course.briefDescription}</p>

                {/* Read More Link */}
                <div className="flex items-center justify-between">
                  <button className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all group/btn cursor-pointer">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {/* Book Icon */}
                  <div className="opacity-100 transition-opacity">
                    <img src="/graphics/cou-icon.png" alt="Course icon" className="w-10 h-8" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
