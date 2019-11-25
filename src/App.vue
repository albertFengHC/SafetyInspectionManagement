<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="stylus">
    #app
        font-family 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        width 100%
        height 100%
        margin 0
        font-size 0.9rem
        /*overflow scroll*/
        /*-webkit-overflow-scrolling: touch;*/
        -webkit-overflow-scrolling auto
    select
        box-sizing content-box
</style>
