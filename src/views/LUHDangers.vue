<template>
    <div id="LUHDangers">
        <div class="top">
            <div class="title">
                <h2>未销号隐患清单</h2>
                <p @click="toMHDIList"><</p>
            </div>
            <div class="topContent">
                <div class="circle">
                    <div>
                        <div class="num">
                            <h2>86</h2>
                        </div>
                    </div>
                </div>
                <h3 class="name">未销号</h3>
            </div>
        </div>
        <div class="content">
            <div class="info" @click="toLUHDangersDetails">
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
        name: "LUHDangers",
        methods:{
            toMHDIList(){
                this.$router.push({name: 'MHDIList'});
            },
            toLUHDangersDetails(){
                this.$router.push({name: 'LUHDangersDetails'});
            }
        }
    }
</script>

<style scoped lang="stylus">
    #LUHDangers
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
        p
            position absolute
            color #999999
            top 27%
            left 10%
            font-size 1.5rem
            font-weight bold

    .topContent
        text-align center
        border-bottom 2px solid #EEEEEE
        border-bottom-right-radius 15px
        border-bottom-left-radius 15px
        box-shadow 0 3px 0 #d6d6d6
        background-color #E1A14C
        color #fff
        padding 30px
        display flex
        flex-direction column
        justify-content space-between
        align-items center
        .circle
            border 1px solid #fff
            border-radius 50%
            height 100px
            width 100px
            line-height 100px
            display flex
            justify-content center
            align-items center
            margin-bottom 15px
            div
                border 1px solid #fff
                border-radius 50%
                height 80%
                width 80%
                display flex
                justify-content center
                align-items center
            .num
                background-color #fff
                color #E1A14C
        .name
            h3
                font-size 1.2rem

    .content
        .info
            padding 15px 25px
            display flex
            justify-content space-between
            align-items center
            .infoLeft
                color #9E9E9E
                h3
                    color #333
            .infoRight
                color #E1A14C
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