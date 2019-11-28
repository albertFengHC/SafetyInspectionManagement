<template>
    <div id="addInfo">
        <div class="topContent">
            <div class="top">
                <h2>新增安全隐患日常巡查</h2>
                <p @click="toIndex"><span><</span></p>
            </div>
        </div>
        <div class="boxContent">
            <div class="content">
                <div class="companyTree">
                    <p><span>*</span>被检查单位</p>
                    <p @click="showCompany" class="searchSel">选择公司<span>{{searchValSel}}</span></p>
                    <Tree :data="companyTreeList" v-show="showCompanyVal === 1"
                          @on-select-change="searchValSelF"/>
                </div>
                <div class="contentList">
                    <p><span>*</span>检查记录编号</p>
                    <label>
                        <input type="text" placeholder="请输入">
                    </label>
                </div>
                <div class="dangerProjectName">
                    <div class="dangerProjectNameVal">
                        <p><span>*</span>存在隐患工程名称</p>
                        <div>
                            <label>
                                <input type="text" placeholder="请输入或请选择" v-model="dangerProjectName">
                            </label>
                        </div>
                    </div>
                    <div>
                        <p @click="showDangerProjectNameList" class="searchSel">选择隐患名称</p>
                        <Tree :data="companyTreeList" v-show="showDangerProjectName === 1"
                              @on-select-change="searchDangerProjectName"/>
                        <label>
                            <Select v-model="selDangerProjectNameVal" @on-change="selDangerProjectName">
                                <Option v-for="item in dangerProjectNameList" :value="item.fDangername" :key="item.fId">{{ item.fDangername }}</Option>
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
                            <h3>检查发现问题</h3>
                            <i @click="toLPHazards"><span>+</span></i>
                        </div>
                        <div class="problemsInfo">
                            <div class="problemsInfoList" v-for="item in this.$route.params.LPHazardsList" :value="item.fId" :key="item.fId">
                                <div class="problemsInfoListTitle">
                                    <p>{{item.fNodeno}}</p>
                                    <p>{{item.fTraplevel}}</p>
                                </div>
                                <div class="problemsInfoListContent">
                                    <p>{{item.fNodename}}</p>
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
                    <p><span>*</span>排查对象</p>
                    <label>
                        <Select v-model="objectInvestigation">
                            <Option v-for="item in objectInvestigationList" :value="item.fItemCode" :key="item.fItemValue">{{ item.fItemName }}</Option>
                        </Select>
                    </label>
                </div>
                <div class="selectBox">
                    <p><span>*</span>隐患类别</p>
                    <label>
                        <Select v-model="hiddenDangerCategory">
                            <Option v-for="item in hiddenDangerCategoryList" :value="item.fItemCode" :key="item.fItemValue">{{ item.fItemName }}</Option>
                        </Select>
                    </label>
                </div>
                <div class="selectBox">
                    <p><span>*</span>隐患类型</p>
                    <label>
                        <Select v-model="hiddenDangerType">
                            <Option v-for="item in hiddenDangerTypeList" :value="item.fItemCode" :key="item.fItemValue">{{ item.fItemName }}</Option>
                        </Select>
                    </label>
                </div>
                <div class="selectBox">
                    <p><span>*</span>整改截至日期</p>
                    <Col>
                        <DatePicker type="date" placeholder="整改截止时间" :value="dateVale"/>
                    </Col>
                </div>
                <div class="contentListPhoto">
                    <p>现场照片</p>
<!--                    <i><span>+</span></i>-->
                    <div class="demo-upload-list" v-for="item in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
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
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                    </Modal>
                </div>
                <div class="contentListFile">
                    <p>资料附件</p>
                    <Upload
                            multiple
                            action="//jsonplaceholder.typicode.com/posts/">
                        <Button icon="ios-cloud-upload-outline">Upload files</Button>
                    </Upload>
