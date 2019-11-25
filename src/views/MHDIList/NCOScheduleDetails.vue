<template>
    <div id="NCOScheduleDetails">
        <div class="top">
            <div class="title">
                <h2>{{this.$route.params.fTrapno}}</h2>
                <p @click="toNCOSchedule"><</p>
            </div>
        </div>
        <Tabs>
            <TabPane label="隐患巡查情况">
                <div class="content">
                    <div class="contentTop">
                        <div class="topInfo">
                            <p><span>检查单位</span>{{listData.checkTrapDaily.fCompanyname}}</p>
                            <p><span>检查记录编号</span>{{listData.checkTrapDaily.fTrapno}}</p>
                            <p><span>检查人</span>{{listData.checkTrapDaily.fCheckname}}</p>
                            <p><span>检查时间</span>{{listData.checkTrapDaily.fCheckdates}}</p>
                            <p><span>被检查单位</span>{{listData.checkTrapDaily.fPassivename}}</p>
                            <p><span>要求整改截止时间</span>{{listData.checkTrapDaily.fLastdates}}</p>
                            <p><span>存在隐患工程名称</span>{{listData.checkTrapDaily.fDangername}}</p>
                            <p><span>经度</span>{{listData.checkTrapDaily.fLatitude}}</p>
                            <p><span>纬度</span>{{listData.checkTrapDaily.fLongitude}}</p>
                        </div>
                        <div class="problems">
                            <h3>检查发现问题</h3>
                            <div class="problemsInfo">
                                <div class="problemsInfoList" v-for="data in listData.checkTrapDaily.recordMessageItem" :value="data.fItemno" :key="data.fId">
                                    <div class="problemsInfoListTitle">
                                        <p>{{data.fItemno}}</p>
                                        <p>{{data.fTraplevel}}</p>
                                    </div>
                                    <div>
                                        <p>{{data.fItemname}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p><span>发现问题描述</span>{{listData.checkTrapDaily.fProblemdesc}}</p>
                            <p><span>整改要求</span>{{listData.checkTrapDaily.fRequiredesc}}</p>
                            <p><span>排查对象</span>{{listData.checkTrapDaily.fTestobject}}</p>
                            <p><span>隐患类别</span>{{listData.checkTrapDaily.fTrapclass}}</p>
                            <p><span>隐患类型</span>{{listData.checkTrapDaily.fTraptype}}</p>
                            <p><span>整改截止时间</span>{{listData.checkTrapDaily.fLastdates}}</p>
                            <p><span>整改责任人</span>{{listData.checkTrapDaily.fAcceptname}}</p>
                            <p><span>需传阅人</span>{{listData.checkTrapDaily.fReadname}}</p>
                        </div>
                        <!--                <div class="moreProblemsInfoList">-->
                        <!--                    <p>查看更多<span>></span></p>-->
                        <!--                </div>-->
                    </div>
                    <div class="contentBottom">
                        <h3>巡查整改人员流程</h3>
                        <div class="process">
                            <div class="processInfo" v-for="data in listData.lrCheckTasks" :value="data.checkJob" :key="data.checkJob">
                                <div>
                                    <img src="../../assets/DHDIList/已同意.png">
                                </div>
                                <h4>{{data.checkName}}</h4>
                                <div class="processInfoContent">
                                    <p>{{data.checkJob}}</p>
                                    <p>{{data.checkCompany}}</p>
                                    <p class="remarks" v-show="data.text">{{data.text}}</p>
                                </div>
                                <p>{{data.checkDate}}</p>
                            </div>
                            <div class="processInfo NSNumber">
                                <div>
                                    <img src="../../assets/DHDIList/未整改.png">
                                </div>
                                <p>超期{{this.$route.params.difference}}天，未销号</p>
                            </div>
                        </div>
                    </div>
                </div>
            </TabPane>
            <TabPane label="巡查整改情况">
                <div class="content" v-if="listData.checkTrapBack != null">
                    <div class="contentTop">
                        <div class="topInfo">
                            <p><span>整改记录编号</span>{{listData.checkTrapBack.fBackno}}</p>
                            <p><span>整改填报人</span>{{listData.checkTrapBack.fAcceptname}}</p>
                            <p><span>整改情况综述</span>{{listData.checkTrapBack.fBackdesc}}</p>
                            <p><span>整改详细情况</span>{{listData.checkTrapBack.fBackdetail}}</p>
                            <div class="contentMId">
                                <div>
                                    <span>整改前照片</span>
                                    <div class="photoList">
                                        <img :src="data" v-for="data in listData.backBeforePic">
                                    </div>
                                </div>
                                <div>
                                    <span>整改后照片</span>
                                    <div class="photoList">
                                        <img :src="data" v-for="data in listData.backAfterPic">
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
                            </div>
                            <p><span>整改单位负责人</span>{{listData.checkTrapBack.fAcceptname}}</p>
                            <p><span>整改完成时间</span>{{listData.checkTrapBack.fFinishdates}}</p>
                        </div>
                    </div>
                </div>
            </TabPane>
            <TabPane label="整改复核情况">
                <div class="content" v-if="listData.recordReview != null">
                    <div class="contentTop">
                        <div class="topInfo">
                            <p><span>复核验证人</span>{{listData.recordReview.fReviewname}}</p>
                            <p><span>复核时间</span>{{listData.recordReview.fReviewdates}}</p>
                            <p><span>复核意见</span>{{listData.recordReview.fMessage}}</p>
                            <p><span>复核结果</span>{{listData.recordReview.fStatus}}</p>
                            <p><span>复核照片及资料</span>{{listData.recordReview.fCheckdates}}</p>
                        </div>
                    </div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {NCOScheduleDetailsUrl} from './../../urlBase';

    export default {
        name: "NCOScheduleDetails",
        data(){
            return{
                listData:'',
            }
        },
        methods:{
            toNCOSchedule(){
                this.$router.push({name: 'NCOSchedule'});
            },
            getList(){
                const that = this;
                const logInfo = this.userInfo;
                const parameter = {
                    fId: this.$route.params.fId,
                    userId: logInfo.userId,
                };
                NCOScheduleDetailsUrl(parameter)
                    .then(function (data) {
                        that.listData = data;
                        console.log(data);
                    })
                    .catch(data => {

                    });
            }
        },
        mounted() {
            this.getList();
        },
        computed: {
            ...mapState(['userInfo'])
        },
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
                padding-bottom 15px
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
                        flex 2
                    .processInfoContent
                        flex 3
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

    /*.bottom*/
    /*    position relative*/
    /*    bottom 0*/
    /*    background-color #fff*/
    /*    width 100%*/
    /*    text-align center*/
    /*    color #999999*/
    /*    border-top 2px solid #eee*/
    /*    .bottomContent*/
    /*        padding 0 5%*/
    /*        display flex*/
    /*        justify-content space-between*/
    /*        div*/
    /*            padding 5%*/
    /*            flex 1*/
</style>