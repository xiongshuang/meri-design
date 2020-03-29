<template>
    <div class="p-picker-panel-content">
        <div class="p-picker-panel-select">
            <ul>
                <li
                        :class="[
                           'p-picker-panel-text',
                           (yearNow===ma.year&&monthNow===ma.month)&&'p-picker-panel-text-current',
                           'p-picker-panel-text-'+ma.multiple,
                           'p-picker-panel-text-'+ma.selected,
                           'p-picker-panel-text-'+ma.disabled
                        ]"
                        :lang="ma.selected"
                        v-for="(ma, mai) in monthsArray"
                        :key="'month-'+ma.month+mai"
                        @click="monthClick(ma)"
                        @mouseenter="monthEnter(ma)"
                >
                    <span>{{ma.monthText}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Month",
        props: {
            yearNow: {
                type: String,
                default: ''
            },
            monthNow: {
                type: String,
                default: ''
            },
            monthsArray: {
                type: Array,
                default: () => []
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            monthClick(obj) {
                if (obj.disabled) return;
                this.$emit('change', obj)
            },
            monthEnter(obj) {
                if (!this.multiple || obj.disabled) return;
                this.$emit('enter', obj)
            }
        }
    }
</script>
