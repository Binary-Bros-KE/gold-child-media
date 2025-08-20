import { Link, useParams } from "react-router-dom";
import { courses } from "../../data/courses";
import { ArrowLeft, Clock, Users, Award, CheckCircle, Phone, Mail } from "lucide-react";

export default function CourseDetails() {
  // ✅ Correct way to get params in React Router
  const { courseName } = useParams();

  // ✅ Find the matching course
  const course = courses.find((c) => c.name === courseName);

  console.log(course.coverImage);


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Breadcrumb */}
      <div
        className="relative bg-cover bg-center h-80"
        style={{ backgroundImage: `url(${course.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute max-w-7xl mx-auto px-4 flex flex-col gap-5 justify-center h-full lg:pl-6">
          <h1 className="text-white text-4xl font-extrabold">{course.title}</h1>
          <p className="text-white text-xl">Home / Courses / {course.category}</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Course Info */}
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                {course.category}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{course.title}</h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{course.fullDescription}</p>

              {/* Course Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{course.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Level</p>
                    <p className="font-semibold text-gray-900">{course.level}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-semibold text-gray-900">{course.price}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary hover:bg-primary text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Enroll Now
                </button>
                <button className="border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Get More Info
                </button>
              </div>
            </div>

            {/* Course Image */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Secondary Images */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {course.secondaryImages.map((img, index) => (
                  <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${course.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Course Modules */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.modules.map((module, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 font-medium">{module}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">What You'll Learn</h2>
                <div className="space-y-4">
                  {course.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Requirements</h2>
                <div className="space-y-4">
                  {course.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-700">{requirement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Course Info Card */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Information</h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Instructor</p>
                    <p className="font-semibold text-gray-900">{course.instructor}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Schedule</p>
                    <p className="font-semibold text-gray-900">{course.schedule}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Duration</p>
                    <p className="font-semibold text-gray-900">{course.duration}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Investment</p>
                    <p className="text-2xl font-bold text-primary">{course.price}</p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button className="w-full bg-primary hover:bg-primary text-white py-4 rounded-full font-semibold transition-colors">
                    Enroll Now
                  </button>
                  <button className="w-full border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary py-4 rounded-full font-semibold transition-colors">
                    Contact Us
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-orange-50 to-teal-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-6">Have questions about this course? Get in touch with our team.</p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-gray-700">+254 798 475 554</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-gray-700">info@goldchildmedia.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
