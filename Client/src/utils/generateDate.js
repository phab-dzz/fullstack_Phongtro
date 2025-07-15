const generateDate = ()=>{
    let gapExpire=Math.floor(Math.random() * 29) + 1;
    let today = new Date();
    let day = today.getDay()===0 ?'Chủ nhật' : `Thứ ${today.getDay()+1}`;
    let date= `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
    let time = `${today.getHours()}:${today.getMinutes()}`;
    
    let dateExpire =  `${today.getDate()+gapExpire}/${today.getMonth()+1}/${today.getFullYear()}`;
    return {
        today: `${day},  ${time} ${date}`,
    }
}