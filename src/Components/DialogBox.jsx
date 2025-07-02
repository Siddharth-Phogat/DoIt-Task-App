import React, { useState } from 'react';

function DialogBox() {
  const [showDialog, setShowDialog] = useState(false);

  const handleTextClick = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="p-4 font-sans">
      <p className="text-blue-600 cursor-pointer" onClick={handleTextClick}>
        Click this text to open dialog
      </p>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Dialog Title</h2>
            <p>This is a custom dialog box.</p>
            <button
              onClick={closeDialog}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DialogBox;
