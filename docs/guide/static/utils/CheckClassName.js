// 判断父级是否包含某个class类名
const CheckClassName=(tag) => {
    const tagParent=tag.parentNode;
    if (tagParent.classList.contains('p-modal-content')) {
        const position=window.getComputedStyle(tagParent).position;
        if (position==='static' || !position) tagParent.style.position='relative';
        return tagParent;
    } else {
        return CheckClassName(tagParent);
    }
};

export default CheckClassName;