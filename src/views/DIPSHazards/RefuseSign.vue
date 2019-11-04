<template>
    <div id="RefuseSign">
        <div class="info" @click="toRefuseSignDetails">
            <div class="infoLeft">
                <h3>安巡查0001</h3>
                <p>单位名称：成宜项目分公司</p>
                <p>监察人：张瑜佳</p>
                <p>检查时间：2019-09-11</p>
            </div>
            <div class="infoRight">拒绝签收<span>></span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RefuseSign",
        methods:{
            toRefuseSignDetails(){

            }
        }
    }
</script>

<style scoped lang="stylus">
    .info
        padding 15px 25px
        display flex
        justify-content space-between
        align-items center
        border-bottom 1px solid #eee
        .infoLeft
            color #9E9E9E
            h3
                color #333
        .infoRight
            color #ce0c0c
            font-weight bold
            span
                display inline-block
                color #9E9E9E
                margin-left 15px
                font-size 1rem
                font-weight bold

</style>