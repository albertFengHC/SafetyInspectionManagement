<template>
    <div id="LPHazards">
        <Cascader :data="treeList" v-model="treeValue"/>
        <van-cell is-link @click="showPopup">选择清单工程名称</van-cell>
        <van-popup v-model="show"
                   closeable
                   position="bottom"
        >
            <el-tree
                    :data="treeList"
                    :props="treeValue"
                    accordion
                    @node-click="handleChange">
            </el-tree>
        </van-popup>

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
              //树形列表
              treeList:[],
              treeValue:'',
              show:'',

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
                        console.log(data);
                        that.DangerTreeData.nodesList = data.nodesList[0].child;
                        that.getNewList(data.nodesList[0].child);
                    })
                    .catch(data => {

                    });
            },
            selDanger(){
                this.listInfoHide();
                this.projectName = this.selDangerVal;
                this.resultS = this.DangerTreeData.nodesList.filter(data => data.fNodename === this.projectName)[0].children;
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
                let newRecordMessageItem = [];
                resultNew.map(item =>{
                    newRecordMessageItem.push({
                        // ...item,
                        fItemno: item.fNodeno,
                        fItemname: item.fNodename,
                        fTraplevel: item.fTraplevel,
                        fItemid: item.fId
                    });
                });
                this.resultNewList = newRecordMessageItem;
            },

            getNewList(list){
                const that = this;
                let newCompanyTreeList = '';
                let resetTree = (data) => {
                    let newTree = data.map(item => {
                        if (item.children.length) {
                            return {
                                // ...item,
                                fItemno: item.fNodeno,
                                fItemname: item.fNodename,
                                fTraplevel: item.fTraplevel,
                                fItemid: item.fId,
                                label: item.fNodename,
                                value: item.fId,
                                children: resetTree(item.children)
                            }
                        } else {
                            return {
                                // ...item,
                                fItemno: item.fNodeno,
                                fItemname: item.fNodename,
                                fTraplevel: item.fTraplevel,
                                fItemid: item.fId,
                                label: item.fNodename,
                                value: item.fId,
                                fParentid:item.fParentid
                            }
                        }
                    });
                    return newTree;
                };
                newCompanyTreeList = resetTree(list);
                console.log(newCompanyTreeList);
                this.treeList = newCompanyTreeList;
            },
            handleChange(value) {
                console.log(value);
                console.log(this.treeList);
                // this.show = false;
            },
            showPopup() {
                this.show = true;
            },
            dangerProjectSel(value){
                this.dangerProject.show = false;
                this.dangerProject.dangerProjectName = value.name;
                this.dangerProject.dangerProjectId = value.fId;
            },
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
            font-weight bold
        i
            background url('../../assets/DHDIList/组1016.png') no-repeat
            width 22px
            height 18px
            position absolute
            top 32%
            right 5%
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

    /deep/.el-tree-node__label
        font-size 2rem

    /deep/ .el-tree-node
        margin  3px 0
</style>