'use client';

import { useState } from 'react';

const contactDetails = [
  {
    title: 'Address',
    value: 'New Baneshwor, Kathmandu 44600, Nepal',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" />
        <circle cx="12" cy="11" r="2.8" />
      </svg>
    ),
  },
  {
    title: 'Phone',
    value: '+977 1-4567890',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 6a2 2 0 0 1 2-2h2.2a1 1 0 0 1 .95.68l1.13 3.4a1 1 0 0 1-.5 1.2l-1.67 1a11 11 0 0 0 5.08 5.08l1-1.67a1 1 0 0 1 1.2-.5l3.4 1.13A1 1 0 0 1 19 14.8V17a2 2 0 0 1-2 2h-1A13 13 0 0 1 3 6V5Z" />
      </svg>
    ),
  },
  {
    title: 'Email',
    value: 'support@shopsage.com',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 5 8-5" />
        <rect x="4" y="5" width="16" height="14" rx="2" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.target.reset();
  };

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-slate-800">
      <header className="sticky top-0 z-50 border-b border-sage-200/70 bg-[#f7f5f0]/90 backdrop-blur">
        <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="rounded-xl p-2 hover:bg-sage-100 lg:hidden"
                aria-label="Open menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <a href="/" className="text-2xl font-display font-bold tracking-tight text-sage-800">
                Shopsage
              </a>
            </div>

            <a href="/" className="hidden items-center gap-2 rounded-2xl border border-sage-700 px-4 py-2 text-sm font-semibold text-sage-700 transition hover:bg-sage-50 sm:inline-flex">
              ← Back to Shop
            </a>
          </div>

          {menuOpen ? (
            <div className="pb-4 lg:hidden">
              <nav className="flex flex-col gap-2 text-sm font-medium text-slate-600">
                <a href="/" className="rounded-xl px-2 py-2 hover:bg-sage-100">Shop</a>
                <a href="/contact" className="rounded-xl bg-sage-100 px-2 py-2 font-semibold text-sage-800">Contact</a>
              </nav>
            </div>
          ) : null}
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-sage-800 px-6 py-10 text-white sm:px-12 sm:py-14">
          <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-sage-700/50 blur-2xl" />
          <div className="absolute bottom-0 right-20 h-40 w-40 rounded-full bg-clay-500/30 blur-2xl" />
          <p className="relative z-10 text-sm font-medium uppercase tracking-[0.2em] text-sage-200">We'd love to hear from you</p>
          <h1 className="relative z-10 mt-2 max-w-xl font-display text-3xl font-bold sm:text-5xl">Get in touch with Shopsage</h1>
          <p className="relative z-10 mt-3 max-w-md text-sage-100">
            Questions about an order, returns, or just want to say hi? Send us a message and our team will respond within 1–2 business days.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          <section className="lg:col-span-3">
            <div className="rounded-[1.5rem] border border-sage-100 bg-white p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-2xl font-bold text-slate-900">Send us a message</h2>
              <p className="mt-1 text-sm text-slate-500">Fill out the form below and we&apos;ll get back to you shortly.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-900">Full name</label>
                    <input id="name" name="name" required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-300" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-900">Email address</label>
                    <input id="email" name="email" type="email" required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-300" />
                  </div>
                  <div>
                    <label htmlFor="contact" className="mb-1.5 block text-sm font-semibold text-slate-900">Contact number</label>
                    <input id="contact" name="contact" type="tel" required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-300" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-slate-900">Subject</label>
                    <select id="subject" name="subject" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-300">
                      <option>Order inquiry</option>
                      <option>Returns &amp; exchanges</option>
                      <option>Product question</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-slate-900">Message</label>
                  <textarea id="message" name="message" rows="5" required placeholder="Tell us how we can help..." className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-300" />
                </div>

                <button type="submit" className="w-full rounded-2xl bg-sage-700 px-8 py-3.5 font-semibold text-white transition hover:bg-sage-800 sm:w-auto">
                  Send message
                </button>

                {submitted ? (
                  <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    Thanks! Your message has been received — we&apos;ll be in touch soon.
                  </p>
                ) : null}
              </form>
            </div>
          </section>

          <aside className="space-y-5 lg:col-span-2">
            <div className="rounded-[1.5rem] border border-sage-100 bg-white p-6 shadow-soft sm:p-8">
              <h3 className="font-display text-xl font-bold text-slate-900">Visit our store</h3>
              <div className="mt-5 space-y-4 text-sm">
                {contactDetails.map((item) => (
                  <div className="flex gap-3" key={item.title}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-50 text-sage-700">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-0.5 text-slate-500">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-sage-800 p-6 text-white shadow-soft sm:p-8">
              <h3 className="font-display text-xl font-bold">Need quick help?</h3>
              <p className="mt-2 text-sm text-sage-100">Check our FAQ or returns policy for instant answers to common questions.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="#" className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20">Shipping info</a>
                <a href="#" className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20">Returns policy</a>
                <a href="#" className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20">FAQ</a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-sage-900 text-sage-200">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl font-bold text-white">Shopsage</h3>
              <p className="mt-3 text-sm leading-7 text-sage-300">Modern ecommerce experiences with clean design, fast browsing, and responsive layouts.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Quick Links</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="/" className="hover:text-white">Shop</a></li>
                <li><a href="/" className="hover:text-white">Products</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Support</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Shipping</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h4 className="mb-4 font-semibold text-white">Find us — New Baneshwor, Kathmandu</h4>
            <div className="overflow-hidden rounded-[1.5rem] border border-sage-700 shadow-lift">
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

          <div className="mt-8 flex flex-col justify-between gap-2 border-t border-sage-800 pt-6 text-xs text-sage-400 sm:flex-row">
            <p>© 2026 Shopsage. All rights reserved.</p>
            <p>New Baneshwor, Kathmandu, Nepal</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
