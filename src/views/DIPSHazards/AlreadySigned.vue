<template>
    <div id="AlreadySigned">
        <div class="top">
            <div class="title">
                <h2>成宜公司【安巡查】009</h2>
                <p @click="toAlreadySign"><</p>
            </div>
        </div>
        <div class="content">
            <div class="contentTop">
                <div class="topUser">
                    <div>
                        <img src="../../assets/DHDIList/已同意.png">
                    </div>
                    <div class="topUserBottom">
                        <h4>张瑜佳</h4>
                        <p>已签收</p>
                    </div>
                    <img src="../../assets/DHDIList/已签收.png" class="logoImg">
                </div>
                <div class="topInfo">
                    <p><span>签收编号</span>20190905163600018409</p>
                    <p><span>所在单位</span>成宜项目分公司</p>
                    <p><span>所在部门</span>监理安治部</p>
                </div>
                <div class="projectName">
                    <p><span>被检查单位</span>TJ2-中铁四局</p>
                    <p><span>存在隐患工程名称</span>成宜公司【安巡查】009</p>
                    <p><span>检查时间</span>2019-09-02</p>
                </div>
                <div class="projectName">
                    <p><span>存在隐患工程名称</span>深基坑施工</p>
                    <p><span>经度</span>105.5566666</p>
                    <p><span>纬度</span>30.4988899</p>
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
            <div class="contentMId">
                <p><span>问题描述</span>深基坑施工安全</p>
                <p><span>整改要求</span>按规范整改</p>
                <p><span>排查对象</span>主体工程结构部位</p>
                <p><span>隐患类别</span>重大隐患</p>
                <p><span>隐患类型</span>安全隐患</p>
                <p><span>整改截止日期</span>2019-09-03</p>
                <div>
                    <span>现场照片</span>
                    <div class="photoList">
                        <img src="../../assets/DHDIList/现场监控1.png">
                        <img src="../../assets/DHDIList/现场监控2.png">
                        <img src="../../assets/DHDIList/现场监控3.png">
                        <img src="../../assets/DHDIList/现场监控1.png">
                        <img src="../../assets/DHDIList/现场监控2.png">
                        <img src="../../assets/DHDIList/现场监控3.png">
                    </div>
                </div>
                <div class="file">
                    <p>资料附件</p>
                    <div class="fileContent">
                        <i></i>
                        <p>详情说明</p>
                        <button>预览</button>
                    </div>
                </div>
            </div>
            <div class="contentBottom">
                <div class="process">
                    <div class="processInfo">
                        <div>
                            <img src="../../assets/DHDIList/已同意.png">
                        </div>
                        <h4>张瑜佳</h4>
                        <div>
                            <p>检查人</p>
                        </div>
                        <p>09.03<span>16:36</span></p>
                    </div>
                    <div class="processInfo">
                        <div>
                            <img src="../../assets/DHDIList/已同意.png">
                        </div>
                        <h4>苗争</h4>
                        <div>
                            <p class="signedWord">已签收</p>
                        </div>
                        <p>09.03<span>16:36</span></p>
                    </div>
                    <div class="processInfoCirculant">
                        <div class="processInfoCirculantTop">
                            <div>
                                <img src="../../assets/DHDIList/传阅人.png">
                            </div>
                            <h4>2人</h4>
                            <div>
                                <p>已传送(签收通过后，通知传阅人)</p>
                            </div>
                        </div>
                        <div class="processInfoCirculantBottom">
                            <div>
                                <img src="../../assets/DHDIList/已同意.png">
                                <p>罗云</p>
                            </div>
                            <div class="rightPerson">
                                <img src="../../assets/DHDIList/已同意.png">
                                <p>卫凤</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottomContent">
                <div>
                    <img src="../../assets/DHDIList/路径1294.png">
                    <p>评论</p>
                </div>
                <div>
                    <img src="../../assets/DHDIList/组1208.png">
                    <p>分享</p>
                </div>
                <div>
                    <img src="../../assets/DHDIList/组1209.png">
                    <p>打印</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AlreadySigned",
        methods:{
            toAlreadySign(){
                this.$router.push({name: 'AlreadySign'});
            }
        }
    }
</script>

<style scoped lang="stylus">
    #AlreadySigned
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
            .topUser
                display flex
                justify-content space-between
                border-bottom 1px solid #eee
                margin-bottom 10px
                position relative
                .logoImg
                    margin 0
                    position absolute
                    right 5%
                    top 20%
                .topUserBottom
                    flex 1
                    padding 10px
                    p
                        margin 0
                        margin-top 5px

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
        .contentMId
            border-bottom 2px solid #eee
            padding-bottom 20px
            .photoList
                padding 10px 0
                img
                    width 30%
                    height auto
                    margin 0 1.6%
            .file
                color #999
                .fileContent
                    position relative
                    padding 5px 10px
                    padding-left 25px
                    background-color #F2F2F2
                    p
                        margin 0
                    i
                        display inline-block
                        background url('../../assets/DHDIList/附件.png') no-repeat
                        width 13px
                        height 13px
                        position absolute
                        left 5px
                        top 8px
                    button
                        border-radius 10px
                        border 1px solid #999
                        background-color #F2F2F2
                        color #999
                        position absolute
                        right 5px
                        top 5px
                        outline none
        .contentBottom
            .process
                padding 15px 0
                .processInfo
                    display flex
                    justify-content space-between
                    align-items center
                    padding 10px 0
                    border-bottom  1px solid #eee
                    h4
                        padding 10px 0
                    p
                        color #999
                    span
                        margin-left 5px
                    .remarks
                        color #1752DB
                        border 1px solid #1752DB
                        border-radius 10px
                        text-align center
                    .signedWord
                        color #4dbb95
                .processInfoCirculantTop
                    display flex
                    justify-content space-between
                    align-items center
                    p
                        color #999
                .processInfoCirculantBottom
                    color #999
                    padding-left 20%
                    display flex
                    justify-content space-between
                    text-align center
                    img
                        margin 0
                    p
                        margin 0
                    .rightPerson
                        flex 1
                        text-align left
                        margin-left 15px
                        p
                            padding-left 5px

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