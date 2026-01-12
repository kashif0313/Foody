import SimpleButton from "../../components/SimpleButton";
import type { OrderDetailsSectionProps } from "../../helpers/Interface";

export default function OrderDetailsSection({
  selectedOrder,
  onClose,
}: OrderDetailsSectionProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
        <div
          className="bg-white rounded-2xl max-w-3xl w-full p-6 my-2 
                max-h-[calc(100vh-20px)] overflow-y-auto custom-scrollbar"
        >
          <div className="flex  justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Order Details</h3>
            <button
              onClick={() => onClose()}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
          {selectedOrder && (
            <div className="space-y-6 ">
              {/* Order Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="text-base font-semibold text-gray-900">
                      {selectedOrder.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="text-base font-semibold text-gray-900">
                      {selectedOrder.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        selectedOrder.status === "preparing"
                          ? "bg-yellow-100 text-yellow-700"
                          : selectedOrder.status === "on-the-way"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <p className="text-base font-semibold text-gray-900">
                      {selectedOrder.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  Customer Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <i className="ri-user-line text-gray-400"></i>
                    <span className="text-sm text-gray-700">
                      {selectedOrder.customer}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-mail-line text-gray-400"></i>
                    <span className="text-sm text-gray-700">
                      {selectedOrder.customerEmail}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-phone-line text-gray-400"></i>
                    <span className="text-sm text-gray-700">
                      {selectedOrder.customerPhone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-map-pin-line text-gray-400"></i>
                    <span className="text-sm text-gray-700">
                      {selectedOrder.deliveryAddress}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  Order Items
                </h4>
                <div className="space-y-2">
                  {selectedOrder.dishes.map((dish, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 flex items-center justify-center bg-orange-50 text-orange-500 rounded-lg text-sm font-semibold">
                          {dish.quantity}x
                        </span>
                        <span className="text-sm text-gray-900">
                          {dish.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        ${(dish.price * dish.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      ${selectedOrder.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">
                      ${selectedOrder.tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-900">
                      ${selectedOrder.deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-orange-500">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <SimpleButton
                  type="submit"
                  label={"Print Receipt"}
                  icon={<i className="ri-printer-line"></i>}
                  className="flex-1"
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
          )}
        </div>
      </div>
    </>
  );
}
