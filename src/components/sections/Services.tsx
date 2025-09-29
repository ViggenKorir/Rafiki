"use client";

import { motion } from "framer-motion";
import {
  Building2,
  PenLine,
  HardHat,
  Ruler,
  Building,
  Users,
  Presentation,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const services = [
  {
    name: "Architectural Design",
    description:
      "Creative and functional architectural designs tailored to your vision and requirements.",
    icon: Building2,
  },
  {
    name: "Interior Design",
    description:
      "Transform spaces with our expert interior design services that blend aesthetics with functionality.",
    icon: PenLine,
  },
  {
    name: "Construction Management",
    description:
      "Comprehensive construction management services ensuring projects are delivered on time and within budget.",
    icon: HardHat,
  },
  {
    name: "Project Planning",
    description:
      "Detailed project planning and feasibility studies to ensure successful project execution.",
    icon: Ruler,
  },
  {
    name: "Building Renovation",
    description:
      "Expert renovation services to modernize and enhance existing structures.",
    icon: Building,
  },
  {
    name: "Consultation Services",
    description:
      "Professional consultation services for construction and architectural projects.",
    icon: Users,
  },
  {
    name: "Modelling, Renders & Animated Presentations",
    description:
      "Professional modelling, renders, and animated presentations for construction and architectural projects.",
    icon: Presentation,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Services() {
  return (
    <section id="services" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Construction & Design Solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We offer a wide range of architectural and construction services to
            meet all your building needs. From concept to completion, we're here
            to help.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <motion.div
                key={service.name}
                variants={item}
                className="group relative flex flex-col rounded-2xl border border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <service.icon className="h-5 w-5 flex-none text-blue-600" />
                  {service.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{service.description}</p>
                  <p className="mt-6">
                    <Button
                      variant="ghost"
                      className="text-sm font-semibold leading-6 text-blue-600"
                      onClick={() => {
                        const contactSection =
                          document.getElementById("contact");
                        contactSection?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Button>
                  </p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
