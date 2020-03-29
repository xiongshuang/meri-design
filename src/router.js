import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import ComponentLists from './views/ComponentLists';
import ButtonView from './views/ButtonView';
import DropDownButtonView from './views/DropDownButtonView';
import ModalView from './views/ModalView';
import DrawerView from './views/DrawerView';
import ToggleView from './views/ToggleView';
import DropdownView from './views/DropdownView';
import DropGroupView from './views/DropGroupView';
import SelectView from './views/SelectView';
import BadgeView from './views/BadgeView';
import DividerView from './views/DividerView';
import CarouselTextView from './views/CarouselTextView';
import TabsView from './views/TabsView';
import HeadersView from './views/HeadersView';
import BreadcrumbView from './views/BreadcrumbView';

import PickerTimeView from './views/PickerTimeView';
import PickerDateView from './views/PickerDateView';
// import PickerDayView from './views/PickerDayView';
// import PickerWeekView from './views/PickerWeekView';
// import PickerYearView from './views/PickerYearView';
// import PickerMonthView from './views/PickerMonthView';
import TreeView from './views/TreeView';
import TreeStageView from './views/TreeStageView';
import TreeBiView from './views/TreeBiView';
import ShakeView from './views/ShakeView';
import TopNotificationView from './views/TopNotificationView';
import TagView from './views/TagView';
import TransferView from './views/TransferView';
import TransferSelectModalView from './views/TransferSelectModalView';
import TransferMiniView from './views/TransferMiniView';
import AvatarView from './views/AvatarView';
import FileUploadView from './views/FileUploadView';
import ImageUploadView from './views/ImageUploadView';
import TooltipView from './views/TooltipView';
import TableView from './views/TableView';
import PaginationView from './views/PaginationView';
import PopoverView from './views/PopoverView';
import IconView from './views/IconView';
import TreeSelectView from './views/TreeSelectView';
import CascaderView from './views/CascaderView.vue'
import EmptyStatusView from './views/EmptyStatusView.vue'

import CheckboxView from './views/CheckboxView';
import CheckboxGroupView from './views/CheckboxGroupView';
import RadioView from './views/RadioView';
import RadioGroupView from './views/RadioGroupView';
import InputView from './views/InputView';

import MessageView from './views/MessageView';
import LoadingView from './views/LoadingView';
import IndexLoadingView from './views/IndexLoadingView';

