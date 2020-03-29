import Vue from 'vue'
import Popover from './depend/PopoverModal'
import RemoveDom from '../static/utils/RemoveDom';
// import CalcTargetPosition from '../static/utils/CalcTargetPosition'
const PopoverExtend = Vue.extend(Popover)

let PopoverExtendVm = null
/**
 * flag 默认居中
 * 可选【top-center，top-left，top-right，bottom-left，bottom-center，bottom-right】
 */
const calcPopoverPosition = (triggerDom, flag, selfDom) => {
	const { pageYOffset, pageXOffset } = window
	const { top, left, height, width } = triggerDom.getBoundingClientRect() // 根据当前点击的dom对象获取位置
	let targetOffsetY = pageYOffset + top + height,
		targetOffsetX = left + pageXOffset,
		position = flag.split('-'),
		positionObj = {
			left: targetOffsetX,
			right: targetOffsetX - selfDom.clientWidth + width
		}
	if(position[0] === 'top') {
		targetOffsetY = targetOffsetY - selfDom.clientHeight - height
	} else {
		targetOffsetY = targetOffsetY + 12
	}
	if(position[1] === 'center') {
		targetOffsetX = targetOffsetX - selfDom.clientWidth / 2 +  width / 2
	} else {
		targetOffsetX = positionObj[position[1]]
	}
	return { X: targetOffsetX, Y: targetOffsetY }
}
const PopoverExtendInit = (options) => {
	const {tag, params}=options; // 解构参数

	PopoverExtendVm=new PopoverExtend({
		data: params,
	}).$mount() // 实例化并挂载

	document.body.appendChild(PopoverExtendVm.$el); // 插入dom
	
    return PopoverExtendVm;
}
PopoverExtendInit.renderPosition = (vm) => {
	const { X, Y } = calcPopoverPosition(vm.triggerDom, vm.placement, vm.$el)
	vm.$el.style.top = Y + 'px'
	vm.$el.style.left = X + 'px'
}
PopoverExtendInit.remove=(vm) => {
    RemoveDom(vm);
};


export default PopoverExtendInit