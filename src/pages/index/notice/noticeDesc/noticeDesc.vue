<template>
	<tm-app>
		<tm-navbar title="详情" :height="44" :shadow="0">
		</tm-navbar>
		<view class="main" >
			<tm-sheet :shadow="0" color="#fbf9f9" :margin="[0,0]" :padding="[0,0]" :round="0">
				<view class="ml-20 mr-20">
					<tm-text color="#000" :fontSize="38"
						:label="rx.name">
					</tm-text>
				</view>
			</tm-sheet>
			<tm-sheet :shadow="0" color="#fbf9f9" :margin="[0,0]" :padding="[0,0]" :round="0">
				<view class="mt-10 ml-20 mr-20">
					<tm-text :fontSize="28" color="#000"
						:label="DateUtils.formatDateTime(rx.upTime)">
					</tm-text>
				</view>
				<tm-divider color="grey" :padding="[0,0]" :margin="[0,20]"></tm-divider>
			</tm-sheet>
			<tm-html class="mt-10 ml-20 mr-20" :content="rx.content"></tm-html>
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
	const rx = ref({})
	onMounted(() => {
		Home.noticeFindItem({ id: id.value }).then(res => {
			rx.value = res
		})
	})
</script>

<style>
/* :deep(span) {
	color:red;
} */
.main{
	background-color: #fbf9f9;
}
</style>
