import { useState } from "react";
import ChefCard from "../components/ChefCard";
import type { Chefs } from "../helpers/Interface";

export default function HomeChefsSection() {
  const [topChefs] = useState<Chefs[]>(() => {
    const stored = localStorage.getItem("topChefs");
    return stored ? JSON.parse(stored) : [];
  });
  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 font-semibold text-sm mb-2 uppercase tracking-wide">
              Why Choose Us
            </p>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why We Are The Best
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topChefs.map((chef) => (
              <ChefCard
                key={chef.id}
                title={chef.title}
                description={chef.description}
                image={chef.image}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
