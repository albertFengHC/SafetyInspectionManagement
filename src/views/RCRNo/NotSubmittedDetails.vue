<template>
    <div id="NotSubmittedDetails">
        <div class="topContent">
            <div class="top">
                <h2>{{listData.fTrapno}}</h2>
                <p @click="toNotSubmitted"><span><</span></p>
            </div>
        </div>
        <div class="boxContent">
            <div class="content">
                <div class="contentTop">
                    <p><span>检查人</span>{{listData.fCheckname}}</p>
                    <p><span>所在单位</span>{{listData.fCompanyname}}</p>
                </div>
                <div class="contentTop">
                    <p><span>被检查单位</span>{{listData.fTrapno}}</p>
                    <p><span>检查记录编号</span>{{listData.fTrapno}}</p>
                </div>
                <div class="contentTop">
                    <p><span>存在隐患工程名称</span>{{listData.fDangername}}</p>
                    <p><span>检查时间</span>{{listData.fCheckdates}}</p>
                </div>
                <div class="moreProblemsInfoList" @click="toAlreadySignDetailsView">
                    <p>查看更多<span>></span></p>
                </div>
                <h4 class="contentListTitle">整改情况说明</h4>
<!--                <div class="contentList">-->
<!--                    <p><span>*</span>整改单位负责人</p>-->
<!--                    <input type="text" placeholder="请输入整改单位负责人" v-model="fAcceptname">-->
<!--                </div>-->
                <div class="contentList">
                    <p><span>*</span>整改记录编号</p>
                    <input type="text" placeholder="请输入整改记录编号" v-model="fBackno">
                </div>
                <div class="contentList">
                    <p><span>*</span>整改完成时间</p>
                    <Col>
                        <DatePicker type="date" placeholder="整改完成时间" v-model="fFinishdates" @on-change='checkdateValeChange' format="yyyy-MM-dd HH:mm"/>
                    </Col>
                </div>
                <div class="contentList">
                    <p><span>*</span>整改详情描述</p>
                    <div>
                        <input type="text" placeholder="请输入整改详情描述" v-model="fBackdetail">
                    </div>
                </div>
                <div class="contentList">
                    <p><span>*</span>整改情况综述</p>
                    <div>
                        <input type="text" placeholder="请输入整改情况综述" v-model="fBackdesc">
                    </div>
                </div>
                <div class="contentListPhoto">
                    <p>整改前照片</p>
                    <div>
                        <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline">上传整改前照片</Button>
                        </Upload>
                    </div>
                </div>
                <div class="contentListPhoto">
                    <p>整改后照片</p>
                    <div>
                        <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline">上传整改后照片</Button>
                        </Upload>
                    </div>
                </div>
                <div class="contentListFile">
                    <p>整改记录及相关资料</p>
                    <div>
                        <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline">上传整改资料</Button>
                        </Upload>
                    </div>
                </div>
