"use client";

import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

function Modal({ isOpen, onClose, title, content }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-6 shadow-xl z-10 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mt-2">
          <p className="text-gray-700">{content}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ModalDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string>("basic");

  const modalContent = {
    basic: {
      title: "Basic Modal",
      content:
        "This is content inside a basic modal. Web crawlers typically cannot access modal content because it requires user interaction to display and is often not in the initial DOM.",
    },
    important: {
      title: "Important Information",
      content:
        "This modal contains critical information that should be indexed but might be missed by crawlers. Modal content is a common SEO problem because important details are hidden from search engines.",
    },
    terms: {
      title: "Terms and Conditions",
      content:
        "Legal terms and conditions are often placed in modals, which might prevent search engines from properly indexing this information. This is particularly problematic for compliance and legal disclosures that should be discoverable.",
    },
  };

  const openModal = (type: string) => {
    setActiveModal(type);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="bg-yellow-100 p-3 rounded mb-4">
        <p>
          Modals present a significant challenge for web crawlers. The content
          within modals is typically not visible in the initial page load and
          requires user interaction to access.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => openModal("basic")}
          className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Basic Modal
        </button>

        <button
          onClick={() => openModal("important")}
          className="p-3 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Open Important Info Modal
        </button>

        <button
          onClick={() => openModal("terms")}
          className="p-3 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Open Terms & Conditions
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent[activeModal as keyof typeof modalContent].title}
        content={modalContent[activeModal as keyof typeof modalContent].content}
      />
    </div>
  );
}
