import React, { useState } from 'react';
import InvoiceForm from '../InvoiceForm/InvoiceForm';

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Modal toggle */}
            <div>
                <button onClick={toggleModal} className="hover:opacity-80 ml-4 md:ml-10 flex items-center py-2 px-2 md:space-x-3 space-x-2 bg-[#7c5dfa] rounded-full"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGHSURBVHgBzZc/TsMwFMY/F9jLxka6sRFOEGam7kicgQugDByg9AQUJHY2VnoCysaWdIIt2RF6vJc4iisVYaep3Z/0Na7S+tnf818FS4hoyI8xK2HFrIg11K9LVs5asOasZ6VUiT7gwBFrwirIjXv5L7oiPdaBN2Wi3XPudUb9kZGtG/zDmPoNbjYi9t3zdY2IzJjKCC55ekM9urdJzjprZsnAeJF6CA4dI22+VA5oWzL4ZcQu5I0DKfxzLR9K576Af2QMjMSBMTqQfRBurr4rSbkD1dIuDUgQjkQaECMc8T4cpp5p9deyLX8uV1MwOlGwJJJBaJ1AybcNt48HsGWAwIgDMgWttkszBWL7y9NPVb643MPRcWu7QwpKGQM5LAfiXxVLcIegJtVK+I5wLKQBrwjHvFmKZSNyOzb1w+FA78sP8M9MYu/GdiwFfkzhj6mOGf5ItkKIQ+m6RoQ7lm/RiYxcr2lUX83uaHOkju5rDNVuzMiNQgeO/qvfegeh9np+zjpFT9fzXwRPrh24QcPgAAAAAElFTkSuQmCC" alt="" /><p class=" md:block hidden text-white font-semibold text-lg">New invoice</p><p class=" md:hidden block text-white font-semibold text-base">New</p></button>
            </div>

            {/* Main modal */}
            {isOpen && (
                <div
                    tabIndex="-1"
                    aria-hidden={!isOpen}
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">


                            <InvoiceForm></InvoiceForm>







                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
