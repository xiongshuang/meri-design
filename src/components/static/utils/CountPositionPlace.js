import CheckClassName from "./CheckClassName";

/**
 * 计算定位的位置
 * @param tag 当前触发器
 * @param dom 需要插入的dom
 * @param maxWidth 弹出层最大宽度
 * @param transfer 是否在某个dom中
 * @param place 默认位置
 * @return {[number, number, number, string]}
 * @constructor
 */

const CountPositionPlace=(tag, dom, maxWidth, transfer, place='left') => {
    let top, left, height;
    const {clientWidth}=document.body; // body宽
    const {top: t, bottom: b, left: l, width: w, height: h}=tag.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    const {top: t2}=dom.getBoundingClientRect(); // 当前dom位置
    height=h;
    if (transfer==='body') {
        top=t;
        const pr=clientWidth-l-w; // positionRight
        if (pr < maxWidth) place='right';
        left=(pr < maxWidth)?pr:l;
    } else if (transfer==='parent') {
        if (clientWidth-l-w < maxWidth) place='right';
        top=0;left=0;
    } else {
        // 如果是在某个dom中
        const {left: l3, width: w3}=CheckClassName(tag, transfer).getBoundingClientRect(); // 弹窗内容位置
        // 当前触发器距离右边距离 (w3 - (l - l3) - w)，当前弹窗内容的宽减去 触发器与弹窗内容的差值 再减去触发器宽
        const pl=l - l3; // positionLeft
        const diff=(w3 - pl - w);
        // 240表示下拉列表最大宽度
        if (diff < maxWidth) place='right';
        top=t-t2;
        left=(diff < maxWidth)?diff:pl;
    }

    return [top, left, height, place];
};

export default CountPositionPlace;