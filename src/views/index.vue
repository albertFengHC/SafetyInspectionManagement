<template>
    <div id="index">
        <div class="top">
            <div class="topContent">
                <h2>工程项目安全管理信息系统</h2>
                <p>+</p>
            </div>
            <img src="../assets/index/topImg2x.png" class="topImg">
        </div>
        <div class="content">
            <h2>安全检查管理</h2>
            <div class="SIManagement">
                <div>
                    <img src="../assets/index/组1822.png" @click="toMHDIList">
                    <p>隐患排查</p>
                    <p>清单管理</p>
                </div>
                <div>
                    <img src="../assets/index/组1823.png" @click="toDIPSHazards">
                    <p>安全隐患</p>
                    <p>日常巡查</p>
                </div>
                <div>
                    <img src="../assets/index/组1824.png">
                    <p>整改闭合</p>
                    <p>复合销号</p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div>
                <img src="../assets/index/未选中/组1810.png">
                <p>消息</p>
            </div>
            <div>
                <img src="../assets/index/选中/组1811.png">
                <p>应用</p>
            </div>
            <div>
                <img src="../assets/index/未选中/组1826.png">
                <p>朋友</p>
            </div>
            <div>
                <img src="../assets/index/未选中/组1830.png">
                <p>我的</p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'index',
        components: {

        },
        methods:{
            toMHDIList(){
                this.$router.push({name: 'MHDIList'});
            },
            toDIPSHazards(){
                this.$router.push({name: 'NoSign'});
            }
        }
    }
</script>

<style scoped lang="stylus">
    #index
        width 100%
        height 100%
        margin 0
        color #333333
        display flex
        flex-direction column
        justify-content space-between

    .top
        flex 1

    .topContent
        color #fff
        background-color #1752DB
        text-align center
        padding 20px 0
        position relative
        p
            font-size 2rem
            position absolute
            top 20%
            right 5%

    .topImg
        width 100%

    .content
        flex: 10
        padding 20px 0
        h2
            padding-left 25px

    .SIManagement
        display flex
        justify-content space-between
        text-align center
        padding 20px 0
        div
            flex 1

    .bottom
        display flex
        justify-content space-between
        padding 5% 15%
        flex 1
        text-align center
</style>
