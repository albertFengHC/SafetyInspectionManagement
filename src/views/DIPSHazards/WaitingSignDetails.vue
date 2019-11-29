<template>
    <div id="WaitingSignDetails">
        <div class="top">
            <div class="title">
                <h2>{{listData.fTrapno}}</h2>
                <p @click="toWaitingSign"><</p>
            </div>
        </div>
        <div class="content">
            <div class="contentTop">
                <div class="topUser">
                    <div>
                        <img src="../../assets/DHDIList/已同意.png">
                    </div>
                    <div class="topUserBottom">
                        <h4>{{listData.fCheckname}}</h4>
                        <p>{{listData.fStatus}}</p>
                    </div>
                </div>
                <div class="topInfo">
                    <p><span>检查编号</span>{{listData.fTrapno}}</p>
                    <p><span>所在单位</span>{{listData.fCompanyname}}</p>
                </div>
                <div class="projectName">
                    <p><span>被检查单位</span>{{listData.fTrapno}}</p>
                    <p><span>存在隐患工程名称</span>{{listData.fDangername}}</p>
                    <p><span>检查日期</span>{{listData.fCheckdates}}</p>
                </div>
                <div class="projectName">
                    <p><span>经度</span>{{listData.fLatitude}}</p>
                    <p><span>纬度</span>{{listData.fLongitude}}</p>
                </div>
                <div class="problems">
                    <h3>检查发现问题</h3>
                    <div class="problemsInfo">
                        <div class="problemsInfo" v-if="listData.recordMessageItem">
                            <div class="problemsInfoList" v-for="item in listData.recordMessageItem" :value="item.fId" :key="item.fId">
                                <div class="problemsInfoListTitle">
                                    <h4>{{item.fItemno}}</h4>
                                    <h4>{{item.fTraplevel}}</h4>
                                </div>
                                <div class="problemsInfoListContent">
                                    <p>{{item.fItemname}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<!--                <div class="moreProblemsInfoList">-->
<!--                    <p>查看更多<span>></span></p>-->
<!--                </div>-->
            </div>
            <div class="contentMId">
                <p><span>发现问题描述</span>{{listData.fProblemdesc}}</p>
                <p><span>整改要求</span>{{listData.fRequiredesc}}</p>
                <p><span>排查对象</span>{{listData.fTestobject}}</p>
                <p><span>隐患类别</span>{{listData.fTrapclass}}</p>
                <p><span>隐患类型</span>{{listData.fTraptype}}</p>
                <p><span>整改截止日期</span>{{listData.fLastdates}}</p>
                <div>
                    <span>现场照片</span>
                    <div class="photoList" v-if="allData.checkTrapDailyFileList">
                        <img :src="data" v-for="(data,i) in allData.checkTrapDailyFileList" :key="i">
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
                            <img src="../../assets/DHDIList/人员头像864.png">
                        </div>
                        <h4>{{listData.fAcceptname}}</h4>
                        <div>
                            <p>整改责任人</p>
                        </div>
<!--                        <p>{{listData.fCheckdates}}</p>-->
                    </div>
                    <div class="processInfo waitSignPeople">
                        <div>
                            <img src="../../assets/DHDIList/待审批.png">
                        </div>
                        <h4>待签收</h4>
                    </div>
                    <div class="processInfoCirculant">
                        <div class="processInfoCirculantTop">
                            <div>
                                <img src="../../assets/DHDIList/传阅人.png">
                            </div>
                            <h4>{{listData.fReadname}}</h4>
                            <div>
                                <p>需传阅人</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="signAdvice" v-if="allData.isUpdate === 1">
                    <p>签收意见</p>
                    <div>
                        <textarea name="" id="" cols="45" rows="10" v-model="signAdvice"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom" v-if="allData.isUpdate === 1">
            <div class="agreeBtn">
                <button @click="sign">签收</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {HDVSiIUrl,SHDUrl} from './../../urlBase';
    import {mapState} from "vuex";

    export default {
        name: "WaitingSignDetails",
        data(){
            return{
                allData:'',
                listData:'',
                logInfo: '',
                //签收意见
                signAdvice:''
            }
        },
        methods:{
            toWaitingSign(){
                this.$router.push({name: 'WaitingSign'});
            },
            getListData(param){
                const that = this;
                const logInfo = this.userInfo;
                let parameter = {
                    userId: logInfo.userId,
                    fId: this.$route.params.fId,
                };
                HDVSiIUrl(parameter)
                    .then(function (data) {
                        that.listData = data.checkTrapDaily;
                        that.allData = data.checkTrapDailyFileList;
                        console.log(that.listData);
                    })
                    .catch(data => {

                    });
            },
            sign(){
                const that = this;
                const logInfo = this.userInfo;
                let parameter = {
                    userId: logInfo.userId,
                    fId: this.$route.params.fId,
                    userName: logInfo.realName,
                    text: this.signAdvice
                };
                SHDUrl(parameter)
                    .then(function (data) {
                        console.log(data);
                        that.$router.push({name: 'WaitingSign'});
                    })
                    .catch(data => {

                    });
            },
        },
        mounted() {
            this.getListData();
        },
        computed: {
            ...mapState(['userInfo'])
        },
    }
</script>

<style scoped lang="stylus">
    #WaitingSignDetails
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
                .topUserBottom
                    flex 1
                    padding 10px
                    p
                        margin 0
                        margin-top 5px
                        color #e1a14c

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
                /*padding 15px 0*/
                .processInfo
                    display flex
                    justify-content space-between
                    align-items center
                    padding 10px 0
                    border-bottom  1px solid #eee
                    div
                        flex 1
                    h4
                        padding 10px 0
                        flex 2
                    p
                        color #999
                        flex 1
                    span
                        margin-left 5px
                        display none
                        margin-right 0
                    img
                        width 35px
                        height 35px
                    .remarks
                        color #1752DB
                        border 1px solid #1752DB
                        border-radius 10px
                        text-align center
                .waitSignPeople
                    div
                        flex 1
                    h4
                        color #e1a14c
                        flex 3
                        padding-left 1

                .processInfoCirculantTop
                    display flex
                    justify-content space-between
                    align-items center
                    div
                        flex 1
                        p
                            color #999
                    h4
                        flex 2
            .signAdvice
                text-align center
                div
                    margin-top 10px


    .bottom
        bottom 0
        background-color #fff
        width 100%
        text-align center
        color #999999
        border-top 2px solid #eee
        .agreeBtn
            padding 5%
            button
                display inline-block
                background-color #1752db
                color #fff
                width 80%
                height 35px
                padding 5px
                border-radius 15px
                border none
                outline none
</style>