<!--                <div class="contentList">-->
<!--                    <p><span>*</span>整改单位负责人</p>-->
<!--                    <div>-->
<!--                        <input type="text" placeholder="请选择">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="ReceiptProcess">-->
<!--                    <h4>审批流程</h4>-->
<!--                    <div>-->
<!--                        <div class="ReceiptProcessContent">-->
<!--                            <div>-->
<!--                                <h5>审批人</h5>-->
<!--                                <p>请选择审批人</p>-->
<!--                            </div>-->
<!--                            <i><span>+</span></i>-->
<!--                        </div>-->
<!--                        <div class="ReceiptProcessContent">-->
<!--                            <div>-->
<!--                                <h5>抄送人</h5>-->
<!--                                <p>请选择抄送人</p>-->
<!--                            </div>-->
<!--                            <i><span>+</span></i>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
            <div class="bottom">
                <div>
                    <p @click="Submission">提交</p>
                    <p @click="save">保存</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {RRMHDDSUrl,HDRPreservationUrl,HDRSubmissionUrl} from './../../urlBase';

    export default {
        name: "NotSubmittedDetails",
        data(){
            return{
                listData:'',
                allData:'',
                //整改单位负责人
                fAcceptname:'',
                //整改记录编号
                fBackno:'',
                //整改完成时间
                fFinishdates:'',
                //整改详细情况
                fBackdetail:'',
                //整改情况综述
                fBackdesc:'',
            }
        },
        methods:{
            Submission(){
                const that = this;
                let parameter = {
                    fId: this.userInfo.userId,//隐患整改id
                    userId: this.userInfo.realName,//当前用户id
                    userName: this.userInfo.realName,//当前用户姓名
                    fAcceptname: this.userInfo.companyName,//整改单位负责人
                    fBackno: this.fBackno,//整改记录编号
                    fFinishdates: this.fFinishdates,//整改完成时间
                    fBackdetail: this.fBackdetail,//整改详细情况
                    fBackdesc: this.fBackdesc,//整改情况综述
                };
                HDRSubmissionUrl(parameter)
                    .then(function (data) {
                        console.log(data);
                        that.$router.push({name: 'NotSubmitted'});
                    })
                    .catch(data => {

                    });
            },
            save(){
                const that = this;
                let parameter = {
                    fId: this.userInfo.userId,//隐患整改id
                    userId: this.userInfo.realName,//当前用户id
                    userName: this.userInfo.realName,//当前用户姓名
                    fAcceptname: this.userInfo.companyName,//整改单位负责人
                    fBackno: this.fBackno,//整改记录编号
                    fFinishdates: this.fFinishdates,//整改完成时间
                    fBackdetail: this.fBackdetail,//整改详细情况
                    fBackdesc: this.fBackdesc,//整改情况综述
                };
                HDRPreservationUrl(parameter)
                    .then(function (data) {
                        console.log(data);
                        that.$router.push({name: 'NotSubmitted'});
                    })
                    .catch(data => {

                    });
            },
            toNotSubmitted(){
                this.$router.push({name: 'NotSubmitted'});
            },
            toLPHazards(){
                this.$router.push({name: 'LPHazards'});
            },
            toAlreadySignDetailsView(){
                this.$router.push({name: 'AlreadySignDetailsView'});
            },
            getList(){
                const that = this;
                const logInfo = this.userInfo;
                const parameter = {
                    fId: this.$route.params.fId,
                    userId: logInfo.userId,
                };
                RRMHDDSUrl(parameter)
                    .then(function (data) {
                        that.listData = data.checkTrapDaily;
                        that.allData = data;
                        console.log(data);
                    })
                    .catch(data => {

                    });
            },
            checkdateValeChange(data){
                this.fFinishdates = data;
            },
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
    #NotSubmittedDetails
        width 100%
        height 100%
        margin 0
        color #333

    input,select
        background none
        outline none
        border none

    i
        font-style normal

    .top
        padding 15px
        position relative
        text-align center
        border-bottom 2px solid #EEEEEE
        p
            position absolute
            color #999999
            top 25%
            left 10%
            font-size 1.5rem
            font-weight bold

    .content
        margin-bottom 20%
        padding 10px 5%
        padding-bottom 10%
        .contentTop
            padding 5px 0
            border-bottom 1px solid #EEEEEE
            p
                padding 10px 0
            span
                display inline-block
                margin-right  15px
                color #999
        .moreProblemsInfoList
            text-align center
            color #1752DB
            margin 10px 0
            span
                color #1752DB
                height 13px
                width 13px
                font-weight bold
    .contentListTitle
        color #999
        padding 10px
        background-color #F2F2F2
        border 1px solid #E2E2E2
    .contentList
        display flex
        justify-content space-between
        border-bottom 1px solid #EEEEEE
        padding 10px 0
        p
            flex 1
            padding 3px 5px
            span
                display inline-block
                color #ce0c0c
                font-weight bold
        input
            flex 2
            padding 3px 5px
            text-align right
        select
            /*flex 2*/
            padding 3px 5px
            text-align right
            appearance none
            color #757575

    .contentListProblem
        .problems
            .problemsTitle
                display flex
                justify-content space-between
                border-bottom 1px solid #EEEEEE
                padding 15px
                p
                    font-weight bold
                i
                    color #1752db
                    border 1px dashed #1752db
                    border-radius 50%
                    height 15px
                    width 15px
                    font-weight bold
                    display inline-block
                    span
                        display flex
                        justify-content center
                        align-items center
                        height 15px
                        width 15px

    .problemsInfo
        padding 10px
        .problemsInfoList
            padding 15px 10px
            background-color #F2F2F2
            border-radius 15px
            margin 15px 0
            .problemsInfoListTitle
                display flex
                justify-content space-between
                text-align center
                padding-bottom 10px
                font-weight bold
                p
                    margin 0
                i
                    color #fff
                    border 1px dashed #626262
                    background-color #626262
                    border-radius 50%
                    height 15px
                    width 15px
                    font-weight bold
                    display inline-block
                    span
                        display flex
                        justify-content center
                        align-items center
                        height 15px
                        width 15px
            .problemsInfoListContent
                p
                    padding 5px 0

    .contentListPhoto,.contentListFile
        border-bottom 1px solid #EEEEEE
        padding 15px
        p
            font-weight bold
        i
            color #CCCCCC
            border 1px dashed #CCCCCC
            height 15px
            width 15px
            font-weight bold
            display inline-block
            span
                display flex
                justify-content center
                align-items center
                height 15px
                width 15px

    .ReceiptProcess
        padding 15px
        h4
            padding 10px 0
            padding-bottom 20px
        .ReceiptProcessContent
            display flex
            justify-content space-between
            padding-left 15px
            padding-bottom 30px
            i
                color #1752db
                border 1px dashed #1752db
                border-radius 50%
                height 30px
                width 30px
                font-weight bold
                display inline-block
                span
                    display flex
                    justify-content center
                    align-items center
                    height 30px
                    width 30px
            div
                p
                    color #CCCCCC


    .bottom
        text-align center
        position fixed
        bottom 0
        width 100%
        background-color #fff
        border-top 2px solid #eee
        div
            padding 5% 10%
            display flex
            justify-content space-between
            p
                border-radius 10px
                border 1px solid #1752DB
                padding 2px 10px
                background-color #1752db
                color #fff
                flex 1
                margin 0 5%


</style>