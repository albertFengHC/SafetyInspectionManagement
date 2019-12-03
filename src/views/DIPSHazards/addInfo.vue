<template>
    <div id="addInfo">
        <van-nav-bar
                title="新增安全隐患日常巡查"
                left-text=""
                left-arrow
                @click-left="toIndex"
        />
        <van-card>
            <div slot="tags">
                <van-cell-group>
                    <van-field
                            v-model="searchValSel"
                            required
                            clearable
                            label="被检查单位"
                            placeholder="被检查单位"
                            input-align="right"
                    />
                    <Tree :data="companyTreeList" @on-select-change="searchValSelF"/>
                    <van-field
                            v-model="inspectionRecordNo"
                            required
                            clearable
                            label="检查记录编号"
                            placeholder="检查记录编号"
                            input-align="right"
                    />
                    <van-cell is-link @click="showPopup">检查时间<span style="position: absolute;right: 10px">{{checkDate.timeValue}}</span></van-cell>
                    <van-popup
                        v-model="checkDatePop.show"
                        :style="{ width: '80%' }"
                    >
                        <van-datetime-picker
                                v-model="checkDate.currentDate"
                                type="datetime"
                                :min-date="checkDate.minDate"
                                :formatter="dateFormatter"
                                @confirm="hidePopup"
                                @cancel="hidePopup"
                                @change="dateChange"
                        />
                    </van-popup>

                </van-cell-group>
            </div>
        </van-card>
        <div class="boxContent">
            <div class="content">
                <div class="contentList">
                    <p><span>*</span>检查时间</p>
                    <Col>
                        <DatePicker type="date" placeholder="检查时间" :value="checkdateVale" @on-change='checkdateValeChange' format="yyyy-MM-dd HH:mm"/>
                    </Col>
                </div>
                <div class="dangerProjectName">
                    <div class="dangerProjectNameVal">
                        <p><span>*</span>存在隐患工程名称</p>
                        <div>
                            <label>
                                <input type="text" placeholder="请输入或请选择" v-model="dangerProjectName"/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <p @click="showDangerProjectNameList" class="searchSel">选择隐患名称</p>
                        <Tree :data="companyTreeList" v-show="showDangerProjectName === 1"
                              @on-select-change="searchDangerProjectName"/>
                        <label>
                            <Select v-model="selDangerProjectNameVal" @on-change="selDangerProjectName" :label-in-value="true">
                                <Option v-for="item in dangerProjectNameList" :value="item.fId" :key="item.fId">{{ item.fDangername }}</Option>
                            </Select>
                        </label>
                    </div>
                </div>
                <div class="contentList">
                    <p>经度</p>
                    <p class="lat">{{lat}}</p>
                </div>
                <div class="contentList">
                    <p>纬度</p>
                    <p class="lng">{{lng}}</p>
                </div>
                <div class="mapBox">
                    <div ref="map" class="map"></div>
                </div>
                <div class="contentListProblem">
                    <div class="problems">
                        <div class="problemsTitle">
                           <h3><span class="problemsTitleS">*</span>检查发现问题</h3>
                            <i @click="toLPHazards"><span>+</span></i>
                        </div>
                        <div class="problemsInfo" v-if="this.recordMessageItem">
                            <div class="problemsInfoList" v-for="item in this.recordMessageItem" :value="item.fId" :key="item.fId">
                                <div class="problemsInfoListTitle">
                                    <p>{{item.fItemno}}</p>
                                    <p>{{item.fTraplevel}}</p>
                                </div>
                                <div class="problemsInfoListContent">
                                    <p>{{item.fItemname}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contentList">
                    <p><span>*</span>发现问题描述</p>
                    <label>
                        <textarea placeholder="请输入" v-model="descriptionProblemsFound"/>
                    </label>
                </div>
                <div class="contentList">
                    <p><span>*</span>整改要求</p>
                    <label>
                        <textarea placeholder="请输入" v-model="rectificationRequirements"/>
                    </label>
                </div>
                <div class="selectBox">
                    <p><span>*</span>排查对象<i>{{objectInvestigation}}</i></p>
                    <label>
                        <Select v-model="objectInvestigation">
                            <Option v-for="item in objectInvestigationList" :value="item.fItemName" :key="item.fItemValue">{{ item.fItemName }}</Option>
                        </Select>
                    </label>
                </div>
                <div class="selectBox">
                    <p><span>*</span>隐患类别<i>{{hiddenDangerCategory}}</i></p>
                    <label>
                        <Select v-model="hiddenDangerCategory">
                            <Option v-for="item in hiddenDangerCategoryList" :value="item.fItemName" :key="item.fItemValue">{{ item.fItemName }}</Option>
                        </Select>
                    </label>
                </div>
                <div class="selectBox">
                    <p><span>*</span>隐患类型<i>{{hiddenDangerType}}</i></p>
                    <label>
                        <Select v-model="hiddenDangerType">
                            <Option v-for="item in hiddenDangerTypeList" :value="item.fItemName" :key="item.fItemValue">{{ item.fItemName }}</Option>
                        </Select>
                    </label>
                </div>
                <div class="selectBox">
                    <p><span>*</span>整改截至日期</p>
                    <Col>
                        <DatePicker type="date" placeholder="整改截止时间" :value="dateVale" @on-change='dateValeChange' format="yyyy-MM-dd HH:mm"/>
                    </Col>
                </div>
                <div class="contentListPhoto">
                    <p>现场照片</p>
<!--                    <i><span>+</span></i>-->
                    <div class="demo-upload-list" v-for="item in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url" alt="">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"/>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"/>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info/>
                        </template>
                    </div>
                    <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/"
                            style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"/>
                        </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%" alt="">
                    </Modal>
                </div>
                <div class="contentListFile">
                    <p>资料附件</p>
                    <Upload
                            multiple
                            action="//jsonplaceholder.typicode.com/posts/">
                        <Button icon="ios-cloud-upload-outline">资料附件</Button>
                    </Upload>
<!--                    <i><span>+</span></i>-->
                </div>
                <div class="ReceiptProcess">
                    <div>
                        <div class="dangerProjectName">
                            <div>
                                <h4>整改责任人</h4>
                                <p @click="showPersonChargeRectificationList" class="searchSel"><span>*</span>选择整改责任人<i>{{newPersonChargeRectificationNameList}}</i></p>
                                <Tree :data="personChargeRectificationCirculant" v-show="showPersonChargeRectification === 1"
                                      @on-select-change="searchPersonChargeRectificationName"/>
                                <label>
                                    <Select v-model="personChargeRectification" @on-change="selPersonChargeRectificationName" multiple :label-in-value="true">
                                        <Option v-for="item in PersonChargeRectificationList" :value="item.fId" :key="item.fId">{{ item.fStaffName }}</Option>
                                    </Select>
                                </label>
                            </div>
<!--                            <i><span>+</span></i>-->
                        </div>
                        <div class="dangerProjectName">
                            <div>
                                <h4>传阅人</h4>
                                <p @click="showPersonCirculantList" class="searchSel"><span>*</span>选择传阅人<i>{{newPersonCirculantNameList}}</i></p>
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
                    </div>
                </div>
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
    import {mapState} from "vuex";
    import {CRCPersonUrl, NCOScheduleAddUrl,HDAddedUrl,HDVSiIUrl} from "../../urlBase";

    export default {
        name: "addInfo",
        data() {
            return {
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
                //检查发现问题
                recordMessageItem: '',
                fCompanyid:'',
                fCompanyname:'',
                fCheckid:'',
                fCheckname:'',
                userId:'',
                userName:'',
                fSourcefile:'',
                //状态
                fStatus:'',
                //检查记录编号
                inspectionRecordNo: '',
                inspectionRecordNoId:'',
                //检查时间
                checkdateVale: '',
                //经纬度
                lat: '',
                lng: '',
                province: '',
                city: '',
                district: '',
                companyTreeList: [],
                searchValSel: '',
                inspectedCompanyId: '',
                DangerTreeData: {
                    companyDangerTree: [],
                },
                showDangerProjectName: 0,
                dangerProjectName:'',
                selDangerProjectNameVal:'',
                dangerProjectNameList:[],
                //整改截止日期
                dateVale:'',
                //发现问题描述
                descriptionProblemsFound:'',
                //整改要求
                rectificationRequirements:'',
                //排查对象
                objectInvestigationList:[],
                objectInvestigation: '',
                //隐患类别
                hiddenDangerCategoryList:[],
                hiddenDangerCategory: '',
                //隐患类型
                hiddenDangerTypeList:[],
                hiddenDangerType:'',
                //整改责任人及传阅人
                personChargeRectificationCirculantOld:'',
                personChargeRectificationCirculant:[],
                personChargeRectification:'',
                personCirculant:'',
                newPersonChargeRectificationCirculant: [],
                //显示整改责任人
                showPersonChargeRectification: 1,
                PersonChargeRectificationList: [],
                PersonChargeRectificationName: '',
                newPersonChargeRectificationNameList: '',
                newPersonChargeRectificationNameListId: '',
                //显示传阅人
                showPersonCirculant: 1,
                PersonCirculantList: [],
                PersonCirculantName: '',
                newPersonCirculantNameList: '',
                newPersonCirculantNameListId: '',
                //照片资料上传
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: []
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
                        console.log(data);
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
                console.log(this.checkdateVale);
                console.log(this.dateVale);
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
                        console.log(data);
                        that.$router.push({name: 'NoSign'});
                    })
                    .catch(data => {

                    });
            },
            toIndex() {
                this.$router.push({name: 'NoSign'});
            },
            toLPHazards() {
                this.$router.push({name: 'LPHazards'});
            },
            searchValSelF(e) {
                this.searchValSel = e[0].title;
                this.inspectedCompanyId = e[0].id;
                this.getCRCPersonData();
            },
            getCompanyTreeList() {
                let newCompanyTree = this.companyTree;
                let newCompanyTreeList = '';
                let resetTree = (data) => {
                    let newTree = data.map(item => {
                        if (item.children) {
                            return {
                                // ...item,
                                title: item.f_ShortName,
                                id: item.f_CompanyId,
                                children: resetTree(item.children)
                            }
                        } else {
                            return {
                                // ...item,
                                title: item.f_ShortName,
                                id: item.f_CompanyId,
                            }
                        }
                    });
                    return newTree;
                };
                newCompanyTreeList = resetTree(newCompanyTree);
                this.companyTreeList = newCompanyTreeList;
            },
            getDangerTreeData(param) {
                const that = this;
                let parameter = {
                    fCompanyid: this.userInfo.companyId,
                    fUserid: this.userInfo.userId,
                };
                NCOScheduleAddUrl(parameter)
                    .then(function (data) {
                        that.DangerTreeData.companyDangerTree = data.companyDangerTree;
                        that.DangerTreeData.nodesList = data.nodesList;
                    })
                    .catch(data => {

                    });
            },
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
                    that.lat = obj.position.lat;
                    that.lng = obj.position.lng;
                }

                function onError (obj){
                    // console.log(obj.info + '--' + obj.message);
                }
            },
            searchDangerProjectName(e) {
                this.showDangerProjectName = 0;
                let company = e[0].title;
                let result = this.DangerTreeData.companyDangerTree.filter(data => data.fCompanyname === company);
                this.dangerProjectNameList = result;
            },
            showDangerProjectNameList(){
                this.showDangerProjectName = 1;
            },
            selDangerProjectName(e){
                this.dangerProjectName = e.label;
                this.inspectionRecordNoId = e.value;
            },
            //排查对象
            getObjectInvestigation(){
                this.objectInvestigationList = this.testObject;
            },
            //隐患类别
            getHiddenDangerCategory(){
                this.hiddenDangerCategoryList = this.trapLevel;
            },
            //隐患类型
            getHiddenDangerType(){
                this.hiddenDangerTypeList = this.trapType;
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
            showPersonChargeRectificationList(){
                this.showPersonChargeRectification = 1;
            },
            showPersonCirculantList(){
                this.showPersonCirculant = 1;
            },
            selPersonChargeRectificationName(e){
                let newPersonChargeRectificationName = '';
                let newPersonChargeRectificationNameId = '';
                e.map(data => {
                    newPersonChargeRectificationName += data.label+',';
                    newPersonChargeRectificationNameId += data.value+','
                });
                this.newPersonChargeRectificationNameList = newPersonChargeRectificationName.substr(0, newPersonChargeRectificationName.length - 1);
                this.newPersonChargeRectificationNameListId = newPersonChargeRectificationNameId.substr(0, newPersonChargeRectificationNameId.length - 1);
            },
            searchPersonChargeRectificationName(e) {
                this.showPersonChargeRectification = 0;
                this.PersonChargeRectificationName = e[0].title;
                let personName = e[0].title;
                let result = this.newPersonChargeRectificationCirculant;
                let newResult = result.find(data => data.fFullName === personName);
                if(newResult.personList.length){
                    this.PersonChargeRectificationList = newResult.personList;
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
            //照片及资料上传
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
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
                            console.log(data);
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
                            console.log(that.checkdateVale);
                            console.log(that.dateVale);
                        })
                        .catch(data => {

                        });
                }
            },
            checkdateValeChange(data){
                this.checkdateVale = data;
            },
            dateValeChange(data){
                this.dateVale = data;
            },
            //检查时间弹出层
            showPopup() {
                this.checkDatePop.show = true;
                console.log(Date.parse(this.checkDate.currentDate));
            },
            hidePopup(val) {
                this.checkDatePop.show = false;
                let date = this.checkDate.currentDate;
                let seperator1 = "-";
                let seperator2 = ":";
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                this.checkDate.timeValue =
                    date.getFullYear() +
                    seperator1 +
                    month +
                    seperator1 +
                    strDate +
                    " " +
                    "00" +
                    seperator2 +
                    "00";
            },
            dateChange(e){
                console.log(e.getValues());
                let date = this.checkDate.currentDate;
                let seperator1 = "-";
                let seperator2 = ":";
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                this.checkDate.timeValue =
                    date.getFullYear() +
                    seperator1 +
                    month +
                    seperator1 +
                    strDate +
                    " " +
                    "00" +
                    seperator2 +
                    "00";
                console.log(this.checkDate.timeValue);
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
        },
        mounted() {
            this.getHDVSiIData();
            this.getCompanyTreeList();
            this.getDangerTreeData();
            this.getLocation();
            this.getObjectInvestigation();
            this.getHiddenDangerCategory();
            this.getHiddenDangerType();
            // if(this.$route.params.LPHazardsList != undefined){
            //     this.recordMessageItem = this.$route.params.LPHazardsList;
            // }
        },
        activated() {
            if(this.$route.params.LPHazardsList != undefined){
                this.recordMessageItem = this.$route.params.LPHazardsList;
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
        font-size 2rem
</style>