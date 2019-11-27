<template>
    <div id="LPHazards">
        <div class="topContent">
            <div class="top">
                <h2>选择隐患清单</h2>
                <p @click="toAddInfo(0)"><span><</span></p>
                <i @click="showList"/>
            </div>
            <div class="search">
                <h3>{{projectName}}</h3>
                <div class="name">
                    <h4>请选择二级名称</h4>
                    <label>
                        <Select v-model="selDangerValS" @on-change="selDangerS" class="nameSel">
                            <Option v-for="item in resultS" :value="item.fNodename" :key="item.fId">{{ item.fNodename }}</Option>
                        </Select>
                    </label>
                </div>
                <div class="company">
                    <h4>请选择三级名称</h4>
                    <label>
                        <Select v-model="selDangerValT" @on-change="selDangerT" class="companySel">
                            <Option v-for="item in resultT" :value="item.fNodename" :key="item.fId">{{ item.fNodename }}</Option>
                        </Select>
                    </label>
                </div>
            </div>
        </div>
        <div class="boxContent">
            <div class="content">
                <h4>请选择清单项</h4>
                <label>
                    <Select v-model="resultTSel" multiple @on-change="selDangerList">
                        <Option v-for="item in resultL" :value="item.fId" :key="item.fId">{{ item.fNodename }}</Option>
                    </Select>
                </label>
                <div class="problemsInfoList" v-for="item in resultNewList" :value="item.fId" :key="item.fId">
                    <div class="problemsInfoListTitle">
                        <p>{{item.fNodeno}}</p>
                        <p>{{item.fTraplevel}}</p>
                    </div>
                    <div class="problemsInfoListContent">
                        <p>{{item.fNodename}}</p>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div>
                    <p @click="toAddInfo(1)">保存</p>
                </div>
            </div>
        </div>
        <div class="listInfoShadow" v-show="listInfoShow" @click="listInfoHide"></div>
        <div class="listInfo" v-show="listInfoShow">
            <label>
                <Select v-model="selDangerVal" @on-change="selDanger">
                    <Option v-for="item in DangerTreeData.nodesList" :value="item.fNodename" :key="item.fId">{{ item.fNodename }}</Option>
                </Select>
            </label>
        </div>
    </div>
</template>

<script>
    import {NCOScheduleAddUrl} from "../../urlBase";
    import {mapState} from "vuex";

    export default {
        name: "LPHazards",
        data(){
          return{
              listInfoShow: false,
              projectName:'',
              DangerTreeData:{
                  nodesList:[]
              },
              selDangerVal:'',
              resultS: [],
              selDangerValS:'',
              resultT: [],
              selDangerValT:'',
              resultTSel:[],
              resultL:[],
              resultNewList:[]
          }
        },
        methods:{
            toAddInfo(e){
                const that = this;
                if(e === 0){
                    this.$router.push({name: 'addInfo'});
                }else {
                    this.$router.push({name: 'addInfo',params:{LPHazardsList:that.resultNewList}});
                }
            },
            showList(){
                this.listInfoShow = true;
            },
            listInfoHide(){
                this.listInfoShow = false;
            },
            getDangerTreeData(param) {
                const that = this;
                let parameter = {
                    fCompanyid: this.userInfo.companyId,
                    fUserid: this.userInfo.userId,
                };
                NCOScheduleAddUrl(parameter)
                    .then(function (data) {
                        that.DangerTreeData.nodesList = data.nodesList[0].child;
                    })
                    .catch(data => {

                    });
            },
            selDanger(){
                this.listInfoHide();
                this.projectName = this.selDangerVal;
                this.resultS = this.DangerTreeData.nodesList.filter(data => data.fNodename === this.projectName)[0].children;
            },
            selDangerS(){
                this.resultT = this.resultS.filter(data => data.fNodename === this.selDangerValS)[0].children;
            },
            selDangerT(){
                this.resultL = this.resultT.filter(data => data.fNodename === this.selDangerValT)[0].children;
            },
            selDangerList(){
                let resultNew = [];
                this.resultTSel.map(data => {
                    let arr = this.resultL.filter(value => value.fId === data)[0];
                    resultNew.push(arr);
                });
                console.log(resultNew);
                this.resultNewList = resultNew;
            }
        },
        mounted() {
            this.getDangerTreeData();
        },
        computed: {
            ...mapState(['companyTree', 'userInfo'])
        },
    }
</script>

<style scoped lang="stylus">
    #LPHazards
        width 100%
        height 100%
        margin 0
        color #333
        display flex
        flex-direction column
        justify-content space-between

    select
        background none
        outline none
        border none

    i
        font-style normal

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
            top 37%
            left 10%
            font-size 1rem
            font-weight bold
        i
            background url('../../assets/DHDIList/组1016.png') no-repeat
            width 22px
            height 18px
            position absolute
            top 32%
            right 5%
            font-size 1rem
            font-style normal
            color #1752db
            font-weight bold

    .search
        text-align center
        border-bottom 2px solid #EEEEEE
        border-radius 15px
        box-shadow 0 3px 0 #d6d6d6
        select
            background-color #F2F2F2
            border 1px solid #F2F2F2
            border-radius 10px
            padding 5px 10px
            width 70%
        h3
            text-align left
            padding 10px 15px
            font-size 1rem
        div
            padding 10px 0
        .nameSel,.companySel
            width 70%


    .boxContent
        flex 3

    .content
        margin-bottom 20%
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
                    border 1px dashed #4DBB95
                    background-color #4DBB95
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

    .listInfoShadow
        position absolute
        width 100%
        height 100%
        background-color rgba(146, 146, 146, 0.51)
        z-index 10

    .listInfo
        position: absolute;
        height: 100%;
        right: 0;
        overflow-y: auto;
        background-color: #fff;
        width: 60%;
        z-index 100
        div
            padding: 20px;
            p
                padding 10px 0
                font-size 1rem

</style>