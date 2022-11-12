<template>
	<tm-app>
		<tm-navbar hideHome title="排行" :height="44" :shadow="0">
		</tm-navbar>
		<tm-image :width="750" :height="200" :src="ranking" @click="gonav('pages/my/set/ranking/myrank')"></tm-image>
		<tm-table  :table-data="tableData" :header="header"></tm-table>

	</tm-app>
</template>

<script setup>
	import ranking from "@/static/img/ranking.png"
	import { onBeforeMount, ref } from 'vue'
	import { useTmpiniaStore } from '@/xhui/tool/lib/tmpinia';
	import { My } from "@/api/api.ts"
	const store = useTmpiniaStore();
	const header = ref([
		{ title: "排名", width: 70, key: 'sort' },
		{ title: "用户", width: 340, key: 'nickName' },
		{ title: "手机号", width: 340, key: 'phoneNumber' },
	])
	const tableData = ref([])
	onBeforeMount(() => {
		My.ranking().then(res => {
			tableData.value =res.rankingList.map((item)=>{
				return {data:{sort:item.sort,nickName:item.nickName,phoneNumber:item.phoneNumber}}
			})

		})
	})
	
</script>

<style>
</style>
