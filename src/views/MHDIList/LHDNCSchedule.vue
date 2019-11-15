<template>
    <div id="LHDNCSchedule">
        <div class="top">
            <div class="title">
                <p @click="toMHDIList"><</p>
                <h2>未按期已销号统计</h2>
                <div>
                    <div class="num">
                        <h3>86</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="info" @click="toLHDNCScheduleDetails">
                <div class="infoLeft">
                    <h3>安巡查0001</h3>
                    <p>单位名称：成宜项目分公司</p>
                    <p>监察人：张瑜佳</p>
                    <p>检查时间：2019-09-11</p>
                </div>
                <div class="infoRight">超期一天<span>></span></div>
            </div>
        </div>
        <div class="bottom">
            <div>
                <button @click="toMHDIList">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LHDNCSchedule",
        methods:{
            toMHDIList(){
                this.$router.push({name: 'MHDIList'});
            },
            toLHDNCScheduleDetails(){
                this.$router.push({name: 'LHDNCScheduleDetails'});
            }
        }
    }
</script>

<style scoped lang="stylus">
    #LHDNCSchedule
        width 100%
        height 100%
        margin 0
        color #333
        position relative

    .title
        padding 15px
        position relative
        text-align center
        border-bottom 2px solid #EEEEEE
        background-color #1752DB
        color #fff
        display flex
        justify-content space-between
        align-items center
        p
            font-size 1.5rem
            font-weight bold
        .num
            border 1px solid #fff
            border-radius 50%
            height 20px
            width 20px
            display flex
            justify-content center
            align-items center
            padding 5px
            background-color #fff
            color #1752DB

    .content
        margin-bottom 20%
        padding-bottom 15%
        .info
            padding 15px 25px
            display flex
            justify-content space-between
            align-items center
            border-bottom  1px solid #eee
            .infoLeft
                color #9E9E9E
                h3
                    color #333
            .infoRight
                color #1752DB
                span
                    display inline-block
                    color #9E9E9E
                    margin-left 15px
                    font-size 1rem
                    font-weight bold

    .bottom
        position fixed
        bottom 0
        background-color #fff
        width 100%
        text-align center
        div
            padding 5%
        button
            display inline-block
            background-color #1752DB
            color #fff
            width 80%
            height 35px
            padding 5px
            border-radius 15px
            border none
            outline none
</style>