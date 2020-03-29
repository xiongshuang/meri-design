/**
 * 计算前、后n天日期
 * @param Y
 * @param M
 * @param D
 * @param len 时间长度 [负数表示向左计算]
 * @returns [Object]
 */

const CountBeforeOrAfterMonth = (Y, M, D, len) => {
    const now = new Date(Y, M-1, D);
    now.setDate(now.getDate() + len);
    const year=now.getFullYear(),
        month=now.getMonth()+1,
        day=now.getDate(),
        y=String(year),
        m=month>9?''+month:'0'+month,
        d=day>9?''+day:'0'+day;

    return [y, m, d];
};

export default CountBeforeOrAfterMonth;