<template>
    <div id="WaitingSignDetails">
        <van-nav-bar
                :title="listData.fTrapno"
                left-text="返回"
                left-arrow
                @click-left="toWaitingSign"
        />
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
                        v-model="listData.fTrapno"
                        clearable
                        label="检查记录编号"
                        input-align="right"
                        disabled
                />
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
            </div>
        </van-card>
        <van-card>
            <div slot="tags">
                <van-field
                        v-model="listData.fPassivename"
                        clearable
                        label="被检查单位"
                        input-align="right"
                        disabled
                />
                <van-field
                        v-model="listData.fLastdates"
                        clearable
                        label="要求整改截止日期"
                        input-align="right"
                        label-width="120px"
                        disabled
                />
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
                <p>检查发现问题</p>
                <van-collapse v-model="problemsFoundInspection.activeNames">
                    <van-collapse-item title="查看更多" name="1">
                        <van-cell-group>
                            <van-cell
                                    v-for="(item, index) in listData.recordMessageItem"
                                    clickable
                                    size="large"
                                    :key="item.fId"
                                    :title="`${item.fItemno}`"
                                    :value="`${item.fTraplevel}`"
                                    :label="`${item.fItemname}`"
                                    class="ProblemsFoundInspectionList"
                            >
                            </van-cell>
                        </van-cell-group>
                    </van-collapse-item>
                </van-collapse>
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
                <van-field
                        v-model="listData.fAcceptname"
                        clearable
                        label="待签收人"
                        input-align="right"
                        disabled
                />
                <van-field
                        v-model="listData.fReadname"
                        clearable
                        label="待传阅人"
                        input-align="right"
                        disabled
                />
            </div>
        </van-card>
        <van-card>
            <div slot="tags">
                <p>现场照片</p>
                <van-uploader v-model="checkTrapDailyFileList" multiple :deletable="false" disabled/>
            </div>
        </van-card>
        <van-card>
            <div slot="tags">
                <van-cell-group>
                    <van-steps direction="vertical" :active="process">
                        <van-step>
                            <h4>检查人</h4>
                            <p>{{listData.fCheckname}}</p>
                        </van-step>
                        <van-step>
                            <h4>整改责任人</h4>
                            <p>{{listData.fAcceptname}}</p>
                        </van-step>
                        <van-step>
                            <h4>传阅人</h4>
                            <p>{{listData.fReadname}}</p>
                        </van-step>
                    </van-steps>
                </van-cell-group>
            </div>
        </van-card>
        <van-card v-if="allData.isUpdate === '1'">
            <div slot="tags">
                <van-field
                        v-model="signAdvice"
                        clearable
                        label="签收意见"
                        type="textarea"
                        maxlength="300"
                        show-word-limit
                />
                <div class="bottom">
                    <van-button type="info" round  size="small" style='width: 70%' @click="sign">签收</van-button>
                </div>
            </div>
        </van-card>
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
                signAdvice:'',
                //检查发现问题
                problemsFoundInspection:{
                    activeNames: ['0'],
                    recordMessageItem: '',
                },
                //现场照片
                checkTrapDailyFileList: [],
                //签收进度
                process:10,
                //签收流程
                lrCheckTasks:''
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
                        that.allData = data;
                        that.listData = data.checkTrapDaily;
                        data.checkTrapDailyFileList.map(data => {
                            that.checkTrapDailyFileList.push({
                                url: data.filePath
                            });
                        });
                        that.lrCheckTasks = data.lrCheckTasks;
                        console.log(data);
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

    .ProblemsFoundInspectionList
        /deep/ .van-cell__title
            flex 6

    .bottom
        text-align center
        width 100%
        padding 10px 0

    /deep/ .van-uploader__upload
        display none
</style>