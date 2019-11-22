<template>
    <div id="MHDIList">
        <div class="topContent">
            <div class="top">
                <h2>安全隐患统计分析</h2>
                <p @click="toIndex"><span><</span>应用</p>
            </div>
            <div class="search">
                <div class="company">
                    <p @click="showCompany" class="searchSel">选择公司<span>{{searchValSel}}</span></p>
                    <Tree :data="companyTreeList" v-show="showCompanyVal === 1" @on-select-change="searchValSelF"></Tree>
                </div>
            </div>
        </div>
        <div class="boxContent">
            <div class="content">
                <div class="label" ref="label"></div>
            </div>
            <div class="bottom">
                <div class="bottomTop">
                    <div @click="toNCOSchedule" class="RColor">
                        <h2>{{indexData.noPunctualNoSale}}</h2>
                        <p>未按期未销号</p>
                    </div>
                    <div @click="toLUHDangers" class="YColor">
                        <h2>{{indexData.noSale}}</h2>
                        <p>未销号</p>
                    </div>
                </div>
                <div class="bottomBottom">
                    <div @click="toLHDNCSchedule" class="BColor">
                        <h2>{{indexData.noPunctualSale}}</h2>
                        <p>未按期已销号</p>
                    </div>
                    <div @click="toLHDTCancellation" class="GColor">
                        <h2>{{indexData.punctualSale}}</h2>
                        <p>按期销号</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {MHDIListUrl} from './../../urlBase';

    export default {
        name: "MHDIList",
        data() {
            return {
                logInfo:'',
                indexData:'',
                companyTreeList : [],
                showCompanyVal: 0,
                searchValSel: '',
                companyId:''
            }
        },
        methods: {
            creatLabel() {
                const that = this;
                const echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(that.$refs.label);

                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}项"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'middle',
                        data: ['处理完结数', '正在处理数'],
                        textStyle: {
                            color: '#4b4b4b'
                        },
                        show: false
                    },
                    series: [
                        {
                            // name: '访问来源',
                            type: 'pie',
                            radius: ['60%', '90%'],
                            center: ["50%", "50%"],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter: function (argument) {
                                        let html = '总数' + "\n" + that.indexData.trapDaily;
                                        return html;
                                    },
                                    textStyle: {
                                        fontSize: 15,
                                        color: '#333'
                                    }
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold',
                                        color: '#4b4b4b',
                                    },
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: that.indexData.noPunctualSale+that.indexData.punctualSale, name: '处理完结数'},
                                {value: that.indexData.noPunctualNoSale+that.indexData.noSale, name: '正在处理数'},
                            ],
                            color: ['#00B050', '#FFC000'],
                        },
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            toIndex(){
                this.$router.push({name: 'index'});
            },
            toNCOSchedule(){
                this.$router.push({name: 'NCOSchedule',params: { companyId: this.companyId}});
            },
            toLUHDangers(){
                this.$router.push({name: 'LUHDangers',params: { companyId: this.companyId}});
            },
            toLHDNCSchedule(){
                this.$router.push({name: 'LHDNCSchedule',params: { companyId: this.companyId}});
            },
            toLHDTCancellation(){
                this.$router.push({name: 'LHDTCancellation',params: { companyId: this.companyId}});
            },
            showCompany(){
                this.showCompanyVal = 1;
            },
            searchValSelF(e){
                this.searchValSel= e[0].title;
                this.showCompanyVal = 0;
                this.companyId = e[0].id;
                const parameter = {
                    companyId: this.companyId,
                    userId: this.logInfo.userId,
                };
                this.getIndexData(parameter);
            },
            getCompanyTreeList(){
                let newCompanyTree = this.companyTree;
                // function getCompanyTreeData(data){
                //     let CompanyTreeF = [];
                //     data.map(val=>{
                //         if (val.children.length) {
                //             val.children.map(val => {
                //                 CompanyTreeF.push(
                //                     {
                //                         title: val.f_FullName,
                //                         id: val.f_CompanyId,
                //                         children: getCompanyTreeData(data) //递归遍历
                //                     }
                //                 )
                //             });
                //         }else {
                //             CompanyTreeF.push(
                //                 {
                //                     title: val.f_FullName,
                //                     id: val.f_CompanyId,
                //                 }
                //             )
                //         }
                //     });
                // }
                // getCompanyTreeData(newCompanyTree);

                let newCompanyTreeList = '';
                let resetTree = (data)=> {
                    let newTree = data.map(item => {
                        if (item.children) {
                            return {
                                // ...item,
                                title: item.f_FullName,
                                id: item.f_CompanyId,
                                children: resetTree(item.children)
                            }
                        } else {
                            return {
                                // ...item,
                                title: item.f_FullName,
                                id: item.f_CompanyId,
                            }
                        }
                    });
                    return newTree;
                };
                newCompanyTreeList = resetTree(newCompanyTree);
                this.companyTreeList = newCompanyTreeList;
            },
            getIndexData(parameter){
                const that = this;
                MHDIListUrl(parameter)
                    .then(function (data) {
                        that.indexData = data.trapDailyList[0];
                        //数据返回后调用生成图表
                        that.creatLabel();
                    })
                    .catch(data => {

                    });
            }
        },
        mounted() {
            this.getCompanyTreeList();
            this.logInfo = this.userInfo;
            const parameter = {
                companyId: this.logInfo.companyId,
                userId: this.logInfo.userId,
            };
            this.getIndexData(parameter);
        },
        computed: {
            ...mapState(['companyTree','userInfo'])
        },
    }
</script>

<style scoped lang="stylus">
    #MHDIList
        width 100%
        height 100%
        margin 0
        color #333
        display flex
        flex-direction column
        justify-content space-between

    .topContent
        flex 1

    .top
        padding 15px
        position relative
        text-align center
        border-bottom 2px solid #EEEEEE
        p
            position absolute
            color #999999
            top 32%
            left 10%
            font-size 1rem

    .search
        text-align center
        border-bottom 2px solid #EEEEEE
        border-radius 15px
        box-shadow 0 3px 0 #d6d6d6
        .company
            padding 10px 0
            position relative
            .searchSel
                padding 10px
                width 100%
                box-shadow none
                border none
                text-align center
                span
                    font-weight bold
                    display inline-block
                    margin-left 15px


    .boxContent
        flex 3
        display flex
        flex-direction column
        justify-content space-between
        .content
            flex 2
            padding 30px
            .label
                width 100%
                height 100%
        .bottom
            flex 1
            padding 15px


    .bottomTop, .bottomBottom
        display flex
        justify-content space-between
        text-align center
        div
            flex 1
            background-color #F2F2F2
            margin 10px
            padding 15px
            border-radius 5px
        .RColor
            color #ce0c0c
        .YColor
            color #e1a14c
        .BColor
            color #1752db
        .GColor
            color #4dbb95
</style>