/**
 * 计算数字
 */

/**
 * 入参
 * @param sn 开始数字
 * @param en 结束数字
 * @returns {Array}
 */
const CountNumber=(sn, en) => {
    let result=[];
    for (let i=sn; i<en; i++) {
        result.push(i<10?`0${i}`:`${i}`)
    }
    return result;
};
export default CountNumber;