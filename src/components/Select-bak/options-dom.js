import Vue from 'vue';
import O from './depend/Options';
const OptionsExtend=Vue.extend(O);

let OptionsVm=null;

const Options=(options) => {
    const {tag, param}=options;
    const {top, left, height}=tag.getBoundingClientRect();
    const dom=document.body;

    OptionsVm=new OptionsExtend({data: param});
    OptionsVm=OptionsVm.$mount();

    // 如果当前dom高度小于当前实例数据的高度，需要给当前dom设置一个最小高度
    if (dom.getBoundingClientRect().height<param.data.length*32) {
        dom.style.minHeight=param.data.length*32+'px';
        OptionsVm.$el.style.top=0;
        OptionsVm.$el.style.left=0;
    } else {
        OptionsVm.$el.style.top=top+(height-2)+'px';
        OptionsVm.$el.style.left=left+'px';
    }
    dom.appendChild(OptionsVm.$el);

    return OptionsVm;
};

export default Options;