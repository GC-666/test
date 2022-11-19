<template>
	<tm-app>
		<tm-navbar  title="详情" :height="44" :shadow="0">

		</tm-navbar>
		<tm-sheet :shadow="0" :margin="[0,0]" :round="0">

			<tm-sheet :shadow="0" :margin="[0,10]" :padding="[0,0]" :round="0">
				<tm-text  :fontSize="38"
					:label="rx.name">
				</tm-text>

			</tm-sheet>
			<tm-sheet :shadow="0" :margin="[0,10]" :padding="[0,0]" :round="0">
				<tm-text  :fontSize="28"
					:label="DateUtils.formatDateTime(rx.upTime)">
				</tm-text>
				<tm-divider color="grey" :padding="[0,0]" :margin="[0,10]"></tm-divider>
			</tm-sheet>

			<tm-html :content="rx.content"></tm-html>

		</tm-sheet>

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
	const rx = ref({})
	onMounted(() => {
		Home.noticeFindItem({ id: id.value }).then(res => {
			rx.value = res
		})
	})
</script>

<style>

</style>
