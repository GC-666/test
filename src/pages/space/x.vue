<template>
	<tm-app>
		<tm-navbar hideHome title="X空间" :shadow="0">
		</tm-navbar>
		<image :src="x" style="width:750rpx;height:calc(100vh - 88rpx)"></image>
	</tm-app>
</template>
<script setup>
	import { ref } from "vue";
	import x from "@/static/space/x.jpg"
</script>
<style scoped lang="scss">
</style>
