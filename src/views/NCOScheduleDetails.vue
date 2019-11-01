<template>
    <div id="NCOScheduleDetails">
        <div class="top">
            <div class="title">
                <h2>成宜公司【安巡查】009</h2>
                <p @click="toNCOSchedule"><</p>
            </div>
        </div>
        <div class="content">
            <div class="contentTop">
                <div class="topInfo">
                    <p><span>被检查单位</span>TJ2-中铁四局</p>
                    <p><span>被检查记录编号</span>成宜公司【安巡查】009</p>
                    <p><span>检查时间</span>2019-09-03</p>
                </div>
                <div class="projectName">
                    <p><span>存在隐患工程名称</span>深基坑施工</p>
                </div>
                <div class="problems">
                    <h3>检查发现问题</h3>
                    <div class="problemsInfo">
                        <div class="problemsInfoList">
                            <div class="problemsInfoListTitle">
                                <p>103020601</p>
                                <p>Ⅲ级</p>
                            </div>
                            <div>
                                <p>1.灌注前没有二次清孔。</p>
                            </div>
                        </div>
                        <div class="problemsInfoList">
                            <div class="problemsInfoListTitle">
                                <p>103020601</p>
                                <p>Ⅲ级</p>
                            </div>
                            <div>
                                <p>1.灌注前没有二次清孔。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="moreProblemsInfoList">
                    <p>查看更多<span>></span></p>
                </div>
            </div>
            <div class="contentBottom">
                <h3>巡查整改人员流程</h3>
                <div class="process">
                    <div class="processInfo">
                        <div>
                            <img src="../assets/DHDIList/已同意.png">
                        </div>
                        <h4>张瑜佳</h4>
                        <div>
                            <p>检查人</p>
                            <p>成宜项目分公司</p>
                        </div>
                        <p>09.03<span>16:36</span></p>
                    </div>
                    <div class="processInfo">
                        <div>
                            <img src="../assets/DHDIList/已同意.png">
                        </div>
                        <h4>苗争</h4>
                        <div>
                            <p>签收人</p>
                            <p>TJ2-中铁四局</p>
                            <p class="remarks">传阅2人</p>
                        </div>
                        <p>09.03<span>16:36</span></p>
                    </div>
                    <div class="processInfo NSNumber">
                        <div>
                            <img src="../assets/DHDIList/未整改.png">
                        </div>
                        <p>超期5天，未销号</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottomContent">
                <div>
                    <img src="../assets/DHDIList/路径1352.png">
                    <p>催办</p>
                </div>
                <div>
                    <img src="../assets/DHDIList/路径1294.png">
                    <p>评论</p>
                </div>
                <div>
                    <img src="../assets/DHDIList/组1208.png">
                    <p>分享</p>
                </div>
                <div>
                    <img src="../assets/DHDIList/组1209.png">
                    <p>打印</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NCOScheduleDetails",
        methods:{
            toNCOSchedule(){
                this.$router.push({name: 'NCOSchedule'});
            }
        }
    }
</script>

<style scoped lang="stylus">
    #NCOScheduleDetails
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
            color #999
            top 27%
            left 10%
            font-size 1.5rem
            font-weight bold

    .content
        padding 5%
        span
            display inline-block
            margin-right  15px
            color #999
        p,img,h3
            margin 10px 0
        .contentTop
            border-bottom 2px solid #eee
            .projectName
                padding 10px 0
                border-top 1px solid #F5F5F5
                border-bottom 1px solid #F5F5F5
            .problems
                .problemsInfo
                    padding 10px
                    background-color #F2F2F2
                    border-radius 15px
                    .problemsInfoList
                        .problemsInfoListTitle
                            display flex
                            justify-content space-between
                            p
                                margin 0
            .moreProblemsInfoList
                text-align center
                color #1752DB
                margin 10px 0
                span
                    color #1752DB
                    height 13px
                    width 13px
                    font-weight bold

        .contentBottom
            .process
                padding 15px 0
                .processInfo
                    display flex
                    justify-content space-between
                    padding 10px 0
                    border-bottom  1px solid #eee
                    h4
                        padding 10px 0
                    p
                        color #999
                        margin 5px 0
                    span
                        margin-left 5px
                    .remarks
                        color #1752DB
                        border 1px solid #1752DB
                        border-radius 10px
                        text-align center
                .NSNumber
                    align-items center
                    div
                        flex 1
                    p
                        color #ce0c0c
                        flex 4

    .bottom
        position relative
        bottom 0
        background-color #fff
        width 100%
        text-align center
        color #999999
        border-top 2px solid #eee
        .bottomContent
            padding 0 5%
            display flex
            justify-content space-between
            div
                padding 5%
                flex 1
</style>