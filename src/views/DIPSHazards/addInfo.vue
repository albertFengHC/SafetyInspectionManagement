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
                <div class="contentList">
                    <p><span>*</span>被检查单位</p>
                    <input type="text" placeholder="请输入">
                </div>
                <div class="contentList">
                    <p><span>*</span>检查记录编号</p>
                    <input type="text" placeholder="请输入">
                </div>
                <div class="contentList">
                    <p><span>*</span>检查时间</p>
                    <select name="" id="5">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="contentList">
                    <p><span>*</span>存在隐患工程名称</p>
                    <div>
                        <input type="text" placeholder="请输入或请选择">
                    </div>
                </div>
                <div class="contentList">
                    <p>经度</p>
                    <input type="text" placeholder="请输入">
                </div>
                <div class="contentList">
                    <p>纬度</p>
                    <input type="text" placeholder="请输入">
                </div>
                <div class="contentListProblem">
                    <div class="problems">
                        <div class="problemsTitle">
                            <h3>检查发现问题</h3>
                            <i><span>+</span></i>
                        </div>
                        <div class="problemsInfo">
                            <div class="problemsInfoList">
                                <div class="problemsInfoListTitle">
                                    <p>103020601</p>
                                    <p>Ⅲ级</p>
                                    <i><span>x</span></i>
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
                                    <i><span>x</span></i>
                                </div>
                                <div class="problemsInfoListContent">
                                    <p>1.灌注前没有二次清孔。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contentList">
                    <p><span>*</span>问题描述</p>
                    <input type="text" placeholder="请输入">
                </div>
                <div class="contentList">
                    <p><span>*</span>整改要求</p>
                    <input type="text" placeholder="请输入">
                </div>
                <div class="contentList">
                    <p><span>*</span>排查对象</p>
                    <select name="" id="4">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="contentList">
                    <p><span>*</span>隐患类别</p>
                    <select name="" id="1">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="contentList">
                    <p><span>*</span>隐患类型</p>
                    <select name="" id="2">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="contentList">
                    <p><span>*</span>整改截至日期</p>
                    <select name="" id="3">
                        <option value="">请选择</option>
                    </select>
                </div>
                <div class="contentListPhoto">
                    <p>现场照片</p>
                    <i><span>+</span></i>
                </div>
                <div class="contentListFile">
                    <p>资料附件</p>
                    <i><span>+</span></i>
                </div>
                <div class="ReceiptProcess">
                    <h3>签收流程</h3>
                    <div>
                        <div class="ReceiptProcessContent">
                            <div>
                                <h5>整改责任人</h5>
                                <p>请选择责任人</p>
                            </div>
                            <i><span>+</span></i>
                        </div>
                        <div class="ReceiptProcessContent">
                            <div>
                                <h5>传阅人</h5>
                                <p>请选择传阅人</p>
                            </div>
                            <i><span>+</span></i>
                        </div>
                    </div>
                </div>
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
        data(){
          return{
              value11:''
          }
        },
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

    input,select
        background none
        outline none
        border none

    i
        font-style normal

    .top
        padding 15px
        position relative
        text-align center
        border-bottom 2px solid #EEEEEE
        p
            position absolute
            color #999999
            top 25%
            left 10%
            font-size 1.5rem
            font-weight bold

    .content
        margin-bottom 20%
        padding 10px 5%
        padding-bottom 10%

    .contentList
        display flex
        justify-content space-between
        border-bottom 1px solid #EEEEEE
        padding 10px 0
        p
            flex 1
            padding 3px 5px
            span
                display inline-block
                color #ce0c0c
                font-weight bold
        input
            flex 2
            padding 3px 5px
            text-align right
        select
            /*flex 2*/
            padding 3px 5px
            text-align right
            appearance none
            color #757575

    .contentListProblem
        .problems
            .problemsTitle
                display flex
                justify-content space-between
                border-bottom 1px solid #EEEEEE
                padding 15px
                p
                    font-weight bold
                i
                    color #1752db
                    border 1px dashed #1752db
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

    .problemsInfo
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
                    border 1px dashed #626262
                    background-color #626262
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

    .contentListPhoto,.contentListFile
        display flex
        justify-content space-between
        border-bottom 1px solid #EEEEEE
        padding 15px
        p
            font-weight bold
        i
            color #CCCCCC
            border 1px dashed #CCCCCC
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

    .ReceiptProcess
        padding 15px
        h3
            padding 10px 0
            padding-bottom 20px
        .ReceiptProcessContent
            display flex
            justify-content space-between
            padding-left 15px
            padding-bottom 30px
            i
                color #1752db
                border 1px dashed #1752db
                border-radius 50%
                height 30px
                width 30px
                font-weight bold
                display inline-block
                span
                    display flex
                    justify-content center
                    align-items center
                    height 30px
                    width 30px
            div
                p
                    color #CCCCCC


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