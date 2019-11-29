<template>
    <div id="RefuseExaminationApproval">
        <div class="info" @click="toRefuseExaminationApprovalDetails(data)" v-for="data in listData" :value="data.fTrapno" :key="data.fId">
            <div class="infoLeft">
                <h3>{{data.fTrapno}}</h3>
                <p>单位名称：{{data.fPassivename}}</p>
                <p>检查人：{{data.fCheckname}}</p>
                <p>存在隐患工程名称：{{data.fDangername}}</p>
            </div>
            <div class="infoRight">复核不通过<span>></span></div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {NCOScheduleUrl} from './../../urlBase';

    export default {
        name: "RefuseExaminationApproval",
        data(){
            return{
                listData:'',
                logInfo: ''
            }
        },
        methods:{
            toRefuseExaminationApprovalDetails(data){
                this.$router.push({name: 'RefuseExaminationApprovalDetails',params:{fId:data.fId}});
            },
            getListData(param){
                const that = this;
                const logInfo = this.userInfo;
                let parameter = {
                    companyId: param.companyId,
                    userId: logInfo.userId,
                    realId: logInfo.realId,
                    text: param.text,
                    modelType: '11'
                };
                NCOScheduleUrl(parameter)
                    .then(function (data) {
                        that.listData = data.trapDailyList;
                        console.log(that.listData);
                    })
                    .catch(data => {

                    });
            },
        },
        mounted() {
            this.logInfo = this.userInfo;
        },
        computed: {
            ...mapState(['userInfo'])
        },
    }
</script>

<style scoped lang="stylus">
    .info
        padding 15px 25px
        display flex
        justify-content space-between
        align-items center
        border-bottom 1px solid #eee
        .infoLeft
            color #9E9E9E
            h3
                color #333
        .infoRight
            color #ce0c0c
            font-weight bold
            span
                display inline-block
                color #9E9E9E
                margin-left 15px
                font-size 1rem
                font-weight bold

</style>