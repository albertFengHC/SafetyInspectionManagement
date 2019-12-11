<template>
    <div id="addInfo">
        <van-nav-bar
                title="新增安全隐患日常巡查"
                left-text="返回"
                left-arrow
                @click-left="toIndex"
        />
        <van-cell-group class="inspectedCompany">
            <van-field
                v-model="inspectedCompany.searchValSel"
                required
                clearable
                label="被检查单位"
                placeholder="被检查单位"
                input-align="right"
                right-icon="plus"
                disabled
                @click-right-icon="showCompanyList"
            />
        </van-cell-group>
        <van-popup v-model="inspectedCompany.show" :lock-scroll="false"
                   :style="{ width: '100%',height:'50%' }">
            <el-tree
                    :data="inspectedCompany.companyTreeList"
                    accordion
                    :default-expand-all="true"
                    :highlight-current="true"
                    @node-click="searchValSelF">
            </el-tree>
        </van-popup>
        <div v-show="inspectedCompany.searchValSel">
            <van-card>
                <div slot="tags">
                    <van-cell-group>
                        <van-field
                                v-model="inspectionRecordNo"
                                required
                                clearable
                                label="检查记录编号"
                                placeholder="检查记录编号"
                                input-align="right"
                        />
                        <van-cell is-link @click="showDatePopup" required>检查时间<span style="position: absolute;right: 10px">{{checkDate.timeValue}}</span>
                        </van-cell>
                        <van-popup
                                v-model="checkDatePop.show"
                                :style="{ width: '100%' }"
                        >
                            <van-datetime-picker
                                    v-model="checkDate.currentDate"
                                    type="datetime"
                                    :min-date="checkDate.minDate"
                                    :formatter="dateFormatter"
                                    @confirm="confirmDate"
                                    @cancel="hideDatePopup"
                                    @change="getChangeValue"
                            />
                        </van-popup>
                    </van-cell-group>
                </div>
            </van-card>
            <van-card>
                <div slot="tags">
                    <van-cell-group>
                        <van-field
                                v-model="dangerProject.dangerProjectName"
                                required
                                clearable
                                label="存在隐患工程名称"
                                placeholder="选择或填写"
                                input-align="right"
                                label-width="120px"
                                right-icon="plus"
                                @click-right-icon="showDangerProjectList"
                        />
                    </van-cell-group>
                    <van-action-sheet v-model="dangerProject.show" :actions="dangerProject.dangerProjectList"
                                      @select="dangerProjectSel"/>
                    <van-cell-group>
                        <van-field
                                v-model='coordinate.cot'
                                required
                                clearable
                                label="经度/纬度"
                                disabled
                                input-align="right"
                        />
                        <van-collapse v-model="coordinate.activeNames" accordion>
                            <van-collapse-item title="查看地图" name="1">
                                <div class="mapBox">
                                    <div ref="map" class="map"></div>
                                </div>
                            </van-collapse-item>
                        </van-collapse>
                    </van-cell-group>
                </div>
            </van-card>
            <van-card>
                <div slot="tags">
                    <van-cell-group>
                        <van-field
                                required
                                clearable
                                label="检查发现问题"
                                placeholder=""
                                input-align="right"
                                right-icon="plus"
                                disabled
                                @click-right-icon="toLPHazards"
                        />
                    </van-cell-group>
                    <van-collapse v-model="problemsFoundInspection.activeNames">
                        <van-collapse-item title="查看更多" name="1">
                            <van-cell-group>
                                <van-cell
                                        v-for="(item, index) in problemsFoundInspection.recordMessageItem"
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
                    <van-cell-group>
                        <van-field
                                v-model="descriptionProblemsFound"
                                rows="2"
                                autosize
                                required
                                label="发现问题描述"
                                type="textarea"
                                maxlength="50"
                                placeholder="请输入"
                                show-word-limit
                        />
                        <van-field
                                v-model="rectificationRequirements"
                                rows="2"
                                autosize
                                required
                                label="整改要求"
                                type="textarea"
                                maxlength="50"
                                placeholder="请输入"
                                show-word-limit
                        />
                        <van-field
                                v-model="objectInvestigation.objectInvestigationName"
                                required
                                clearable
                                label="排查对象"
                                placeholder="选择"
                                disabled
                                input-align="right"
                                label-width="120px"
                                right-icon="plus"
                                @click-right-icon="showObjectInvestigationList"
                        />
                        <van-action-sheet v-model="objectInvestigation.show"
                                          :actions="objectInvestigation.objectInvestigationList"
                                          @select="objectInvestigationSel"/>
                        <van-field
                                v-model="hiddenDangerCategory.hiddenDangerCategoryName"
                                required
                                clearable
                                label="隐患类别"
                                placeholder="选择"
                                disabled
                                input-align="right"
                                label-width="120px"
                                right-icon="plus"
                                @click-right-icon="showHiddenDangerCategoryList"
                        />
                        <van-action-sheet v-model="hiddenDangerCategory.show"
                                          :actions="hiddenDangerCategory.hiddenDangerCategoryList"
                                          @select="hiddenDangerCategorySel"/>
                        <van-field
                                v-model="hiddenDangerType.hiddenDangerTypeName"
                                required
                                clearable
                                label="隐患类型"
                                placeholder="选择"
                                disabled
                                input-align="right"
                                label-width="120px"
                                right-icon="plus"
                                @click-right-icon="showHiddenDangerTypeList"
                        />
                        <van-action-sheet v-model="hiddenDangerType.show" :actions="hiddenDangerType.hiddenDangerTypeList"
                                          @select="hiddenDangerTypeSel"/>
                        <van-cell is-link @click="showDeadlineRectificationPop" required>整改截止时间<span
                                style="position: absolute;right: 10px">{{deadlineRectification.timeValue}}</span></van-cell>
                        <van-popup
                                v-model="deadlineRectificationPop.show"
                                :style="{ width: '100%' }"
                        >
                            <van-datetime-picker
                                    v-model="deadlineRectification.currentDate"
                                    type="datetime"
                                    :min-date="deadlineRectification.minDate"
                                    :formatter="dateFormatter"
                                    @confirm="confirmDeadlineRectification"
                                    @cancel="hideDeadlineRectificationPop"
                                    @change="getChangeValue"
                            />
                        </van-popup>
                        <van-uploader v-model="fileList" multiple upload-text="照片附件" :after-read="afterReadFile"/>
                    </van-cell-group>
                </div>
            </van-card>
            <van-card>
                <div slot="tags">
                    <van-cell-group>
                        <van-steps direction="vertical" :active="personChargeRectificationCirculant.active">
                            <van-step>
                                <van-row>
                                    <van-col span="19">
                                        <h4>整改责任人</h4>
                                        <p>{{personChargeRectificationCirculant.personLiableName}}</p>
                                    </van-col>
                                    <van-col span="5">
                                        <van-button plain type="default" size="small" @click="showDepartmentTree(1)">请选择
                                        </van-button>
                                    </van-col>
                                </van-row>
                            </van-step>
                            <van-step>
                                <van-row>
                                    <van-col span="19">
                                        <h4>传阅人</h4>
                                        <p>{{personChargeRectificationCirculant.circulantName}}</p>
                                    </van-col>
                                    <van-col span="5">
                                        <van-button plain type="default" size="small" @click="showDepartmentTree(2)">请选择
                                        </van-button>
                                    </van-col>
                                </van-row>
                            </van-step>
                        </van-steps>
                    </van-cell-group>
                    <van-popup v-model="personChargeRectificationCirculant.show" :lock-scroll="false"
                               :style="{ width: '100%',height:'50%' }">
                        <el-tree
                                :data="personChargeRectificationCirculant.departmentList"
                                accordion
                                :default-expand-all="true"
                                :highlight-current="true"
                                @node-click="departmentSel">
                        </el-tree>
                        <van-radio-group v-model="personChargeRectificationCirculant.personLiableList" class="personCheck" @change="checkboxPersonLiableChange">
                            <van-radio :name="item.fStaffName"  v-for="(item, index) in personChargeRectificationCirculant.newPersonList" :key="index" class="checkBox" v-show="personChargeRectificationCirculant.personLiableListShow">{{item.fStaffName}}</van-radio>
                        </van-radio-group>
                        <van-checkbox-group v-model="personChargeRectificationCirculant.circulantList" class="personCheck" @change="checkboxCirculantChange">
                            <van-checkbox :name="item.fStaffName"  v-for="(item, index) in personChargeRectificationCirculant.newPersonList" :key="index" class="checkBox" v-show="personChargeRectificationCirculant.circulantListShow">{{item.fStaffName}}</van-checkbox>
                        </van-checkbox-group>
                    </van-popup>
                </div>
            </van-card>
            <div class="bottom">
                <van-row>
                    <van-col span="12">
                        <van-button round type="info" size="small" style='width: 70%' @click="upLoadData('1')">提交</van-button>
                    </van-col>
                    <van-col span="12">
                        <van-button round type="primary" size="small" style='width: 70%' @click="upLoadData('0')">保存</van-button>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapState} from "vuex";
    import {CRCPersonUrl, NCOScheduleAddUrl, HDAddedUrl, HDVSiIUrl, ImgUploadUrl} from "../../urlBase";

    export default {
        name: "addInfo",
        data() {
            return {
                //时间戳
                timeStr:'',
                //检查记录编号
                inspectionRecordNo: '',
                inspectionRecordNoId: '',
                //经纬度
                coordinate: {
                    lat: '',
                    lng: '',
                    cot: '',
                    activeNames: '1',
                },
                //被检查单位
                inspectedCompany: {
                    searchValSel: '',
                    inspectedCompanyId: '',
                    companyDangerTree: [],
                    show: false
                },
                //存在隐患工程名称
                dangerProject: {
                    dangerProjectList: [],
                    dangerProjectName: '',
                    dangerProjectId: '',
                    show: false,
                },
                //排查对象
                objectInvestigation: {
                    objectInvestigationList: [],
                    objectInvestigationName: '',
                    show: false,
                },
                //隐患类别
                hiddenDangerCategory: {
                    hiddenDangerCategoryList: [],
                    hiddenDangerCategoryName: '',
                    show: false,
                },
                //隐患类型
                hiddenDangerType: {
                    hiddenDangerTypeList: [],
                    hiddenDangerTypeName: '',
                    show: false,
                },
                //检查时间
                checkDate: {
                    minDate: new Date(),
                    // maxDate: new Date(2019, 10, 1),
                    currentDate: new Date(),
                    timeValue: '',
                },
                //检查时间弹出层
                checkDatePop: {
                    show: false,
                },
                //整改截止时间
                deadlineRectification: {
                    minDate: new Date(),
                    // maxDate: new Date(2019, 10, 1),
                    currentDate: new Date(),
                    timeValue: '',
                },
                //整改截止时间弹出层
                deadlineRectificationPop: {
                    show: false,
                },
                //检查发现问题
                problemsFoundInspection: {
                    activeNames: ['0'],
                    recordMessageItem: '',
                },
                //发现问题描述
                descriptionProblemsFound: '',
                //整改要求
                rectificationRequirements: '',
                //图片文件上传
                fileList: [],
                //整改责任人及传阅人
                personChargeRectificationCirculant: {
                    List: '',
                    personList: [],
                    departmentList: '',
                    newPersonList: [],
                    show:false,
                    active:2,
                    //责任人
                    personLiableList:[],
                    personLiableListShow:false,
                    personLiableName:'',
                    personLiableId:'',
                    //传阅人
                    circulantList: [],
                    circulantListShow:false,
                    circulantName:'',
                    circulantId:'',
                }
            }
        },
        methods: {
            //提交/保存数据
            upLoadData(e){
                const that = this;
                let parameter = {
                    fId: this.fId,//提交或修改时传
                    isSubmit: e,//1提交 0保存
                    fCompanyid: this.userInfo.companyId,//检查单位id
                    fCompanyname: this.userInfo.companyName,//检查单位
                    fPassiveid: this.inspectedCompanyId,//被检查单位id
                    fPassivename: this.searchValSel,//被检查单位
                    fTrapno: this.inspectionRecordNo,//检查记录编号
                    fDangerid: this.inspectionRecordNoId,//存在隐患工程名称id
                    fDangername: this.dangerProjectName,//存在隐患工程名称
                    fLongitude: this.lng,//纬度
                    fLatitude: this.lat,//经度
                    fProblemdesc: this.descriptionProblemsFound,//发现问题描述
                    fRequiredesc: this.rectificationRequirements,//整改要求
                    fTestobject: this.objectInvestigation,//排查对象
                    fTrapclass: this.hiddenDangerCategory,//隐患类别
                    fTraptype: this.hiddenDangerType,//隐患类型
                    fCheckid: this.userInfo.userId,//检查人id
                    fCheckname: this.userInfo.realName,//检查人
                    fStatus: '',//状态
                    fCheckdates: this.checkdateVale,//检查时间
                    fLastdates: this.dateVale,//整改截止日期
                    fAcceptid: this.newPersonChargeRectificationNameListId,//待签收人id
                    fAcceptname: this.newPersonChargeRectificationNameList,//待签收人
                    fReadid: this.newPersonCirculantNameListId,//待传阅人id
                    fReadname: this.newPersonCirculantNameList,//待传阅人
                    userId: this.userInfo.userId,//当前用户id
                    userName: this.userInfo.realName,//当前用户姓名
                    fSourcefile: this.timeStr,//文件id,前端生成
                    recordMessageItem: this.problemsFoundInspection.recordMessageItem//检查发现问题
                };
                HDAddedUrl(parameter)
                    .then(function (data) {
                        that.$router.push({name: 'NoSign'});
                    })
                    .catch(data => {

                    });
            },

            toIndex() {
                this.$router.push({name: 'NoSign'});
            },
            toLPHazards() {
                const that = this;
                if (this.problemsFoundInspection.recordMessageItem) {
                    this.$router.push({
                        name: 'LPHazards',
                        params: {LPHazardsList: that.problemsFoundInspection.recordMessageItem}
                    });
                } else {
                    this.$router.push({name: 'LPHazards'});
                }

            },
            //获取被检查单位列表
            getCompanyTreeList() {
                let newCompanyTree = this.companyTree;
                let newCompanyTreeList = '';
                let resetTree = (data) => {
                    let newTree = data.map(item => {
                        if (item.children.length) {
                            return {
                                // ...item,
                                label: item.f_ShortName,
                                value: item.f_CompanyId,
                                children: resetTree(item.children)
                            }
                        } else {
                            return {
                                // ...item,
                                label: item.f_ShortName,
                                value: item.f_CompanyId,
                            }
                        }
                    });
                    return newTree;
                };
                newCompanyTreeList = resetTree(newCompanyTree);
                this.inspectedCompany.companyTreeList = newCompanyTreeList;
            },
            getDangerTreeData(param) {
                const that = this;
                let parameter = {
                    fCompanyid: this.userInfo.companyId,
                    fUserid: this.userInfo.userId,
                };
                NCOScheduleAddUrl(parameter)
                    .then(function (data) {
                        console.log(data);
                        that.dangerProject.companyDangerTree = data.companyDangerTree;
                        that.inspectedCompany.companyDangerTree = data.companyDangerTree;
                        that.DangerTreeData.nodesList = data.nodesList;
                    })
                    .catch(data => {

                    });
            },

            //整改责任人及传阅人
            getCRCPersonData() {
                const that = this;
                let parameter = {
                    companyId: this.inspectedCompany.inspectedCompanyId
                };
                CRCPersonUrl(parameter)
                    .then(function (data) {
                        that.personChargeRectificationCirculant.List = data;
                        console.log(data);
                        that.getNewPersonList(data);
                    })
                    .catch(data => {

                    });
            },
            //获取责任人及传阅人部门及人员列表
            getNewPersonList(data) {
                let newPersonTree = data;
                let newDepartmentList = [];
                let child = [];
                this.personChargeRectificationCirculant.personList = [];
                let resetTree = (value) => {
                    if (value.childList.length) {
                        value.childList.map(item => {
                            child.push({
                                label: item.fFullName,
                                value: item.fDepartmentId,
                            });
                            if (item.personList.length) {
                                this.personChargeRectificationCirculant.personList.push(item.personList);
                            }
                        });
                        if (value.personList.length) {
                            this.personChargeRectificationCirculant.personList.push(value.personList);
                        }
                        return {
                            // ...item,
                            label: value.fFullName,
                            value: value.fDepartmentId,
                            children: child
                        }
                    } else {
                        if (value.personList.length) {
                            this.personChargeRectificationCirculant.personList.push(value.personList);
                        }
                        return {
                            // ...item,
                            label: value.fFullName,
                            value: value.fDepartmentId,
                        }
                    }
                };
                newDepartmentList.push(resetTree(newPersonTree));
                this.personChargeRectificationCirculant.departmentList = newDepartmentList;
            },
            //选择整改责任人及传阅人部门
            departmentSel(e) {
                let department = e.label;
                this.personChargeRectificationCirculant.newPersonList = this.personChargeRectificationCirculant.personList[0].filter(data => data.fDepartmentName === department);
            },
            //展示整改责任人及传阅人部门
            showDepartmentTree(e) {
                this.personChargeRectificationCirculant.show = true;
                if(e === 1){
                    this.personChargeRectificationCirculant.personLiableListShow = true;
                    this.personChargeRectificationCirculant.circulantListShow = false;
                }else if(e === 2){
                    this.personChargeRectificationCirculant.circulantListShow = true;
                    this.personChargeRectificationCirculant.personLiableListShow = false;
                }
            },
            //改变整改责任人
            checkboxPersonLiableChange(e){
                console.log(e);
                const that = this;
                this.personChargeRectificationCirculant.personLiableName = e;
                this.personChargeRectificationCirculant.personLiableId = that.personChargeRectificationCirculant.newPersonList.filter(name => name.fStaffName === e)[0].fId;
                if(this.personChargeRectificationCirculant.personLiableName){
                    this.personChargeRectificationCirculant.active = 0;
                    if(this.personChargeRectificationCirculant.personLiableName && this.personChargeRectificationCirculant.circulantName){
                        this.personChargeRectificationCirculant.active = 2;
                    }
                }
            },
            //改变传阅人
            checkboxCirculantChange(e){
                console.log(e);
                const that = this;
                let PersonLiable = [];
                e.map(data => {
                    PersonLiable.push(that.personChargeRectificationCirculant.newPersonList.filter(name => name.fStaffName === data)[0]);
                });
                let newPersonLiableName = '';
                let newPersonLiableId = '';
                PersonLiable.map(data => {
                    newPersonLiableName += data.fStaffName+',';
                    newPersonLiableId += data.fId+','
                });
                this.personChargeRectificationCirculant.circulantName = newPersonLiableName.substr(0, newPersonLiableName.length - 1);
                this.personChargeRectificationCirculant.circulantId = newPersonLiableId.substr(0, newPersonLiableId.length - 1);
                if(this.personChargeRectificationCirculant.circulantName){
                    this.personChargeRectificationCirculant.active = 1;
                }else if(this.personChargeRectificationCirculant.personLiableName){
                    this.personChargeRectificationCirculant.active = 0;
                }
            },

            //展示被检查公司树形列表
            showCompanyList() {
                this.inspectedCompany.show = true;
            },
            //获取未提交数据
            getHDVSiIData() {
                const that = this;
                this.fId = this.$route.params.fId;
                if (this.fId) {
                    const that = this;
                    let parameter = {
                        userId: this.userInfo.userId,
                        fId: this.fId,
                    };
                    HDVSiIUrl(parameter)
                        .then(function (data) {
                            let checkTrapDaily = data.checkTrapDaily;
                            that.fId = checkTrapDaily.fId;
                            that.fCompanyid = checkTrapDaily.fCompanyid;
                            that.fCompanyname = checkTrapDaily.fCompanyname;
                            that.inspectedCompanyId = checkTrapDaily.fPassiveid;
                            that.searchValSel = checkTrapDaily.fPassivename;
                            that.inspectionRecordNo = checkTrapDaily.fTrapno;
                            that.inspectionRecordNoId = checkTrapDaily.fDangerid;
                            that.dangerProjectName = checkTrapDaily.fDangername;
                            that.lng = checkTrapDaily.fLongitude;
                            that.lat = checkTrapDaily.fLatitude;
                            that.descriptionProblemsFound = checkTrapDaily.fProblemdesc;
                            that.rectificationRequirements = checkTrapDaily.fRequiredesc;
                            that.objectInvestigation = checkTrapDaily.fTestobject;
                            that.hiddenDangerCategory = checkTrapDaily.fTrapclass;
                            that.hiddenDangerType = checkTrapDaily.fTraptype;
                            that.fCheckid = checkTrapDaily.fCheckid;
                            that.fCheckname = checkTrapDaily.fCheckname;
                            that.fStatus = checkTrapDaily.fStatus;
                            that.checkdateVale = checkTrapDaily.fCheckdates;
                            that.dateVale = checkTrapDaily.fLastdates;
                            that.newPersonChargeRectificationNameListId = checkTrapDaily.fAcceptid;
                            that.newPersonChargeRectificationNameList = checkTrapDaily.fAcceptname;
                            that.newPersonCirculantNameListId = checkTrapDaily.fReadid;
                            that.newPersonCirculantNameList = checkTrapDaily.fReadname;
                            that.userId = checkTrapDaily.userId;
                            that.userName = checkTrapDaily.userName;
                            that.fSourcefile = checkTrapDaily.fSourcefile;
                            that.recordMessageItem = checkTrapDaily.recordMessageItem;
                        })
                        .catch(data => {

                        });
                }
            },
            //选择被检查单位
            searchValSelF(e) {
                // const pId = this.$refs.companyTree.getCheckedNodes()[0].data.fItemid;
                this.inspectedCompany.searchValSel = e.label;
                this.inspectedCompany.inspectedCompanyId = e.value;
                let list = this.dangerProject.companyDangerTree.filter(data => data.fCompanyname === this.inspectedCompany.searchValSel);
                let dangerProjectList = [];
                list.map(data => {
                    dangerProjectList.push({name: data.fDangername});
                });
                this.dangerProject.dangerProjectList = dangerProjectList;
                this.getCRCPersonData();
            },
            //检查时间弹出层
            showDatePopup() {
                this.checkDatePop.show = true;
            },
            hideDatePopup(val) {
                this.checkDatePop.show = false;
            },
            getNewDate() {
                let date = this.checkDate.currentDate;
                let seperator1 = "-";
                let seperator2 = ":";
                let month = date.getMonth() + 1;
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (hours >= 0 && hours <= 9) {
                    hours = "0" + hours;
                }
                if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
                }
                this.checkDate.timeValue =
                    date.getFullYear() +
                    seperator1 +
                    month +
                    seperator1 +
                    strDate +
                    " " +
                    hours +
                    seperator2 +
                    minutes;
            },
            confirmDate() {
                this.getNewDate();
                this.checkDatePop.show = false;
            },
            getChangeValue(e) {
                let endTimeArr = e.getValues();//["2019", "03", "22", "17", "28"]
                let newDate = [];
                endTimeArr.map(data => {
                    let newData = data.substr(0, data.length - 1);
                    newDate.push(newData);
                });
                let end_time = `${newDate[0]}-${newDate[1]}-${newDate[2]}  ${newDate[3]}:${newDate[4]}`;
            },
            //检查时间格式
            dateFormatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                } else if (type === 'day') {
                    return `${value}日`
                } else if (type === 'hour') {
                    return `${value}时`
                } else {
                    return `${value}分`
                }
            },
            //整改截止时间弹出层
            showDeadlineRectificationPop() {
                this.deadlineRectificationPop.show = true;
            },
            hideDeadlineRectificationPop(val) {
                this.deadlineRectificationPop.show = false;
            },
            getNewDeadlineRectification() {
                let date = this.deadlineRectification.currentDate;
                let seperator1 = "-";
                let seperator2 = ":";
                let month = date.getMonth() + 1;
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (hours >= 0 && hours <= 9) {
                    hours = "0" + hours;
                }
                if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
                }
                this.deadlineRectification.timeValue =
                    date.getFullYear() +
                    seperator1 +
                    month +
                    seperator1 +
                    strDate +
                    " " +
                    hours +
                    seperator2 +
                    minutes;
            },
            confirmDeadlineRectification() {
                this.getNewDeadlineRectification();
                this.deadlineRectificationPop.show = false;
            },
            //选择存在隐患工程名称
            dangerProjectSel(value) {
                this.dangerProject.show = false;
                this.dangerProject.dangerProjectName = value.name;
                this.dangerProject.dangerProjectId = value.fId;
            },
            showDangerProjectList() {
                this.dangerProject.show = true;
            },
            //选择排查对象
            objectInvestigationSel(value) {
                this.objectInvestigation.show = false;
                this.objectInvestigation.objectInvestigationName = value.name;
            },
            showObjectInvestigationList() {
                this.objectInvestigation.show = true;
            },
            getObjectInvestigationList() {
                this.testObject.map(data => {
                    this.objectInvestigation.objectInvestigationList.push({name: data.fItemName});
                });
            },
            //选择隐患类别
            hiddenDangerCategorySel(value) {
                this.hiddenDangerCategory.show = false;
                this.hiddenDangerCategory.hiddenDangerCategoryName = value.name;
            },
            showHiddenDangerCategoryList() {
                this.hiddenDangerCategory.show = true;
            },
            getHiddenDangerCategoryList() {
                this.trapLevel.map(data => {
                    this.hiddenDangerCategory.hiddenDangerCategoryList.push({name: data.fItemName});
                });
            },
            //选择隐患类型
            hiddenDangerTypeSel(value) {
                this.hiddenDangerType.show = false;
                this.hiddenDangerType.hiddenDangerTypeName = value.name;
            },
            showHiddenDangerTypeList() {
                this.hiddenDangerType.show = true;
            },
            getHiddenDangerTypeList() {
                this.trapType.map(data => {
                    this.hiddenDangerType.hiddenDangerTypeList.push({name: data.fItemName});
                });
            },
            //获取当前坐标
            getLocation() {
                const that = this;
                let mapObj = new AMap.Map(this.$refs.map);
                mapObj.plugin('AMap.Geolocation', function () {
                    let geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                        timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
                        convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,         // 显示定位按钮，默认：true
                        buttonPosition: 'LB',     // 定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,         // 定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,         // 定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,      // 定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy: true       // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    mapObj.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
                    AMap.event.addListener(geolocation, 'error', onError);       // 返回定位出错信息
                });

                function onComplete(obj) {
                    // let res = '经纬度：' + obj.position +
                    //     '\n精度范围：' + obj.accuracy +
                    //     '米\n定位结果的来源：' + obj.location_type +
                    //     '\n状态信息：' + obj.info +
                    //     '\n地址：' + obj.formattedAddress +
                    //     '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
                    that.coordinate.lat = obj.position.lat;
                    that.coordinate.lng = obj.position.lng;
                    that.coordinate.cot = `${obj.position.lat}/${obj.position.lng}`;
                }

                function onError(obj) {
                    // console.log(obj.info + '--' + obj.message);
                }
            },
            //图片资料上传
            afterReadFile(file) {
                console.log(file);
                let parameter = {
                    content: file.content,
                    filename: file.file.name,
                    folderid: this.timeStr.toString(),
                    userName: this.userInfo.realName,
                    userId: this.userInfo.userId,
                };
                ImgUploadUrl(parameter)
                    .then(function (data) {

                    })
                    .catch(data => {

                    });
            },

        },
        mounted() {
            this.getHDVSiIData();
            this.getCompanyTreeList();
            this.getDangerTreeData();
            this.getLocation();
            this.getObjectInvestigationList();
            this.getHiddenDangerCategoryList();
            this.getHiddenDangerTypeList();
        },
        activated() {
            if (this.$route.params.LPHazardsList !== undefined) {
                this.problemsFoundInspection.recordMessageItem = this.$route.params.LPHazardsList;
            }
            this.$notify({ type: 'primary', message: '请选择被检查单位' });
            if(this.timeStr === ''){
                this.timeStr = Date.parse(new Date());
            }
        },
        computed: {
            ...mapState(['companyTree', 'userInfo', 'testObject', 'trapLevel', 'trapType'])
        },
    }
</script>

<style scoped lang="stylus">
    #addInfo
        width 100%
        height 100%
        margin 0
        color #333

    .inspectedCompany
        padding 8px 16px
        padding-bottom 0

    .van-nav-bar__title
        font-weight bold

    .mapBox
        width 100%
        height 250px
        .map
            width 100%
            height 100%

    .el-cascader-panel.is-bordered
        overflow-x auto

    .ProblemsFoundInspectionList
        /deep/ .van-cell__title
            flex 6

    .personCheck
        padding 20px
        font-weight bold
        font-size 1.5rem
        .checkBox
            padding 7px
            border-bottom  1px solid #cbcdd1

    .bottom
        text-align center
        width 100%
        padding-bottom 10px
</style>