<template>
    <div class="p-picker-panel-content">
        <div class="p-picker-panel-select">
            <ul>
                <li
                        :class="[
                           'p-picker-panel-text',
                           yearNow===ya.year&&'p-picker-panel-text-current',
                           'p-picker-panel-text-'+ya.multiple,
                           'p-picker-panel-text-'+ya.selected,
                           'p-picker-panel-text-'+ya.disabled
                        ]"
                        :lang="ya.selected"
                        v-for="(ya, yai) in yearsArray"
                        :key="'year-'+ya.year+yai"
                        @click="yearClick(ya)"
                        @mouseenter="yearEnter(ya)"
                >
                    <span>{{ya.year}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Year",
        props: {
            yearNow: {
                type: String,
                default: ''
            },
            yearsArray: {
                type: Array,
                default: () => []
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            yearClick(obj) {
                if (obj.disabled) return;
                this.$emit('change', obj)
            },
            yearEnter(obj) {
                if (!this.multiple) return;
                this.$emit('enter', obj)
            }
        }
    }
</script>
