<template>
    <div>
        <h2>空状态组件</h2>
        <div class="empty-display">
            <EmptyStatus type="404" />
        </div>
        <div class="empty-display">
            <EmptyStatus type="500">
                <template slot="title">
                    <div style="margin-bottom: 12px;font-size: 16px; color: #1f2429">这是500状态</div>
                </template>
                <template slot="text">
                    <div style="margin-bottom: 12px;font-size: 14px; color: #8d9399">500</div>
                </template>
                <template slot="button">
                    <div>
                        <Button type="default">按钮</Button>
                    </div>
                </template>
            </EmptyStatus>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmptyStatusView'
    
}
</script>