<template>
    <div id="index">
        <div class="top">
            <div class="topContent">
                <h2>工程项目安全管理信息系统</h2>
            </div>
            <img src="../assets/index/topImg2x.png" class="topImg">
        </div>
        <div class="content">
            <div>
                <h2>经济合同人员管理</h2>
                <div class="MECPersonnel">
                    <div class="MECPersonnelTop">
                        <div>
                            <img src="../assets/index/组1813.png">
                            <p>单位技术</p>
                            <p>人员管理</p>
                        </div>
                        <div>
                            <img src="../assets/index/组1814.png">
                            <p>劳动用工</p>
                            <p>实名管理</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2>安全生产责任</h2>
                <div class="SPResponsibility">
                    <div class="SPResponsibilityTop">
                        <div>
                            <img src="../assets/index/组1815.png">
                            <p>组织体系</p>
                            <p>及制度</p>
                        </div>
                        <div>
                            <img src="../assets/index/组1816.png">
                            <p>安全生产</p>
                            <p>知识库</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2>安全生产管理</h2>
                <div class="SPManagement">
                    <div class="SPManagementTop">
                        <div>
                            <img src="../assets/index/组1817.png">
                            <p>群安员工作</p>
                            <p>信息记录</p>
                        </div>
                        <div>
                            <img src="../assets/index/组1818.png">
                            <p>临时用电</p>
                            <p>巡视</p>
                        </div>
                        <div>
                            <img src="../assets/index/组1828.png">
                            <p>机械设备</p>
                            <p>在线管理</p>
                        </div>
                        <div>
                            <img src="../assets/index/组1819.png">
                            <p>机械设备</p>
                            <p>维保记录</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2>安全风险管控</h2>
                <div class="SRMControl">
                    <div class="SRMControlTop">
                        <div>
                            <img src="../assets/index/组1820.png">
                            <p>危险源</p>
                            <p>信息管理</p>
                        </div>
                        <div>
                            <img src="../assets/index/组1821.png">
                            <p>危险源</p>
                            <p>工点监管</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2>安全检查管理</h2>
                <div class="SRMControl">
                    <div class="SRMControlTop">
                        <div>
                            <img src="../assets/index/组1822.png" @click="toMHDIList">
                            <p>安全隐患</p>
                            <p>统计分析</p>
                        </div>
                        <div>
                            <img src="../assets/index/组1823.png" @click="toDIPSHazards">
                            <p>隐患日常</p>
                            <p>巡查管理</p>
                        </div>
                        <div>
                            <img src="../assets/index/组1824.png" @click="toRCRNo">
                            <p>整改复核</p>
                            <p>销号管理</p>
                        </div>
                        <div>
                            <img src="../assets/index/组1825.png">
                            <p>安全监理</p>
                            <p>生产日志</p>
                        </div>
                    </div>
                    <div class="SIManagementBottom">
                        <div>
                            <img src="../assets/index/组1826.png">
                            <p>施工安全</p>
                            <p>生产日志</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2>应急救援管控</h2>
                <div class="ERMControl">
                    <div class="ERMControlTop">
                        <div>
                            <img src="../assets/index/组1827.png">
                            <p>应急保障</p>
                            <p>物资管理</p>
                        </div>
                    </div>
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
            },
            toRCRNo(){
                this.$router.push({name: 'NotSubmitted'});
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
        padding 20px

    .topImg
        width 100%

    .content
        flex: 10
        padding 20px 0
        h2
            padding-left 25px

    .SIManagement,.MECPersonnel,.SPResponsibility,.SPManagement,.SRMControl,.ERMControl
        padding 20px
        margin-bottom 10px
        border-bottom 2px solid #eee
        .SIManagementTop,.SIManagementBottom,.MECPersonnelTop,.SPResponsibilityTop,.SPManagementTop,.SRMControlTop,.ERMControlTop
            overflow hidden
            text-align center
            div
                float left
                width 25%
                padding 10px 0

    .bottom
        display flex
        justify-content space-between
        padding 5% 15%
        flex 1
        text-align center
</style>
