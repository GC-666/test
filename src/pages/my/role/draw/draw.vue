<template>
	<tm-badge count="5" color="orange">
		<tm-avatar color="green" :font-size="42" :margin="[10,0]" icon="tmicon-QQ"></tm-avatar>
	</tm-badge>

</template>


<script setup>
	import { My } from "@/api/api.ts"
	import { onBeforeMount, reactive, ref } from 'vue';
	import wushuju from "@/static/my/wushuju.png"
	const bottom = ref('')
	onBeforeMount(() => {
		if (uni.getSystemInfoSync().platform == "ios") {
			bottom.value = '90px'
		}
		if (uni.getSystemInfoSync().platform == "android") {
			bottom.value = '75px'
		}
	})
</script>
<style>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx );
	}
</style>
