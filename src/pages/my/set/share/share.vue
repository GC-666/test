<template>
	<tm-app>
		<tm-navbar hideHome title="邀请好友" :height="44" :shadow="0">
		</tm-navbar>
		 <tm-carousel autoplay :margin="[0,16]" :round="3" :width="686" :height="1200" :list="listimg"></tm-carousel>

	</tm-app>
</template>

<script setup>
	import ranking from "@/static/img/ranking.png"
	import { onBeforeMount, ref } from 'vue'
	import { useTmpiniaStore } from '@/xhui/tool/lib/tmpinia';
	import { My } from "@/api/api.ts"
	const listimg = [
	    "https://picsum.photos/200/300?id=43335",
	    "https://picsum.photos/200/300?id=433",
	    "https://picsum.photos/200/300?id=439",
	    "https://picsum.photos/200/300?id=459",
	]
</script>

<style>
</style>
