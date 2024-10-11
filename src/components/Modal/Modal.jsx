import React, { useState } from "react";
import InvoiceForm from "../InvoiceForm/InvoiceForm";


const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Modal toggle button */}
      <div>
        <button
          onClick={toggleModal}
          className="hover:opacity-80 ml-4 md:ml-10 flex items-center py-2 lg:px-3 px-3 md:space-x-3 space-x-2 bg-[#7c5dfa] rounded-full"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGHSURBVHgBzZc/TsMwFMY/F9jLxka6sRFOEGam7kicgQugDByg9AQUJHY2VnoCysaWdIIt2RF6vJc4iisVYaep3Z/0Na7S+tnf818FS4hoyI8xK2HFrIg11K9LVs5asOasZ6VUiT7gwBFrwirIjXv5L7oiPdaBN2Wi3XPudUb9kZGtG/zDmPoNbjYi9t3zdY2IzJjKCC55ekM9urdJzjprZsnAeJF6CA4dI22+VA5oWzL4ZcQu5I0DKfxzLR9K576Af2QMjMSBMTqQfRBurr4rSbkD1dIuDUgQjkQaECMc8T4cpp5p9deyLX8uV1MwOlGwJJJBaJ1AybcNt48HsGWAwIgDMgWttkszBWL7y9NPVb643MPRcWu7QwpKGQM5LAfiXxVLcIegJtVK+I5wLKQBrwjHvFmKZSNyOzb1w+FA78sP8M9MYu/GdiwFfkzhj6mOGf5ItkKIQ+m6RoQ7lm/RiYxcr2lUX83uaHOkju5rDNVuzMiNQgeO/qvfegeh9np+zjpFT9fzXwRPrh24QcPgAAAAAElFTkSuQmCC"
            alt=""
          />
          <p className=" md:block hidden text-white font-semibold text-lg">
            New invoice
          </p>
          <p className=" md:hidden block text-white font-semibold text-base">
            New Invoice
          </p>
        </button>
      </div>

      {/* Main modal */}
      {isOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 md:p-5  border-b rounded-t dark:border-gray-600">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <InvoiceForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
