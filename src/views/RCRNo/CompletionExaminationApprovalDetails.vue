<template>
    <div id="CompletionExaminationApprovalDetails">
        <div class="top">
            <div class="title">
                <h2>成宜公司【安巡查】009</h2>
                <p @click="toCompletionExaminationApproval"><</p>
            </div>
        </div>
        <div class="content">
            <div class="contentTop">
                <div class="topUser">
                    <div>
                        <img src="../../assets/RCRNo/人员头像864.png">
                    </div>
                    <div class="topUserBottom">
                        <h4>苗争</h4>
                        <p>审批通过</p>
                    </div>
                    <img src="../../assets/RCRNo/审批通过.png" class="logoImg">
                </div>
                <div class="topInfo">
                    <p><span>审批编号</span>20190905163600018409</p>
                    <p><span>所在单位</span>TJ2-中铁四局</p>
                    <p><span>所在部门</span>驻地办</p>
                </div>
                <div class="projectName">
                    <p><span>监察人</span>张瑜佳</p>
                    <p><span>所在单位</span>成宜项目分公司</p>
                    <p><span>所在部门</span>监理安质部</p>
                </div>
                <div class="projectName">
                    <p><span>被检查单位</span>TJ2-中铁四局</p>
                    <p><span>检查记录编号</span>成宜公司【安巡查】009</p>
                    <p><span>存在隐患工程名称</span>深基坑施工</p>
                </div>
                <div class="moreProblemsInfoList">
                    <p>查看更多<span>></span></p>
                </div>
            </div>
            <div class="contentMId">
                <p><span>整改记录编号</span>TJ4【安整改】001</p>
                <p><span>整改完成时间</span>2019-09-05</p>
                <p><span>整改详情描述</span>按规范整改要求完成</p>
                <div>
                    <span>整改前照片</span>
                    <div class="photoList">
                        <img src="../../assets/RCRNo/现场监控1.png">
                        <img src="../../assets/RCRNo/现场监控2.png">
                        <img src="../../assets/RCRNo/现场监控3.png">
                        <img src="../../assets/RCRNo/现场监控1.png">
                        <img src="../../assets/RCRNo/现场监控2.png">
                        <img src="../../assets/RCRNo/现场监控3.png">
                    </div>
                </div>
                <div>
                    <span>整改后照片</span>
                    <div class="photoList">
                        <img src="../../assets/RCRNo/现场监控1.png">
                        <img src="../../assets/RCRNo/现场监控2.png">
                        <img src="../../assets/RCRNo/现场监控3.png">
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
                <div class="process">
                    <div class="processInfo">
                        <div>
                            <img src="../../assets/RCRNo/已同意.png">
                        </div>
                        <h4>苗争</h4>
                        <div>
                            <p>发起申请</p>
                        </div>
                        <p>09.03<span>16:36</span></p>
                    </div>
                    <div class="processInfoCirculant">
                        <div class="processInfoCirculantTop">
                            <div>
                                <img src="../../assets/RCRNo/已同意.png">
                            </div>
                            <h4>张瑜佳</h4>
                            <div>
                                <p class="signedWord">已同意</p>
                            </div>
                            <p>09.03<span>16:36</span></p>
                        </div>
                        <div class="processInfoCirculantBottom">
                            <p>按照规范要求整改，前后对比照片清晰可见，对于局部出现问题做出快速对应解决方案。</p>
                        </div>
                    </div>
                    <div class="processInfo">
                        <div>
                            <img src="../../assets/RCRNo/已同意.png">
                        </div>
                        <h4>黄蓉</h4>
                        <div>
                            <p class="signedWord">已同意</p>
                        </div>
                        <p>09.03<span>16:36</span></p>
                    </div>
                    <div class="processInfoCirculant">
                        <div class="processInfoCirculantTop">
                            <div>
                                <img src="../../assets/RCRNo/抄送人.png">
                            </div>
                            <h4>3人</h4>
                            <div>
                                <p>已抄送(审批通过后，通知传阅人)</p>
                            </div>
                        </div>
                        <div class="processInfoCirculantBottom">
                            <div>
                                <img src="../../assets/RCRNo/人员头像864.png">
                                <p>罗云</p>
                            </div>
                            <div class="rightPerson">
                                <img src="../../assets/RCRNo/人员头像864.png">
                                <p>卫凤</p>
                            </div>
                            <div class="rightPerson">
                                <img src="../../assets/RCRNo/人员头像864.png">
                                <p>吕侍</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CompletionExaminationApprovalDetails",
        methods:{
            toCompletionExaminationApproval(){
                this.$router.push({name: 'CompletionExaminationApproval'});
            }
        }
    }
</script>

<style scoped lang="stylus">
    #CompletionExaminationApprovalDetails
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
                        background url('../../assets/RCRNo/附件.png') no-repeat
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
                /*padding 15px 0*/
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
                .signedWord
                    color #4dbb95
                .processInfoCirculantBottom
                    color #999
                    padding-left 20%
                    overflow hidden
                    text-align center
                    img
                        margin 0
                    p
                        margin 0
                        text-align left
                    div
                        float left
                        margin-right 20px
</style>