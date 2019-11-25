<template>
    <div id="LHDNCSchedule">
        <div class="top">
            <div class="title">
                <p @click="toMHDIList"><</p>
                <h2>未按期已销号统计</h2>
                <div>
                    <div class="num">
                        <h4>{{listData.length}}</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="info" @click="toLHDNCScheduleDetails(data)" v-for="data in listData" :value="data.fTrapno" :key="data.fId">
                <div class="infoLeft">
                    <h3>{{data.fTrapno}}</h3>
                    <p>单位名称：{{data.fPassivename}}</p>
                    <p>监察人：{{data.fCheckname}}</p>
                    <p>检查时间：{{data.fCheckdate}}</p>
                </div>
                <div class="infoRight">超期{{data.difference}}天销号<span>></span></div>
            </div>
        </div>
        <div class="bottom">
            <div>
                <button @click="toMHDIList">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {NCOScheduleUrl} from './../../urlBase';

    export default {
        name: "LHDNCSchedule",
        data(){
            return{
                listData:''
            }
        },
        methods:{
            toMHDIList(){
                this.$router.push({name: 'MHDIList'});
            },
            toLHDNCScheduleDetails(data){
                this.$router.push({name: 'LHDNCScheduleDetails',params: { fId: data.fId,fTrapno:data.fTrapno,difference:data.difference}});
            },
            getList(){
                const that = this;
                const logInfo = this.userInfo;
                const parameter = {
                    companyId: this.$route.params.companyId,
                    userId: logInfo.userId,
                    realId: logInfo.realId,
                    modelType: '2'
                };
                NCOScheduleUrl(parameter)
                    .then(function (data) {
                        that.listData = data.trapDailyList;
                    })
                    .catch(data => {

                    });
            }
        },
        mounted() {
            this.getList();
        },
        computed: {
            ...mapState(['userInfo'])
        },
    }
</script>

<style scoped lang="stylus">
    #LHDNCSchedule
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
        background-color #1752DB
        color #fff
        display flex
        justify-content space-between
        align-items center
        p
            font-size 1.5rem
            font-weight bold
        .num
            border 1px solid #fff
            border-radius 50%
            height 20px
            width 20px
            display flex
            justify-content center
            align-items center
            padding 5px
            background-color #fff
            color #1752DB

    .content
        margin-bottom 20%
        padding-bottom 15%
        .info
            padding 15px 25px
            display flex
            justify-content space-between
            align-items center
            border-bottom  1px solid #eee
            .infoLeft
                color #9E9E9E
                h3
                    color #333
            .infoRight
                color #1752DB
                span
                    display inline-block
                    color #9E9E9E
                    margin-left 15px
                    font-size 1rem
                    font-weight bold

    .bottom
        position fixed
        bottom 0
        background-color #fff
        width 100%
        text-align center
        div
            padding 5%
        button
            display inline-block
            background-color #1752DB
            color #fff
            width 80%
            height 35px
            padding 5px
            border-radius 15px
            border none
            outline none
</style>