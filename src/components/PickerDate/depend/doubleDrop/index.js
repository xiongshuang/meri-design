import Vue from 'vue';

import CalcTargetPosition from '../../../static/utils/CalcTargetPosition';
import RemoveDom from '../../../static/utils/RemoveDom';

import DD from './doubleDrop';
const DoubleDropExtend=Vue.extend(DD);

let vm=null; // 当前实例

const DoubleDrop=(options) => {
    const {tag, param, props, methods}=options;
    const dom=document.body;

    const {X, Y, P}=CalcTargetPosition(tag, dom, 402, 624);
    param.position=P;
    vm=new DoubleDropExtend({data: param, propsData: props, methods}); // 实例化

    vm=vm.$mount(); // 挂载

    vm.tag=tag;
    vm.dom=dom;

    // 设置位置
    vm.$el.style.top=Y+'px';
    vm.$el.style.left=X+'px';

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};

DoubleDrop.remove=RemoveDom;

DoubleDrop.resetPosition=(vm) => {
    const {X, Y}=CalcTargetPosition(vm.tag, vm.dom, 402, 624);
    vm.$el.style.top=Y+'px';
    vm.$el.style.left=X+'px';
};

export default DoubleDrop;