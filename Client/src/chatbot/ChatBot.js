import React, { useState } from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  

  return (
    <>
      
      {open && (
  <div className="fixed bottom-4 right-4 z-40">
    <div className="bg-white rounded-xl shadow-xl w-[90vw] sm:w-[350px] h-[80vh] sm:h-[500px] flex flex-col">
      <div className="flex justify-end p-2">
        <button
          onClick={() => setOpen(false)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close Chatbot"
        >
          ✕
        </button>
      </div>
      <div className="flex-grow">
        <iframe
          src={process.env.REACT_APP_URL_BASE}
          width="100%"
          style={{ height: '100%' }}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  </div>
)}

{!open && (
  <button
    onClick={() => setOpen(true)}
    className="fixed bottom-4 right-4 z-30 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
    aria-label="Open Chatbot"
  >
    <IoChatbubbleEllipsesOutline className="w-6 h-6" />
  </button>
)}
                 
      
    </>
  );
}
