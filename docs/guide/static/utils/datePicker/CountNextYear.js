/**
 * 获取下一年
 * @date 格式为：[2019,10,30]
 * @return String
 */
const CountNextYear=([YY, MM, DD]) => {
    let year = parseInt(YY) + 1;
    let month = MM;
    let day = parseInt(DD);
    const date = new Date(year, month, 0);
    let day2 = date.getDate();
    if (day > day2) day = day2;

    // return [year+'', (month<10?'0'+month:''+month), (day<10?'0'+day:''+day)];
    return year + '.' + month + '.' + (day<10?'0'+day:day);
};

export default CountNextYear;