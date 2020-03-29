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

<style lang="stylus" scoped>

</style>
