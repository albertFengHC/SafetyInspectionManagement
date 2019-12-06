<template>
    <div id="app">
        <keep-alive>
            <router-view/>
        </keep-alive>
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
        /*overflow scroll*/
        -webkit-overflow-scrolling: touch;
        /*-webkit-overflow-scrolling auto*/
    select
        box-sizing content-box
</style>
