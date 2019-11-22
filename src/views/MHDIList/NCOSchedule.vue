<template>
    <div id="NCOSchedule">
        <div class="top">
            <div class="title">
                <p @click="toMHDIList"><</p>
                <h2>未按期未销号统计</h2>
                <div>
                    <div class="num">
                        <h4>{{listData.length}}</h4>
                    </div>
                </div>
            </div>
<!--            <div class="topContent">-->
<!--                <div class="circle">-->
<!--                    <div>-->
<!--                        <div class="num">-->
<!--                            <h2>86</h2>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <h3 class="name">未按期未销号</h3>-->
<!--            </div>-->
        </div>
        <div class="content">
            <div class="info" @click="toNCOScheduleDetails(data)" v-for="data in listData" :value="data.fTrapno" :key="data.fId">
                <div class="infoLeft">
                    <h3>{{data.fTrapno}}</h3>
                    <p>单位名称：{{data.fPassivename}}</p>
                    <p>监察人：{{data.fCheckname}}</p>
                    <p>检查时间：{{data.fCheckdate}}</p>
                </div>
                <div class="infoRight">超期{{data.difference}}天<span>></span></div>
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
        name: "NCOSchedule",
        data(){
            return{
                listData:''
            }
        },
        methods:{
            toMHDIList(){
                this.$router.push({name: 'MHDIList'});
            },
            toNCOScheduleDetails(data){
                this.$router.push({name: 'NCOScheduleDetails',params: { fId: data.fId,fTrapno:data.fTrapno,difference:data.difference}});
            },
            getList(){
                const that = this;
                const logInfo = this.userInfo;
                const parameter = {
                    companyId: this.$route.params.companyId,
                    userId: logInfo.userId,
                    realId: logInfo.realId,
                    modelType: '4'
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
    #NCOSchedule
        width 100%
        height 100%
        margin 0
        color #333
        position relative

    .title
        padding 15px
        text-align center
        border-bottom 2px solid #EEEEEE
        background-color #CE0C0C
        color #fff
        display flex
        justify-content space-between
        align-items center
        p
            /*position absolute*/
            /*top 27%*/
            /*left 10%*/
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
            color #ce0c0c

    /*.topContent*/
    /*    text-align center*/
    /*    border-bottom 2px solid #EEEEEE*/
    /*    border-bottom-right-radius 15px*/
    /*    border-bottom-left-radius 15px*/
    /*    box-shadow 0 3px 0 #d6d6d6*/
    /*    background-color #CE0C0C*/
    /*    color #fff*/
    /*    padding 30px*/
    /*    display flex*/
    /*    flex-direction column*/
    /*    justify-content space-between*/
    /*    align-items center*/
    /*    .circle*/
    /*        border 1px solid #fff*/
    /*        border-radius 50%*/
    /*        height 100px*/
    /*        width 100px*/
    /*        line-height 100px*/
    /*        display flex*/
    /*        justify-content center*/
    /*        align-items center*/
    /*        margin-bottom 15px*/
    /*        div*/
    /*            border 1px solid #fff*/
    /*            border-radius 50%*/
    /*            height 80%*/
    /*            width 80%*/
    /*            display flex*/
    /*            justify-content center*/
    /*            align-items center*/
    /*        .num*/
    /*            background-color #fff*/
    /*            color #CE0C0C*/
    /*    .name*/
    /*        h3*/
    /*            font-size 1.2rem*/

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
                color #CE0C0C
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