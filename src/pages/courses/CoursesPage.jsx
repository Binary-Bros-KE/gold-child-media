import { useState, useMemo } from "react"
import { ArrowRight, Search, Filter, X } from "lucide-react"
import { courses } from "../../data/courses";

export default function CoursesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [priceRange, setPriceRange] = useState("All")
    const [sortBy, setSortBy] = useState("title")
    const [showFilters, setShowFilters] = useState(false)

    // Get unique categories
    const categories = ["All", ...new Set(courses.map((course) => course.category))]

    // Price ranges
    const priceRanges = [
        { label: "All", value: "All" },
        { label: "Under KSh 35,000", value: "under-35000" },
        { label: "KSh 35,000 - KSh 45,000", value: "35000-45000" },
        { label: "Above KSh 45,000", value: "above-45000" },
    ]

    // Filter and sort courses
    const filteredAndSortedCourses = useMemo(() => {
        const filtered = courses.filter((course) => {
            const matchesSearch =
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.briefDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.category.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesCategory = selectedCategory === "All" || course.category === selectedCategory

            let matchesPrice = true
            if (priceRange !== "All") {
                const price = Number.parseInt(course.price.replace(/[^\d]/g, ""))
                switch (priceRange) {
                    case "under-35000":
                        matchesPrice = price < 35000
                        break
                    case "35000-45000":
                        matchesPrice = price >= 35000 && price <= 45000
                        break
                    case "above-45000":
                        matchesPrice = price > 45000
                        break
                }
            }

            return matchesSearch && matchesCategory && matchesPrice
        })

        // Sort courses
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "title":
                    return a.title.localeCompare(b.title)
                case "price-low":
                    return Number.parseInt(a.price.replace(/[^\d]/g, "")) - Number.parseInt(b.price.replace(/[^\d]/g, ""))
                case "price-high":
                    return Number.parseInt(b.price.replace(/[^\d]/g, "")) - Number.parseInt(a.price.replace(/[^\d]/g, ""))
                case "duration":
                    return Number.parseInt(a.duration) - Number.parseInt(b.duration)
                default:
                    return 0
            }
        })

        return filtered
    }, [searchTerm, selectedCategory, priceRange, sortBy])

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedCategory("All")
        setPriceRange("All")
        setSortBy("title")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div
                className="relative bg-cover bg-center h-80"
                style={{ backgroundImage: `url('/index/graduate-feature-img.jpg')` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute max-w-7xl mx-auto px-4 flex flex-col gap-5 justify-center items-center h-full text-center w-full">
                    <h1 className="text-white text-4xl font-extrabold">Our Courses</h1>
                    <p className="text-white text-xl max-w-xl">Discover our comprehensive digital skills programs designed to launch your career in the creative industry</p>
                </div>
            </div>


            {/* Results Count */}
            <section className="py-4 px-4">
                <div className="max-w-7xl mx-auto">
                    <p className="text-gray-600">
                        Showing {filteredAndSortedCourses.length} of {courses.length} courses
                    </p>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {filteredAndSortedCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredAndSortedCourses.map((course) => (
                                <a
                                href={`/courses/${course.name}`}
                                    key={course.id}
                                    className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
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
                                        {/* Price Tag */}
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                                                {course.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Course Content */}
                                    <div className="p-6 relative">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{course.duration}</span>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{course.level}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{course.briefDescription}</p>

                                        {/* Read More Link */}
                                        <div className="flex items-center justify-between">
                                            <a
                                                href={`/courses/${course.name}`}
                                                className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all group/btn cursor-pointer"
                                            >
                                                More Info
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </a>

                                            {/* Book Icon */}
                                            <div className="opacity-20 group-hover:opacity-40 transition-opacity">
                                                <img src="/graphics/cou-icon.png" alt="Course icon" className="w-8 h-8" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                            <button
                                onClick={clearFilters}
                                className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
