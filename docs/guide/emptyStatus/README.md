### EmptyStatus 空状态

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


### 代码演示

```vue

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


```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 图片类型  | String | '' | No |
| slot    | 插槽内容【title、text、button】  | html | '' | No |


### type
| 可选值  | 
| ------- | 
| '404','500','administration','collect','completed','content','data','download','graph','load','login','message','network','picture','remark','search','statement','table','waitting' |