<template>
    <div id="WaitingSignDetails">
        <van-nav-bar
                :title="listData.fTrapno"
                left-text="返回"
                left-arrow
                @click-left="toWaitingSign"
        />
        <div class="topUser">
            <div class="topUserImg">
                <img src="../../assets/DHDIList/已同意.png">
            </div>
            <div class="topUserBottom">
                <h4>{{listData.fCheckname}}</h4>
                <p>{{listData.fStatus}}</p>
            </div>
        </div>
        <van-card>
            <div slot="tags">
                <van-field
                        v-model="listData.fCheckname"
                        clearable
                        label="检查人"
                        input-align="right"
                        disabled
                />
                <van-field
                        v-model="listData.fStatus"
                        clearable
                        label="状态"
                        input-align="right"
                        disabled
                />
                <van-field
                        v-model="listData.fCheckdates"
                        clearable
                        label="检查时间"
                        input-align="right"
                        disabled
                />
                <van-field
                        v-model="listData.fLastdates"
                        clearable
                        label="整改截止日期"
                        input-align="right"
                        disabled
                />
            </div>
        </van-card>
        <van-card>
            <div slot="tags">
                <van-field
                        v-model="listData.fCompanyname"
                        clearable
                        label="检查单位"
                        input-align="right"
                        disabled
                />
                <van-field
                        v-model="listData.fPassivename"
                        clearable
                        label="被检查单位"
                        input-align="right"
                        disabled
                />
                <van-field
                        v-model="listData.fTrapno"
                        clearable
                        label="检查记录编号"
                        input-align="right"
                        disabled
                />
            </div>
        </van-card>
        <van-card>
            <div slot="tags">
                <van-field
                        v-model="listData.fDangername"
                        clearable
                        label="存在隐患工程名称"
                        input-align="right"
                        label-width="120px"
                        disabled
                />
                <van-field
                        v-model="listData.fLatitude"
                        clearable
                        label="经度"
                        input-align="right"
                        disabled
                />
                <van-field
                        v-model="listData.fLongitude"
                        clearable
                        label="纬度"
                        input-align="right"
                        disabled
                />
            </div>
        </van-card>
        <van-card>
            <div slot="tags">
                <van-field
                        v-model="listData.fProblemdesc"
                        clearable
                        label="发现问题描述"
                        input-align="right"
                        disabled
                        type="textarea"
                        maxlength="300"
                        show-word-limit
                />
                <van-field
                        v-model="listData.fRequiredesc"
                        clearable
                        label="整改要求"
                        input-align="right"
                        disabled
                        type="textarea"
                        maxlength="300"
                        show-word-limit
                />
            </div>
        </van-card>
        <van-card>
            <div slot="tags">
                <van-field
                        v-model="listData.fTestobject"
                        clearable
                        label="排查对象"
                        input-align="right"
                        disabled
                />
                <van-field
                        v-model="listData.fTrapclass"
                        clearable
                        label="隐患类别"
                        input-align="right"
                        disabled
                />
                <van-field
                        v-model="listData.fTraptype"
                        clearable
                        label="隐患类型"
                        input-align="right"
                        disabled
                />
            </div>
        </van-card>
        <van-card>
            <div slot="tags">

            </div>
        </van-card>



        <div class="content">
            <div class="contentTop">
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
            </div>
            <div class="contentBottom">
                <div class="signAdvice" v-if="allData.isUpdate === '1'">
                    <p>签收意见</p>
                    <div>
                        <textarea name="" id="" cols="45" rows="10" v-model="signAdvice"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom" v-if="allData.isUpdate === '1'">
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
                        that.allData = data;
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
            // this.getListData();
        },
        activated() {
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

    .topUser
        display flex
        justify-content space-between
        border-bottom 1px solid #eee
        margin-bottom 10px
        padding 0 20px
        .topUserImg
            padding-top 10px
        .topUserBottom
            flex 1
            padding 10px
            p
                margin 0
                margin-top 5px
                color #e1a14c
</style>