import { useState } from "react";

import type { AddNewCategoryProps, Category } from "../../helpers/Interface";
import SimpleButton from "../../components/SimpleButton";
import InputField from "../../components/InputField";

export default function AddNewCategory({
  onClose,
  setCategory,
  editCategory = null,
}: AddNewCategoryProps) {
  //   const [categories] = useState<Category[]>(() => {
  //     const stored = localStorage.getItem("categories");
  //     return stored ? JSON.parse(stored) : [];
  //   });

  const [newCategory, setNewCategory] = useState<Category>(
    editCategory ?? {
      id: 0,
      identifier: "",
      name: "",
      icon: "",
    }
  );

  const isEdit = Boolean(editCategory);
  const handleSubmitNewCategory = (e: React.FormEvent) => {
    e.preventDefault();

    setCategory((prev) => {
      if (isEdit) {
        // Edit existing dish
        return prev.map((category) =>
          category.id === editCategory!.id
            ? { ...newCategory, id: category.id }
            : category
        );
      } else {
        // Add new dish with auto-increment ID
        const existingIds = prev.map((d) => d.id ?? 0); // fallback to 0 if undefined
        const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 1;

        return [
          ...prev,
          {
            ...newCategory,
            id: nextId,
          },
        ];
      }
    });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {isEdit ? "Edit Category" : "Add New Category"}
          </h3>
          <form className="space-y-4" onSubmit={handleSubmitNewCategory}>
            <div>
              <InputField
                label=" Category Name"
                required
                value={newCategory.name}
                placeholder="Pizza"
                onChange={(value) =>
                  setNewCategory({ ...newCategory, name: value })
                }
              />
            </div>
            <div>
              <InputField
                label=" Category identifier"
                required
                value={newCategory.identifier}
                placeholder="Pizza"
                onChange={(value) =>
                  setNewCategory({ ...newCategory, identifier: value })
                }
              />
            </div>
            <div>
              <InputField
                label=" Category icon"
                required
                value={newCategory.icon}
                placeholder="Pizza"
                onChange={(value) =>
                  setNewCategory({ ...newCategory, icon: value })
                }
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <SimpleButton
                type="button"
                label="Cancel"
                className="flex-1"
                variant="secondary"
                onClick={() => {
                  onClose();
                }}
              />

              <SimpleButton
                type="submit"
                label={isEdit ? "Save" : "Add Category"}
                className="flex-1"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
