import Vue from 'vue';

import CalcTargetPosition from '../../../static/utils/CalcTargetPosition';
import RemoveDom from '../../../static/utils/RemoveDom';

import ST from './singleTime';
const SingleTimeExtend=Vue.extend(ST);

let vm=null; // 当前实例

const SingleTime=(options) => {
    const {tag, param, props}=options;
    const dom=document.body;

    const {X, Y, P}=CalcTargetPosition(tag, dom, 402, 328);
    param.position=P;
    vm=new SingleTimeExtend({data: param, propsData: props}); // 实例化

    vm=vm.$mount(); // 挂载

    vm.tag=tag;
    vm.dom=dom;

    // 设置位置
    vm.$el.style.top=Y+'px';
    vm.$el.style.left=X+'px';

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};

SingleTime.remove=RemoveDom;

SingleTime.resetPosition=(vm) => {
    const {X, Y}=CalcTargetPosition(vm.tag, vm.dom, 402, 328);
    vm.$el.style.top=Y+'px';
    vm.$el.style.left=X+'px';
};

export default SingleTime;