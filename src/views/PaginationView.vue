<template>
    <div class="component component-padding">
        <h1>分页组件</h1>
        <br />
        <div class="ms-pagination">
            <h6>默认</h6>
            <Pagination
                :pageCount="1500"
                @change="currentChange"
                @reload-page="reloadPage"
            />
            <br />
            <br />
            <h6>全显</h6>
            <Pagination
                :pageCountShow="true"
                :pageCount="1500"
                :reloadPage="true"
                :pageSizeSetting="true"
                @change="currentChange"
                @reload-page="reloadPage"
            />
            <br>
            <br>
            <h6>简易</h6>
            <Pagination
                :pageCountShow="true"
                :pageCount="1500"
                :simple="true"
                @change="currentChange"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "PaginationView",
    methods: {
        currentChange(currentPage) {
            console.log(currentPage);
        },
        reloadPage(page) {
            console.log(page);
        }
    }
};
</script>
