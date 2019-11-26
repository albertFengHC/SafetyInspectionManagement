<template>
    <div id="RCRNo">
        <div class="topContent">
            <div class="top">
                <h2>整改闭合复核销号</h2>
                <p @click="toIndex"><span><</span>应用</p>
            </div>
            <div class="search">
                <div class="name">
                    <i @click="searchValName"></i>
                    <input type="text" placeholder="请输入名称或编号" v-model="searchNameCode">
                </div>
                <div class="company">
                    <p @click="showCompany" class="searchSel">选择公司<span>{{searchValSel}}</span></p>
                    <Tree :data="companyTreeList" v-show="showCompanyVal === 1" @on-select-change="searchValSelF"></Tree>
                </div>
            </div>
        </div>
        <div class="boxContent">
            <div class="content">
                <router-view ref="RCRNoDetails"/>
            </div>
            <div class="bottom">
                <div>
                    <p :class="{'active':activeClass===1}" @click="toNotSubmitted">未提交</p>
                    <p :class="{'active':activeClass===2}" @click="toApprovalPending">待复核</p>
                    <p :class="{'active':activeClass===3}" @click="toRefuseSign">复核不通过</p>
                    <p :class="{'active':activeClass===4}" @click="toAlreadySign">复核通过</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "RCRNo",
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
            search(e){
                console.log(e);
            },
            toIndex() {
                this.$router.push({name: 'index'});
            },
            toNotSubmitted(){
                this.$router.push({name: 'NotSubmitted'});
                this.activeClass = 1;
            },
            toApprovalPending(){
                this.$router.push({name: 'ApprovalPending'});
                this.activeClass = 2;
            },
            toRefuseSign(){
                this.$router.push({name: 'RefuseExaminationApproval'});
                this.activeClass = 3;
            },
            toAlreadySign(){
                this.$router.push({name: 'CompletionExaminationApproval'});
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
                this.searchValSel= e[0].title;
                this.showCompanyVal = 0;
                this.companyId = e[0].id;
                const param = {
                    companyId: this.companyId,
                    text: this.searchNameCode,
                };
                this.$refs.RCRNoDetails.getListData(param);
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
    #RCRNo
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
        i
            position absolute
            top 32%
            right 10%
            font-size 1rem
            font-style normal
            color #1752db
            font-weight bold

    .search
        text-align center
        border-bottom 2px solid #EEEEEE
        border-radius 15px
        box-shadow 0 3px 0 #d6d6d6
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
            padding 5%
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