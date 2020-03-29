/**
 * 获取下一个月
 * @date 格式为：[2019,10,30]
 * @return String
 */
const CountNextMonth=([YY, MM, DD]) => {
    let year = parseInt(YY);
    let month = parseInt(MM) + 1;
    if (month === 13) {
        year = year + 1;
        month = 1;
    }
    let day = parseInt(DD);
    const date = new Date(year, month, 0);
    let day2 = date.getDate();
    if (day > day2) day = day2;

    // return [year+'', (month<10?'0'+month:''+month), (day<10?'0'+day:''+day)];
    return year + '.' + (month<10?'0'+month:month) + '.' + (day<10?'0'+day:day);
};

export default CountNextMonth;