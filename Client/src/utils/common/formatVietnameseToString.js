export const formatVietnameseToString = (keyword) => {
    // let string = keyword;
    // string = string.toLowerCase();
    // string = string.replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a');
    // string = string.replace(/đ/g, 'd');
    // string = string.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e');
    // string = string.replace(/í|ì|ỉ|ĩ|ị/g, 'i');
    // string = string.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o');
    // string = string.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u');
    // string = string.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y');
    // return string;

    return keyword
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-")

}