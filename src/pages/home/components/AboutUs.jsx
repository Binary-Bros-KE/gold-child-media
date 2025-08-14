import { FaGraduationCap } from "react-icons/fa"

export default function AboutUs() {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Images */}
                    <div className="space-y-6 flex gap-4 h-full">
                        {/* Large Image */}
                        <div className="relative h-full">
                            <div className="rounded-3xl overflow-hidden border-4 border-primary shadow-lg h-full">
                                <img
                                    src="/index/certified.jpg"
                                    alt="Goldchild Media Institute Campus"
                                    className="w-full h-full object-cover bg-gray-200"
                                />
                            </div>
                        </div>

                        {/* Small Image */}
                        <div className="flex flex-col gap-4">
                            {/* Stats Box */}
                            <div className="bg-primary text-white p-6 rounded-2xl inline-block border-b-4 border-teal-600 shadow-lg">
                                <div className="text-4xl font-bold">5+</div>
                                <div className="text-lg">Years of Excellence</div>
                            </div>

                            <div className="relative max-w-sm  h-full">
                                <div className="rounded-3xl overflow-hidden border-4 border-teal-600 shadow-lg h-full">
                                    <img
                                        src="/index/camera-lesson.jpg"
                                        alt="Student working on digital project"
                                        className="w-full h-full object-cover bg-gray-200"
                                    />
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-8">

                        {/* About Content */}
                        <div>
                            <div className="flex items-center gap-2 text-primary mb-4">
                                <FaGraduationCap className="text-xl" />
                                <span className="font-semibold">Get to Know Us</span>
                            </div>

                            <h2 className="text-4xl font-bold text-gray-800 mb-6">A Few Words About Our Institute</h2>

                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                   Goldchild Media Training Institute (GMTI) is a vibrant and forward-thinking creative academy based in Nairobi, Kenya. Founded to empower Africa’s next generation of visual storytellers, content creators, and artists, we combine hands-on practice, industry relevance, and personal development to prepare our learners for success in today’s dynamic media landscape.
                                </p>

                                <p>
                                   Fully accredited by the National Industrial Training Authority (NITA), GMTI offers high-impact training in disciplines such as videography, photography, graphic design, music production, deejaying, fine art, vlogging, and digital content creation. Our experienced trainers, modern facilities, and industry partnerships ensure students graduate with not just technical expertise, but also the creative confidence and entrepreneurial mindset to thrive.
                                </p>
                            </div>
                        </div>

                        {/* Feature Boxes */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                                    01
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg mb-2">Industry-Recognized Certification</h3>
                                    <p className="text-gray-600 text-sm">
                                        Graduate with a NITA-endorsed certificate that validates your skills locally and internationally.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                                    02
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg mb-2">Real-World Career Pathways</h3>
                                    <p className="text-gray-600 text-sm">
                                       Access internships, mentorships, and networking opportunities through our collaborations with top creatives and media companies.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Read More Button */}
                        <div>
                            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2">
                                Read More
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
