<template>
    <div id="LHDTCancellationDetails">
        <div class="top">
            <div class="title">
                <h2>成宜公司【安巡查】009</h2>
                <p @click="toLHDTCancellation"><</p>
            </div>
        </div>
        <div class="content">
            <div class="contentTop">
                <div class="topInfo">
                    <p><span>被检查单位</span>TJ2-中铁四局</p>
                    <p><span>被检查记录编号</span>成宜公司【安巡查】009</p>
                    <p><span>检查时间</span>2019-09-03</p>
                    <img src="../../assets/DHDIList/组1174.png" class="logoImg">
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
            <div class="contentMId">
                <p><span>整改记录编号</span>TJ4【安整改】001</p>
                <p><span>整改完成时间</span>2019-09-05</p>
                <p><span>整改详情描述</span>按规范要求整改完成</p>
                <div>
                    <span>整改前照片</span>
                    <div class="photoList">
                        <img src="../../assets/DHDIList/现场监控1.png">
                        <img src="../../assets/DHDIList/现场监控2.png">
                        <img src="../../assets/DHDIList/现场监控3.png">
                        <img src="../../assets/DHDIList/现场监控1.png">
                        <img src="../../assets/DHDIList/现场监控2.png">
                        <img src="../../assets/DHDIList/现场监控3.png">
                    </div>
                </div>
                <div>
                    <span>整改后照片</span>
                    <div class="photoList">
                        <img src="../../assets/DHDIList/现场监控4.png">
                        <img src="../../assets/DHDIList/现场监控5.png">
                        <img src="../../assets/DHDIList/现场监控6.png">
                    </div>
                </div>
                <div class="file">
                    <p>整改记录及相关资料</p>
                    <div class="fileContent">
                        <i></i>
                        <p>详情说明</p>
                        <button>预览</button>
                    </div>
                </div>
                <p><span>整改单位负责人</span>苗争</p>
            </div>
            <div class="contentBottom">
                <h3>巡查整改人员流程</h3>
                <div class="process">
                    <div class="processInfo">
                        <div>
                            <img src="../../assets/DHDIList/已同意.png">
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
                            <img src="../../assets/DHDIList/已同意.png">
                        </div>
                        <h4>苗争</h4>
                        <div>
                            <p>签收人</p>
                            <p>TJ2-中铁四局</p>
                            <p class="remarks">传阅2人</p>
                        </div>
                        <p>09.03<span>16:36</span></p>
                    </div>
                    <div class="processInfo">
                        <div>
                            <img src="../../assets/DHDIList/已同意.png">
                        </div>
                        <h4>苗争</h4>
                        <div>
                            <p>整改填报人</p>
                            <p>TJ2-中铁四局</p>
                        </div>
                        <p>09.03<span>16:36</span></p>
                    </div>
                    <div class="processInfo">
                        <div>
                            <img src="../../assets/DHDIList/已同意.png">
                        </div>
                        <h4>张瑜佳</h4>
                        <div>
                            <p>复核验证人</p>
                            <p>TJ2-中铁四局</p>
                        </div>
                        <p>09.03<span>16:36</span></p>
                    </div>
                    <div class="processInfo">
                        <div>
                            <img src="../../assets/DHDIList/已同意.png">
                        </div>
                        <h4>黄蓉</h4>
                        <div>
                            <p>复核验证人</p>
                            <p>TJ2-中铁四局</p>
                            <p class="remarks">抄送3人</p>
                        </div>
                        <p>09.03<span>16:36</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LHDTCancellationDetails",
        methods:{
            toLHDTCancellation(){
                this.$router.push({name: 'LHDTCancellation'});
            }
        }
    }
</script>

<style scoped lang="stylus">
    #LHDTCancellationDetails
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
            .topInfo
                position relative
                .logoImg
                    margin 0
                    position absolute
                    right 5%
                    top 20%
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
</style>