<template>
	<tm-app>
		<tm-navbar color="#1E1F28"  title="规则" :shadow="0">
		</tm-navbar>
		<image :src="isOpen.img" style="width:750rpx;height:calc(100vh - 88rpx)"></image>
	</tm-app>
</template>
<script setup>
	import { Space } from "@/api/api.ts"
	import { ref } from "vue";
	const isOpen = ref({})
	Space.isOpen().then(res => {
		isOpen.value = res;
	})
</script>
<style scoped lang="scss">
</style>
