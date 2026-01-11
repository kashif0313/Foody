import { useEffect } from "react";
import type { ChefCardProps } from "../helpers/Interface";

export default function ChefCard({ title, image, description }: ChefCardProps) {
  useEffect(() => {}, []);

  return (
    <>
      <div className="p-6 text-center transition-all">
        <div className="w-full h-80 bg-white rounded-2xl overflow-hidden mb-6">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </>
  );
}
