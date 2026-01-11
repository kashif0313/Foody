import { useEffect, useState } from "react";
import SimpleButton from "../../components/SimpleButton";
import type { AdminMealData, TableColumn } from "../../helpers/Interface";

import AddNewDish from "./AddNewDish";
import DataTable from "../../components/DataTable";

export default function DishesSection() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDish, setEditingDish] = useState<AdminMealData | null>(null);

  // Lazy initialize meals from localStorage
  const [meals, setMeals] = useState<AdminMealData[]>(() => {
    const storedMeals = localStorage.getItem("menuItems");
    return storedMeals ? JSON.parse(storedMeals) : [];
  });

  // Update localStorage whenever meals change
  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(meals));
  }, [meals]);

  const handleDeleteDish = (dish: AdminMealData) => {
    setMeals((prev) => prev.filter((m) => m.id !== dish.id));
  };

  const handleEditDish = (dish: AdminMealData) => {
    setEditingDish(dish);
    setShowAddModal(true);
  };

  const columns: TableColumn<AdminMealData>[] = [
    {
      key: "image",
      header: "Image",
      render: (dish) => (
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative">
          <img
            src={dish.images?.[0]}
            alt={dish.title}
            className="w-full h-full object-cover object-top"
          />
          {dish.images && dish.images.length > 1 && (
            <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
              +{dish.images.length - 1}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "title",
      header: "Dish Name",
      render: (dish) => (
        <span className="text-sm font-medium text-gray-900">{dish.title}</span>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (dish) => (
        <span className="text-sm text-gray-600">{dish.category}</span>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (dish) => (
        <span className="text-sm font-semibold text-gray-900">
          ${dish.price}
        </span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (dish) => (
        <span className="text-sm text-gray-600">{dish.stock}</span>
      ),
    },
    {
      key: "sales",
      header: "Sales",
      render: (dish) => (
        <span className="text-sm text-gray-600">{dish.sales}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (dish) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            dish.status
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {dish.status ? "Active" : "Disabled"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (dish) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditDish(dish)}
            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <i className="ri-edit-line"></i>
          </button>
          <button
            onClick={() => handleDeleteDish(dish)}
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
          <h2 className="text-xl font-bold text-gray-900">All Dishes</h2>

          <div>
            <SimpleButton
              onClick={() => {
                setShowAddModal(true);
                setEditingDish(null);
              }}
              className="w-auto"
              type="button"
              label="Add New Dish"
              icon={<i className="ri-add-line"></i>}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            data={meals}
            columns={columns}
            rowKey={(dish) => dish.id || 0}
          />
        </div>
      </div>
      {showAddModal && (
        <AddNewDish
          onClose={() => setShowAddModal(false)}
          setMeals={setMeals}
          editDish={editingDish}
        />
      )}
    </>
  );
}
