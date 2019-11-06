<template>
    <div id="LPHazards">
        <div class="topContent">
            <div class="top">
                <h2>选择隐患清单</h2>
                <p @click="toAddInfo"><span><</span></p>
                <i></i>
            </div>
            <div class="search">
                <h3>102施工隧道</h3>
                <div class="name">
                    <select name="" id="1">
                        <option value="">请输入姓名</option>
                    </select>
                </div>
                <div class="company">
                    <select name="" id="2">
                        <option value="">请选择单位</option>
                    </select>
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

</style>