import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Modal = ({ isOpen, onClose, card }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900
     bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 mb-4 font-extrabold text-3xl">
          X
        </button>
        <img src={card.imageUrl} alt={card.title} className="w-full h-40 object-cover rounded-t-lg mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{card.title}</h2>
        <p className="text-gray-900 mb-4">{card.price}</p>
        <p className="text-gray-900">{card.description}</p>
      </div>
    </div>
  );
};

export default Modal;
