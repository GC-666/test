<template>
	<tm-app>
		<!-- <view class="statusHeight" :style="{height:statusBarHeight+'px'}"></view> -->
		<tm-sheet :margin="[0,0]" :padding="[0,statusBarHeight]">
		</tm-sheet>
		<view class="head pt-20" style="height: 210rpx;">
			<view class="flex flex-end mr-20">
				<tm-icon name="tmicon-share1" @click="gonav('pages/my/set/share/share')"></tm-icon>
				<tm-icon class="ml-40" :font-size="30" :color="color" :name="name" @click="setDark"></tm-icon>
			</view>
			<view class="headUser flex flex-between mt-30">
				<tm-image :round="25" class="mt--34 ml-35" :width="128" :height="128" :src="user.avatar">
					<template v-slot:error>
						<tm-image :width="128" :height="128" :src="userHead">
						</tm-image>
					</template>
				</tm-image>
				<view class="flex-5 mt-2 ml-20">
					<tm-text class="text-weight-b mt-5" _class="text-overflow text-weight-b"
						_style="width: 330rpx;text-overflow: ellipsis;" color="#333333" :fontSize="38"
						:label="user.nickname"></tm-text>
					<tm-text class="mt-18" color="#999999" :fontSize="22" :label="user.phone"></tm-text>
				</view>
				<view class="flex-row-center-end mr-20 mt--n10">
					<tm-icon v-if="user.realnametype==0" :fontSize="40" name="xh-weishiming"></tm-icon>
					<tm-icon v-if="user.realnametype==1" :fontSize="40" name="xh-daishenhe"></tm-icon>
					<tm-icon v-if="user.realnametype==2" :fontSize="40" name="xh-yishiming"></tm-icon>
				</view>
			</view>
		</view>
		<tm-image v-if="user.adventureIsOpen=='1'" style="margin: -30rpx auto 0rpx auto;" :width="710" :height="148"
			:src="user.adventureCoverImg" @click="gonav('pages/my/role/index')"></tm-image>
		<tm-sheet :round="4" :shadow="0" :margin="[20,30]" :padding="[10,10]">
			<view class="flex flex-between">
				<tm-text style="height: 50rpx;line-height: 50rpx;" :fontSize="26" _class="text-weight-b" label="我的藏品">
				</tm-text>
				<view class="flex" @click="gonav('pages/my/collections/collections')">
					<tm-text style="height: 50rpx;line-height: 50rpx;" :fontSize="26" label="更多"></tm-text>
					<tm-icon class="ml-10" :fontSize="26" name="tmicon-angle-right"></tm-icon>
				</view>
			</view>
			<view v-if="mineFindCollReport.length>0" class="flex flex-wrap flex-between mt-10" style="height:250rpx">
				<view v-for="(item,index) in mineFindCollReport" @click="gonav('pages/my/collections/collections')">
					<tm-image :round="4" class="flex-start" :width="210" :height="210" :src="item.collImg"></tm-image>
					<tm-text _class="mt-5 text-overflow " _style="width:180rpx;text-overflow: ellipsis;" :fontSize="26"
						:label="item.collName"></tm-text>
				</view>
			</view>
			<view v-else class="flex flex-wrap flex-row-center-center" style="height:250rpx">
				<tm-image :round="4" class="flex-start" :width="210" :height="180" :src="wushuju"></tm-image>
			</view>
		</tm-sheet>
		<tm-sheet :round="4" :shadow="0" :margin="[20,0]" :padding="[10,10]">
			<view class="flex flex-between">
				<tm-text style="height: 50rpx;line-height: 50rpx;" :fontSize="26" _class="text-weight-b" label="我的盲盒">
				</tm-text>
				<view class="flex" @click="gonav('pages/my/box/box')">
					<tm-text style="height: 50rpx;line-height: 50rpx;" :fontSize="26" label="更多"></tm-text>
					<tm-icon class="ml-10" :fontSize="26" name="tmicon-angle-right"></tm-icon>
				</view>
			</view>
			<view v-if="userBoxFindReportPageList.length>0" class="flex flex-wrap flex-between mt-10"
				style="height:250rpx">
				<view v-for="(item,index) in userBoxFindReportPageList" @click="gonav('pages/my/box/box')">
					<tm-image :round="4" class="flex-start" :width="210" :height="210" :src="item.boxImg"></tm-image>
					<tm-text _class="mt-5 text-overflow " _style="width:180rpx;text-overflow: ellipsis;" :fontSize="26"
						:label="item.boxName"></tm-text>
				</view>
			</view>
			<view v-else class="flex flex-wrap flex-row-center-center" style="height:250rpx">
				<tm-image :round="4" class="flex-start" :width="210" :height="180" :src="wushuju"></tm-image>
			</view>
		</tm-sheet>

		<tm-sheet :round="4" :shadow="0" :margin="[20,30]" :padding="[0,0]">
			<tm-cell :margin="[20, 20]" :padding="[0, 5]" :titleFontSize="28" @click="gonav('pages/my/order/order')">
				<template v-slot:title>
					<view class="flex">
						<tm-icon class="ml-10" :fontSize="32" name="xh-dingdan"></tm-icon>
						<tm-text class="ml-44" :fontSize="26" label="我的订单"></tm-text>
					</view>
				</template>
			</tm-cell>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<tm-cell :margin="[20, 20]" :padding="[0, 5]" :titleFontSize="28"
				@click="gonav('pages/my/mymoney/mymoney')">
				<template v-slot:title>
					<view class="flex">
						<tm-icon class="ml-10" :fontSize="32" name="xh-zichan"></tm-icon>
						<tm-text class="ml-44" :fontSize="26" label="我的资产"></tm-text>
					</view>
				</template>
			</tm-cell>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<tm-cell :margin="[20, 20]" :padding="[0, 5]" :titleFontSize="28" @click="kefu">
				<template v-slot:title>
					<view class="flex">
						<tm-icon class="ml-10" :fontSize="32" name="xh-kefu"></tm-icon>
						<tm-text class="ml-44" :fontSize="26" label="在线客服"></tm-text>
					</view>
				</template>
			</tm-cell>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<tm-cell :margin="[20, 20]" :padding="[0, 5]" :titleFontSize="28" @click="gonav('pages/my/set/set')">
				<template v-slot:title>
					<view class="flex">
						<tm-icon class="ml-10" :fontSize="32" name="xh-shezhi"></tm-icon>
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
		<!-- #ifdef APP-PLUS -->
		<view class="bottom"></view>
		<!-- #endif -->
	</tm-app>
