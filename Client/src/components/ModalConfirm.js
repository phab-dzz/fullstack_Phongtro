import React from 'react';

const ModalConfirm = ({ isOpen, onClose, onConfirm, postTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 text-center">
        <h2 className="text-lg font-semibold mb-2">Xác nhận xóa</h2>
        <p className="text-gray-700 mb-4">
          Bạn có chắc chắn muốn xóa bài đăng <strong>{postTitle}</strong> không?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
