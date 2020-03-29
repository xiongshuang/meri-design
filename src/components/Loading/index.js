import Vue from 'vue';
import LoadingTemp from './Loading';
const loadingObj=Vue.extend(LoadingTemp);

let loadingVm=null, seed=0;

const Loading=(options) => {
    let dom, data, id;
    /**
     * type 取值【global-全局、local-局部】
     * dom 是局部loading挂载的dom
     * */
    if (options && options.type === 'local') {
        const { el }=options;
        const position=window.getComputedStyle(el).position;
        if (position==='static' || !position) el.style.position='relative';
        dom=el;
        data=options;
        id='local-'+seed++;
    } else {
        dom=document.body;
        data={type: 'global', size: dom.scrollWidth<=1920?'min':'max'};
        id='global-'+seed++;
    }
    loadingVm=new loadingObj({ data });
    loadingVm.id=id;
    loadingVm=loadingVm.$mount();
    dom.appendChild(loadingVm.$el);

    return loadingVm;
};

['global', 'local'].forEach(type => {
    let obj={type};
    Loading[type] = options => {
        options=Object.assign({}, options, obj);
        return Loading(options);
    };
});

Loading.close=(vm) => {
    if (!vm) return;
    if (vm._isDestroyed) return;
    vm.$destroy();
    const dom=vm.$el;
    if (dom) dom.parentNode.removeChild(dom);
};

export default Loading;
