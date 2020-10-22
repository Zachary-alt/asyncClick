// 注册
let vueAsyncClick = {};
let Helper = {
    getRandomKey() {
        return 'vue-async-' + Math.random().toString().replace(/\D/g, '');
    }
};
// 非异步时间点击等待时长单位ms
let delayTime = 500;
let workSpace = {};
let propEv = {};
vueAsyncClick.install = function (Vue) {
    Vue.directive('asyncClick', {
        bind: function (el, binding, vNode) {
            let {
                event,
                params
            } = binding.value;
            let key = '';

            if (typeof event !== "function") throw 'asyncClick需要绑定一个事件';
            if (el.hasOwnProperty('vue-async-id')) {
                key = el['vue-async-id'];
            } else {
                key = el['vue-async-id'] = Helper.getRandomKey();
                workSpace[key] = {};
            }
            workSpace[key] = {
                event,
                params
            };
            let isWork = true;
            propEv[key] = async function (e) {
                try {
                    if (params === undefined) {
                        workSpace[key].params = [e];
                    } else {
                        workSpace[key].params.push(e);
                    }
                } catch (error) {}
                let _this = vNode.context;
                if (isWork) {
                    isWork = false;
                    let type = Object.prototype.toString.call(workSpace[key].event);
                    await workSpace[key].event.apply(_this, workSpace[key].params);
                    if (['[object AsyncFunction]', '[object Promise]'].includes(type)) {
                        setTimeout(() => {
                            isWork = true;
                        }, 500);
                    } else {
                        setTimeout(() => {
                            isWork = true;
                        }, delayTime);
                    }
                }
            };
            el.addEventListener('click', propEv[key]);
        },
        update: function (el, binding) {
            var key = el['vue-async-id'];
            let {
                event,
                params
            } = binding.value;
            Object.assign(workSpace[key], {
                event,
                params
            });
        },
        unbind: function (el) {
            var key = el['vue-async-id'];
            // var data = workSpace[key];
            // el.removeEventListener('click', data.event);
            propEv[key] && el.removeEventListener('click', propEv[key]);
            delete workSpace[key];
        }
    });
};

export default vueAsyncClick;
