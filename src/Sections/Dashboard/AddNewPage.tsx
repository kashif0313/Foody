import { useState } from "react";
import SimpleButton from "../../components/SimpleButton";
import type { AddNewPageProps, PublicPage } from "../../helpers/Interface";
import InputField from "../../components/InputField";

export default function AddNewPage({
  onClose,
  setPage,
  editPage = null,
}: AddNewPageProps) {
  //   const [newPage] = useState<PublicPage | null>(null);
  const handleSubmitNewPage = (e: React.FormEvent) => {
    e.preventDefault();

    setPage((prev) => {
      if (isEdit) {
        // Edit existing dish
        return prev.map((dish) =>
          dish.id === editPage!.id ? { ...newPage, id: dish.id } : dish
        );
      } else {
        // Add new dish with auto-increment ID
        const existingIds = prev.map((d) => d.id ?? 0); // fallback to 0 if undefined
        const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 1;

        return [
          ...prev,
          {
            ...newPage,
            id: nextId,
          },
        ];
      }
    });

    onClose();
  };
  const isEdit = Boolean(editPage);

  const [newPage, setNewPage] = useState<PublicPage>(
    editPage ?? {
      id: 0,
      title: "",
      slug: "",
      content: "",
      status: "Draft",
      lastModified: "",
    }
  );

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-4xl w-full p-6 my-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Add New Page
          </h3>
          <form className="space-y-4" onSubmit={handleSubmitNewPage}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputField
                  label="Page Title"
                  required
                  value={newPage.title}
                  placeholder="About Us"
                  onChange={(value) => setNewPage({ ...newPage, title: value })}
                />
              </div>
              <div>
                <InputField
                  label=" URL Slug"
                  required
                  value={newPage.slug}
                  placeholder="About Us"
                  onChange={(value) => setNewPage({ ...newPage, slug: value })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Will be accessible at: /{newPage.slug || "your-slug"}
                </p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Content
                </label>
                <textarea
                  required
                  value={newPage.content}
                  onChange={(e) =>
                    setNewPage({ ...newPage, content: e.target.value })
                  }
                  rows={12}
                  placeholder="Enter the page content here..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={newPage.status}
                  onChange={(e) =>
                    setNewPage({ ...newPage, status: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
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
                label={isEdit ? "Save" : "Add Page"}
                className="flex-1"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
