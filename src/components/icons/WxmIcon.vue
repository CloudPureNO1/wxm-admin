<template>
    <div class="wxm-icon-index">
        <div class="icon-selected">
            <i class="icon-show">
                <component :is="props.icon" />
            </i>
        </div>

        <el-popover :width="width" placement="right" trigger="click">
            <div class="wxm-icon-box" :style="{'max-height':height+'px'}">
                <el-tabs type="border-card">
                    <el-tab-pane v-for="item in iconList" :key="item.title">
                        <template #label>
                            <span class="custom-tabs-label">
                                <el-icon>
                                    <HomeFilled />
                                </el-icon>
                                <span>{{item.title}}</span>
                            </span>
                        </template>

                        <ul class="icon-list">
                            <li class="icon-item" v-for="icon in item.data" :key="icon" @click="handleSelect(icon)">
                                <span class="item">
                                    <i class="icon">
                                        <component :is="icon" />
                                    </i>
                                    <span class="icon-name">{{icon}}</span>
                                </span>
                            </li>
                        </ul>
                    </el-tab-pane>

                </el-tabs>
            </div>

            <template #reference>
                <el-button>{{$t('Common.selectIcon')}}</el-button>
            </template>
        </el-popover>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useTableHeight } from '../../composable/tableHeight';
const props=defineProps({
    icon:{type:String,default:''}
})

const width = ref(850);
const height = useTableHeight(true, true);
const iconShow=ref()
iconShow.value = computed(()=>{
    return props.icon
});



const iconListSystem: Array<string> = [
    'Plus',
    'Minus',
    'CirclePlus',
    'Search',
    'Female',
    'Male',
    'Aim',
    'House',
    'FullScreen',
    'Loading',
    'Link',
    'Service',
    'Pointer',
    'Star',
    'Notification',
    'Connection',
    'ChatDotRound',
    'Setting',
    'Clock',
    'Position',
    'Discount',
    'Odometer',
    'ChatSquare',
    'ChatRound',
    'ChatLineRound',
    'ChatLineSquare',
    'ChatDotSquare',
    'View',
    'Hide',
    'Unlock',
    'Lock',
    'RefreshRight',
    'RefreshLeft',
    'Refresh',
    'Bell',
    'MuteNotification',
    'User',
    'Check',
    'CircleCheck',
    'Warning',
    'CircleClose',
    'Close',
    'PieChart',
    'More',
    'Compass',
    'Filter',
    'Switch',
    'Select',
    'SemiSelect',
    'CloseBold',
    'EditPen',
    'Edit',
    'Message',
    'MessageBox',
    'TurnOff',
    'Finished',
    'Delete',
    'Crop',
    'SwitchButton',
    'Operation',
    'Open',
    'Remove',
    'ZoomOut',
    'ZoomIn',
    'InfoFilled',
    'CircleCheckFilled',
    'SuccessFilled',
    'WarningFilled',
    'CircleCloseFilled',
    'QuestionFilled',
    'WarnTriangleFilled',
    'UserFilled',
    'MoreFilled',
    'Tools',
    'HomeFilled',
    'Menu',
    'UploadFilled',
    'Avatar',
    'HelpFilled',
    'Share',
    'StarFilled',
    'Comment',
    'Histogram',
    'Grid',
    'Promotion',
    'DeleteFilled',
    'RemoveFilled',
    'CirclePlusFilled',
];
const iconListArrow: Array<string> = [
    'ArrowLeft',
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeftBold',
    'ArrowUpBold',
    'ArrowRightBold',
    'ArrowDownBold',
    'DArrowRight',
    'DArrowLeft',
    'Download',
    'Upload',
    'Top',
    'Bottom',
    'Back',
    'Right',
    'TopRight',
    'TopLeft',
    'BottomRight',
    'BottomLeft',
    'Sort',
    'SortUp',
    'SortDown',
    'Rank',
    'CaretLeft',
    'CaretTop',
    'CaretRight',
    'CaretBottom',
    'DCaret',
    'Expand',
    'Fold',
];
const iconListItems: Array<string> = [
    'Printer',
    'Calendar',
    'CreditCard',
    'Box',
    'Money',
    'Refrigerator',
    'Cpu',
    'Football',
    'Brush',
    'Suitcase',
    'SuitcaseLine',
    'Umbrella',
    'AlarmClock',
    'Medal',
    'GoldMedal',
    'Present',
    'Mouse',
    'Watch',
    'QuartzWatch',
    'Magnet',
    'Help',
    'Soccer',
    'ToiletPaper',
    'ReadingLamp',
    'Paperclip',
    'MagicStick',
    'Basketball',
    'Baseball',
    'Coin',
    'Goods',
    'Sell',
    'SoldOut',
    'Key',
    'ShoppingCart',
    'ShoppingCartFull',
    'ShoppingTrolley',
    'Phone',
    'Scissor',
    'Handbag',
    'ShoppingBag',
    'Trophy',
    'TrophyBase',
    'Stopwatch',
    'Timer',
    'CollectionTag',
    'TakeawayBox',
    'PriceTag',
    'Wallet',
    'Opportunity',
    'PhoneFilled',
    'WalletFilled',
    'GoodsFilled',
    'Flag',
    'BrushFilled',
    'Briefcase',
    'Stamp',
];
const iconListDocument: Array<string> = [
    'DocumentAdd',
    'Document',
    'Notebook',
    'Tickets',
    'Memo',
    'Collection',
    'Postcard',
    'ScaleToOriginal',
    'SetUp',
    'DocumentDelete',
    'DocumentChecked',
    'DataBoard',
    'DataAnalysis',
    'CopyDocument',
    'FolderChecked',
    'Files',
    'Folder',
    'FolderDelete',
    'FolderRemove',
    'FolderOpened',
    'DocumentCopy',
    'DocumentRemove',
    'FolderAdd',
    'FirstAidKit',
    'Reading',
    'DataLine',
    'Management',
    'Checked',
    'Ticket',
    'Failed',
    'TrendCharts',
    'List',
];
const iconListMedia: Array<string> = [
    'Microphone',
    'Mute',
    'Mic',
    'VideoPause',
    'VideoCamera',
    'VideoPlay',
    'Headset',
    'Monitor',
    'Film',
    'Camera',
    'Picture',
    'PictureRounded',
    'Iphone',
    'Cellphone',
    'VideoCameraFilled',
    'PictureFilled',
    'Platform',
    'CameraFilled',
    'BellFilled',
];
const iconListTraffic: Array<string> = [
    'Location',
    'LocationInformation',
    'DeleteLocation',
    'Coordinate',
    'Bicycle',
    'OfficeBuilding',
    'School',
    'Guide',
    'AddLocation',
    'MapLocation',
    'Place',
    'LocationFilled',
    'Van',
];
const iconListFood: Array<string> = [
    'Watermelon',
    'Pear',
    'NoSmoking',
    'Smoking',
    'Mug',
    'GobletSquareFull',
    'GobletFull',
    'KnifeFork',
    'Sugar',
    'Bowl',
    'MilkTea',
    'Lollipop',
    'Coffee',
    'Chicken',
    'Dish',
    'IceTea',
    'ColdDrink',
    'CoffeeCup',
    'DishDot',
    'IceDrink',
    'IceCream',
    'Dessert',
    'IceCreamSquare',
    'ForkSpoon',
    'IceCreamRound',
    'Food',
    'HotWater',
    'Grape',
    'Fries',
    'Apple',
    'Burger',
    'Goblet',
    'GobletSquare',
    'Orange',
    'Cherry',
];
const iconListWeather: Array<string> = [
    'Sunrise',
    'Sunny',
    'Ship',
    'MostlyCloudy',
    'PartlyCloudy',
    'Sunset',
    'Drizzling',
    'Pouring',
    'Cloudy',
    'Moon',
    'MoonNight',
    'Lightning',
];
const iconListOther: Array<string> = [
    'ChromeFilled',
    'Eleme',
    'ElemeFilled',
    'ElementPlus',
    'Shop',
    'SwitchFilled',
    'WindPower',
];

