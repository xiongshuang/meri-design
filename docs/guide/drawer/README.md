### Drawer 抽屉

<template>
    <div class="Button">
        <div class="component component-padding">
            <h1 @click="drawerShow">Drawer组件</h1>
            <Button type="primary" @click="drawerShow">drawerShow</Button>
            <Drawer
                    :show="drawerStatus"
                    title="抽屉"
                    :focus="true"
                    :bottom="true"
                    @close="changeStatus"
                    :loadingMore="loadingMore"
                    @getMore="getMore"
            >
                <template slot="content">
                    <div style="width: 500px;font-size: 20px">
                        123
                        456
                        789
                        <div style="font-size: 16px;" :style="{height: height+'px'}">
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                        </div>
                    </div>
                </template>
                <template slot="handle">
                    <div>
                        <Button type="primary" @click="drawerConfirm">确定</Button>
                        <Button type="default" @click="drawerCancel">取消</Button>
                    </div>
                </template>
            </Drawer>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DrawerView',
        data() {
            return {
                drawerStatus: false,
                loadingMore: false,
                height: 1000
            }
        },
        methods: {
            // 改变抽屉显示状态
            changeStatus(v) {
                this.drawerStatus=v
            },
            // 改变loading状态
            changeLoading(v) {
                this.iconLoading=v
            },
            drawerShow() {
                if (this.drawerStatus) return;
                this.drawerStatus=true;
                console.log(this.drawerStatus);
            },
            drawerConfirm() {
                console.log('alertConfirm')
            },
            drawerCancel() {
                console.log('drawerCancel');
                this.drawerStatus=false;
            },
            getMore() {
                console.log('1::', this.loadingMore);
                this.loadingMore=true;
                console.log('2::', this.loadingMore);
                setTimeout(() => {
                    this.loadingMore=false;
                    this.height=this.height+100;
                }, 3000)
                console.log('3::', this.loadingMore);
            }
        }
    }
</script>

```vue
<template>
    <div class="Button">
        <div class="component component-padding">
            <h1 @click="drawerShow">Drawer组件</h1>
            <Button type="primary" @click="drawerShow">drawerShow</Button>
            <Drawer
                    :show="drawerStatus"
                    title="抽屉"
                    :focus="true"
                    :bottom="true"
                    @close="changeStatus"
                    :loadingMore="loadingMore"
                    @getMore="getMore"
            >
                <template slot="content">
                    <div style="width: 500px;font-size: 20px">
                        123
                        456
                        789
                        <div style="font-size: 16px;" :style="{height: height+'px'}">
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                        </div>
                    </div>
                </template>
                <template slot="handle">
                    <div>
                        <Button type="primary" @click="drawerConfirm">确定</Button>
                        <Button type="default" @click="drawerCancel">取消</Button>
                    </div>
                </template>
            </Drawer>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DrawerView',
        data() {
            return {
                drawerStatus: false,
                loadingMore: false,
                height: 1000
            }
        },
        methods: {
            // 改变抽屉显示状态
            changeStatus(v) {
                this.drawerStatus=v
            },
            // 改变loading状态
            changeLoading(v) {
                this.iconLoading=v
            },
            drawerShow() {
                if (this.drawerStatus) return;
                this.drawerStatus=true;
                console.log(this.drawerStatus);
            },
            drawerConfirm() {
                console.log('alertConfirm')
            },
            drawerCancel() {
                console.log('drawerCancel');
                this.drawerStatus=false;
            },
            getMore() {
                console.log('1::', this.loadingMore);
                this.loadingMore=true;
                console.log('2::', this.loadingMore);
                setTimeout(() => {
                    this.loadingMore=false;
                    this.height=this.height+100;
                }, 3000)
                console.log('3::', this.loadingMore);
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| show    | 侧拉窗显示状态 | Boolean | false | yes     |
| title    | 标题 | String | '' | no     |
| focus    | 开启鼠标失去焦点自动关闭 | Boolean | false | no     |
| bottom    | 底部按钮是否固定在底部 | Boolean | false | no     |
| @close    | 关闭回调 | Function | -- | yes     |
| loadingMore    | 加载更多 | Boolean | false | no     |
| @getMore    | 触底-加载更多数据回调 | Function | -- | no     |
| slot    | content | 主内容 | -- | no     |
| slot    | handle | 底部内容 | -- | no     |