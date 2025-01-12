import { useState } from 'react';

const SolflarePopup = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [message, setMessage] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Submitted text:', inputText);
        setMessage(`Submitted: ${inputText}`);
        closeModal();  // Close modal after submission
    };

    return (
        <div>
            {/* Main Button to Open Modal */}
            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                Open Modal
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4">Enter Text</h2>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter your text"
                            className="border border-gray-300 p-2 mb-4 w-full"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleSubmit}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Submit
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Optional: Display message after submission */}
            {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
};

export default SolflarePopup;
