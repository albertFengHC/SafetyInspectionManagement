<template>
    <div id="ApprovalPendingDetails">
        <div class="top">
            <div class="title">
                <h2>{{checkTrapDaily.fTrapno}}</h2>
                <p @click="toApprovalPending"><</p>
            </div>
        </div>
        <div class="content">
            <div class="contentTop">
                <div class="topUser">
                    <div>
                        <img src="../../assets/RCRNo/人员头像864.png">
                    </div>
                    <div class="topUserBottom">
                        <h4>{{checkTrapDaily.fCheckname}}</h4>
                        <p>{{checkTrapDaily.fStatus}}</p>
                    </div>
                </div>
                <div class="topInfo">
                    <p><span>检查人</span>{{checkTrapDaily.fCheckname}}</p>
                    <p><span>所在单位</span>{{checkTrapDaily.fCompanyname}}</p>
                </div>
                <div class="contentTop">
                    <p><span>被检查单位</span>{{checkTrapDaily.fPassivename}}</p>
                    <p><span>检查记录编号</span>{{checkTrapDaily.fTrapno}}</p>
                </div>
                <div class="contentTop">
                    <p><span>存在隐患工程名称</span>{{checkTrapDaily.fDangername}}</p>
                    <p><span>检查时间</span>{{checkTrapDaily.fCheckdates}}</p>
                </div>
