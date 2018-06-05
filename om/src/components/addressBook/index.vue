<template>
    <div class="addr">
        <div class="addr_left">

        </div>
        <div class="addr_right"></div>
    </div>
</template>
<script>
export default {
    name: 'addressBook',
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.addr{
    width:100%;
    height:100%;
    display:flex;
    .addr_left{
        width:240px;
        height:100%;
        background:#eee;
    }
    .addr_right{
        flex:1;
        background:#fff;
    }
}
</style>
