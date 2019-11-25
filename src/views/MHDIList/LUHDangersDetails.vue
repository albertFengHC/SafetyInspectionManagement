<template>
    <div id="LUHDangersDetails">
        <div class="top">
            <div class="title">
                <h2>{{this.$route.params.fTrapno}}</h2>
                <p @click="toLUHDangers"><</p>
            </div>
        </div>
        <div class="content">
            <div class="contentTop">
                <div class="topInfo">
                    <p><span>被检查单位</span>{{listData.checkTrapDaily.fPassivename}}</p>
                    <p><span>被检查记录编号</span>{{listData.checkTrapDaily.fTrapno}}</p>
                    <p><span>检查时间</span>{{listData.checkTrapDaily.fCheckdates}}</p>
                </div>
                <div class="projectName">
                    <p><span>存在隐患工程名称</span>{{listData.checkTrapDaily.fDangername}}</p>
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
                    <p><span>检查单位</span>{{listData.checkTrapDaily.fCompanyname}}</p>
                    <p><span>经度</span>{{listData.checkTrapDaily.fLatitude}}</p>
                    <p><span>纬度</span>{{listData.checkTrapDaily.fLongitude}}</p>
                    <p><span>发现问题描述</span>{{listData.checkTrapDaily.fProblemdesc}}</p>
                    <p><span>整改要求</span>{{listData.checkTrapDaily.fRequiredesc}}</p>
                    <p><span>排查对象</span>{{listData.checkTrapDaily.fTestobject}}</p>
                    <p><span>隐患类别</span>{{listData.checkTrapDaily.fTrapclass}}</p>
                    <p><span>隐患类型</span>{{listData.checkTrapDaily.fTraptype}}</p>
                    <p><span>检查人</span>{{listData.checkTrapDaily.fCheckname}}</p>
                    <p><span>状态</span>{{listData.checkTrapDaily.fStatus}}</p>
                    <p><span>整改截止日期</span>{{listData.checkTrapDaily.fLastdates}}</p>
                    <p><span>待签收人</span>{{listData.checkTrapDaily.fAcceptname}}</p>
                    <p><span>待传阅人</span>{{listData.checkTrapDaily.fReadname}}</p>
                </div>
<!--                <div class="moreProblemsInfoList">-->
<!--                    <p>查看更多<span>></span></p>-->
<!--                </div>-->
            </div>
            <div class="contentBottom">
                <h3>巡查整改人员流程</h3>
                <div class="process">
                    <div class="processInfo">
                        <div>
                            <img src="../../assets/DHDIList/已同意.png">
                        </div>
                        <h4>{{listData.lrCheckTasks[0].checkName}}</h4>
                        <div>
                            <p>{{listData.lrCheckTasks[0].checkJob}}</p>
                            <p>{{listData.lrCheckTasks[0].checkCompany}}</p>
                        </div>
                        <p>{{listData.lrCheckTasks[0].checkDate}}</p>
                    </div>
                    <div class="processInfo">
                        <div>
                            <img src="../../assets/DHDIList/已同意.png">
                        </div>
                        <h4>{{listData.lrCheckTasks[1].checkName}}</h4>
                        <div>
                            <p>{{listData.lrCheckTasks[1].checkJob}}</p>
                            <p>{{listData.lrCheckTasks[1].checkCompany}}</p>
                            <p class="remarks">{{listData.lrCheckTasks[1].text}}</p>
                        </div>
                        <p>{{listData.lrCheckTasks[1].checkDate}}</p>
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
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {NCOScheduleDetailsUrl} from './../../urlBase';

    export default {
        name: "LUHDangersDetails",
        data(){
            return{
                listData:''
            }
        },
        methods:{
            toLUHDangers(){
                this.$router.push({name: 'LUHDangers'});
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
    #LUHDangersDetails
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

</style>