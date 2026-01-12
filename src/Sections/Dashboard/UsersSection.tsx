import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import SimpleButton from "../../components/SimpleButton";
import type { TableColumn, User } from "../../helpers/Interface";
import { customers } from "../../helpers/MockData";
import UsersDetails from "./UserDetails";

export default function UsersSection() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [userDetail, setDetailUser] = useState<User | null>(null);
  const [selectedUserForAction, setSelectedUserForAction] =
    useState<User | null>(null);
  const [userAction, setUserAction] = useState<
    "suspend" | "activate" | "reset"
  >("suspend");
  const [showUserActionModal, setShowUserActionModal] = useState(false);

  const handleDeleteUser = (user: User) => {
    setUsers((prev) => prev.filter((m) => m.id !== user.id));
  };

  const handleEditUser = (user: User) => {
    setDetailUser(user);
    setShowAddModal(true);
  };
  const handleUserAction = (
    user: User,
    action: "suspend" | "activate" | "reset"
  ) => {
    setSelectedUserForAction(user);
    setUserAction(action);
    setShowUserActionModal(true);
  };

  const confirmUserAction = () => {
    if (!selectedUserForAction) return;

    const updatedUsers = users.map((user) => {
      if (user.id === selectedUserForAction.id) {
        if (userAction === "suspend") {
          return { ...user, status: "suspended" };
        } else if (userAction === "activate") {
          return { ...user, status: "active" };
        }
      }
      return user;
    });

    setUsers(updatedUsers);
    setShowUserActionModal(false);
    setSelectedUserForAction(null);

    if (userAction === "reset") {
      alert(`Password reset email sent to ${selectedUserForAction.email}`);
    }
  };

  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem("customers");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);
  const columns: TableColumn<User>[] = [
    {
      key: "id",
      header: "id",
      render: (user) => (
        <span className="text-sm text-gray-600">{user.id}</span>
      ),
    },

    {
      key: "image",
      header: "avatar",
      render: (user) => (
        <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://via.placeholder.com/200x200/e5e7eb/9ca3af?text=User";
            }}
          />
        </div>
      ),
    },

    {
      key: "name",
      header: "name",
      render: (user) => (
        <span className="text-sm text-gray-600">{user.name}</span>
      ),
    },
    {
      key: "email",
      header: "email",
      render: (user) => (
        <span className="text-sm text-gray-600">{user.email}</span>
      ),
    },
    {
      key: "location",
      header: "location",
      render: (user) => (
        <span className="text-sm text-gray-600">{user.city}</span>
      ),
    },
    {
      key: "Orders",
      header: "orders",
      render: (user) => (
        <span className="text-sm text-gray-600">{user.totalOrders}</span>
      ),
    },
    {
      key: "Spend",
      header: "spend",
      render: (user) => (
        <span className="text-sm text-gray-600">{user.totalSpent}</span>
      ),
    },
    {
      key: "status",
      header: "status",
      render: (user) => (
        <span className="text-sm text-gray-600">{user.status}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditUser(user)}
            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <i className="ri-eye-line"></i>
          </button>
          <button
            onClick={() => handleDeleteUser(user)}
            className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg"
          >
            <i className="ri-delete-bin-line"></i>
          </button>
          <button
            onClick={() => handleUserAction(user, "reset")}
            className="w-8 h-8 flex items-center justify-center text-purple-600 hover:bg-purple-50 rounded-lg cursor-pointer"
            title="Reset Password"
          >
            <i className="ri-lock-password-line"></i>
          </button>
          {user.status === "active" ? (
            <button
              onClick={() => handleUserAction(user, "suspend")}
              className="w-8 h-8 flex items-center justify-center text-orange-600 hover:bg-orange-50 rounded-lg cursor-pointer"
              title="Suspend User"
            >
              <i className="ri-forbid-line"></i>
            </button>
          ) : (
            <button
              onClick={() => handleUserAction(user, "activate")}
              className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
              title="Activate User"
            >
              <i className="ri-checkbox-circle-line"></i>
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      {" "}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">All Users</h2>

          <div>
            {/* <SimpleButton
              onClick={() => {
                setShowAddModal(true);
                setDetailUser(null);
              }}
              className="w-auto"
              type="button"
              label="Add New User"
              icon={<i className="ri-add-line"></i>}
            /> */}
          </div>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            data={customers}
            columns={columns}
            rowKey={(customers) => customers.id || 0}
          />
        </div>
      </div>
      {showUserActionModal && selectedUserForAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {userAction === "suspend" && "Suspend User"}
              {userAction === "activate" && "Activate User"}
              {userAction === "reset" && "Reset Password"}
            </h3>
            <p className="text-gray-600 mb-6">
              {userAction === "suspend" &&
                `Are you sure you want to suspend ${selectedUserForAction.name}? They won't be able to access their account.`}
              {userAction === "activate" &&
                `Are you sure you want to activate ${selectedUserForAction.name}? They will regain access to their account.`}
              {userAction === "reset" &&
                `A password reset email will be sent to ${selectedUserForAction.email}. Continue?`}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowUserActionModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmUserAction}
                className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  userAction === "suspend"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : userAction === "activate"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
              >
                {userAction === "suspend" && "Suspend"}
                {userAction === "activate" && "Activate"}
                {userAction === "reset" && "Send Reset Email"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <UsersDetails
          onClose={() => setShowAddModal(false)}
          viewUser={userDetail}
        />
      )}
    </>
  );
}
