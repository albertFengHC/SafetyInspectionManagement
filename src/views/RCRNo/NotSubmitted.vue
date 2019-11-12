<template>
    <div id="NotSubmitted">
        <div class="info" @click="toNotSubmittedDetails">
            <div class="infoLeft">
                <h3>安巡查0001</h3>
                <p>单位名称：成宜项目分公司</p>
                <p>整改人：苗争</p>
                <p>检查时间：2019-09-11</p>
            </div>
            <div class="infoRight">未提交<span>></span></div>
        </div>
        <div class="info" @click="toNotSubmittedDetails">
            <div class="infoLeft">
                <h3>安巡查0001</h3>
                <p>单位名称：成宜项目分公司</p>
                <p>整改人：苗争</p>
                <p>检查时间：2019-09-11</p>
            </div>
            <div class="infoRight">未提交<span>></span></div>
        </div>
        <div class="info" @click="toNotSubmittedDetails">
            <div class="infoLeft">
                <h3>安巡查0001</h3>
                <p>单位名称：成宜项目分公司</p>
                <p>整改人：苗争</p>
                <p>检查时间：2019-09-11</p>
            </div>
            <div class="infoRight">未提交<span>></span></div>
        </div>
        <div class="info" @click="toNotSubmittedDetails">
            <div class="infoLeft">
                <h3>安巡查0001</h3>
                <p>单位名称：成宜项目分公司</p>
                <p>整改人：苗争</p>
                <p>检查时间：2019-09-11</p>
            </div>
            <div class="infoRight">未提交<span>></span></div>
        </div>
        <div class="info" @click="toNotSubmittedDetails">
            <div class="infoLeft">
                <h3>安巡查0001</h3>
                <p>单位名称：成宜项目分公司</p>
                <p>整改人：苗争</p>
                <p>检查时间：2019-09-11</p>
            </div>
            <div class="infoRight">未提交<span>></span></div>
        </div>
        <div class="info" @click="toNotSubmittedDetails">
            <div class="infoLeft">
                <h3>安巡查0001</h3>
                <p>单位名称：成宜项目分公司</p>
                <p>整改人：苗争</p>
                <p>检查时间：2019-09-11</p>
            </div>
            <div class="infoRight">未提交<span>></span></div>
        </div>
        <div class="info" @click="toNotSubmittedDetails">
            <div class="infoLeft">
                <h3>安巡查0001</h3>
                <p>单位名称：成宜项目分公司</p>
                <p>整改人：苗争</p>
                <p>检查时间：2019-09-11</p>
            </div>
            <div class="infoRight">未提交<span>></span></div>
        </div>
        <div class="info" @click="toNotSubmittedDetails">
            <div class="infoLeft">
                <h3>安巡查0001</h3>
                <p>单位名称：成宜项目分公司</p>
                <p>整改人：苗争</p>
                <p>检查时间：2019-09-11</p>
            </div>
            <div class="infoRight">未提交<span>></span></div>
        </div>
        <div class="info" @click="toNotSubmittedDetails">
            <div class="infoLeft">
                <h3>安巡查0001</h3>
                <p>单位名称：成宜项目分公司</p>
                <p>整改人：苗争</p>
                <p>检查时间：2019-09-11</p>
            </div>
            <div class="infoRight">未提交<span>></span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotSubmitted",
        methods: {
            toNotSubmittedDetails() {
                this.$router.push({name: 'NotSubmittedDetails'});
            }
        }
    }
</script>

<style scoped lang="stylus">
    .info
        padding 15px 25px
        display flex
        justify-content space-between
        align-items center
        border-bottom 1px solid #eee
        .infoLeft
            color #9E9E9E
            h3
                color #333
        .infoRight
            color #1752DB
            font-weight bold
            span
                display inline-block
                color #9E9E9E
                margin-left 15px
                font-size 1rem
                font-weight bold
</style>