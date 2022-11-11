<template>
	<tm-app>
		<tm-navbar hideHome title="详情" :height="44" :shadow="0">
			
		</tm-navbar>
		<tm-html :content="rx"></tm-html>
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

<style>

</style>
