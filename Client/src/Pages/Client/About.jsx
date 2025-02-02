import React from "react";

export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-black mb-6">
          About Pawstore
        </h1>

        {/* Who We Are */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-600">Who We Are</h2>
          <p className="text-gray-700 mt-2">
            At <b>Pawstore</b>, we believe every pet deserves a loving home. We
            are a dedicated platform connecting responsible pet lovers with
            high-quality, ethically sourced pets.
          </p>
        </section>

        {/* Our Story */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-600">Our Story</h2>
          <p className="text-gray-700 mt-2">
            Founded with a passion for pets, Pawstore began as a small community
            of pet enthusiasts who saw the need for a trusted online pet store.
            Over time, we expanded into a platform offering not just pets, but
            also accessories, expert advice, and a supportive community.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-600">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="font-bold text-lg">🐾 Quality Breeds</h3>
              <p className="text-gray-600">
                Carefully selected, healthy pets ready for adoption.
              </p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="font-bold text-lg">🦴 Premium Accessories</h3>
              <p className="text-gray-600">
                From comfy pet beds to nutritious food, we have it all.
              </p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="font-bold text-lg">📚 Expert Advice</h3>
              <p className="text-gray-600">
                Breed guides, pet care tips, and training insights.
              </p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="font-bold text-lg">💖 A Loving Community</h3>
              <p className="text-gray-600">
                Connect with other pet owners and share your journey.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-600">
            Why Choose Us?
          </h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>
              ✔️ Ethical Sourcing – We partner with responsible breeders and
              shelters.
            </li>
            <li>
              ✔️ Health Guarantee – All pets are vaccinated and checked by
              professionals.
            </li>
            <li>
              ✔️ Trusted by Pet Lovers – Thousands of happy customers and
              growing!
            </li>
            <li>
              ✔️ Hassle-Free Adoption – Simple process, quick support, and
              secure transactions.
            </li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-12">
          <h2 className="text-2xl font-bold text-orange-700">
            Join Our Paw Family! 🐶🐱
          </h2>
          <p className="text-gray-700 mt-2">
            Be a part of a community that loves pets just as much as you do!
          </p>
          <button className="mt-4 px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-500 transition">
            Explore Pets
          </button>
        </section>
      </div>
    </div>
  );
}
