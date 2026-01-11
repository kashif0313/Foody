import { useState } from "react";
import DataTable from "../../components/DataTable";
import SimpleButton from "../../components/SimpleButton";
import type { PublicPage, TableColumn } from "../../helpers/Interface";
import AddNewPage from "./AddNewPage";
import { Link } from "react-router-dom";

export default function PublicPagesSection() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPage, setEditingPage] = useState<PublicPage | null>(null);
  const [pages, setPages] = useState<PublicPage[]>(() => {
    const storedPages = localStorage.getItem("publicPages");
    return storedPages ? JSON.parse(storedPages) : [];
  });

  const handleDeletePage = (page: PublicPage) => {
    setPages((prev) => prev.filter((m) => m.id !== page.id));
  };

  const handleEditPage = (page: PublicPage) => {
    setEditingPage(page);
    setShowAddModal(true);
  };

  const columns: TableColumn<PublicPage>[] = [
    {
      key: "title",
      header: "Page Title",
      render: (page) => (
        <span className="text-sm font-medium text-gray-900">{page.title}</span>
      ),
    },
    {
      key: "slug",
      header: "Page Slug",
      render: (page) => (
        // <span className="text-sm font-medium text-gray-900">/{page.slug}</span>
        <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
          /{page.slug}
        </code>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (page) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            page.status === "published"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {page.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (page) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditPage(page)}
            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <i className="ri-edit-line"></i>
          </button>
          <button
            onClick={() => handleDeletePage(page)}
            className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg"
          >
            <i className="ri-delete-bin-line"></i>
          </button>
          <Link
            to={`/${page.slug}`}
            target="_blank"
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <i className="ri-external-link-line"></i>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">All Pages</h2>

          <div>
            <SimpleButton
              onClick={() => {
                setShowAddModal(true);
                setEditingPage(null);
              }}
              className="w-auto"
              type="button"
              label="Add New Page"
              icon={<i className="ri-add-line"></i>}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            data={pages}
            columns={columns}
            rowKey={(dish) => dish.id || 0}
          />
        </div>
      </div>
      {showAddModal && (
        <AddNewPage
          onClose={() => setShowAddModal(false)}
          setPage={setPages}
          editPage={editingPage}
        />
      )}
    </>
  );
}
