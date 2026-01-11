import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import type { Chefs, TableColumn } from "../../helpers/Interface";
import AddNewChef from "./AddNewChef";

export default function ChefSection() {
  const [showAddModal, setShowChefModal] = useState(false);
  const [chefInfo, setChefInfo] = useState<Chefs[]>(() => {
    const stored = localStorage.getItem("topChefs");
    return stored ? JSON.parse(stored) : [];
  });
  const [editingChef, setEditingChef] = useState<Chefs | null>(null);
  useEffect(() => {
    localStorage.setItem("topChefs", JSON.stringify(chefInfo));
  }, [chefInfo]);

  const handleDeleteChef = (chef: Chefs) => {
    setChefInfo((prev) => prev.filter((m) => m.id !== chef.id));
  };

  const handleEditChef = (chef: Chefs) => {
    setEditingChef(chef);
    setShowChefModal(true);
  };

  const columns: TableColumn<Chefs>[] = [
    {
      key: "id",
      header: "id",
      render: (chef) => (
        <span className="text-sm text-gray-600">{chef.id}</span>
      ),
    },
    {
      key: "image",
      header: "image",
      render: (chef) => (
        <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={chef.image}
            alt={chef.title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      ),
    },
    {
      key: "description",
      header: "description",
      render: (chef) => (
        <span className="text-sm text-gray-600">{chef.description}</span>
      ),
    },
    {
      key: "title",
      header: "title",
      render: (chef) => (
        <span className="text-sm text-gray-600">{chef.title}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (chef) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditChef(chef)}
            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <i className="ri-edit-line"></i>
          </button>
          <button
            onClick={() => handleDeleteChef(chef)}
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
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Chef Information</h2>
          {/* <button
                onClick={() => setShowChefModal(true)}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-edit-line"></i>
                <span>Edit Chef Info</span>
              </button> */}
        </div>
        <div className="space-y-6">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> */}
          {/* {chefInfo.features.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="w-full h-64 bg-gray-100">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x500/e5e7eb/9ca3af?text=Chef';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))} */}
          {/* </div> */}
          <DataTable
            data={chefInfo}
            columns={columns}
            rowKey={(dish) => dish.id || 0}
          />
        </div>
      </div>
      {showAddModal && (
        <AddNewChef
          onClose={() => setShowChefModal(false)}
          setChef={setChefInfo}
          editChef={editingChef}
        />
      )}
    </>
  );
}
