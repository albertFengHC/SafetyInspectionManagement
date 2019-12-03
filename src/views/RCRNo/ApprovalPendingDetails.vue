<template>
    <div id="ApprovalPendingDetails">
        <div class="top">
            <div class="title">
                <h2>{{checkTrapDaily.fTrapno}}</h2>
                <p @click="toApprovalPending"><</p>
            </div>
        </div>
        <div class="content">
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
                                <img src="../../assets/DHDIList/组1602.png" class="logoImg" alt="">
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
                                <div class="contentMId">
                                    <div>
                                        <span>检查现场照片</span>
                                        <div class="photoList">
                                            <img :src="data" v-for="data in listData.checkTrapDailyFileList">
                                        </div>
                                    </div>
                                    <div class="file">
                                        <p>整改附件</p>
                                        <div class="fileContent">
                                            <i></i>
                                            <p>详情说明</p>
                                            <button>预览</button>
                                        </div>
                                    </div>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane label="巡查整改情况" :disabled="listData.checkTrapBack === null">
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
                <TabPane label="整改复核情况" :disabled="listData.recordReview === null">
                    <div class="content" v-if="listData.recordReview != null">
                        <div class="contentTop">
                            <div class="topInfo">
                                <p><span>复核验证人</span>{{listData.recordReview.fReviewname}}</p>
                                <p><span>复核时间</span>{{listData.recordReview.fReviewdates}}</p>
                                <p><span>复核意见</span>{{listData.recordReview.fMessage}}</p>
                                <p><span>复核结果</span>{{listData.recordReview.fStatus}}</p>
                                <p><span>复核照片及资料</span>{{listData.recordReview.fCheckdates}}</p>
                                <div class="contentMId">
                                    <div>
                                        <span>复核照片及资料</span>
                                        <div class="photoList">
                                            <img :src="listData.recordReviewFile">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
            <div class="contentBottom"  v-if="allData.isUpdate === '1'">
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
                            <Select v-model="fStatus" :label-in-value="true">
                                <Option v-for="item in reviewCheck" :value="item.fItemValue" :key="item.fItemValue">{{ item.fItemName }}</Option>
                            </Select>
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
            <div class="bottom"  v-if="allData.isUpdate === '1'">
                <div>
                    <p @click="Submission">提交</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {RRMHDDSUrl, HDRsubmissionUrl, CRCPersonUrl} from "../../urlBase";
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
                newPersonChargeRectificationCirculant: [],
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
                        console.log(data);
                        that.checkTrapDaily = data.checkTrapDaily;
                        that.checkTrapBack = data.checkTrapBack;
                        that.allData = data;
                        console.log(data);
                        that.getCRCPersonData();
                    })
                    .catch(data => {

                    });
            },
            //复核验证人
            getCRCPersonData(){
                const that = this;
                console.log(this.checkTrapDaily.fPassiveid);
                let parameter = {
                    companyId: this.checkTrapDaily.fPassiveid
                };
                CRCPersonUrl(parameter)
                    .then(function (data) {
                        that.personChargeRectificationCirculantOld = data;
                        that.getNewPersonList(data);
                    })
                    .catch(data => {

                    });
            },
            getNewPersonList(data){
                let newPersonTree = data;
                let newPerson = [];
                let child = [];
                let resetTree = (value) => {
                    if (value.childList.length) {
                        value.childList.map(item =>{
                            child.push({
                                title: item.fFullName,
                                id: item.fDepartmentId,
                            });
                            if(item.personList.length){
                                this.newPersonChargeRectificationCirculant.push(item);
                            }
                        });
                        if(value.personList.length){
                            this.newPersonChargeRectificationCirculant.push(value);
                        }
                        return {
                            // ...item,
                            title: value.fFullName,
                            id: value.fDepartmentId,
                            children: child
                        }
                    } else {
                        if(value.personList.length){
                            this.newPersonChargeRectificationCirculant.push(value);
                        }
                        return {
                            // ...item,
                            title: value.fFullName,
                            id: value.fDepartmentId,
                        }
                    }
                };
                newPerson.push(resetTree(newPersonTree));
                this.personChargeRectificationCirculant = newPerson;
            },
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
                    fSourcefiles: Date.parse(new Date()),//文件id,前端生成,
                    fTrapid: this.checkTrapBack.fId
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
            ...mapState(['userInfo','reviewCheck'])
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