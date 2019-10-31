<template>
    <div id="LHDTCancellationDetails">
        <div class="top">
            <div class="title">
                <h2>成宜公司【安巡查】009</h2>
                <p @click="toLHDTCancellation"><</p>
            </div>
            <div>
                <p><span>被检查单位</span>TJ2-中铁四局</p>
                <p><span>被检查记录编号</span>成宜公司【安巡查】009</p>
                <p><span>检查时间</span>2019-09-03</p>
            </div>
            <div>
                <p><span>存在隐患工程名称</span>深基坑施工</p>
            </div>
            <div>
                <h3>检查发现问题</h3>
                <div>
                    <div>
                        <p>103020601</p>
                        <p>Ⅲ级</p>
                    </div>
                    <div>
                        <p>1.灌注前没有二次清孔。</p>
                    </div>
                </div>
            </div>
            <div>
                <p>查看更多<span>></span></p>
            </div>
        </div>
        <div class="content">

        </div>
        <div class="bottom">

        </div>
    </div>
</template>

<script>
    export default {
        name: "LHDTCancellationDetails",
        methods:{
            toLHDTCancellation(){
                this.$router.push({name: 'LHDTCancellation'});
            }
        }
    }
</script>

<style scoped lang="stylus">
    #LHDTCancellationDetails
        width 100%
        height 100%
        margin 0
        color #333
        position relative

    .title
        padding 15px
        position relative
        text-align center
        border-bottom 2px solid #EEEEEE
        p
            position absolute
            color #999999
            top 27%
            left 10%
            font-size 1.5rem
            font-weight bold
</style>