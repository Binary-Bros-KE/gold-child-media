"use client"

import { useState, useEffect } from "react"
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa"

// Sample gallery data - you can replace with your actual images
const galleryData = [
  {
    id: 1,
    src: "/gallery/gallery-1.png",
    alt: "Student videography project",
    category: "Student Work",
    title: "Documentary Film Project",
    description: "Finalizing student documentary on local culture",
  },
  {
    id: 2,
    src: "/gallery/gallery-4.jpg",
    alt: "Photography studio",
    category: "Facilities",
    title: "Professional Photography Studio",
    description: "State-of-the-art photography studio with professional lighting",
  },
  {
    id: 3,
    src: "/index/graduate-feature-img.jpg",
    alt: "Graduation ceremony",
    category: "Events",
    title: "Graduation Ceremony 2024",
    description: "Celebrating our successful graduates",
  },
  {
    id: 4,
    src: "/gallery/gallery-2.jpg",
    alt: "Graphic design work",
    category: "Student Work",
    title: "Brand Identity Design",
    description: "Student-created brand identity for Gold Child",
  },
  {
    id: 5,
    src: "/courses/deejaying/dejaying-1.jpg",
    alt: "Recording studio",
    category: "Facilities",
    title: "Music Production Studio",
    description: "Professional recording and mixing studio",
  },
  {
    id: 6,
    src: "/gallery/gallery-3.jpg",
    alt: "Workshop session",
    category: "Events",
    title: "Industry Workshop",
    description: "Guest speaker workshop on digital marketing trends",
  },
  {
    id: 7,
    src: "/courses/vlogging/vloging-4.jpg",
    alt: "Industry Based Learning",
    category: "Practicals",
    title: "Industry Based Learning",
    description: "Students visit Obina Show to get hands on experince.",
  },
  {
    id: 8,
    src: "/courses/music-prod/music-prod-1.png",
    alt: "Computer lab",
    category: "Facilities",
    title: "Digital Design Lab",
    description: "Modern computer lab with latest design software",
  },
  {
    id: 9,
    src: "/courses/videography/videography-4.jpg",
    alt: "Behind the scenes",
    category: "Behind the Scenes",
    title: "Video Production Setup",
    description: "Students setting up for a commercial shoot",
  },
  {
    id: 10,
    src: "/gallery/gallery-5.jpg",
    alt: "Student presentation",
    category: "Events",
    title: "Project Showcase",
    description: "Students presenting their final projects",
  },
  {
    id: 11,
    src: "/gallery/gallery-6.jpg",
    alt: "Motion graphics work",
    category: "Student Work",
    title: "Photography Students",
    description: "Students Preparing for a practical session",
  },
  {
    id: 12,
    src: "/gallery/gallery-7.jpg",
    alt: "Classroom",
    category: "Events",
    title: "Students Day Out",
    description: "Students at a lobby on a school trip",
  },
]

const categories = ["All", "Student Work", "Facilities", "Events", "Behind the Scenes"]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredImages, setFilteredImages] = useState(galleryData)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    let filtered = galleryData

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((image) => image.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (image) =>
          image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          image.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredImages(filtered)
  }, [selectedCategory, searchTerm])

  const openLightbox = (image, index) => {
    setLightboxImage(image)
    setCurrentImageIndex(index)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length
    setCurrentImageIndex(nextIndex)
    setLightboxImage(filteredImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(prevIndex)
    setLightboxImage(filteredImages[prevIndex])
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
  }

  useEffect(() => {
    if (lightboxImage) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [lightboxImage, currentImageIndex])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-orange-400">Gallery</span>
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto">
            Explore the creative journey of our students, state-of-the-art facilities, and memorable moments at
            Goldchild Media Institute
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredImages.length} {filteredImages.length === 1 ? "image" : "images"}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                {/* Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <img
                    src={image.src || `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(image.alt)}`}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
                      <p className="text-sm">{image.description}</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                      {image.category}
                    </span>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <FaSearch className="mx-auto text-6xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filter</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-orange-400 transition-colors z-10"
          >
            <FaTimes className="text-2xl" />
          </button>

          {/* Navigation Buttons */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-400 transition-colors z-10"
              >
                <FaChevronLeft className="text-3xl" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-400 transition-colors z-10"
              >
                <FaChevronRight className="text-3xl" />
              </button>
            </>
          )}

          {/* Image Container */}
          <div className="max-w-4xl max-h-full flex flex-col items-center">
            <div className="relative mb-6">
              <img
                src={
                  lightboxImage.src ||
                  `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(lightboxImage.alt)}`
                }
                alt={lightboxImage.alt}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            {/* Image Details */}
            <div className="text-center text-white max-w-2xl">
              <div className="mb-2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {lightboxImage.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{lightboxImage.title}</h3>
              <p className="text-gray-300">{lightboxImage.description}</p>

              {/* Image Counter */}
              {filteredImages.length > 1 && (
                <p className="text-gray-400 text-sm mt-4">
                  {currentImageIndex + 1} of {filteredImages.length}
                </p>
              )}
            </div>
          </div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={closeLightbox}></div>
        </div>
      )}
    </div>
  )
}
