/**
 * 计算当前时间
 * @constructor
 */
const dateStr=(num) => {
    return num<10?`0${num}`:`${num}`
};
const CountNowDate=() => {
    const date=new Date();
    let YY=date.getFullYear()
        ,MM=date.getMonth()+1
        ,DD=date.getDate()
        ,hh=date.getHours()
        ,mm=date.getMinutes()
        ,ss=date.getSeconds();

    return [dateStr(YY), dateStr(MM), dateStr(DD), dateStr(hh), dateStr(mm), dateStr(ss)];
};
export default CountNowDate;