import { useState } from "react";
import SimpleButton from "../../components/SimpleButton";
import type { ChangeOrderStatusProps } from "../../helpers/Interface";

export default function ChangeOrderStatus({
  selectedOrder,
  onClose,
  onUpdate,
}: ChangeOrderStatusProps) {
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const getStatusColor = (status: string) => {
    switch (status) {
      case "received":
        return "bg-gray-100 text-gray-700";
      case "preparing":
        return "bg-yellow-100 text-yellow-700";
      case "ready":
        return "bg-blue-100 text-blue-700";
      case "on-the-way":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case "received":
        return "Order Received";
      case "preparing":
        return "Preparing";
      case "ready":
        return "Ready to Deliver";
      case "on-the-way":
        return "On the Way";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Change Order Status
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Update the status for order {selectedOrder?.id}
          </p>

          <div className="space-y-3 mb-6">
            {[
              "received",
              "preparing",
              "ready",
              "on-the-way",
              "delivered",
              "cancelled",
            ].map((status) => (
              <label
                key={status}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  name="orderStatus"
                  value={status}
                  checked={newOrderStatus === selectedOrder?.status}
                  onChange={(e) => setNewOrderStatus(e.target.value)}
                  className="w-4 h-4 text-orange-500 cursor-pointer"
                />
                <span
                  className={`flex-1 text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
                    status
                  )}`}
                >
                  {getStatusText(status)}
                </span>
              </label>
            ))}
          </div>

          <div className="flex space-x-3">
            <SimpleButton
              type="submit"
              label={"Change Status"}
              className="flex-1"
              onClick={() => onUpdate(newOrderStatus)}
            />
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
