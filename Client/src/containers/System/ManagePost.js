import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Button, ModalConfirm, ModalPost } from "../../components";
import { apiDeletePost, apiUpdatePostByAdmin } from "../../services/post";
import { toast } from "react-toastify";
import * as actions from "../../store/actions";

const ManagePost = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const { postOfCurrent } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(actions.getPostOfCurrent());
  }, [dispatch]);

  const openDeleteModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const openPostDetail = (post) => {
    setCurrentItem(post);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedItem) => {
    const response = await apiUpdatePostByAdmin(updatedItem, updatedItem.id);
    if (response?.data?.err === 0) {
      toast.success("📝 Cập nhật thành công!");
      dispatch(actions.getPostOfCurrent());
    } else {
      toast.error(response?.data?.msg || "Cập nhật thất bại");
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPost) return;

    try {
      const response = await apiDeletePost(selectedPost.id);
      if (response?.data?.err === 0) {
        toast.success("🗑️ Xóa thành công!");
        dispatch(actions.getPostOfCurrent());
      } else {
        toast.error(response?.data?.msg || "Xóa thất bại");
      }
    } catch (err) {
      toast.error("Lỗi khi xóa bài đăng");
      console.error(err);
    } finally {
      setShowModal(false);
      setSelectedPost(null);
    }
  };

  const checkStatus = (date) =>
    moment(date, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(new Date().toDateString());

  return (
    <div className="p-4">
      {/* Title & Filter */}
      <div className="py-4 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-medium">Quản lý tin đăng</h1>
        <select className="border border-gray-300 rounded p-2 text-sm">
          <option value="all">Tất cả</option>
        </select>
      </div>

      {/* Table wrapper for scroll */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-[768px] w-full table-auto text-sm md:text-base">
          <thead>
            <tr className="border border-gray-500 bg-gray-100 text-left">
              <th className="py-2 px-2 border">Mã tin</th>
              <th className="py-2 px-2 border">Ảnh</th>
              <th className="py-2 px-2 border">Tiêu đề</th>
              <th className="py-2 px-2 border">Giá</th>
              <th className="py-2 px-2 border">Ngày bắt đầu</th>
              <th className="py-2 px-2 border">Ngày hết hạn</th>
              <th className="py-2 px-2 border">Trạng thái</th>
              <th className="py-2 px-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {!postOfCurrent || postOfCurrent.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              postOfCurrent.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 border text-center">{item?.overviews?.code}</td>
                  <td className="py-2 px-2 border text-center">
                    <img
                      src={JSON.parse(item?.images?.image)[0] || ""}
                      alt="avatar-post"
                      className="w-14 h-14 object-cover mx-auto"
                    />
                  </td>
                  <td className="py-2 px-2 border text-center">{item?.title}</td>
                  <td className="py-2 px-2 border text-center">{item?.attributes?.price}</td>
                  <td className="py-2 px-2 border text-center">{item?.overviews?.created}</td>
                  <td className="py-2 px-2 border text-center">{item?.overviews?.expired}</td>
                  <td className="py-2 px-2 border text-center">
                    {checkStatus(item?.overviews?.expired?.split(" ")[3])
                      ? "Đang hoạt động"
                      : "Đã hết hạn"}
                  </td>
                  <td className="py-2 px-2 border text-center">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                      <Button
                        text="Xem"
                        bgColor={"bg-green-600"}
                        textColor={"text-white"}
                        onClick={() => openPostDetail(item)}
                      />
                      <Button
                        text="Xóa"
                        bgColor={"bg-red-600"}
                        textColor={"text-white"}
                        onClick={() => openDeleteModal(item)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ModalConfirm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        postTitle={selectedPost?.title || ""}
      />

      <ModalPost
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={currentItem}
        onSave={handleSave}
      />
    </div>
  );
};

export default ManagePost;
