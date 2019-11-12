<template>
    <div id="RCRNo">
        <div class="topContent">
            <div class="top">
                <h2>整改闭合复核销号</h2>
                <p @click="toIndex"><span><</span>应用</p>
            </div>
            <div class="search">
                <div class="name">
                    <i></i>
                    <input type="text" placeholder="请输入姓名">
                </div>
                <div class="company">
                    <i></i>
                    <input type="text" placeholder="请选择单位">
                </div>
            </div>
        </div>
        <div class="boxContent">
            <div class="content">
                <keep-alive>
                    <router-view/>
                </keep-alive>
            </div>
            <div class="bottom">
                <div>
                    <p :class="{'active':activeClass===1}" @click="toNotSubmitted">未提交</p>
                    <p :class="{'active':activeClass===2}" @click="toApprovalPending">待审批</p>
<!--                    <p :class="{'active':activeClass===3}" @click="toRefuseSign">审批拒绝</p>-->
                    <p :class="{'active':activeClass===4}" @click="toAlreadySign">审批通过</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RCRNo",
        data(){
            return{
                activeClass:1
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
            // toRefuseSign(){
            //     this.$router.push({name: 'RefuseExaminationApproval'});
            //     this.activeClass = 3;
            // },
            toAlreadySign(){
                this.$router.push({name: 'CompletionExaminationApproval'});
                this.activeClass = 4;
            },
        }
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
        .name, .company
            padding 10px 0
            position relative
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

        .name
            i
                background url('../../assets/MHDIList/组611.png') no-repeat
                right  5%

        .company
            i
                background url('../../assets/MHDIList/路径946.png') no-repeat
                left 35%

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