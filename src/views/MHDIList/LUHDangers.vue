<template>
    <div id="LUHDangers">
        <div class="top">
            <div class="title">
                <p @click="toMHDIList"><</p>
                <h2>未销号统计</h2>
                <div>
                    <div class="num">
                        <h4>{{listData.length}}</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="info" @click="toLUHDangersDetails(data)" v-for="data in listData" :value="data.fTrapno" :key="data.fId">
                <div class="infoLeft">
                    <h3>{{data.fTrapno}}</h3>
                    <p>单位名称：{{data.fPassivename}}</p>
                    <p>监察人：{{data.fCheckname}}</p>
                    <p>检查时间：{{data.fCheckdate}}</p>
                </div>
                <div class="infoRight">剩余{{data.difference}}天<span>></span></div>
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
        name: "LUHDangers",
        data(){
            return{
                listData:''
            }
        },
        methods:{
            toMHDIList(){
                this.$router.push({name: 'MHDIList'});
            },
            toLUHDangersDetails(data){
                this.$router.push({name: 'LUHDangersDetails',params: { fId: data.fId,fTrapno:data.fTrapno,difference:data.difference}});
            },
            getList(){
                const that = this;
                const logInfo = this.userInfo;
                const parameter = {
                    companyId: this.$route.params.companyId,
                    userId: logInfo.userId,
                    realId: logInfo.realId,
                    modelType: '3'
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
    #LUHDangers
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
        background-color #E1A14C
        color #fff
        display flex
        justify-content space-between
        align-items center
        p
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
            color #E1A14C

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
                color #E1A14C
                span
                    display inline-block
                    color #9E9E9E
                    margin-left 15px
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