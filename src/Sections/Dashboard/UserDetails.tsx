import InputField from "../../components/InputField";
import SimpleButton from "../../components/SimpleButton";
import type { ViewUserDetailsProps } from "../../helpers/Interface";

export default function UsersDetails({
  onClose,
  viewUser,
}: ViewUserDetailsProps) {
  if (!viewUser) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-6 my-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {" "}
            User Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Avatar + Basic Info */}
            <div className="col-span-2 flex items-center gap-4 mb-4">
              {/* Avatar */}
              <div className="w-24 h-24 mr-10 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={viewUser.avatar}
                  alt={viewUser.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/200x200/e5e7eb/9ca3af?text=User";
                  }}
                />
              </div>

              {/* Name & Email */}
              <div className="flex-1 ">
                <InputField label="Name" readonly value={viewUser.name} />
                <InputField label="Email" readonly value={viewUser.email} />
                {/* <p className="text-sm text-gray-500 mt-1">Email</p>
                <p className="text-gray-700 text-sm">{viewUser.email}</p> */}
              </div>
            </div>

            {/* Rest stays SAME */}
            <div>
              <InputField label="Phone" readonly value={viewUser.phone} />
            </div>
            <div>
              <InputField label="City" readonly value={viewUser.city} />
            </div>
            <div className="col-span-2">
              <InputField label="Address" readonly value={viewUser.address} />
            </div>
            <div>
              <InputField label="Zip Code" readonly value={viewUser.zipCode} />
            </div>
            <div>
              <InputField label="Status" readonly value={viewUser.status} />
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
          </div>
        </div>
      </div>
    </>
  );
}