export default new Router({
    // mode: 'history',
    // scrollBehavior: () => ({x: 0, y: 0}),
    // linkActiveClass: 'activeStyle',
    routes: [
        {
            path: '/componentLists',
            name: 'Meri design',
            component: ComponentLists,
            meta: {
                title: 'ComponentLists'
            }
        },

        {
            path: '/buttonView',
            name: 'ButtonView',
            component: ButtonView,
            meta: {
                title: 'ButtonView'
            }
        },
        {
            path: '/dropDownButtonView',
            name: 'DropDownButtonView',
            component: DropDownButtonView,
            meta: {
                title: 'DropDownButtonView'
            }
        },
        {
            path: '/modalView',
            name: 'ModalView',
            component: ModalView,
            meta: {
                title: 'ModalView'
            }
        },
        {
            path: '/drawerView',
            name: 'DrawerView',
            component: DrawerView,
            meta: {
                title: 'DrawerView'
            }
        },
        {
            path: '/dropGroupView',
            name: 'DropGroupView',
            component: DropGroupView,
            meta: {
                title: 'DropGroupView'
            }
        },
        {
            path: '/toggleView',
            name: 'ToggleView',
            component: ToggleView,
            meta: {
                title: 'ToggleView'
            }
        },
        {
            path: '/selectView',
            name: 'SelectView',
            component: SelectView,
            meta: {
                title: 'SelectView'
            }
        },
        {
            path: '/dropdownView',
            name: 'DropdownView',
            component: DropdownView,
            meta: {
                title: 'DropdownView'
            }
        },
        {
            path: '/badgeView',
            name: 'BadgeView',
            component: BadgeView,
            meta: {
                title: 'BadgeView'
            }
        },
        {
            path: '/dividerView',
            name: 'DividerView',
            component: DividerView,
            meta: {
                title: 'DividerView'
            }
        },
        {
            path: '/carouselTextView',
            name: 'CarouselTextView',
            component: CarouselTextView,
            meta: {
                title: 'CarouselTextView'
            }
        },
        {
            path: '/tabsView',
            name: 'TabsView',
            component: TabsView,
            meta: {
                title: 'TabsView'
            }
        },
        {
            path: '/breadcrumbView',
            name: 'BreadcrumbView',
            component: BreadcrumbView,
            meta: {
                title: 'BreadcrumbView'
            }
        },

        // 组合组件
        {
            path: '/headersView',
            name: 'HeadersView',
            component: HeadersView,
            meta: {
                title: 'HeadersView'
            }
        },
        {
            path: '/pickerTimeView',
            name: 'PickerTimeView',
            component: PickerTimeView,
            meta: {
                title: 'PickerTimeView'
            }
        },
        // {
        //     path: '/pickerDayView',
        //     name: 'PickerDayView',
        //     component: PickerDayView,
        //     meta: {
        //         title: 'PickerDayView'
        //     }
        // },
        {
            path: '/pickerDateView',
            name: 'PickerDateView',
            component: PickerDateView,
            meta: {
                title: 'PickerDateView'
            }
        },
        // {
        //     path: '/pickerWeekView',
        //     name: 'PickerWeekView',
        //     component: PickerWeekView,
        //     meta: {
        //         title: 'PickerWeekView'
        //     }
        // },
        // {
        //     path: '/pickerYearView',
        //     name: 'PickerYearView',
        //     component: PickerYearView,
        //     meta: {
        //         title: 'PickerYearView'
        //     }
        // },
        // {
        //     path: '/pickerMonthView',
        //     name: 'PickerMonthView',
        //     component: PickerMonthView,
        //     meta: {
        //         title: 'PickerMonthView'
        //     }
        // },
        {
            path: '/treeView',
            name: 'TreeView',
            component: TreeView,
            meta: {
                title: 'TreeView'
            }
        },
        {
            path: '/treeStageView',
            name: 'TreeStageView',
            component: TreeStageView,
            meta: {
                title: 'TreeStageView'
            }
        },
        {
            path: '/treeBiView',
            name: 'TreeBiView',
            component: TreeBiView,
            meta: {
                title: 'TreeBiView'
            }
        },
        {
            path: '/shakeView',
            name: 'ShakeView',
            component: ShakeView,
            meta: {
                title: 'ShakeView'
            }
        },
        {
            path: '/topNotificationView',
            name: 'TopNotificationView',
            component: TopNotificationView,
            meta: {
                title: 'TopNotificationView'
            }
        },
        {
            path: '/tagView',
            name: 'TagView',
            component: TagView,
            meta: {
                title: 'TagView'
            }
        },
        {
            path: '/transferView',
            name: 'TransferView',
            component: TransferView,
            meta: {
                title: 'TransferView'
            }
        },
        {
            path: '/transferSelectModalView',
            name: 'TransferSelectModalView',
            component: TransferSelectModalView,
            meta: {
                title: 'TransferSelectModalView'
            }
        },
        {
            path: '/transferMiniView',
            name: 'TransferMiniView',
            component: TransferMiniView,
            meta: {
                title: 'TransferMiniView'
            }
        },
        {
            path: '/avatarView',
            name: 'AvatarView',
            component: AvatarView,
            meta: {
                title: 'AvatarView'
            }
        },
        {
            path: '/fileUploadView',
            name: 'FileUploadView',
            component: FileUploadView,
            meta: {
                title: 'FileUploadView'
            }
        },
        {
            path: '/imageUploadView',
            name: 'ImageUploadView',
            component: ImageUploadView,
            meta: {
                title: 'ImageUploadView'
            }
        },

        // 函数组件
        {
            path: '/messageView',
            name: 'MessageView',
            component: MessageView,
            meta: {
                title: 'MessageView'
            }
        },
        {
            path: '/loadingView',
            name: 'LoadingView',
            component: LoadingView,
            meta: {
                title: 'LoadingView'
            }
        },
        {
            path: '/indexLoadingView',
            name: 'IndexLoadingView',
            component: IndexLoadingView,
            meta: {
                title: 'IndexLoadingView'
            }
        },

        {
            path: '/tooltipView',
            name: 'TooltipView',
            component: TooltipView,
            meta: {
                title: 'TooltipView'
            }
        },
        {
            path: '/checkboxView',
            name: 'CheckboxView',
            component: CheckboxView,
            meta: {
                title: 'CheckboxView'
            }
        },
        {
            path: '/CheckboxGroupView',
            name: 'CheckboxGroupView',
            component: CheckboxGroupView,
            meta: {
                title: 'CheckboxGroupView'
            }
        },
        {
            path: '/radioView',
            name: 'RadioView',
            component: RadioView,
            meta: {
                title: 'RadioView'
            }
        },
        {
            path: '/RadioGroupView',
            name: 'RadioGroupView',
            component: RadioGroupView,
            meta: {
                title: 'RadioGroupView'
            }
        },
        {
            path: '/iconView',
            name: 'IconView',
            component: IconView,
            meta: {
                title: 'IconView'
            }
        },
        {
            path: '/treeSelectView',
            name: 'TreeSelectView',
            component: TreeSelectView,
            meta: {
                title: 'TreeSelectView'
            }
        },
        {
            path: '/cascaderView',
            name: 'CascaderView',
            component: CascaderView,
            meta: {
                title: 'CascaderView'
            }
        },
        {
            path: '/emptyStatusView',
            name: 'EmptyStatusView',
            component: EmptyStatusView,
            meta: {
                title: 'EmptyStatusView'
            }
        },
        {
            path: '/popoverView',
            name: 'PopoverView',
            component: PopoverView,
            meta: {
                title: 'PopoverView'
            }
        },
        {
            path: '/tableView',
            name: 'TableView',
            component: TableView,
            meta: {
                title: 'TableView'
            }
        },
        {
            path: '/paginationView',
            name: 'PaginationView',
            component: PaginationView,
            meta: {
                title: 'PaginationView'
            }
        },

        // 未公开组件
        {
            path: '/inputView',
            name: 'InputView',
            component: InputView,
            meta: {
                title: 'InputView'
            }
        },

        {
            path: '/',
            redirect: '/componentLists'
        }
    ]
});
