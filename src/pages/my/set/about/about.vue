<template>
	<tm-app>
		<tm-navbar hideHome title="关于我们" :height="44" :shadow="0">
		</tm-navbar>
		<view class="flex flex-row-center-center mt-n25">
			<tm-image :width="121" :height="118" :src="store.tmStore.dark? `${logo1}`: `${logo2}`"></tm-image>
		</view>
		<view class="flex flex-row-center-center mt-47">
			<tm-text :fontSize="36" label="浔画数藏"></tm-text>
		</view>
		<view class="mt-n25">

		</view>
		<tm-sheet :shadow="0" :margin="[0,0]" :padding="[0,0]">
			<tm-cell _class="text-weight-b" :rightText="version" :margin="[0, 0]" :titleFontSize="30" title="应用版本">
			</tm-cell>
		</tm-sheet>
		<view class="flex flex-col flex-center mt-47">
			<view class="flex">
				<tm-text @click="gonav('pages/my/set/about/aboutUs')" color="#808080" :fontSize="18" label="《关于我们》">
				</tm-text>
			</view>
			<view class="" style="margin-top: 30rpx;">
				<tm-text color="#808080" :fontSize="18" label="Copyright 2021 All Rights Reserveed"></tm-text>
			</view>

		</view>
	</tm-app>
</template>

<script setup>
	import logo1 from "@/static/img/logo1.png"
	import logo2 from "@/static/img/logo2.png"

	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	import { onBeforeMount, ref } from "vue";
	const store = useTmpiniaStore();
	const version = ref('')
	onBeforeMount(() => {
		// #ifdef APP-PLUS
		plus.runtime.getProperty(plus.runtime.appid, (inf) => {
			version.value = inf.version
		});
		// #endif
	})
</script>

<style>
</style>
