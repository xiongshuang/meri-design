<template>
    <transition name="selectDownUpExtend">
        <div class="p-select-option-box" v-show="optionStatus">
            <SelectOption
                    :selectedId="value"
                    :data="data"
                    @click="optionClick"
            />
        </div>
    </transition>
</template>

<script>
    import SelectOption from '../../SelectOption';
    export default {
        name: "Options",
        components: { SelectOption },
        data() {
            return {
                optionStatus: false,
                value: '',
                data: []
            }
        },
        methods: {
            // 提交当前选择的值
            optionClick(id) {
                /**
                 * 提交绑定的值
                 */
                this.$emit('change', id);
            },
        }
    }
</script>
