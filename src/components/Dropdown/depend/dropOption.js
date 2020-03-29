import Vue from 'vue';

import CalcTargetPosition from '../../static/utils/CalcTargetPosition';
import RemoveDom from '../../static/utils/RemoveDom';

import D from './DOption';
const DOptionExtend=Vue.extend(D);

let vm=null; // 当前实例

const DropOption=(options) => {
    const {tag, param}=options;
    const dom=document.body;
    vm=new DOptionExtend({data: param}); // 实例化
    vm=vm.$mount(); // 挂载

    vm.tag=tag;
    vm.dom=dom;

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};

DropOption.remove=RemoveDom;
DropOption.resetPosition=(vm) => {
    const data=vm.data || [];
    const width=DropOption.getWidth(data);

    const {X, Y, P}=CalcTargetPosition(vm.tag, vm.dom, (data.length*32+8), width);
    vm.posotion=P;
    // 设置位置
    vm.$el.style.top=Y+'px';
    vm.$el.style.left=X+'px';
};

// 获取宽度
DropOption.getWidth=(data) => {
    const body=document.body,
        tag=document.createElement('section');
    tag.className='p-drop-option';
    tag.style.padding='0';
    tag.style.border='0';
    tag.style.height='0';
    tag.style.zIndex='-100';
    let html='';
    data.forEach(d => {
        html+='<article class="p-drop-option-item"><span>'+d.name+'</span></article>';
    });

    tag.innerHTML=html;
    body.appendChild(tag);
    const { width } = tag.getBoundingClientRect();
    body.removeChild(tag);
    return width;
};

export default DropOption;