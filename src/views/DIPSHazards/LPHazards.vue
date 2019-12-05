<template>
    <div id="LPHazards">
        <van-nav-bar
                title="选择隐患清单工程名称"
                left-text="返回"
                left-arrow
                @click-left="toAddInfo(0)"
        />
        <el-cascader-panel
                :options="DangerTreeProject.list"
                v-model="DangerTreeProject.value"
                :props="{ expandTrigger: 'hover'}"
                @change="handleChange"
                ref="DangerTree"
        />
        <van-popup
                v-model="DangerTreeData.show"
                closeable
                position="top"
                style="padding-top: 50px"
        >
            <label v-if="DangerTreeData.list">
                <Select v-model="DangerTreeData.selDangerVal" multiple @on-change="selDangerList">
                    <Option v-for="item in DangerTreeData.list" :value="item.fId" :key="item.fId">{{ item.fNodename }}</Option>
                </Select>
            </label>
        </van-popup>
        <div class="bottom">
            <van-button type="primary" round  size="small" style='width: 70%' @click="toAddInfo(1)">保存</van-button>
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
              DangerTreeProject:{
                  list:[],
                  value:'',
              },
              //清单列表
              DangerTreeData:{
                  List:[],
                  selDangerVal:'',
                  show: false
              },
              //原始清单列表
              DangerTreeDataList:[],
              //选中清单列表
              newDangerList:[]
          }
        },
        methods:{
            //返回新增页面
            toAddInfo(e){
                const that = this;
                if(e === 0){
                    this.$router.push({name: 'addInfo'});
                }else {
                    this.$router.push({name: 'addInfo',params:{LPHazardsList:that.newDangerList}});
                }
            },
            //获取列表数据
            getDangerTreeData(param) {
                const that = this;
                let parameter = {
                    fCompanyid: this.userInfo.companyId,
                    fUserid: this.userInfo.userId,
                };
                NCOScheduleAddUrl(parameter)
                    .then(function (data) {
                        console.log(data);
                        that.getNewList(data.nodesList[0].child);
                        that.DangerTreeDataList=data.selectTrapItems;
                    })
                    .catch(data => {

                    });
            },
            //获取隐患工程列表
            getNewList(list){
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
                this.DangerTreeProject.list = newCompanyTreeList;
            },
            //获取选中隐患工程名称
            handleChange(){
                console.log(this.$refs.DangerTree.getCheckedNodes()[0]);
                this.DangerTreeData.show = true;
                const pId = this.$refs.DangerTree.getCheckedNodes()[0].data.fItemid;
                this.DangerTreeData.list = this.DangerTreeDataList.filter(data => data.fParentid === pId);
                console.log(this.DangerTreeData.list);
            },
            //清单选择
            selDangerList(){
                // let resultNew = [];
                // this.resultTSel.map(data => {
                //     let arr = this.resultL.filter(value => value.fId === data)[0];
                //     resultNew.push(arr);
                // });
                // let newRecordMessageItem = [];
                // resultNew.map(item =>{
                //     newRecordMessageItem.push({
                //         // ...item,
                //         fItemno: item.fNodeno,
                //         fItemname: item.fNodename,
                //         fTraplevel: item.fTraplevel,
                //         fItemid: item.fId
                //     });
                // });
                // this.newDangerList = newRecordMessageItem;
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

    .bottom
        text-align center
        position fixed
        bottom 0
        width 100%
        padding-bottom 10px
        background-color #fff

    /deep/.el-tree-node__label
        font-size 2rem

    /deep/ .el-tree-node
        margin  10px 0

    /deep/ .el-cascader-panel.is-bordered
        overflow-x auto
</style>