<template>
    <div id="LPHazards">
        <div class="topContent">
            <div class="top">
                <h2>安全隐患日常巡查</h2>
                <p @click="toAddInfo"><span><</span></p>
                <i>=</i>
            </div>
            <div class="search">
                <div class="name">
                    <select name="" id="4">
                        <option value="">请输入姓名</option>
                    </select>
                </div>
                <div class="company">
                    <select name="" id="3">
                        <option value="">请选择单位</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="boxContent">
            <div class="content">

            </div>
            <div class="bottom">
                <div>
                    <p>保存</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LPHazards",
        methods:{
            toAddInfo(){
                this.$router.push({name: 'addInfo'});
            },
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
        /*border none*/
        /*color #fff*/
        background-color #F2F2F2
        border 1px solid #F2F2F2
        border-radius 10px

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

    .boxContent
        flex 3

    .content
        margin-bottom 20%

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

</style>