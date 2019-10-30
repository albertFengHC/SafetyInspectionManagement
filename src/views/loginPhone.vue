<template>
    <div id="login">
        <div class="box">
            <img src="../assets/login/组1814.png" alt="" class="logo">
            <h1>工程项目安全管理信息系统</h1>
            <div class="userName">
                <i></i>
                <input type="text" placeholder="请输入手机号">
            </div>
            <div class="passWord">
                <i></i>
                <input type="text" placeholder="请输入动态码">
                <span></span>
            </div>
            <p class="forgetPW">获取验证码</p>
            <img src="../assets/login/组1813.png" alt="" class="loginBtn">
            <div class="line">
                <p class="lineP"></p>
                <p>or</p>
                <p class="lineP"></p>
            </div>
            <p class="jumpA"><router-link to="/">使用账号密码登录</router-link></p>
            <p class="boxBottom">由四川运检科技发展有限公司提供计算服务</p>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'loginPhone',
        components: {}
    }
</script>

<style scoped lang="stylus">
    #login
        width 100%
        height 100%
        margin 0

    .box
        width 100%
        height 100%
        background url('../assets/login/画板1.png') no-repeat
        background-size 100% 100%
        display flex
        flex-direction column
        justify-content space-between
        align-items center
        color #27F2B2

    input
        background none
        outline none
        border none
        width 100%
        padding-left 30px

    ::-webkit-input-placeholder  /* Chrome/Opera/Safari */
        color #27F2B2

    ::-moz-placeholder  /* Firefox 19+ */
        color #27F2B2

    :-ms-input-placeholder  /* IE 10+ */
        color #27F2B2

    :-moz-placeholder  /* Firefox 18- */
        color #27F2B2

    .logo
        margin-top: 25%;

    .userName,.passWord
        position relative
        padding 8px
        padding-left 30px
        border 1px solid #27f2b2
        border-radius 20px
        width 60%
        i
            display inline-block
            width 21px
            height 22px
            background-size 100% 100%
            position absolute
            top 5px
            left 15px

    .userName
        i
            background url('../assets/login/组510.png') no-repeat

    .passWord
        i
            background url('../assets/login/路径866.png') no-repeat
        span
            display inline-block
            background url('../assets/login/组331.png') no-repeat
            background-size 100% 100%
            position absolute
            top 15px
            right  8px
            width 18px
            height 8px

    .forgetPW
        width 60%
        text-align right

    .line
        position relative
        width 50%
        text-align center
        display flex
        justify-content space-between
        .lineP
            display inline-block
            border-bottom 1px solid #27F2B2
            height 5px
            width 40%

    .boxBottom
        margin-bottom 10%

    .jumpA
        a
            color #27F2B2
            text-decoration  none
</style>