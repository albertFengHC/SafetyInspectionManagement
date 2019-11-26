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
                          @on-select-change="searchValSelF"></Tree>
                </div>
                <div class="contentList">
                    <p><span>*</span>检查记录编号</p>
                    <input type="text" placeholder="请输入">
                </div>
                <div class="dangerProjectName">
                    <div class="dangerProjectNameVal">
                        <p><span>*</span>存在隐患工程名称</p>
                        <div>
                            <input type="text" placeholder="请输入或请选择" v-model="dangerProjectName">
                        </div>
                    </div>
                    <div>
                        <p @click="showDangerProjectNameList" class="searchSel">选择隐患名称</p>
                        <Tree :data="companyTreeList" v-show="showDangerProjectName === 1"
                              @on-select-change="searchDangerProjectName"></Tree>
                        <Select v-model="selDangerProjectNameVal" @on-change="selDangerProjectName">
                            <Option v-for="item in dangerProjectNameList" :value="item.fDangername" :key="item.fId">{{ item.fDangername }}</Option>
                        </Select>
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
                    <input type="text" placeholder="请输入">
                </div>
                <div class="contentList">
                    <p><span>*</span>整改要求</p>
                    <input type="text" placeholder="请输入">
                </div>
                <div class="contentList">
                    <p><span>*</span>排查对象</p>
                    <select name="" id="4">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="contentList">
                    <p><span>*</span>隐患类别</p>
                    <select name="" id="1">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="contentList">
                    <p><span>*</span>隐患类型</p>
                    <select name="" id="2">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="contentList">
                    <p><span>*</span>整改截至日期</p>
                    <Col span="12">
                        <DatePicker type="date" placeholder="整改截止时间" :value="dateVale"></DatePicker>
                    </Col>
                </div>
                <div class="contentListPhoto">
                    <p>现场照片</p>
                    <i><span>+</span></i>
                </div>
                <div class="contentListFile">
                    <p>资料附件</p>
                    <i><span>+</span></i>
                </div>
                <div class="ReceiptProcess">
                    <h3>签收流程</h3>
                    <div>
                        <div class="ReceiptProcessContent">
                            <div>
                                <h5>整改责任人</h5>
                                <p>请选择责任人</p>
                            </div>
                            <i><span>+</span></i>
                        </div>
                        <div class="ReceiptProcessContent">
                            <div>
                                <h5>传阅人</h5>
                                <p>请选择传阅人</p>
                            </div>
                            <i><span>+</span></i>
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
    import {NCOScheduleAddUrl} from "../../urlBase";

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
                dateVale:''
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
                    let res = '经纬度：' + obj.position +
                        '\n精度范围：' + obj.accuracy +
                        '米\n定位结果的来源：' + obj.location_type +
                        '\n状态信息：' + obj.info +
                        '\n地址：' + obj.formattedAddress +
                        '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
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
            selDangerProjectName(){
                this.dangerProjectName = this.selDangerProjectNameVal;
            }
        },
        mounted() {
            this.getCompanyTreeList();
            this.getDangerTreeData();
            this.getLocation();
        },
        computed: {
            ...mapState(['companyTree', 'userInfo'])
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

</style>