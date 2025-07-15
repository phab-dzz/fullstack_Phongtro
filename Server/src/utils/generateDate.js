// import moment from 'moment';

// const formatDate = (date) => {
//     const dayName = date.getDay() === 0 ? 'Chủ nhật' : `Thứ ${date.getDay() + 1}`;
//     const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//     const timeStr = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
//     return `${dayName}, ${timeStr} ${dateStr}`;
// };


// const generateDate = () => {
//     let gapExpire = Math.floor(Math.random() * 29) + 1;
//     let today = new Date();
//     let dateExpire = new Date(today.getTime() + gapExpire * 24 * 60 * 60 * 1000);
    
//     return {
//         today: formatDate(today),
//         dateExpire: formatDate(dateExpire)
//     };
// }
// export default generateDate;
// Không cần import moment vì không sử dụng

const formatDate = (date) => {
    // Mảng tên các thứ trong tuần
    const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    
    const dayName = dayNames[date.getDay()];
    
    // Format ngày với padding cho số < 10
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Format thời gian với padding
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    const dateStr = `${day}/${month}/${year}`;
    const timeStr = `${hours}:${minutes}`;
    
    // Có thể thay đổi format theo ý muốn:
    // return `${dayName}, ${dateStr} lúc ${timeStr}`;
    // return `${timeStr} - ${dayName}, ${dateStr}`;
    return `${dayName}, ${timeStr} ${dateStr}`;
};

const generateDate = () => {
    // Random từ 1-30 ngày
    const gapExpire = Math.floor(Math.random() * 30) + 1;
    const today = new Date();
    
    // Tạo ngày hết hạn
    const dateExpire = new Date(today);
    dateExpire.setDate(today.getDate() + gapExpire);
    
    return {
        today: formatDate(today),
        dateExpire: formatDate(dateExpire),
        gapDays: gapExpire // Thêm số ngày chênh lệch để debug
    };
};

export default generateDate;