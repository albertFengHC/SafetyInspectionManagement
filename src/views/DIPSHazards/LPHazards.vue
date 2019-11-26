<template>
    <div id="LPHazards">
        <div class="topContent">
            <div class="top">
                <h2>选择隐患清单</h2>
                <p @click="toAddInfo"><span><</span></p>
                <i @click="showList"></i>
            </div>
            <div class="search">
                <h3>{{projectName}}</h3>
                <div class="name">
                    <p>请选择二级名称</p>
                    <Select v-model="selDangerValS" @on-change="selDangerS" class="nameSel">
                        <Option v-for="item in resultS" :value="item.fNodename" :key="item.fId">{{ item.fNodename }}</Option>
                    </Select>
                </div>
                <div class="company">
                    <p>请选择三级名称</p>
                    <Select v-model="selDangerValT" class="companySel">
                        <Option v-for="item in resultT" :value="item.fNodename" :key="item.fId">{{ item.fNodename }}</Option>
                    </Select>
                </div>
            </div>
        </div>
        <div class="boxContent">
            <div class="content">
                <div class="problemsInfoList">
                    <div class="problemsInfoListTitle">
                        <p>103020601</p>
                        <p>Ⅲ级</p>
                        <i><span>√</span></i>
                    </div>
                    <div class="problemsInfoListContent">
                        <p>1.灌注前没有二次清孔。</p>
                        <p>1.灌注前没有二次清孔。</p>
                        <p>1.灌注前没有二次清孔。</p>
                    </div>
                </div>
                <div class="problemsInfoList">
                    <div class="problemsInfoListTitle">
                        <p>103020601</p>
                        <p>Ⅲ级</p>
                        <i><span>√</span></i>
                    </div>
                    <div class="problemsInfoListContent">
                        <p>1.灌注前没有二次清孔。</p>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div>
                    <p>保存</p>
                </div>
            </div>
        </div>
        <div class="listInfoShadow" v-show="listInfoShow" @click="listInfoHide"></div>
        <div class="listInfo" v-show="listInfoShow">
            <Select v-model="selDangerVal" @on-change="selDanger">
                <Option v-for="item in DangerTreeData.nodesList" :value="item.text" :key="item.id">{{ item.text }}</Option>
            </Select>
        </div>
    </div>
</template>

<script>
    import {NCOScheduleAddUrl} from "../../urlBase";

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
          }
        },
        methods:{
            toAddInfo(){
                this.$router.push({name: 'addInfo'});
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
                    fCompanyid: '',
                    fUserid: '',
                };
                NCOScheduleAddUrl(parameter)
                    .then(function (data) {
                        that.DangerTreeData.nodesList = data.nodesList;
                        console.log(that.DangerTreeData.nodesList);
                    })
                    .catch(data => {

                    });
            },
            selDanger(){
                this.listInfoHide();
                this.projectName = this.selDangerVal;
                this.resultS = this.DangerTreeData.nodesList.filter(data => data.text === this.projectName)[0].child;
                console.log(this.resultS);
            },
            selDangerS(){
                this.projectName = this.selDangerVal;
                this.resultT = this.DangerTreeData.nodesList.filter(data => data.text === this.projectName)[0].child;
                console.log(this.resultT);
            },
        },
        mounted() {
            this.getDangerTreeData();
        }
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