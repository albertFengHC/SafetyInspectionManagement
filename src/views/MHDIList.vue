<template>
    <div id="MHDIList">
        <div class="top">
            <h2>隐患排查清单管理</h2>
            <p><span><</span>应用</p>
        </div>
        <div class="search">
            <div class="name">
                <i></i>
                <input type="text" placeholder="请输入姓名">
            </div>
            <div class="company">
                <i></i>
                <input type="text" placeholder="请选择单位">
            </div>
        </div>
        <div class="content">
            <div class="label" ref="label"></div>
        </div>
        <div class="bottom">
            <div v-for="data in dataNameList">
                <h4>111</h4>
                <p>{{data}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MHDIList",
        data(){
          return{
              dataNameList: ['未按期未销号','未销号','未按期已销号','按期销号']
          }
        },
        methods:{

        },

    }
</script>

<style scoped lang="stylus">
    #MHDIList
        width 100%
        height 100%
        margin 0
        display flex
        flex-direction column
        justify-content space-between
        div
            flex 1
        .content
            flex 7

</style>