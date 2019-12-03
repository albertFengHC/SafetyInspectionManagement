<template>
    <div id="DIPSHazards">
        <div class="topContent">
            <div class="top">
                <h2>隐患日常巡查管理</h2>
                <p @click="toIndex"><span><</span>应用</p>
                <i @click="toAddInfo">新增</i>
            </div>
            <div class="search">
                <div class="name">
                    <i @click="searchValName"></i>
                    <input type="text" placeholder="请输入名称或编号" v-model="searchNameCode">
                </div>
                <div class="company">
                    <p @click="showCompany" class="searchSel">选择公司<span>{{searchValSel}}</span></p>
                    <Tree :data="companyTreeList" v-show="showCompanyVal === 1" @on-check-change="searchValSelF"></Tree>
                </div>
            </div>
        </div>
        <div class="boxContent">
            <div class="content">
                <router-view ref="details"/>
            </div>
            <div class="bottom">
                <div>
                    <p :class="{'active':activeClass===1}" @click="toNoSign">未提交</p>
                    <p :class="{'active':activeClass===2}" @click="toWaitingSign">待签收</p>
<!--                    <p :class="{'active':activeClass===3}" @click="toRefuseSign">拒绝签收</p>-->
                    <p :class="{'active':activeClass===4}" @click="toAlreadySign">已签收</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "DIPSHazards",
        data(){
            return{
                activeClass:1,
                companyTreeList : [],
                showCompanyVal: 0,
                searchValSel: '',
                companyId:'',
                searchNameCode:'',
                logInfo:''
            }
        },
        methods: {
            toAddInfo(){
                this.$router.push({name: 'addInfo'});
            },
            search(e){
                console.log(e);
            },
            toIndex() {
                this.$router.push({name: 'index'});
            },
            toNoSign(){
                this.$router.push({name: 'NoSign'});
                this.activeClass = 1;
            },
            toWaitingSign(){
                this.$router.push({name: 'WaitingSign'});
                this.activeClass = 2;
            },
            // toRefuseSign(){
            //     this.$router.push({name: 'RefuseSign'});
            //     this.activeClass = 3;
            // },
            toAlreadySign(){
                this.$router.push({name: 'AlreadySign'});
                this.activeClass = 4;
            },
            searchValName(){
                const param = {
                    companyId: this.companyId,
                    text: this.searchNameCode,
                };
                this.$refs.details.getListData(param);
            },
            searchValSelF(e){
                console.log(e);
                this.searchValSel= e[0].title;
                this.showCompanyVal = 0;
                this.companyId = e[0].id;
                const param = {
                    companyId: this.companyId,
                    text: this.searchNameCode,
                };
                this.$refs.details.getListData(param);
            },
            getCompanyTreeList(){
                let newCompanyTree = this.companyTree;
                let newCompanyTreeList = '';
                let resetTree = (data)=> {
                    let newTree = data.map(item => {
                        if (item.children) {
                            return {
                                // ...item,
                                title: item.f_ShortName,
                                id: item.f_CompanyId,
                                children: resetTree(item.children)
                            }
                        } else {
                            return {
                                // ...item,
                                title: item.f_ShortName,
                                id: item.f_CompanyId,
                            }
                        }
                    });
                    return newTree;
                };
                newCompanyTreeList = resetTree(newCompanyTree);
                this.companyTreeList = newCompanyTreeList;
            },
            showCompany(){
                this.showCompanyVal = 1;
            },
        },
        mounted() {
            this.getCompanyTreeList();
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
        i
            position absolute
            top 32%
            right 10%
            font-style normal
            color #1752db
            font-weight bold

    .search
        border-bottom 2px solid #EEEEEE
        border-radius 15px
        box-shadow 0 3px 0 #d6d6d6
        padding-left 15px
        .name
            padding 10px 0
            position relative
            text-align center
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
                background url('../../assets/MHDIList/组611.png') no-repeat
                right  5%
        .company
            padding 10px 0
            .searchSel
                span
                    display inline-block
                    margin-left 15px

    .boxContent
        flex 3

    .content
        margin-bottom 20%
        padding-bottom 15%

    .bottom
        text-align center
        position fixed
        bottom 0
        width 100%
        background-color #fff
        div
            padding 5% 10%
            display flex
            justify-content space-between
            p
                border-radius 10px
                border 1px solid #999
                padding 2px 10px
                background-color #999
                color #fff
            .active
                background-color #1752db
                border 1px solid #1752DB

</style>