import { useRef, useState } from "react";
import SimpleButton from "../../components/SimpleButton";
import type { AddNewChefProps, Chefs } from "../../helpers/Interface";
import InputField from "../../components/InputField";

export default function AddNewChef({
  onClose,
  setChef,
  editChef = null,
}: AddNewChefProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newChef, setNewChef] = useState<Chefs>(
    editChef ?? {
      id: 0,
      title: "",
      description: "",
      image: "",
    }
  );

  const isEdit = Boolean(editChef);
  const handleSubmitNewChef = (e: React.FormEvent) => {
    e.preventDefault();

    setChef((prev) => {
      if (isEdit) {
        // Edit existing dish
        return prev.map((dish) =>
          dish.id === editChef!.id ? { ...newChef, id: dish.id } : dish
        );
      } else {
        // Add new dish with auto-increment ID
        const existingIds = prev.map((d) => d.id ?? 0); // fallback to 0 if undefined
        const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 1;

        return [
          ...prev,
          {
            ...newChef,
            id: nextId,
          },
        ];
      }
    });

    onClose();
  };
  const handleChefImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setNewChef((prev) => ({
      ...prev,
      image: previewUrl, // store preview URL
    }));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-4xl w-full p-6 my-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Edit Chef Information
          </h3>
          <div className="space-y-6">
            <div className="space-y-4">
              {/* <h4 className="font-semibold text-gray-900">Chef Team Members</h4> */}
              <form className="space-y-4" onSubmit={handleSubmitNewChef}>
                <div className="flex gap-6">
                  {/* LEFT : Image */}
                  <div className="flex flex-col items-center w-28">
                    <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={newChef.image}
                        alt={newChef.title}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/400x500/e5e7eb/9ca3af?text=Chef";
                        }}
                      />
                    </div>

                    {/* Edit Image Button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 text-xs text-orange-500 flex items-center gap-1 hover:text-orange-600"
                    >
                      <i className="ri-edit-line"></i>
                      Edit Image
                    </button>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleChefImageUpload}
                    />
                  </div>

                  {/* RIGHT : Fields */}
                  <div className="flex-1 space-y-4">
                    {/* Name */}
                    <InputField
                      label="Name"
                      required
                      value={newChef.title}
                      placeholder="Chef Name"
                      onChange={(value) =>
                        setNewChef({ ...newChef, title: value })
                      }
                    />

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        required
                        value={newChef.description}
                        onChange={(e) =>
                          setNewChef({
                            ...newChef,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
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
                    label={isEdit ? "Save" : "Add Chef"}
                    className="flex-1"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