</template>

<script setup>
	import { onShow } from '@dcloudio/uni-app';
	import { My } from "@/api/api.ts"
	import wushuju from "@/static/my/wushuju.png"
	import userHead from "@/static/my/userHead.png"
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	import { onBeforeMount } from 'vue';
	const store = useTmpiniaStore();

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


	// 切换暗黑 样式
	const name = ref('')
	const color = ref('')
	onBeforeMount(() => {
		if (store.tmStore.dark) {
			name.value = "tmicon-ios-sunny"
			color.value = '#FFCC00'
		} else {
			
			name.value = "tmicon-md-moon"
		}
	})
	// 暗黑模式切换
	const setDark = () => {
		if (store.tmStore.dark) {
			name.value = "tmicon-md-moon"
			store.setTmVuetifyDark(false)
			color.value = ''
		} else {
			name.value = "tmicon-ios-sunny"
			store.setTmVuetifyDark(true)
			color.value = '#FFCC00'
		}
	}
</script>

<style>
	.head {
		background-image: url("@/static/my/head.png");
		background-size: 100% 100%;
		position: relative;
	}

	.headUser {
		position: absolute;
		bottom: -12rpx;
		left: 40rpx;
		background-image: url("@/static/my/head2.png");
		background-size: 100% 100%;
		height: 161rpx;
		width: 670rpx;
	}

	.work {
		height: 148rpx;
		width: 710rpx;
		margin: 0rpx auto;
	}

	.bottom {
		padding-bottom: var(--window-bottom);
	}
</style>
