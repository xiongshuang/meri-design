
/**
 * 计算定位的位置
 * @param triggerDom 触发器元素
 * @param targetParent 需要插入的dom
 * @param targetHeight 目标元素高度
 * @param targetWidth 目标元素宽度
 * @constructor
 */
 const CalcTargetPosition = (triggerDom, targetParent, targetHeight, targetWidth) => {
	const { scrollHeight, scrollWidth } = targetParent;
	const { pageYOffset, pageXOffset } = window;
	const { top, left, height, width } = triggerDom.getBoundingClientRect() ;// 根据当前点击的dom对象获取位置
	let targetOffsetY = pageYOffset + top + height,
		// targetOffsetX = left + pageXOffset,
		targetOffsetX = scrollWidth - (left + pageXOffset + width),
		// targetOffsetX = pageXOffset + left - targetWidth + width,
		place = 'right',
		P = true;  // 动画执行方向
	// 计算目标元素是否超出屏幕高度
	if(targetOffsetY + targetHeight > scrollHeight) {
		// console.log(pageYOffset, top, targetHeight);
		targetOffsetY = pageYOffset + top - targetHeight - 7;
		P = false;
	}
	// 计算目标元素是否超出屏幕宽度
	if((targetOffsetX + targetWidth) > scrollWidth) {
		// targetOffsetX = pageXOffset + left - targetWidth + width;
		targetOffsetX = left + pageXOffset;
		place = 'left';
	}

	return { X: targetOffsetX, Y: targetOffsetY, P, H: height, place  }
};

export default CalcTargetPosition;