<!--                <div class="moreProblemsInfoList">-->
<!--                    <p>查看更多<span>></span></p>-->
<!--                </div>-->
            </div>
            <div class="contentMId">
                <p><span>整改记录编号</span>{{checkTrapBack.fBackno}}</p>
                <p><span>整改情况综述</span>{{checkTrapBack.fBackdesc}}</p>
                <p><span>整改详细情况</span>{{checkTrapBack.fBackdetail}}</p>
                <p><span>整改单位负责人</span>{{checkTrapBack.fAcceptname}}</p>
                <p><span>整改完成时间</span>{{checkTrapBack.fFinishdates}}</p>
                <div>
                    <span>整改前照片</span>
                    <div class="photoList">
                        <img src="../../assets/RCRNo/现场监控1.png">
                    </div>
                </div>
                <div>
                    <span>整改后照片</span>
                    <div class="photoList">
                        <img src="../../assets/RCRNo/现场监控1.png">
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
            <div class="contentBottom">
                <div class="dangerProjectName">
                    <div>
                        <h4>复核验证人</h4>
                        <p @click="showPersonCirculantList" class="searchSel"><span>*</span>选择复核验证人<i>{{newPersonCirculantNameList}}</i></p>
                        <Tree :data="personChargeRectificationCirculant" v-show="showPersonCirculant === 1"
                              @on-select-change="searchPersonCirculantName"/>
                        <label>
                            <Select v-model="personCirculant" @on-change="selPersonCirculantName" multiple :label-in-value="true">
                                <Option v-for="item in PersonCirculantList" :value="item.fId" :key="item.fId">{{ item.fStaffName }}</Option>
                            </Select>
                        </label>
                    </div>
                    <!--                            <i><span>+</span></i>-->
                </div>
                <div class="selectBox">
                    <p><span>*</span>复核时间</p>
                    <Col>
                        <DatePicker type="date" placeholder="复核时间" :value="fReviewdates" @on-change='checkdateValeChange' format="yyyy-MM-dd HH:mm"/>
                    </Col>
                </div>
                <div class="selectBox">
                    <p><span>*</span>复核结果</p>
                    <div>
                        <label>
                            <input type="text" placeholder="请输入复核结果" v-model="fStatus"/>
                        </label>
                    </div>
                </div>
                <div class="contentList">
                    <p><span>*</span>复核意见</p>
                    <label>
                        <textarea placeholder="请输入复核意见" v-model="fMessage"/>
                    </label>
                </div>
                <div class="contentListFile">
                    <p>照片资料</p>
                    <Upload
                            multiple
                            action="//jsonplaceholder.typicode.com/posts/">
                        <Button icon="ios-cloud-upload-outline">照片资料</Button>
                    </Upload>
                </div>
            </div>
            <div class="bottom">
                <div>
                    <p @click="Submission">提交</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { RRMHDDSUrl,HDRsubmissionUrl} from "../../urlBase";
    import {mapState} from "vuex";

    export default {
        name: "ApprovalPendingDetails",
        data() {
            return {
                allData:'',
                checkTrapDaily:'',
                checkTrapBack:'',
                //复核验证人
                personCirculant:'',
                showPersonCirculant: 1,
                PersonCirculantList: [],
                PersonCirculantName: '',
                newPersonCirculantNameList: '',
                newPersonCirculantNameListId: '',
                personChargeRectificationCirculantOld:'',
                personChargeRectificationCirculant:[],
                //复核时间
                fReviewdates:'',
                //复核结果
                fStatus:'',
                //复核意见
                fMessage:''
            }
        },
        methods:{
            toApprovalPending(){
                this.$router.push({name: 'ApprovalPending'});
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
                        that.checkTrapDaily = data.checkTrapDaily;
                        that.checkTrapBack = data.checkTrapBack;

                        that.allData = data;
                        console.log(data);
                    })
                    .catch(data => {

                    });
            },
            //复核验证人
            showPersonCirculantList(){
                this.showPersonCirculant = 1;
            },
            searchPersonCirculantName(e) {
                this.showPersonCirculant = 0;
                this.PersonCirculantName = e[0].title;
                let personName = e[0].title;
                let result = this.newPersonChargeRectificationCirculant;
                let newResult = result.find(data => data.fFullName === personName);
                if(newResult.personList.length){
                    this.PersonCirculantList = newResult.personList;
                }
            },
            selPersonCirculantName(e){
                let newPersonCirculantName = '';
                let newPersonCirculantNameId = '';
                e.map(data => {
                    newPersonCirculantName += data.label+',';
                    newPersonCirculantNameId += data.value+','
                });
                this.newPersonCirculantNameList = newPersonCirculantName.substr(0, newPersonCirculantName.length - 1);
                this.newPersonCirculantNameListId = newPersonCirculantNameId.substr(0, newPersonCirculantNameId.length - 1);
            },
            //复核时间
            checkdateValeChange(data){
                this.fReviewdates = data;
            },
            //提交复核
            Submission() {
                const that = this;
                let parameter = {
                    userId: this.userInfo.userId,//当前用户id
                    userName: this.userInfo.realName,//当前用户姓名
                    fReviewname: this.newPersonCirculantNameList,//复核验证人
                    fMessage: this.fMessage,//复核意见
                    fStatus: this.fStatus,//复核结果
                    fReviewdates: this.fReviewdates,//复核时间
                    fSourcefiles: Date.parse(new Date()),//文件id,前端生成
                };
                HDRsubmissionUrl(parameter)
                    .then(function (data) {
                        console.log(data);
                        that.$router.push({name: 'ApprovalPending'});
                    })
                    .catch(data => {

                    });
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
    #ApprovalPendingDetails
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

    //复核验证人
    .dangerProjectName
        border-bottom 1px solid #EEEEEE
        padding 10px 0
        .dangerProjectNameVal
            display flex
            justify-content space-between
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

    //复核时间
    .selectBox
        border-bottom 1px solid #EEEEEE
        padding 10px 0
        span
            display inline-block
            color #ce0c0c
            font-weight bold
        i
            display inline-block
            margin-left 15px
            font-weight bold

    //复核意见
    .contentList
        border-bottom 1px solid #EEEEEE
        padding 10px 0
        p
            padding 3px 5px
            span
                display inline-block
                color #ce0c0c
                font-weight bold

    //提交按钮
    .bottom
        text-align center
        position fixed
        bottom 0
        width 100%
        background-color #fff
        border-top 2px solid #eee
        div
            padding 5% 10%
            p
                border-radius 10px
                border 1px solid #1752DB
                padding 2px 10px
                background-color #1752db
                color #fff
                flex 1
                margin 0 5%
</style>