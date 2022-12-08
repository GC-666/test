<template>
	<tm-app>
		<tm-navbar hideHome title="我的邀请" :height="44" :shadow="0">
		</tm-navbar>
		<tm-table :table-data="tableData" :header="header"></tm-table>



	</tm-app>
</template>

<script setup>
	import ranking from "@/static/img/ranking.png"
	import { onBeforeMount, ref } from 'vue'
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	import { My } from "@/api/api.ts"
	const store = useTmpiniaStore();
	const header = ref([
		{ title: "排名", width: 70, key: 'sort' },
		{ title: "用户", width: 340, key: 'nickName' },
		{ title: "手机号", width: 340, key: 'phoneNumber' },
	])
	const tableData = ref([])
	const count = ref(0)
	onBeforeMount(() => {
		My.MyInvitation().then(res => {
			tableData.value = res.rankingList.map((item) => {
				return {
					data: {
						sort: item.sort,
						nickName: item.nickName,
						phoneNumber: item
							.phoneNumber
					}
				}
			})
			count.value = res.rankingList.lenght
		})
	})
</script>

<style>
</style>
