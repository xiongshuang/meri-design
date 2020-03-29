// 判断父级是否包含某个class类名
const CheckClassName=(tag, className) => {
    const tagParent=tag.parentNode;
    if (tagParent.tagName==='BODY') return document.body;
    if (tagParent.classList.contains(className)) {
        const position=window.getComputedStyle(tagParent).position;
        if (position==='static' || !position) tagParent.style.position='relative';
        return tagParent;
    } else {
        return CheckClassName(tagParent, className);
    }
};

export default CheckClassName;