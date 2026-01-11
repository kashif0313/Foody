import { useState } from "react";
import type { adminOrder } from "../../helpers/Interface";
import { adminOrders } from "../../helpers/MockData";
import OrderDetailsSection from "./OrderDetailsSection";
import ChangeOrderStatus from "./ChangeOrderStatus";
import SimpleButton from "../../components/SimpleButton";

export default function OrdersSection() {
  const [selectedOrder, setSelectedOrder] = useState<adminOrder | null>(null);
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false);
  const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
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
  const handleViewOrderDetails = (order: adminOrder) => {
    setSelectedOrder(order);
    setShowOrderDetailModal(true);
  };
  const handleChangeOrderStatus = (order: adminOrder) => {
    setSelectedOrder(order);
    setShowOrderStatusModal(true);
  };
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
  const handleUpdateOrderStatus = (status: string) => {
    if (!selectedOrder) return;
    // update selected order for UI sync
    setSelectedOrder({ ...selectedOrder, status });
    setShowOrderStatusModal(false);
  };

  return (
    <>
      <div className="space-y-4">
        {adminOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {order.id}
                </h3>
                <p className="text-sm text-gray-600">
                  {order.customer} • {order.items} items • {order.time}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    ${order.total.toFixed(2)}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <SimpleButton
                    label={" View Details"}
                    className="flex-1"
                    onClick={() => handleViewOrderDetails(order)}
                  />
                  <SimpleButton
                    type="button"
                    label="Change Status"
                    className="flex-1"
                    variant="secondary"
                    onClick={() => {
                      handleChangeOrderStatus(order);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showOrderDetailModal && (
        <OrderDetailsSection
          selectedOrder={selectedOrder}
          onClose={() => setShowOrderDetailModal(false)}
        />
      )}
      {showOrderStatusModal && (
        <ChangeOrderStatus
          selectedOrder={selectedOrder}
          onClose={() => setShowOrderStatusModal(false)}
          onUpdate={handleUpdateOrderStatus}
        />
      )}
    </>
  );
}
