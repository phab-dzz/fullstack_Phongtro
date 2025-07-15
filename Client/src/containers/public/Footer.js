import React from 'react';
import { BookOpen } from 'lucide-react';

const Footer = () => {
    return (
  <div className="bg-gray-600 text-white py-8 mt-12 bottom-0 ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <BookOpen className="h-8 w-8 text-blue-400 mr-2" />
            <h3 className="text-xl font-bold">Trọ tốt, Gía hời</h3>
          </div>
          <p className="text-gray-400">Trang web tìm phòng trọ uy tín và hiệu quả nhất.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Danh mục</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Căn hộ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mặt bằng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Nhà nguyên căn</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Căn hộ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Hỗ trợ</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Điều khoản</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Kết nối</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 flex flex-col">
        <p>&copy; 2025 EduCom AI. Thông tin liên hệ:</p>
        <small>
            Số điện thoại: <a href="tel:+0368375906" className="text-blue-400 hover:text-white">+84 3683 75906</a> | Email: <a href="mailto:duongvanphanls@gmail.com" className="text-blue-400 hover:text-white">duongvanphanls@gmail.com</a>
            | Github: <a href="https://github.com/phab-dzz" className="text-blue-400 hover:text-white">https://github.com/phab-dzz</a>
            </small>
            <small className='text-gray-400'>
                Dương Văn Phấn
            </small>

      </div>
    </div>
  </div>
)}

export default Footer;