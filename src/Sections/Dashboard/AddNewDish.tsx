import { useRef, useState } from "react";
import SimpleButton from "../../components/SimpleButton";
import type {
  AddNewDishProps,
  AdminMealData,
  Category,
} from "../../helpers/Interface";
import InputField from "../../components/InputField";
import IngredientsSelector from "../../components/IngredientsSelector";
import { getThemeColor } from "../../helpers/common";

const color = getThemeColor();

export default function AddNewDish({
  onClose,
  setMeals,
  editDish = null,
}: AddNewDishProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [categories] = useState<Category[]>(() => {
    const stored = localStorage.getItem("categories");
    return stored ? JSON.parse(stored) : [];
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImageIndex, setPreviewImageIndex] = useState<number | null>(
    null
  );
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    editDish?.images ?? []
  );

  const [newDish, setNewDish] = useState<AdminMealData>(
    editDish ?? {
      id: 0,
      title: "",
      category: "Salads",
      price: 0,
      rating: 0,
      stock: 0,
      description: "",
      status: true,
      images: [],
    }
  );

  const isEdit = Boolean(editDish);
  const handleSubmitNewDish = (e: React.FormEvent) => {
    e.preventDefault();

    setMeals((prev) => {
      if (isEdit) {
        // Edit existing dish
        return prev.map((dish) =>
          dish.id === editDish!.id ? { ...newDish, id: dish.id } : dish
        );
      } else {
        // Add new dish with auto-increment ID
        const existingIds = prev.map((d) => d.id ?? 0); // fallback to 0 if undefined
        const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 1;

        return [
          ...prev,
          {
            ...newDish,
            id: nextId,
          },
        ];
      }
    });

    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (imageFiles.length + files.length > 5) return;

    const previews = files.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);

    // ✅ store ONLY preview URLs in AdminMealData
    setNewDish(
      (prev): AdminMealData => ({
        ...prev,
        images: [...(prev.images || []), ...previews],
      })
    );
  };

  const handleRemoveImage = (index: number) => {
    const files = imageFiles.filter((_, i) => i !== index);
    const previews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(files);
    setImagePreviews(previews);

    setNewDish(
      (prev): AdminMealData => ({
        ...prev,
        images: previews, // ✅ string[]
      })
    );

    if (mainImageIndex >= previews.length) {
      setMainImageIndex(Math.max(0, previews.length - 1));
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-4xl w-full p-6 my-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {isEdit ? "Edit Dish" : "Add New Dish"}
          </h3>
          <form className="space-y-4" onSubmit={handleSubmitNewDish}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <InputField
                  label="Dish Name"
                  required
                  value={newDish.title}
                  placeholder="Pizza"
                  onChange={(value) => setNewDish({ ...newDish, title: value })}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={newDish.description}
                  onChange={(e) =>
                    setNewDish({ ...newDish, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newDish.category}
                  onChange={(e) =>
                    setNewDish({ ...newDish, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name.toLowerCase()}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={newDish.status ? "active" : "inactive"}
                  onChange={(e) =>
                    setNewDish({
                      ...newDish,
                      status: e.target.value === "active",
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <InputField
                  label="Calories"
                  type="number"
                  required
                  value={newDish.calories?.toString() || "0"}
                  onChange={(e) => {
                    const value = parseInt(e);
                    setNewDish({
                      ...newDish,
                      calories: isNaN(value) ? 0 : value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <InputField
                  label="Price"
                  type="number"
                  required
                  value={newDish.price.toString()}
                  placeholder="Pizza"
                  onChange={(e) => {
                    const value = parseFloat(e);
                    setNewDish({ ...newDish, price: isNaN(value) ? 0 : value });
                  }}
                />
              </div>
              <div>
                <InputField
                  label="Stock"
                  type="number"
                  required
                  value={newDish.stock?.toString() ?? "0"}
                  onChange={(e) => {
                    const value = parseFloat(e);
                    setNewDish({ ...newDish, stock: isNaN(value) ? 0 : value });
                  }}
                />
              </div>
              <div>
                <InputField
                  label="Min Prep Time (min)"
                  type="number"
                  required
                  value={newDish.prepTime?.split("-")[0] || "0"}
                  onChange={(e) => {
                    const min = parseInt(e);
                    const max = parseInt(
                      newDish.prepTime?.split("-")[1] || "0"
                    );
                    setNewDish({
                      ...newDish,
                      prepTime: `${isNaN(min) ? 0 : min}-${
                        isNaN(max) ? 0 : max
                      }`,
                    });
                  }}
                />
              </div>
              <div>
                <InputField
                  label="Max Prep Time (min)"
                  type="number"
                  required
                  value={newDish.prepTime?.split("-")[1] || "0"}
                  onChange={(e) => {
                    const max = parseInt(e);
                    const min = parseInt(
                      newDish.prepTime?.split("-")[0] || "0"
                    );
                    setNewDish({
                      ...newDish,
                      prepTime: `${isNaN(min) ? 0 : min}-${
                        isNaN(max) ? 0 : max
                      }`,
                    });
                  }}
                />
              </div>
            </div>
            <div>
              <IngredientsSelector
                ingredients={newDish.ingredients || []}
                setIngredients={(ings) =>
                  setNewDish({ ...newDish, ingredients: ings })
                }
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Images (Max 5)
                </label>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Custom button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imageFiles.length >= 5}
                  className={`text-sm text-${color}-500 hover:text-${color}-600 cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed`}
                >
                  + Add Image
                </button>
              </div>

              {/* Preview Grid */}
              <div className="grid grid-cols-5 gap-3 mb-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`h-24 rounded-lg overflow-hidden border-2 cursor-pointer ${
                        mainImageIndex === index
                          ? "border-orange-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={src}
                        className="w-full h-full object-cover"
                        alt="preview"
                        onClick={() => setPreviewImageIndex(index)} // ✅ open modal
                      />
                    </div>

                    {/* Main Image Selector */}
                    <button
                      type="button"
                      onClick={() => setMainImageIndex(index)}
                      className={`absolute -top-2 -left-2 w-6 h-6 rounded-full text-xs font-bold ${
                        mainImageIndex === index
                          ? "bg-orange-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {mainImageIndex === index ? (
                        <i className="ri-star-fill"></i>
                      ) : (
                        index + 1
                      )}
                    </button>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500">
                Click ⭐ to select main image
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <SimpleButton
                type="button"
                label="Cancel"
                className="flex-1"
                variant="secondary"
                onClick={() => {
                  onClose();

                  setMainImageIndex(0);
                }}
              />

              <SimpleButton
                type="submit"
                label={isEdit ? "Save" : "Add Dish"}
                className="flex-1"
              />
            </div>
          </form>
        </div>
      </div>
      {previewImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreviewImageIndex(null)} // close on overlay click
        >
          <img
            src={imagePreviews[previewImageIndex]}
            alt="Full Preview"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
}
