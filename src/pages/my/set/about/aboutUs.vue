<template>
	<tm-app ref="app" color="grey-5">
		<tm-navbar title="关于我们">
		</tm-navbar>
		<view class="pa-20" :style="store.tmStore.dark?'color:#fff':'color:#000'">
			<rich-text  :nodes="homeAgreementss"></rich-text>
			<!-- <tm-html :content="homeAgreementss" ></tm-html> -->
		</view>
	</tm-app>
</template>

<script setup>
	import { My } from "@/api/api.ts"
	import {
		ref
	} from 'vue';
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	const homeAgreementss = ref("")	

	onShow(() => {
		My.homeAgreementss({
			id: 4
		}).then(res => {
			homeAgreementss.value = res;
		})
	})
	
</script>

<style>

</style>
