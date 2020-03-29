<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div
                tabindex="-1"
                ref="groupOption"
                class="p-drop-group-item"
                v-show="optionStatus"
                @blur="dropOptionBlur"
                @wheel.stop
        >
            <div v-for="group in data" :key="group.id">
                <section class="p-drop-item-title">{{group.name}}</section>
                <article
                        :class="['p-drop-group-option', value===item.id&&'p-drop-group-option-selected', item.disabled&&'p-drop-group-option-disable']"
                        v-for="item in group.children"
                        :key="item.id"
                        @click="optionClick(group.id, item.id, item.name, item.disabled)"
                        @mouseenter="optionEnter"
                >{{item.name}}</article>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "DOption",
        data() {
            return {
                position: true, // 动画执行方向
                optionStatus: false, // 下拉菜单状态
                value: '',
                data: []
            }
        },
        watch: {
            optionStatus(n) {
                if (n) {
                    this.$nextTick(() => {
                        this.$refs.groupOption.focus()
                    })
                }
            }
        },
        methods: {
            /**
             * 提交当前选择的值
             * @param pId parentId
             * @param cId childId
             * @param cName childName
             * @param disabled 是否禁用点击
             */
            optionClick(pId, cId, cName, disabled) {
                if (disabled) return;
                this.$emit('change', {cId, cName, pId});
            },
            optionEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            },
            // 鼠标数去焦点
            dropOptionBlur() {
                this.optionStatus=false;
                this.parent.optionStatus=false;
            }
        }
    }
</script>
