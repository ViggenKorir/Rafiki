"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  project_type: z.string().min(1, "Please select a project type"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-white py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-gray-50 sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Contact Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get in Touch
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Have a project in mind? We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center gap-x-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">info@rafikipartners.com</p>
              </div>
            </div>

            <div className="flex items-center gap-x-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Phone</h3>
                <p className="mt-1 text-gray-600">+254 (0) 700 000000</p>
              </div>
            </div>

            <div className="flex items-center gap-x-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Office
                </h3>
                <p className="mt-1 text-gray-600">
                  Kilimani Business Center
                  <br />
                  Nairobi, Kenya
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="project_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Type
                </label>
                <select
                  id="project_type"
                  {...register("project_type")}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select a project type</option>
                  <option value="residential">Residential Design</option>
                  <option value="commercial">Commercial Design</option>
                  <option value="renovation">Building Renovation</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>
                {errors.project_type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.project_type.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  rightIcon={
                    isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )
                  }
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>

              {submitSuccess && (
                <p className="text-center text-sm text-green-600">
                  Thank you for your message. We'll get back to you soon!
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
