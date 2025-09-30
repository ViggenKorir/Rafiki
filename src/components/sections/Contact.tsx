"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!name.trim()) {
      setError("Name is required");
      setLoading(false);
      return;
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      setLoading(false);
      return;
    }

    if (!email) {
      setError("Email address is required");
      setLoading(false);
      return;
    }

    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      )
    ) {
      setError("Invalid email address");
      setLoading(false);
      return;
    }

    if (!phone.trim()) {
      setError("Phone number is required");
      setLoading(false);
      return;
    }

    if (phone.trim().length < 10) {
      setError("Phone number must be at least 10 digits");
      setLoading(false);
      return;
    }

    if (!projectType) {
      setError("Please select a project type");
      setLoading(false);
      return;
    }

    if (!message.trim()) {
      setError("Message is required");
      setLoading(false);
      return;
    }

    if (message.trim().length < 5) {
      setError("Message must be at least 5 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          project_type: projectType,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setProjectType("");
      } else {
        console.error("❌ Submission failed:", {
          status: res.status,
          data,
        });
        // Handle validation errors from API
        if (data?.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors
            .map((err: any) => err.message)
            .join(", ");
          setError(errorMessages);
        } else {
          setError(data?.message || "Something went wrong. Please try again.");
        }
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
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

        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="flex flex-col gap-8 justify-center">
            <div className="flex items-center gap-x-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">rafikiconsult@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-x-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Phone</h3>
                <p className="mt-1 text-gray-600">+254 769 396 442</p>
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
                  Rehema House, 4th Floor, Kimathi street
                  <br />
                  Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col bg-white h-auto w-full rounded-3xl shadow-lg">
            <main className="flex flex-1 flex-col items-center justify-center px-4">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white shadow-lg rounded-3xl p-10 flex flex-col items-center"
              >
                <h2 className="text-4xl font-extrabold mb-4 text-center">
                  Send us a message
                </h2>
                <p className="text-base text-gray-600 mb-6 text-center">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>

                {error && (
                  <p className="text-red-500 mb-2 text-center">{error}</p>
                )}
                {success && (
                  <p className="text-green-500 mb-2 text-center">
                    Thank you for your message. We'll get back to you soon!
                  </p>
                )}

                <div className="bg-gray-100 rounded-3xl py-2 px-1.5 mb-3.5 text-center w-full">
                  {/* Name field */}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full bg-white text-gray-800 rounded-tl-2xl rounded-tr-2xl outline-none px-4 py-2 focus:ring-2 focus:ring-blue-600 text-center transition-all mb-1.5"
                    aria-label="Full name"
                  />

                  {/* Email field */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address *"
                    className="w-full bg-white text-gray-800 outline-none px-4 py-2 focus:ring-2 focus:ring-blue-600 text-center transition-all mb-1.5"
                    aria-label="Email address"
                  />

                  {/* Phone field */}
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="w-full bg-white text-gray-800 outline-none px-4 py-2 focus:ring-2 focus:ring-blue-600 text-center transition-all mb-1.5"
                    aria-label="Phone number"
                  />

                  {/* Project Type field */}
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-white text-gray-800 outline-none px-4 py-2 focus:ring-2 focus:ring-blue-600 text-center transition-all mb-1.5"
                    aria-label="Project type"
                  >
                    <option value="">Select Project Type *</option>
                    <option value="residential">Residential Design</option>
                    <option value="commercial">Commercial Design</option>
                    <option value="renovation">Building Renovation</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>

                  {/* Message field */}
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your Message *"
                    rows={4}
                    className="w-full bg-white text-gray-800 rounded-bl-2xl rounded-br-2xl outline-none px-4 py-2 focus:ring-2 focus:ring-blue-600 text-center transition-all resize-none"
                    aria-label="Message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-5 py-2 font-extrabold rounded-full shadow-md transition-all ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {/* Loading Bar */}
                {loading && (
                  <div className="w-full mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 animate-[loadingBar_1.5s_ease-in-out_infinite]" />
                  </div>
                )}
              </form>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};