type IconType = {
    title: string;
    data: Array<string>;
};
const iconList: Array<IconType> = [
    { title: 'System', data: iconListSystem },
    { title: 'Arrow', data: iconListArrow },
    { title: 'Items', data: iconListItems },
    { title: 'Document', data: iconListDocument },
    { title: 'Media', data: iconListMedia },
    { title: 'Traffic', data: iconListTraffic },
    { title: 'Food', data: iconListFood },
    { title: 'Weather', data: iconListWeather },
    { title: 'Other', data: iconListOther },
];

const emit=defineEmits(['selected'])
const handleSelect = (icon: string) => {
    iconShow.value = icon
    emit('selected',icon)
};
 
 
</script>

<style scoped lang="scss">
.wxm-icon-index {
    // flex
    display: flex;
    flex-direction: row; // 行
    flex-wrap: nowrap; // 不换行
    justify-content: flex-start; // 两边均匀排列
    align-items: center; // 垂直居中


    .icon-selected {
        .icon-show {
            font-size: 20px;
            --color: inherit;
            height: 1.25em;
            width: 1.25em;
            line-height: 1.25em;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            fill: currentColor;
            color: var(--color);
            font-size: inherit;
            margin-right: 1rem;
        }
    }
}

.wxm-icon-box {
    overflow: auto; //滚动条
    ul {
        // display: block;
        // list-style-type: disc;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }

    ul {
        // padding-left: 1.25em;
        margin: 1rem 0;
        line-height: 1.7;

        li {
            display: list-item;
            // text-align: -webkit-match-parent;
        }
    }

    .icon-list {
        overflow: hidden;
        list-style: none;
        padding: 0 !important;
        border-top: 1px solid var(--el-border-color);
        border-left: 1px solid var(--el-border-color);
        border-radius: 4px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);

        .icon-item {
            text-align: center;
            color: var(--el-text-color-regular);
            height: 90px;
            font-size: 13px;
            border-right: 1px solid var(--el-border-color);
            border-bottom: 1px solid var(--el-border-color);
            transition: background-color var(--el-transition-duration);

            &:hover{
                color: #5cb6ff
            }
            .item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                cursor: pointer;

                .icon {
                    font-size: 20px;
                    --color: inherit;
                    height: 1.75em;
                    width: 1.75em;
                    line-height: 1.75em;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    fill: currentColor;
                    color: var(--color);
                    font-size: inherit;
                }

                .icon-name {
                    margin-top: 8px;
                }
            }
        }
    }


    *,
    :before,
    :after {
        box-sizing: border-box;
    }
 
}
</style>
