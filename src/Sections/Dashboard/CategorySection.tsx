import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import type { Category, TableColumn } from "../../helpers/Interface";
import AddNewCategory from "./AddNewCategory";
import SimpleButton from "../../components/SimpleButton";

export default function CategorySection() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [categories, setCategory] = useState<Category[]>(() => {
    const stored = localStorage.getItem("categories");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);
  const handleDeleteCategory = (dish: Category) => {
    setCategory((prev) => prev.filter((m) => m.id !== dish.id));
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowAddModal(true);
  };

  const columns: TableColumn<Category>[] = [
    {
      key: "id",
      header: "id",
      render: (category) => (
        <span className="text-sm text-gray-600">{category.id}</span>
      ),
    },
    {
      key: "icon",
      header: "icon",
      render: (category) => (
        <div className="flex items-center gap-2">
          <i className={`${category.icon} text-lg text-gray-700`} />
          {/* <span className="text-xs text-gray-500">{category.icon}</span> */}
        </div>
      ),
    },
    {
      key: "identifier",
      header: "identifier",
      render: (category) => (
        <span className="text-sm text-gray-600">{category.identifier}</span>
      ),
    },
    {
      key: "name",
      header: "name",
      render: (category) => (
        <span className="text-sm text-gray-600">{category.name}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (category) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditCategory(category)}
            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <i className="ri-edit-line"></i>
          </button>
          <button
            onClick={() => handleDeleteCategory(category)}
            className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg"
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">All Category</h2>

          <div>
            <SimpleButton
              onClick={() => {
                setShowAddModal(true);
                setEditingCategory(null);
              }}
              className="w-auto"
              type="button"
              label="Add New Category"
              icon={<i className="ri-add-line"></i>}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            data={categories}
            columns={columns}
            rowKey={(category) => category.id || 0}
          />
        </div>
      </div>
      {showAddModal && (
        <AddNewCategory
          onClose={() => setShowAddModal(false)}
          setCategory={setCategory}
          editCategory={editingCategory}
        />
      )}
    </>
  );
}
