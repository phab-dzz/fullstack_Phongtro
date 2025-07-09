import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // import tiếng Việt
dayjs.locale('vi');
const formatDate = (isoString) => {
  return dayjs(isoString)
    .add(7, 'hour') // 👉 Chuyển từ UTC sang giờ VN (UTC+7)
    .format('dddd, HH:mm DD/MM/YYYY');
};
export default formatDate;