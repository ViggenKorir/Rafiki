"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

// Sample portfolio data - replace with actual data from your backend
const projects = [
  {
    id: 1,
    title: "Modern Office Complex",
    category: "Commercial",
    location: "Nairobi, Kenya",
    imageUrl:
      "https://res.cloudinary.com/dgu9ietkl/image/upload/v1759228790/architect-s-design-space-stockcake_t85kqi.jpg",
    description:
      "A state-of-the-art office complex featuring sustainable design elements.",
  },
  {
    id: 2,
    title: "Luxury Residential Estate",
    category: "Residential",
    location: "Karen, Nairobi",
    imageUrl:
      "https://res.cloudinary.com/dgu9ietkl/image/upload/v1759229308/hq720_flh1n7.jpg",
    description: "High-end residential development with modern amenities.",
  },
  {
    id: 3,
    title: "Shopping Mall Renovation",
    category: "Commercial",
    location: "Mombasa, Kenya",
    imageUrl:
      "https://res.cloudinary.com/dgu9ietkl/image/upload/v1759229659/Nairobi-Fashion-Hub-shopping-mall-kenya-Top-20_ddftch.jpg",
    description:
      "Complete renovation and modernization of an existing shopping center.",
  },
  {
    id: 4,
    title: "Eco-Friendly Apartments",
    category: "Residential",
    location: "Kilimani, Nairobi",
    imageUrl:
      "https://res.cloudinary.com/dgu9ietkl/image/upload/v1759229804/33A36322-9801-431D-A92A-FD229EB589CA_hnjn5u.webp",
    description:
      "Sustainable apartment complex with green building certification.",
  },
  {
    id: 5,
    title: "Healthcare Center",
    category: "Healthcare",
    location: "Kisumu, Kenya",
    imageUrl:
      "https://res.cloudinary.com/dgu9ietkl/image/upload/v1759229939/tenwek-drone-scaled_pywsai.jpg",
    description: "Modern medical facility designed for optimal patient care.",
  },
  {
    id: 6,
    title: "Educational Campus",
    category: "Education",
    location: "Nakuru, Kenya",
    imageUrl:
      "https://res.cloudinary.com/dgu9ietkl/image/upload/v1759230397/B869-School_x2yvlb.jpg",
    description:
      "Comprehensive educational facility with state-of-the-art amenities.",
  },
];

const categories = [
  "All",
  "Commercial",
  "Residential",
  "Healthcare",
  "Education",
];

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "All" || project.category === selectedCategory,
  );

  return (
    <section id="portfolio" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Our Portfolio
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Projects
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our diverse portfolio of successful projects across various
            sectors.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-10 flex justify-center space-x-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {project.location}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {project.category}
                    </span>
                    <Button variant="secondary" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-xl"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="relative h-64 w-full sm:h-96">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedProject.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {selectedProject.location}
                  </p>
                  <div className="mt-4">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700">
                      {selectedProject.category}
                    </span>
                  </div>
                  <p className="mt-4 text-gray-600">
                    {selectedProject.description}
                  </p>
                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedProject(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Portfolio;
