export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl rounded-[1.75rem] bg-gradient-to-br from-sage-900 via-sage-700 to-sage-500 p-8 text-white shadow-lift sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage-100">Shopsage</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Welcome to the new Next.js storefront</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-sage-100">
          This page was created inside the requested folder as a fresh Next.js route.
        </p>
      </section>
    </main>
  );
}
