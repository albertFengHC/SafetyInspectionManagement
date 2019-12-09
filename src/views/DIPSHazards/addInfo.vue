<template>
    <div id="addInfo">
        <van-nav-bar
                title="新增安全隐患日常巡查"
                left-text="返回"
                left-arrow
                @click-left="toIndex"
        />
        <van-card>
            <div slot="tags">
                <van-cell-group>
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
                    <van-popup v-model="inspectedCompany.show" :lock-scroll="false">
                        <el-tree
                                :data="inspectedCompany.companyTreeList"
                                accordion
                                :default-expand-all="true"
                                :highlight-current="true"
                                @node-click="searchValSelF">
                        </el-tree>

                        <!--                        <Tree :data="inspectedCompany.companyTreeList" @on-select-change="searchValSelF"/>-->
<!--                        <el-cascader-panel-->
<!--                                :options="inspectedCompany.companyTreeList"-->
<!--                                v-model="inspectedCompany.searchValSel"-->
<!--                                :props="{ expandTrigger: 'hover'}"-->
<!--                                @change="searchValSelF"-->
<!--                                ref="companyTree"-->
<!--                        />-->
                    </van-popup>
                    <van-field
                            v-model="inspectionRecordNo"
                            required
                            clearable
                            label="检查记录编号"
                            placeholder="检查记录编号"
                            input-align="right"
                    />
                    <van-cell is-link @click="showDatePopup">检查时间<span style="position: absolute;right: 10px">{{checkDate.timeValue}}</span></van-cell>
                    <van-popup
                        v-model="checkDatePop.show"
                        :style="{ width: '80%' }"
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
                <van-action-sheet v-model="dangerProject.show" :actions="dangerProject.dangerProjectList" @select="dangerProjectSel" />
                <van-cell-group>
                    <van-field
                            v-model= 'coordinate.cot'
                            required
                            clearable
                            label="经度/纬度"
                            disabled
                            input-align="right"
                    />
                <div class="mapBox">
                    <div ref="map" class="map"></div>
                </div>
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
            </div>
        </van-card>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {CRCPersonUrl, NCOScheduleAddUrl,HDAddedUrl,HDVSiIUrl} from "../../urlBase";

    export default {
        name: "addInfo",
        data() {
            return {
                //检查记录编号
                inspectionRecordNo: '',
                inspectionRecordNoId:'',
                //经纬度
                coordinate:{
                    lat: '',
                    lng: '',
                    cot:''
                },
                //被检查单位
                inspectedCompany:{
                    searchValSel:'',
                    inspectedCompanyId:'',
                    companyDangerTree: [],
                    show: false
                },
                //存在隐患工程名称
                dangerProject:{
                    dangerProjectList:[],
                    dangerProjectName:'',
                    dangerProjectId:'',
                    show: false,
                },
                //检查时间
                checkDate:{
                    minDate: new Date(),
                    // maxDate: new Date(2019, 10, 1),
                    currentDate: new Date(),
                    timeValue:''
                },
                //检查时间弹出层
                checkDatePop:{
                    show: false,
                },

            }
        },
        methods: {
            Submission() {
                const that = this;
                let timeStr = Date.parse(new Date());
                if(this.searchValSel===''&&this.inspectionRecordNo===''&&this.selDangerProjectNameVal===''&&this.$route.params.LPHazardsList===''&&this.descriptionProblemsFound===''&&this.rectificationRequirements===''&&this.objectInvestigation===''&&this.hiddenDangerCategory&&this.hiddenDangerType===''&&this.checkdateVale===''&&this.dateVale===''&&this.newPersonChargeRectificationNameList===''&&this.newPersonCirculantNameList===''){
                    alert('红色星号为必填项!!!');
                }
                let parameter = {
                    fId: this.fId,//提交或修改时传
                    isSubmit: '1',//1提交 0保存
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
                    fStatus:'',//状态
                    fCheckdates: this.checkdateVale,//检查时间
                    fLastdates: this.dateVale,//整改截止日期
                    fAcceptid: this.newPersonChargeRectificationNameListId,//待签收人id
                    fAcceptname: this.newPersonChargeRectificationNameList,//待签收人
                    fReadid: this.newPersonCirculantNameListId,//待传阅人id
                    fReadname: this.newPersonCirculantNameList,//待传阅人
                    userId:this.userInfo.userId,//当前用户id
                    userName: this.userInfo.realName,//当前用户姓名
                    fSourcefile: timeStr,//文件id,前端生成
                    recordMessageItem: this.recordMessageItem//检查发现问题
                };
                HDAddedUrl(parameter)
                    .then(function (data) {
                        that.$router.push({name: 'NoSign'});
                    })
                    .catch(data => {

                    });
            },
            save() {
                const that = this;
                let timeStr = Date.parse(new Date());
                if(this.searchValSel===''&&this.inspectionRecordNo===''&&this.selDangerProjectNameVal===''&&this.$route.params.LPHazardsList===''&&this.descriptionProblemsFound===''&&this.rectificationRequirements===''&&this.objectInvestigation===''&&this.hiddenDangerCategory&&this.hiddenDangerType===''&&this.checkdateVale===''&&this.dateVale===''&&this.newPersonChargeRectificationNameList===''&&this.newPersonCirculantNameList===''){
                    alert('红色星号为必填项!!!');
                }
                let parameter = {
                    fId: '',//提交或修改时传
                    isSubmit: '0',//1提交 0保存
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
                    fStatus:'',//状态
                    fCheckdates: this.checkdateVale,//检查时间
                    fLastdates: this.dateVale,//整改截止日期
                    fAcceptid: this.newPersonChargeRectificationNameListId,//待签收人id
                    fAcceptname: this.newPersonChargeRectificationNameList,//待签收人
                    fReadid: this.newPersonCirculantNameListId,//待传阅人id
                    fReadname: this.newPersonCirculantNameList,//待传阅人
                    userId:this.userInfo.userId,//当前用户id
                    userName: this.userInfo.realName,//当前用户姓名
                    fSourcefile: timeStr,//文件id,前端生成
                    recordMessageItem: this.recordMessageItem//检查发现问题
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
                if(this.recordMessageItem){
                    this.$router.push({name: 'LPHazards',params:{LPHazardsList:that.recordMessageItem}});
                }else {
                    this.$router.push({name: 'LPHazards'});
                }

            },

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
                console.log(this.inspectedCompany.companyTreeList);
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
            getCRCPersonData(){
                const that = this;
                let parameter = {
                    companyId: this.inspectedCompanyId
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

            //展示被检查公司树形列表
            showCompanyList(){
                this.inspectedCompany.show = true;
            },
            //获取未提交数据
            getHDVSiIData(){
                const that = this;
                this.fId = this.$route.params.fId;
                if(this.fId){
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
                let list = this.dangerProject.companyDangerTree.filter(data => data.fCompanyname === this.inspectedCompany.searchValSel);
                let dangerProjectList = [];
                list.map(data=>{
                    dangerProjectList.push({name:data.fDangername});
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
            getNewDate(){
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
            confirmDate(){
                this.getNewDate();
                this.checkDatePop.show = false;
            },
            getChangeValue(e){
                let endTimeArr = e.getValues();//["2019", "03", "22", "17", "28"]
                let newDate = [];
                endTimeArr.map(data => {
                    let newData = data.substr(0, data.length - 1);
                    newDate.push(newData);
                });
                let end_time = `${newDate[0]}-${newDate[1]}-${newDate[2]}  ${newDate[3]}:${newDate[4]}`;
            },
            //检查时间格式
            dateFormatter(type, value){
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
            //选择存在隐患工程名称
            dangerProjectSel(value){
                this.dangerProject.show = false;
                this.dangerProject.dangerProjectName = value.name;
                this.dangerProject.dangerProjectId = value.fId;
            },
            showDangerProjectList(){
                this.dangerProject.show = true;
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
                        zoomToAccuracy:true       // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    mapObj.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
                    AMap.event.addListener(geolocation, 'error', onError);       // 返回定位出错信息
                });

                function onComplete (obj){
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

                function onError (obj){
                    // console.log(obj.info + '--' + obj.message);
                }
            },
        },
        mounted() {
            this.getHDVSiIData();
            this.getCompanyTreeList();
            this.getDangerTreeData();
            this.getLocation();
            // if(this.$route.params.LPHazardsList != undefined){
            //     this.recordMessageItem = this.$route.params.LPHazardsList;
            // }
        },
        activated() {
            if(this.$route.params.LPHazardsList != undefined){
                this.recordMessageItem = this.$route.params.LPHazardsList;
                console.log(this.recordMessageItem);
            }
        },
        computed: {
            ...mapState(['companyTree', 'userInfo','testObject','trapLevel','trapType'])
        },
    }
</script>

<style scoped lang="stylus">
    #addInfo
        width 100%
        height 100%
        margin 0
        color #333

    .van-nav-bar__title
        font-weight bold

    .mapBox
        display none

    .el-cascader-panel.is-bordered
        overflow-x auto

    /deep/ .van-popup--center
        padding 10px
</style>