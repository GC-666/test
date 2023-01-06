<template>
	<tm-app>
		<tm-navbar  title="详情" :height="44" :shadow="0">
		</tm-navbar>
		<view class="main" >
			<rich-text class="mt-10 ml-20 mr-20" :nodes="rx"></rich-text>
			<!-- <tm-html class="mt-10 ml-20 mr-20" :content="rx"></tm-html> -->
		</view>
	</tm-app>
</template>

<script setup>
	import { Home } from "@/api/api.ts"
	import { onLoad } from "@dcloudio/uni-app";
	import { onMounted, ref } from "vue";
	const id = ref('')
	onLoad((obj) => {
		id.value = obj.id
	})
	const rx = ref('')
	onMounted(() => {
		Home.bannerdetails({ id: id.value }).then(res => {
			rx.value = res
		})
	})
</script>

<style scoped>

.main{
	background-color: #fbf9f9;
}

:deep(img) {
  max-width: 100%;
}
</style>
