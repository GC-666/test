<template>
	<tm-app>
		<tm-navbar  title="开启结果">
		</tm-navbar>
		<view class="head">
			<view class="bg"
				:style="{'background-image': store.tmStore.dark? `url(${bg})`: `url(${bg1})` ,'background-size':' 100% 100%','margin':'0 auto','position':'relative','width':'500rpx','height':'200rpx'}">
				<view class="img">
					<tm-image preview :round="4" :width="300" :height="300" :src="config.boxImg">
					</tm-image>
				</view>
			</view>
		</view>
		<view class="flex-col 	flex-center	">
			<tm-text :color="bgColor" class="mt-14" :font-size="32" _class="text-weight-b" :label="config.openRemarks"></tm-text>
		<!-- 	<tm-text class="mt-24" :font-size="18" _class="text-weight-n" label="稀有度:UR"></tm-text>
		 --></view>
		<view class="flex flex-center" style="margin-top: 30rpx;">
			<tm-button @click="composeCompose" :margin="[10]" :width="300" :height="70" :shadow="0" :border="2" outlined size="normal" label="继续开启"></tm-button>
			<tm-button @click="composeCompose2" :margin="[10]" :width="300" :height="70" :shadow="0" color="#000" :border="4" outlined size="normal" label="我的藏品"></tm-button>
		</view>
	</tm-app>
</template><!-- 
gonav('pages/my/collections/collections') -->

<script setup>
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import bg1 from "@/static/img/shopBg.png"
	import bg from "@/static/img/bg.png"
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	//配置信息
	const config = ref("");
	onLoad((e)=>{
		config.value=JSON.parse(decodeURIComponent(e.config));
	})
	const composeCompose=(i)=>{
		uni.navigateBack({
			delta:2,
		})
	}
	const composeCompose2=(i)=>{
		uni.redirectTo({
			url: '/pages/my/collections/collections'
		});
	}
</script>

<style scoped>
	.aa{
		border: 1px solid #cdcdcd;
		padding:6rpx 10rpx;
		border-radius: 20rpx;
	}
	.img {
		display: flex;
		justify-content: center;
		margin-bottom: 150rpx;
		position: relative;
		top: -300rpx;
	}

	.head {
		margin-top: 320rpx;
	}
</style>
