<template>
	<tm-app>
		<view class="statusHeight" :style="{height:statusBarHeight+'px'}"></view>
		<view class="head mb-30">
			<view class="flex flex-end mt-20 mr-42">
				<tm-icon name="tmicon-share1"></tm-icon>
			</view>
			<view class="headUser flex flex-between">
				<tm-image :round="25" class="mt--34 ml-35" :width="128" :height="128" :src="user.avatar"></tm-image>
				<view class="flex-5 mt-2">
					<tm-text class="text-weight-b" color="#333333" :fontSize="38" :label="user.nickname"></tm-text>
					<tm-text class="mt-18" color="#999999" :fontSize="22" :label="user.phone"></tm-text>
				</view>
				<view class="flex-row-center-end">
					<tm-image v-if="user.realnametype==0" class="flex-start mr-35" :width="103" :height="40"
						:src="weishiming"></tm-image>
					<tm-image v-else-if="user.realnametype==1" class="flex-start mr-35" :width="103" :height="40"
						:src="daishenhe"></tm-image>
					<tm-image v-else class="flex-start mr-35" :width="103" :height="40" :src="yishiming"></tm-image>
				</view>
			</view>
			<tm-image v-if="user.adventureIsOpen=='1'" style="margin: 0rpx auto;" :width="710" :height="148"
				:src="user.adventureCoverImg"></tm-image>
		</view>
		<tm-sheet :shadow="0" :margin="[20,0]" :padding="[10,10]">
			<view class="flex flex-between">
				<tm-text style="height: 50rpx;line-height: 50rpx;" :fontSize="26" label="我的藏品"></tm-text>
				<view class="flex" @click="gonav('pages/my/collections/collections')">
					<tm-text style="height: 50rpx;line-height: 50rpx;" :fontSize="26" label="更多"></tm-text>
					<tm-icon class="ml-10" :fontSize="26" name="tmicon-angle-right"></tm-icon>
				</view>
			</view>
			<view class="flex flex-wrap flex-between mt-10" style="height:250rpx">
				<view v-for="(item,index) in mineFindCollReport" @click="gonav('pages/my/collections/collections')">
					<tm-image :round="4" class="flex-start" :width="210" :height="210" :src="item.collImg"></tm-image>
					<tm-text _class="mt-5 text-overflow " _style="width:180rpx;text-overflow: ellipsis;" :fontSize="26"
						label="1231231231231313123123"></tm-text>
				</view>
			</view>
			<view class="flex flex-between mt-30">
				<tm-text style="height: 50rpx;line-height: 50rpx;" :fontSize="26" label="我的盲盒"></tm-text>
				<view class="flex" @click="gonav('pages/my/box/box')">
					<tm-text style="height: 50rpx;line-height: 50rpx;" :fontSize="26" label="更多"></tm-text>
					<tm-icon class="ml-10" :fontSize="26" name="tmicon-angle-right"></tm-icon>
				</view>
			</view>
			<view class="flex flex-wrap flex-between mt-10" style="height:250rpx">
				<view v-for="(item,index) in userBoxFindReportPageList" @click="gonav('pages/my/box/box')">
					<tm-image :round="4" class="flex-start" :width="210" :height="210" :src="item.boxImg"></tm-image>
					<tm-text _class="mt-5 text-overflow " _style="width:180rpx;text-overflow: ellipsis;" :fontSize="26"
						:label="item.boxName"></tm-text>
				</view>
			</view>
		</tm-sheet>

		<tm-sheet :shadow="0" :margin="[20,20]" :padding="[0,0]">
			<tm-cell :margin="[0, 0]" :titleFontSize="28">
				<template v-slot:title>
					<view class="flex">
						<tm-icon class="ml-10" :fontSize="26" name="tmicon-ios-filing"></tm-icon>
						<tm-text class="ml-44" :fontSize="26" label="我的订单"></tm-text>
					</view>
				</template>
			</tm-cell>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<tm-cell :margin="[0, 0]" :titleFontSize="28" @click="gonav('pages/my/mymoney/mymoney')">
				<template v-slot:title>
					<view class="flex">
						<tm-icon class="ml-10" :fontSize="26" name="tmicon-qiandai"></tm-icon>
						<tm-text class="ml-44" :fontSize="26" label="我的资产"></tm-text>
					</view>
				</template>
			</tm-cell>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<tm-cell :margin="[0, 0]" :titleFontSize="28">
				<template v-slot:title>
					<view class="flex">
						<tm-icon class="ml-10" :fontSize="26" name="tmicon-headset-fill"></tm-icon>
						<tm-text class="ml-44" :fontSize="26" label="在线客服" @click="kefu"></tm-text>
					</view>
				</template>
			</tm-cell>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<tm-cell :margin="[0, 0]" :titleFontSize="28" @click="gonav('pages/my/set/set')">
				<template v-slot:title>
					<view class="flex">
						<tm-icon class="ml-10" :fontSize="26" name="tmicon-cog-fill"></tm-icon>
						<tm-text class="ml-44" :fontSize="26" label="设置"></tm-text>
					</view>
				</template>
			</tm-cell>
			<!-- 退出登录 -->
			<!-- <tm-cell  :margin="[0, 0]" :titleFontSize="28" @click="loginOnt">
				<template v-slot:title>
					<view class="flex">
						<tm-icon class="ml-10" :fontSize="26" name="tmicon-times"></tm-icon>
						<tm-text class="ml-44" :fontSize="26" label="退出登陆"></tm-text>
					</view>
				</template>
			</tm-cell> -->
		</tm-sheet>

		<tabbar :acc="3"></tabbar>
	</tm-app>
</template>

<script setup>
	import tabbar from '@/components/tabbar.vue'
	import { onShow } from '@dcloudio/uni-app';
	import { My } from "@/api/api.ts"
	import weishiming from "@/static/my/weishiming.png"
	import daishenhe from "@/static/my/daishenhe.png"
	import yishiming from "@/static/my/yishiming.png"

	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	import {
		reactive,
		ref
	} from 'vue';
	const kefu = () => {
		// #ifdef APP-PLUS
		plus.runtime.openURL('https://xunmeta.rocknft.top/chat.html')
		// #endif
		// #ifdef H5
		window.location.href = 'https://xunmeta.rocknft.top/chat.html'
		// #endif
	}
	//个人信息
	const user = ref({});
	My.mine().then(res => {
		user.value = res;
	})

	//藏品列表
	const mineFindCollReport = ref({});
	My.mineFindCollReport({
		page: 1,
		limit: 3
	}).then(res => {
		mineFindCollReport.value = res;
	})

	//盲盒列表
	const userBoxFindReportPageList = ref({});
	My.userBoxFindReportPageList({
		page: 1,
		limit: 3
	}).then(res => {
		userBoxFindReportPageList.value = res;
	})
	/* const loginOnt = () => {
		uni.removeStorageSync('token')
		uni.reLaunch({
			url: "/pages/login/login"
		})
	} */
</script>

<style>
	.head {
		background-image: url("@/static/my/head.png");
		background-size: 100% 100%;
		height: 372rpx;
	}

	.headUser {
		background-color: #fff;
		height: 120rpx;
		width: 680rpx;
		margin: 34rpx auto 0rpx auto;
		border-radius: 10rpx 10rpx 0rpx 0rpx;
	}

	.work {
		height: 148rpx;
		width: 710rpx;
		margin: 0rpx auto;
	}
</style>
