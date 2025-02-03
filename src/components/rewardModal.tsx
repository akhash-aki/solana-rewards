
interface ClaimRewardModalProps {
  isOpen: boolean;
  onProceed: () => void;
  isLoading: boolean;
}

export default function ClaimRewardModal({ isOpen, onProceed, isLoading }: ClaimRewardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        {isLoading ? (
          <>
            <p className="text-lg font-semibold text-gray-700">Processing...</p>
            <div className="mt-4 flex justify-center">
              <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-gray-700">Do you want to proceed?</p>
            <button
              onClick={onProceed}
              className="mt-4 bg-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg hover:bg-blue-600 transition-all"
            >
              Proceed
            </button>
          </>
        )}
      </div>
    </div>
  );
}
