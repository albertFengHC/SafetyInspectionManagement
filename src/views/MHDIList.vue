<template>
    <div id="MHDIList">
        <div class="topContent">
            <div class="top">
                <h2>隐患排查清单管理</h2>
                <p><span><</span>应用</p>
            </div>
            <div class="search">
                <div class="name">
                    <i></i>
                    <input type="text" placeholder="请输入姓名">
                </div>
                <div class="company">
                    <i></i>
                    <input type="text" placeholder="请选择单位">
                </div>
            </div>
        </div>
        <div class="boxContent">
            <div class="content">
                <div class="label" ref="label"></div>
            </div>
            <div class="bottom">
                <div class="bottomTop">
                    <div @click="toNCOSchedule">
                        <h2>111</h2>
                        <p>未按期未销号</p>
                    </div>
                    <div @click="toLUHDangers">
                        <h2>111</h2>
                        <p>未销号</p>
                    </div>
                </div>
                <div class="bottomBottom">
                    <div>
                        <h2>111</h2>
                        <p>未按期已销号</p>
                    </div>
                    <div>
                        <h2>111</h2>
                        <p>按期销号</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MHDIList",
        data() {
            return {}
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
                                        let html = '总数' + "\n" + '1111';
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
                                {value: 20, name: '处理完结数'},
                                {value: 60, name: '正在处理数'},
                            ],
                            color: ['#00B050', '#FFC000'],
                        },
                    ]
                };

                // 绘制图表
                myChart.setOption(option);

            },
            toNCOSchedule(){
                this.$router.push({name: 'NCOSchedule'});
            },
            toLUHDangers(){
                this.$router.push({name: 'LUHDangers'});
            }
        },
        mounted() {
            this.creatLabel();
        }
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
        .name, .company
            padding 10px 0
            position relative
            input
                padding 10px
                width 70%
                border-radius 10px
                box-shadow none
                border none
                background-color #F2F2F2
                text-align center
            i
                display inline-block
                width 21px
                height 22px
                background-size 100% 100%
                position absolute
                top 40%
                left 35%

        .name
            i
                background url('../assets/MHDIList/组611.png') no-repeat

        .company
            i
                background url('../assets/MHDIList/路径946.png') no-repeat


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

</style>