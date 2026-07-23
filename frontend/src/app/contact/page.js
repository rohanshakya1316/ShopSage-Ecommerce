"use client";

import { useState } from "react";

const ContactPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-background text-body">
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
                aria-label="Open menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <a href="/" className="text-2xl font-[Fraunces] font-bold tracking-tight text-heading">
                Shopsage
              </a>
            </div>

            <a
              href="/"
              className="hidden items-center gap-2 rounded-2xl border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5 sm:inline-flex"
            >
              ← Back to Shop
            </a>
          </div>

          {menuOpen && (
            <div className="pb-4 lg:hidden">
              <nav className="flex flex-col gap-2 text-sm font-medium text-body">
                <a href="/" className="rounded-xl px-2 py-2 hover:bg-primary/5">
                  Shop
                </a>
                <a href="/contact" className="rounded-xl bg-primary/5 px-2 py-2 font-semibold text-heading">
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 lg:px-8">
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
            Questions about an order, returns, or just want to say hi? Send us a message and our team will respond within 1–2 business days.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          <section className="fade-up lg:col-span-3">
            <div className="rounded-3xl border border-primary/10 bg-card p-6 shadow-sm sm:p-8">
              <h2 className="font-[Fraunces] text-2xl font-bold text-heading">Send us a message</h2>
              <p className="mt-1 text-sm text-muted">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-heading">
                      Full name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-heading">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="mb-1.5 block text-sm font-semibold text-heading">
                      Contact number
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-heading">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full rounded-2xl border border-slate-200 bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option>Order inquiry</option>
                    <option>Returns & exchanges</option>
                    <option>Product question</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-heading">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-primary px-8 py-3.5 font-semibold text-white transition hover:bg-primary-hover sm:w-auto"
                >
                  Send message
                </button>

                {submitted && (
                  <p className="rounded-2xl bg-success/10 px-4 py-3 text-sm font-medium text-success">
                    Thanks! Your message has been received — we&apos;ll be in touch soon.
                  </p>
                )}
              </form>
            </div>
          </section>

          <aside className="fade-up space-y-5 lg:col-span-2" style={{ animationDelay: "80ms" }}>
            <div className="rounded-3xl border border-primary/10 bg-card p-6 shadow-sm sm:p-8">
              <h3 className="font-[Fraunces] text-xl font-bold text-heading">Visit our store</h3>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-heading">Address</p>
                    <p className="mt-0.5 text-body">New Baneshwor, Kathmandu 44600, Nepal</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-heading">Phone</p>
                    <p className="mt-0.5 text-body">+977 1-4567890</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-heading">Email</p>
                    <p className="mt-0.5 text-body">support@shopsage.com</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-heading">Hours</p>
                    <p className="mt-0.5 text-body">Sun – Fri, 10:00 AM – 7:00 PM (NPT)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-dark-secondary p-6 text-white shadow-sm sm:p-8">
              <h3 className="font-[Fraunces] text-xl font-bold">Need quick help?</h3>
              <p className="mt-2 text-sm text-slate-300">
                Check our FAQ or returns policy for instant answers to common questions.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="/" className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20">
                  Shipping info
                </a>
                <a href="/" className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20">
                  Returns policy
                </a>
                <a href="/" className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20">
                  FAQ
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-dark-secondary text-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-[Fraunces] text-xl font-bold text-white">Shopsage</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Modern ecommerce experiences with clean design, fast browsing, and responsive layouts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Quick Links</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="/" className="hover:text-white">Shop</a></li>
                <li><a href="/products" className="hover:text-white">Products</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Support</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="/" className="hover:text-white">Shipping</a></li>
                <li><a href="/" className="hover:text-white">Returns</a></li>
                <li><a href="/" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h4 className="mb-4 font-semibold text-white">Find us — New Baneshwor, Kathmandu</h4>
            <div className="overflow-hidden rounded-3xl border border-primary/20 shadow-xl">
              <iframe
                title="Map showing New Baneshwor, Kathmandu"
                src="https://www.google.com/maps?q=New+Baneshwor,+Kathmandu,+Nepal&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row">
            <p>© 2026 Shopsage. All rights reserved.</p>
            <p>New Baneshwor, Kathmandu, Nepal</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
