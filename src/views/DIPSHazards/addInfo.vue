<template>
    <div id="addInfo">
        <div class="topContent">
            <div class="top">
                <h2>新增安全隐患日常巡查</h2>
                <p @click="toIndex"><span><</span></p>
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
                    <p @click="Submission">提交</p>
                    <p @click="save">保存</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addInfo",
        methods:{
            Submission(){

            },
            save(){

            },
            toIndex(){
                this.$router.push({name: 'NoSign'});
            }
        }
    }
</script>

<style scoped lang="stylus">
    #addInfo
        width 100%
        height 100%
        margin 0
        color #333

    .top
        padding 15px
        position relative
        text-align center
        border-bottom 2px solid #EEEEEE
        p
            position absolute
            color #999999
            top 30%
            left 10%
            font-size 1.5rem
            font-weight bold

    .content
        margin-bottom 20%

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
                border 1px solid #1752DB
                padding 2px 10px
                background-color #1752db
                color #fff
                flex 1
                margin 0 5%


</style>