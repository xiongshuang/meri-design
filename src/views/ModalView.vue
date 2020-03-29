<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Modal组件</h1>
            <h3>1.默认模态框</h3>
            <Button type="primary" @click="modalShowDefault">modalShowDefault</Button>
            <h3>2.全屏模态框</h3>
            <Button type="primary" @click="modalShowFull">modalShowFull</Button>
            <h3>2.最小模态框</h3>
            <Button type="primary" @click="modalShowSmall">modalShowSmall</Button>
            <!--
                组件说明:
                    show
                    title
                    iconLoading
                    mode full-全屏显示 default-(默认值)自适应宽高 small-最小对话框
                    close
                    confirm
            -->
            <Modal
                    :show="modalStatusDefault"
                    title="弹窗提示"
                    :iconLoading="true"
                    mode="default"
                    @close="modalClose"
                    @confirm="modalConfirm"
            >
                <template #content>
                    <div style="font-size: 20px; width: 600px">
                        123
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br>
                        <br><br><br><br>
<!--                        <br><br><br><br><br><br><br><br>-->
                        456
                    </div>
                </template>
                <template #handle>
                    <Button @click="tap" type="default">default</Button>
                    <Button @click="tap" type="primary">primary</Button>
                </template>
            </Modal>
            <Modal
                    :show="modalStatusFull"
                    title="弹窗提示Full"
                    :iconLoading="true"
                    mode="full"
                    @close="modalClose"
                    @confirm="modalConfirm"
            >
                <template #content>
                    <div style="font-size: 20px; width: 600px">
                        123
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
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        456
                    </div>
                </template>
                <template #handle>
                    <Button @click="tap" type="default">default</Button>
                    <Button @click="tap" type="primary">primary</Button>
                </template>
            </Modal>
            <Modal
                    :show="modalStatusSmall"
                    title="弹窗提示"
                    :iconLoading="true"
                    mode="small"
                    type="info"
                    @close="modalClose"
                    @confirm="modalConfirm"
            >
                <template #content>
                    <div style="font-size: 14px;">
                        提示内容提示内容
                    </div>
                </template>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ModalView',
        data() {
            return {
                modalStatusDefault: false,
                modalStatusFull: false,
                modalStatusSmall: false,
            }
        },
        methods: {
            modalShowDefault() {
                this.modalStatusDefault=true
            },
            modalShowFull() {
                this.modalStatusFull=true
            },
            modalShowSmall() {
                this.modalStatusSmall=true
            },
            modalClose() {
                this.modalStatusDefault=false;
                this.modalStatusFull=false;
                this.modalStatusSmall=false;
            },
            modalConfirm() {
                console.log('alertConfirm')
            },
            tap () {
                console.log('click')
            }
        }
    }
</script>

<style lang="stylus" scoped>
.component
    h3
        margin 8px
        font-size 16px

</style>
