import Vue from 'vue';

import MsgBox from './depend/messageBox';
import Msg from './Message';
const MessageBox = Vue.extend(MsgBox);
const MessageConstructor = Vue.extend(Msg);

let vmBox = null // 当前实例盒子
    ,vm = null // 当前实例
    ,instances = [] // 实例组
    ,seed = 0
    ,timers = [];

const Message = (options) => {
    if (Vue.prototype.$isServer) return; // 当前 Vue 实例是否运行于服务器。
    options = options || {};
    if (typeof options === 'string') { // 如果只传入字符串，将其设置为显示的信息
        options = {
            message: options // 这里的message就是message.vue中data中的message
        };
    }
    let id = 'message_' + seed++;

    // 消息提示盒子实例化
    if (!vmBox) {
        vmBox = new MessageBox();
        vmBox=vmBox.$mount();
        document.body.appendChild(vmBox.$el); // 将dom插入body
    }

    vm = new MessageConstructor({ // 实例化一个带有content内容的Notice
        data: options // 在这里将你传过来的参数匹配到message.vue组件的data
    });
    vm.id = id;
    vm = vm.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例

    vm.visible = true; // 这里修改message.vue数据中的visible,这样message组件就显示出来
    vmBox.$el.appendChild(vm.$el);
    vm.$el.style.zIndex=seed + 1001; // 后插入的Notice组件z-index加一，保证能盖在之前的上面
    vm.$el.style.transform='translateZ(0)'; // 解决transform带来的z-index失效
    instances.push(vm);
    Message.setTimer(id, vm);

    return vm;
};

['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options.type = type;
        return Message(options);
    };
});

/**
 * 设置定时器
 * @param id 当前实例id
 * @param vm 当前实例
 */
Message.setTimer = (id, vm) => {
    timers.push(window.setTimeout(() => {
        Message.clearTimer(id, vm);
    }, 3000))
};

Message.clearTimer = (id, vm) => {
    vm.visible = false;
    vm.$el.style.transition='all .3s';
    vm.$el.style.opacity='.5';
    vm.$el.style.transform='translateY(-100%)';
    setTimeout(() => {
        if (!vm || vm._isDestroyed) return;
        vm.$destroy();
        vm.$el.parentNode.removeChild(vm.$el);
        const ind=instances.findIndex(d => d.id === id);
        window.clearTimeout(timers[ind]);
        timers.splice(ind, 1);
        instances.splice(ind, 1);
    }, 300)
};

Message.changeMessage=(vm, msg) => {
    vm.message=msg;
    const len=instances.length;
    for (let i=0; i<len; i++) {
        if (instances[i].id === vm.id) {
            window.clearTimeout(timers[i]);
            timers.splice(i, 1);
            instances.splice(i, 1);

            instances.push(vm);
            Message.setTimer(vm.id, vm);
            return;
        }
    }
};

export default Message;
