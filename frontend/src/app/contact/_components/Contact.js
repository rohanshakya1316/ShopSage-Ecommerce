"use client";

import Footer from "@/components/Footer";
import { ABOUT_ROUTE, HOME_ROUTE } from "@/constants/routes";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const submitForm = (data) => {
    console.log(data);
    reset();
    toast.success("Message send successfully!");
  };

  return (
    <section className="min-h-screen bg-background text-body">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-indigo-900 to-slate-900 px-6 py-10 text-white sm:px-12 sm:py-14">
          <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-indigo-500/25 blur-2xl" />
          <div className="absolute bottom-0 right-20 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <span className="relative z-10 inline-flex rounded-full bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-300">
            We&apos;d love to hear from you
          </span>
          <h1 className="relative z-10 mt-4 max-w-xl font-[Fraunces] text-3xl font-bold text-white sm:text-5xl">
            Get in touch with Shopsage
          </h1>
          <p className="relative z-10 mt-3 max-w-md text-slate-300">
            Questions about an order, returns, or just want to say hi? Send us a
            message and our team will respond within 1–2 business days.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8 rounded-3xl border border-primary/10 bg-card p-4 shadow-sm sm:p-6">
          <h4 className="mb-4 text-lg font-semibold text-heading">
            Find us — New Baneshwor, Kathmandu
          </h4>
          <div className="overflow-hidden rounded-2xl border border-primary/20 shadow-sm">
            <iframe
              title="Map showing New Baneshwor, Kathmandu"
              src="https://www.google.com/maps?q=New+Baneshwor,+Kathmandu,+Nepal&output=embed"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <section className="fade-up lg:col-span-3">
            <div className="rounded-3xl border border-primary/10 bg-card p-6 shadow-sm sm:p-8">
              <h2 className="font-[Fraunces] text-2xl font-bold text-heading">
                Send us a message
              </h2>
              <p className="mt-1 text-sm text-muted">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>

              <form
                onSubmit={handleSubmit(submitForm)}
                className="mt-6 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-semibold text-heading"
                    >
                      Full name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      {...register("name")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-semibold text-heading"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      {...register("email")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact"
                      className="mb-1.5 block text-sm font-semibold text-heading"
                    >
                      Contact number
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      {...register("contact")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-sm font-semibold text-heading"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full rounded-2xl border border-slate-200 bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...register("subject")}
                  >
                    <option>Order inquiry</option>
                    <option>Returns & exchanges</option>
                    <option>Product question</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-semibold text-heading"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    required
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...register("message")}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-primary px-8 py-3.5 font-semibold text-white transition hover:bg-primary-hover sm:w-auto"
                >
                  Send message
                </button>
              </form>
            </div>
          </section>

          <aside
            className="fade-up space-y-5 lg:col-span-2"
            style={{ animationDelay: "80ms" }}
          >
            <div className="rounded-3xl border border-primary/10 bg-card p-6 shadow-sm sm:p-8">
              <h3 className="font-[Fraunces] text-xl font-bold text-heading">
                Visit our store
              </h3>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                    <MapPin />
                  </div>
                  <div>
                    <p className="font-semibold text-heading">Address</p>
                    <p className="mt-0.5 text-body">
                      New Baneshwor, Kathmandu 44600, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                    <Phone />
                  </div>
                  <div>
                    <p className="font-semibold text-heading">Phone</p>
                    <p className="mt-0.5 text-body">+977 1-4567890</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                    <Mail />
                  </div>
                  <div>
                    <p className="font-semibold text-heading">Email</p>
                    <p className="mt-0.5 text-body">support@shopsage.com</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                    <Clock />
                  </div>
                  <div>
                    <p className="font-semibold text-heading">Hours</p>
                    <p className="mt-0.5 text-body">
                      Sun – Fri, 10:00 AM – 7:00 PM (NPT)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-dark-secondary p-6 text-white shadow-sm sm:p-8">
              <h3 className="font-[Fraunces] text-xl font-bold">
                Need quick help?
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Check our values or returns policy for instant answers to common
                questions.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={HOME_ROUTE}
                  className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
                >
                  Shipping info
                </Link>
                <Link
                  href={ABOUT_ROUTE}
                  className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
                >
                  Returns policy
                </Link>
                <Link
                  href={ABOUT_ROUTE}
                  className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
                >
                  Our Values
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default Contact;
