<template>
    <div id="DIPSHazards">
        <div class="topContent">
            <div class="top">
                <h2>安全隐患日常巡查</h2>
                <p @click="toIndex"><span><</span>应用</p>
                <i>新增</i>
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
        </div>
        <div class="boxContent">
            <div class="content">
                <div class="info" @click="toNCOScheduleDetails">
                    <div class="infoLeft">
                        <h3>安巡查0001</h3>
                        <p>单位名称：成宜项目分公司</p>
                        <p>监察人：张瑜佳</p>
                        <p>检查时间：2019-09-11</p>
                    </div>
                    <div class="infoRight">未提交<span>></span></div>
                </div>
                <div class="info" @click="toNCOScheduleDetails">
                    <div class="infoLeft">
                        <h3>安巡查0001</h3>
                        <p>单位名称：成宜项目分公司</p>
                        <p>监察人：张瑜佳</p>
                        <p>检查时间：2019-09-11</p>
                    </div>
                    <div class="infoRight">未提交<span>></span></div>
                </div>
                <div class="info" @click="toNCOScheduleDetails">
                    <div class="infoLeft">
                        <h3>安巡查0001</h3>
                        <p>单位名称：成宜项目分公司</p>
                        <p>监察人：张瑜佳</p>
                        <p>检查时间：2019-09-11</p>
                    </div>
                    <div class="infoRight">未提交<span>></span></div>
                </div>
                <div class="info" @click="toNCOScheduleDetails">
                    <div class="infoLeft">
                        <h3>安巡查0001</h3>
                        <p>单位名称：成宜项目分公司</p>
                        <p>监察人：张瑜佳</p>
                        <p>检查时间：2019-09-11</p>
                    </div>
                    <div class="infoRight">未提交<span>></span></div>
                </div>
                <div class="info" @click="toNCOScheduleDetails">
                    <div class="infoLeft">
                        <h3>安巡查0001</h3>
                        <p>单位名称：成宜项目分公司</p>
                        <p>监察人：张瑜佳</p>
                        <p>检查时间：2019-09-11</p>
                    </div>
                    <div class="infoRight">未提交<span>></span></div>
                </div>
                <div class="info" @click="toNCOScheduleDetails">
                    <div class="infoLeft">
                        <h3>安巡查0001</h3>
                        <p>单位名称：成宜项目分公司</p>
                        <p>监察人：张瑜佳</p>
                        <p>检查时间：2019-09-11</p>
                    </div>
                    <div class="infoRight">未提交<span>></span></div>
                </div>
                <div class="info" @click="toNCOScheduleDetails">
                    <div class="infoLeft">
                        <h3>安巡查0001</h3>
                        <p>单位名称：成宜项目分公司</p>
                        <p>监察人：张瑜佳</p>
                        <p>检查时间：2019-09-11</p>
                    </div>
                    <div class="infoRight">未提交<span>></span></div>
                </div>
            </div>
            <div class="bottom">
                <div>
                    <p :class="{'active':activeClass===1}">未提交</p>
                    <p>待签收</p>
                    <p>拒绝签收</p>
                    <p>已签收</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DIPSHazards",
        data(){
            return{
                activeClass:1
            }
        },
        methods: {
            toIndex() {
                this.$router.push({name: 'index'});
            },
            toNCOScheduleDetails(){

            }
        }
    }
</script>

<style scoped lang="stylus">
    #MHDIList
        width 100%
        height 100%
        margin 0
        color #333
        display flex
        flex-direction column
        justify-content space-between

    .topContent
        flex 1

    .top
        padding 15px
        position relative
        text-align center
        border-bottom 2px solid #EEEEEE
        p
            position absolute
            color #999999
            top 32%
            left 10%
            font-size 1rem
        i
            position absolute
            top 32%
            right 10%
            font-size 1rem
            font-style normal
            color #1752db

    .search
        text-align center
        border-bottom 2px solid #EEEEEE
        border-radius 15px
        box-shadow 0 3px 0 #d6d6d6
        .name, .company
            padding 10px 0
            position relative
            input
                padding 10px
                width 70%
                border-radius 10px
                box-shadow none
                border none
                background-color #F2F2F2
                text-align center
            i
                display inline-block
                width 21px
                height 22px
                background-size 100% 100%
                position absolute
                top 40%
                left 35%

        .name
            i
                background url('../../assets/MHDIList/组611.png') no-repeat

        .company
            i
                background url('../../assets/MHDIList/路径946.png') no-repeat

    .boxContent
        flex 3

    .content
        margin-bottom 20%
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
        text-align center
        position fixed
        bottom 0
        width 100%
        background-color #fff
        div
            padding 5% 10%
            display flex
            justify-content space-between
            p
                border-radius 10px
                border 1px solid #999
                padding 2px 10px
                background-color #999
                color #fff
            .active
                background-color #1752db
                border 1px solid #1752DB

</style>