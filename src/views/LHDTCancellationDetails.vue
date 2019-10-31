<template>
    <div id="LHDTCancellationDetails">
        <div class="top">
            <div class="title">
                <h2>成宜公司【安巡查】009</h2>
                <p @click="toLHDTCancellation"><</p>
            </div>
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