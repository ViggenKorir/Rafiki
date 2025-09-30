"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

// Sample news data - replace with actual data from your backend
const newsItems = [
  {
    id: 1,
    title: "Rafiki Partners Wins Sustainable Design Award",
    excerpt:
      "Our eco-friendly office complex project recognized for innovative sustainable design practices.",
    date: "2024-01-15",
    author: "John Doe",
    category: "Awards",
    imageUrl:
      "https://res.cloudinary.com/dgu9ietkl/image/upload/v1759230597/PlastikiRafikiCSR_1_ksa1ca.jpg",
    slug: "sustainable-design-award",
  },
  {
    id: 2,
    title: "New Residential Project Launch in Karen",
    excerpt:
      "Announcing our latest luxury residential development project in Karen, Nairobi.",
    date: "2024-01-10",
    author: "Jane Smith",
    category: "Projects",
    imageUrl:
      "https://res.cloudinary.com/dgu9ietkl/image/upload/v1759228790/architect-s-design-space-stockcake_t85kqi.jpg",
    slug: "karen-project-launch",
  },
  {
    id: 3,
    title: "Construction Industry Trends 2024",
    excerpt:
      "Our insights on the latest construction and architectural trends shaping the industry.",
    date: "2024-01-05",
    author: "Michael Johnson",
    category: "Industry",
    imageUrl:
      "https://res.cloudinary.com/dgu9ietkl/image/upload/v1759230603/Construction-Technology-Trends-1_bm8ytn.webp",
    slug: "construction-trends-2024",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function News() {
  return (
    <section id="news" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-yellow-500">
            Latest News
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Updates & Insights
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Stay informed about our latest projects, industry insights, and
            company news.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {newsItems.map((item) => (
            <motion.article
              key={item.id}
              variants={fadeInUp}
              className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-blue-600/90 px-2.5 py-1 text-xs font-medium text-white">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={item.date} className="text-gray-500">
                      {formatDate(item.date)}
                    </time>
                    <span className="text-gray-500">{item.author}</span>
                  </div>
                  <div className="mt-4 group-hover:text-blue-600">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900 group-hover:text-blue-600">
                      <Link href={`/news/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={`/news/${item.slug}`}>
                    <Button variant="ghost" className="text-sm">
                      Read more <span aria-hidden="true">→</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-16 flex justify-center">
          <Link href="/news">
            <Button size="lg">View All News</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default News;
