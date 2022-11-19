<template>
	<tm-app>
		<tm-navbar  title="合成成功">
		</tm-navbar>
		<view class="head">
			<view class="bg"
				:style="{'background-image': store.tmStore.dark? `url(${bg})`: `url(${bg1})` ,'background-size':' 100% 100%','margin':'0 auto','position':'relative','width':'500rpx','height':'200rpx'}">
				<view class="img">
					<tm-image preview :round="4" :width="300" :height="300" :src="config.collImg">
					</tm-image>
				</view>
			</view>
		</view>
		<view class="flex-col 	flex-center	">
			<tm-text :color="bgColor" class="mt-14" :font-size="32" _class="text-weight-b" :label="config.collName"></tm-text>
			<tm-text color="#cdcdcd" class="aa mt-14" :font-size="18" label="已获得"></tm-text>
			<tm-text class="mt-24" :font-size="18" _class="text-weight-n" label="请到我的藏品中查看"></tm-text>
		</view>
		<view style="margin-top: 30rpx;">
			<tm-button @click="composeCompose" :margin="[40,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="确定"></tm-button>
		</view>
	</tm-app>
</template>


<script setup>
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import bg1 from "@/static/img/shopBg.png"
	import bg from "@/static/img/bg.png"
	import { useTmpiniaStore } from '@/xhui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	//配置信息
	const config = ref("");
	onLoad((e)=>{
		config.value=JSON.parse(decodeURIComponent(e.config));
	})
	
	const composeCompose=(i)=>{
		uni.navigateBack({
			delta:1,
		})
	}
</script>

<style>
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
