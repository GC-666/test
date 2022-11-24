<template>
	<tm-app>
		<tm-navbar hideHome title="邀请好友" :height="44" :shadow="0">
		</tm-navbar>
		<view class="main flex flex-row-bottom-center">
			<view class="mb-n15">
				<tm-image :width="150" :height="150" :src="data.QrCode"></tm-image>
			</view>
		</view>
		<view style="margin-top: 30rpx;">
			<tm-button @click="copyLink" :margin="[40,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="复制链接"></tm-button>
		</view>
	</tm-app>
</template>

<script setup>
	import { onBeforeMount, ref } from 'vue'
	import { My } from "@/api/api.ts"
	const data = ref({})
	My.inviteInfo({}).then(res => {
		data.value = res;
	})
	//复制点击
	const copyLink=()=>{
		uni.setClipboardData({
			data: data.value.url, //要被复制的内容
			success: () => { //复制成功的回调函数
				uni.showToast({ //提示
					title: '复制成功'
				})
			}
		});
	}
</script>

<style>
	.main{
		background-image: url("@/static/my/share.png");
		background-size: 100% 100%;
		width:600rpx;
		min-height: 80vh;
		border-radius: 50rpx;
		margin: 0rpx auto;
	}
</style>
