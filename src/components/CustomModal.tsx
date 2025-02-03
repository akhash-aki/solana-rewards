interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children?: React.ReactNode; // Support children content
}
const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, title, description, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className="bg-black rounded-lg p-6 w-[90%] max-w-3xl relative overflow-y-auto" >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
        {children && <div className="mt-4">{children}</div>}
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};


export default CustomModal;