<!--                    <i><span>+</span></i>-->
                </div>
                <div class="ReceiptProcess">
                    <h3>签收流程</h3>
                    <div>
                        <div class="dangerProjectName">
                            <div>
                                <h4>整改责任人</h4>
                                <p @click="showPersonChargeRectificationList" class="searchSel">选择整改责任人<i>{{personChargeRectification}}</i></p>
                                <Tree :data="personChargeRectificationCirculant" v-show="showPersonChargeRectification === 1"
                                      @on-select-change="searchPersonChargeRectificationName"/>
                                <label>
                                    <Select v-model="personChargeRectification" @on-change="selDangerProjectName" multiple :label-in-value="true">
                                        <Option v-for="item in PersonChargeRectificationList" :value="item.fStaffName" :key="item.fId">{{ item.fStaffName }}</Option>
                                    </Select>
                                </label>
                            </div>
<!--                            <i><span>+</span></i>-->
                        </div>
                        <div class="dangerProjectName">
                            <div>
                                <h4>传阅人</h4>
                                <p @click="showPersonCirculantList" class="searchSel">选择传阅人<i>{{personCirculant}}</i></p>
                                <Tree :data="personChargeRectificationCirculant" v-show="showPersonCirculant === 1"
                                      @on-select-change="searchPersonCirculantName"/>
                                <label>
                                    <Select v-model="personCirculant" @on-change="selDangerProjectName" multiple :label-in-value="true">
                                        <Option v-for="item in PersonCirculantList" :value="item.fStaffName" :key="item.fId">{{ item.fStaffName }}</Option>
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
    import {CRCPersonUrl, NCOScheduleAddUrl} from "../../urlBase";

    export default {
        name: "addInfo",
        data() {
            return {
                lat: '',
                lng: '',
                province: '',
                city: '',
                district: '',
                companyTreeList: [],
                showCompanyVal: 0,
                searchValSel: '',
                companyId: '',
                DangerTreeData: {
                    companyDangerTree: [],
                },
                showDangerProjectName: 0,
                dangerProjectName:'',
                selDangerProjectNameVal:'',
                dangerProjectNameList:[],
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
                newPersonChargeRectificationCirculant:[],
                //显示整改责任人
                showPersonChargeRectification:1,
                PersonChargeRectificationList:[],
                PersonChargeRectificationName:'',
                //显示传阅人
                showPersonCirculant:1,
                PersonCirculantList:[],
                PersonCirculantName:'',
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

            },
            save() {

            },
            toIndex() {
                this.$router.push({name: 'NoSign'});
            },
            toLPHazards() {
                this.$router.push({name: 'LPHazards'});
            },
            searchValSelF(e) {
                this.searchValSel = e[0].title;
                this.showCompanyVal = 0;
                this.companyId = e[0].id;
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
            showCompany() {
                this.showCompanyVal = 1;
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
                console.log(e);
                this.dangerProjectName = this.selDangerProjectNameVal;
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
                    companyId: this.companyId
                };
                CRCPersonUrl(parameter)
                    .then(function (data) {
                        console.log(data);
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
            }
        },
        mounted() {
            this.getCompanyTreeList();
            this.getDangerTreeData();
            this.getLocation();
            this.getObjectInvestigation();
            this.getHiddenDangerCategory();
            this.getHiddenDangerType();
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

    input, select
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

    .companyTree
        span
            display inline-block
            color #ce0c0c
            font-weight bold
        .searchSel
            span
                margin-left  15px
                color #757575

    .selectBox
        border-bottom 1px solid #EEEEEE
        padding 10px 0
        span
            display inline-block
            color #ce0c0c
            font-weight bold

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
        .searchSel
            i
                display inline-block
                margin-left 15px
                font-weight bold

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

        .lat,.lng
            text-align right

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

    .contentListPhoto, .contentListFile
        display flex
        justify-content space-between
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

        h3
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

    .mapBox
        width 100%
        height 300px
        padding 10px
        .map
            width 100%
            height 100%


    //照片及资料上传
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>