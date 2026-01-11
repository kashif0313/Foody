import MealSimpleCard from "../components/MealSimpleCard";
import type { RelatedCategoryItemProps } from "../helpers/Interface";

export default function RelatedCategoryItem({
  dishes,
}: RelatedCategoryItemProps) {
  return (
    <>
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-0">
          {dishes.map((meal) => (
            <MealSimpleCard
              key={meal.id}
              id={meal.id}
              title={meal.title}
              price={meal.price}
              rating={meal.rating}
              image={meal.images?.[0]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
