<template>
    <div class="ComponentLists">
        <List :data="listData" />
    </div>
</template>

<script>
    import List from './List'
    export default {
        name: 'ComponentLists',
        components: { List },
        computed: {
            listData() {
                return [
                    {title: 'Button', more: '按钮', url: 'buttonView'},
                    {title: 'DropDownButton', more: '下拉按钮', url: 'dropDownButtonView'},
                    {title: 'Modal', more: '弹窗', url: 'ModalView'},
                    {title: 'Drawer', more: '抽屉', url: 'drawerView'},
                    {title: 'Toggle', more: '开关', url: 'toggleView'},
                    {title: 'Dropdown', more: '下拉菜单', url: 'dropdownView'},
                    {title: 'DropGroup', more: '下拉菜单组', url: 'dropGroupView'},
                    {title: 'Select', more: '下拉列表', url: 'selectView'},
                    {title: 'Badge', more: '徽标', url: 'badgeView'},
                    {title: 'Divider', more: '分割线', url: 'dividerView'},
                    {title: 'CarouselText', more: '文字轮播', url: 'carouselTextView'},
                    {title: 'Tabs', more: '标签页', url: 'tabsView'},
                    {title: 'Breadcrumb', more: '面包屑', url: 'breadcrumbView'},
                    {title: 'PickerTime', more: '时分秒选择', url: 'pickerTimeView'},
                    {title: 'PickerDate', more: '时间选择器', url: 'pickerDateView'},
                    // {title: 'PickerDay', more: '日选择', url: 'pickerDayView'},
                    // {title: 'PickerWeek', more: '周选择', url: 'pickerWeekView'},
                    // {title: 'PickerMonth', more: '月选择', url: 'pickerMonthView'},
                    // {title: 'PickerYear', more: '年选择', url: 'pickerYearView'},
                    {title: 'Tree', more: '树形结构', url: 'treeView'},
                    {title: 'TreeStage', more: '树形结构-2种特殊情况', url: 'treeStageView'},
                    {title: 'TreeBi', more: '树形结构-BI', url: 'treeBiView'},
                    {title: 'Shake', more: '抖动', url: 'shakeView'},
                    {title: 'TopNotification', more: '置顶条', url: 'topNotificationView'},
                    {title: 'Tag', more: '标签', url: 'tagView'},
                    {title: 'Transfer', more: '穿梭框', url: 'transferView'},
                    {title: 'TransferSelectModal', more: '穿梭框-selectModal', url: 'transferSelectModalView'},
                    {title: 'TransferMini', more: '穿梭框-TransferMini', url: 'transferMiniView'},
                    {title: 'Avatar', more: '头像', url: 'avatarView'},
                    {title: 'FileUpload', more: '文件上传', url: 'fileUploadView'},
                    {title: 'ImageUpload', more: '图片上传', url: 'imageUploadView'},
                    {title: 'Tooltip', more: '省略内容提示', url: 'tooltipView'},
                    {title: 'Table', more: '表格', url: 'tableView'},
                    {title: 'Pagination', more: '分页-pagination', url: 'paginationView'},

                    {title: 'Headers', more: '头部title', url: 'headersView'},

                    {title: 'Message', more: '信息提示', url: 'messageView'},
                    {title: 'IndexLoading', more: '首页加载动画', url: 'indexLoadingView'},
                    {title: 'Loading', more: '加载动画', url: 'loadingView'},

                    {title: 'Checkbox', more: '复选框', url: 'checkboxView'},
                    {title: 'CheckboxGroup', more: '组合多选框-CheckboxGroupView', url: 'CheckboxGroupView'},
                    {title: 'Radio', more: '单选框', url: 'radioView'},
                    {title: 'RadioGroup', more: '组合单选框-RadioGroupView', url: 'RadioGroupView'},
                    {title: 'TreeSelect', more: '树选择', url: 'treeSelectView'},
                    {title: 'Cascader', more: '级联选择', url: 'cascaderView'},
                    {title: 'EmptyStatus', more: '空状态', url: 'emptyStatusView'},


                    // 未公开组件
                    {title: 'Input', more: '输入框', url: 'inputView'},
                    {title: 'Icon', more: '图标', url: 'iconView'},
                    {title: 'Popover', more: '气泡框', url: 'popoverView'}
                ]
            }
        },
    }
</script>

<style lang="stylus" scoped>
</style>
