<template>
	<tm-app>
		<!-- <view class="statusHeight" :style="{height:statusBarHeight+'px'}"></view> -->
		<tm-sheet :margin="[0,0]" :padding="[0,statusBarHeight]">
		</tm-sheet>
		
	</tm-app>
</template>

<script setup>
	import weikaishi from "@/static/activity/weikaishi.png"
	import {onShow,onLoad} from '@dcloudio/uni-app';
	import {Activity} from "@/api/api.ts";
	import {onMounted,reactive,ref} from 'vue';
</script>
<style>
</style>
