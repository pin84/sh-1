<template>
	<picker class="picker" @change="PickerChange" :value="index" :range="picker">
		<view class="picker">
			{{picker[index]}}
		</view>
	</picker>
</template>

<script>
	export default{
		data(){
			return {
					index: 0,
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
			}
		},
		methods:{
			PickerChange(e) {
				this.index = e.detail.value
			},
		}
	}
</script>

<style lang="scss" scoped>
	.picker{
		border: 1px solid red;
	}
</style>
