import { useState } from "react";
import { allIngredients } from "../helpers/MockData";
import SimpleButton from "./SimpleButton";

export default function IngredientsSelector({
  ingredients,
  setIngredients,
}: {
  ingredients: string[];
  setIngredients: (ings: string[]) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<string[]>(ingredients);
  const [search, setSearch] = useState("");
  const toggleIngredient = (ing: string) => {
    if (selected.includes(ing)) {
      setSelected(selected.filter((i) => i !== ing));
    } else {
      setSelected([...selected, ing]);
    }
  };

  const handleSave = () => {
    setIngredients(selected);
    setShowModal(false);
  };
  const filteredIngredients = allIngredients.filter((ing) =>
    ing.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ingredients
      </label>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          readOnly
          value={ingredients.join(", ")}
          placeholder="Select ingredients..."
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 cursor-not-allowed"
        />

        <div>
          <SimpleButton
            onClick={() => setShowModal(true)}
            className="w-auto"
            type="button"
            label="Select"
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full">
            <h3 className="text-lg font-semibold mb-3">Select Ingredients</h3>

            {/* 🔍 Search */}
            <input
              type="text"
              placeholder="Search ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Ingredient list */}
            <div className="max-h-64 overflow-y-auto mb-4">
              {filteredIngredients.length > 0 ? (
                filteredIngredients.map((ing) => (
                  <div key={ing} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(ing)}
                      onChange={() => toggleIngredient(ing)}
                      className="mr-2"
                    />
                    <span className="text-sm">{ing}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center">
                  No ingredients found
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2">
              <SimpleButton
                onClick={() => setShowModal(false)}
                className="flex-1 w-auto"
                type="button"
                label="Cancel"
                variant="secondary"
              />
              <SimpleButton
                onClick={handleSave}
                className="flex-1 w-auto"
                type="button"
                label="Save"
                icon={<i className="ri-add-line"></i>}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
