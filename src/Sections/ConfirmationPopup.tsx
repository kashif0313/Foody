import SimpleButton from "../components/SimpleButton";
import type { ConfirmationPopupProps } from "../helpers/Interface";

export default function ConfirmationPopup({
  title,
  message,
  acceptBtnLabel,
  declineBtnLabel,
  onAccept,
  onDecline,
}: ConfirmationPopupProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4">
              <i className="ri-logout-box-line text-3xl text-red-600"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{message}</p>
          </div>
          <div className="flex space-x-3">
            <SimpleButton
              type="button"
              label={acceptBtnLabel}
              className="w-auto"
              variant="primary"
              onClick={onAccept}
            />
            <SimpleButton
              type="button"
              label={declineBtnLabel}
              className="w-auto"
              variant="secondary"
              onClick={onDecline}
            />
          </div>
        </div>
      </div>
    </>
  );
}
