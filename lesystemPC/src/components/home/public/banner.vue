<template>
    <div class="qingwu">
        <el-carousel :height="height">
            <el-carousel-item v-for="(v,k) in list" :key="k">
                <div class="shop_banner" :style="'background-position: center;background-image:url('+v.src+');'"><router-link :to="v.adv_link||'#'"><div style="width:640px;height:250px;display:block;"></div></router-link></div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        list:{
            type:Array,
        },
        height:{
            type:String,
            default:'250px',
        },
    },
    data() {
      return {
      };
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
};
</script>
<style lang="scss">
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}
.qingwu {
.el-carousel__button{
	width: 10px;
}
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.shop_banner{
    height: 100%;
    background-position: center;
}
</style>