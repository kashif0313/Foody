export default function OrderingPopup() {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-6">
            <i className="ri-checkbox-circle-fill text-5xl text-green-500"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Your order is being prepared. Redirecting to tracking page...
          </p>
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    </>
  );
}
