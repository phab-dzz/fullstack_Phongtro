import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import moment from "moment";
import {Button,ModalConfirm} from "../../components";
import {apiDeletePost}from "../../services/post";
import {toast} from "react-toastify";

import * as actions from '../../store/actions';

const ManagePost = () => {
    const dispatch = useDispatch();
      const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
   
    const { postOfCurrent } = useSelector(state => state.post );
    React.useEffect(() => {

        dispatch(actions.getPostOfCurrent());
        }, []);
        const openDeleteModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };
  const checkStatus = (date) => moment(date,process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(new Date().toDateString())
  console.log("post of admin :"+postOfCurrent);
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

  
    return (
      <div>
         <div className="py-4 border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <select className="border border-gray-300 rounded p-2">
            <option value="all">Tất cả</option>
        </select>

       </div>
       <table className="w-full table-auto">
              <thead>
                <tr className="border-b-2 border-gray-200">
                    <th className="py-2">Mã tin</th>
                    <th className="py-2">Ảnh </th>
                    <th className="py-2">Tiêu đề</th>
                    <th className="py-2">Gía</th>
                    <th className="py-2">Ngày bắt đầu</th>
                    <th className="py-2">Ngày hết hạn</th>
                    <th className="py-2">Trạng thái</th>
                    <th className="py-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {!postOfCurrent?
                  <tr>
                    <td colSpan="7" className="text-center py-4">Không có dữ liệu</td>
                  </tr>
                  :
                  postOfCurrent.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 border text-center">{item?.overviews?.code}</td>
                      <td className="py-2 border text-center">
                        <img src={JSON.parse(item?.images?.image)[0]||''} alt='avatar-post' className="w-16 h-16 object-cover" />
                      </td>
                      <td className="py-2 border text-center">{item?.title}</td>
                      <td className="py-2 border text-center">{item?.attributes.price}</td>
                      <td className="py-2 border text-center">{item?.overviews?.created}</td>
                      <td className="py-2 border text-center">{item?.overviews?.expired}</td>
                      <td className="py-2 border text-center">
                       {checkStatus(item?.overviews?.expired?.split(' ')[3])?'Đang hoạt động' : 'Đã hết hạn'}
                      </td>
                      <td className="border text-center p-2 flex items-center gap-2 justify-between">
                       
                        <Button
                        text="sửa"
                        bgColor={'bg-green-600'} 
                        textColor={'text-white'}
                    
                        />
                        <Button
                        text="xóa"
                        bgColor={'bg-red-600'} 
                        textColor={'text-white'}
                      

                           onClick={() => openDeleteModal(item)}
                        />

                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
                {/* Example row, replace with dynamic data */}
                 <ModalConfirm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        postTitle={selectedPost?.title || ''}
      />
      </div>


    );
}
export default ManagePost;