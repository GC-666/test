<template>
	<tm-app>
		<view class="" style="background-color:#1E1F28;height: 100vh;">
			<tm-navbar color="#1E1F28" :shadow="0">
				<template v-slot:default>
					<view class="flex flex-center">
						<tm-image :width="50" :height="50" :src="space"></tm-image>
						<tm-text class="text-weight-b ml-10" :fontSize="32" label="空间"></tm-text>
					</view>
				</template>
				<template v-slot:right>
					<view class="mr-20">
						<tm-text class="" :fontSize="28" label="添加关注"></tm-text>
					</view>
				</template>
			</tm-navbar>
			<tm-sheet :margin="[0,0]" color="#1E1F28" :padding="[0,0]">
				<view class="mt-20 flex ">
					<view class="flex flex-row-center-start flex-1 ">
						<tm-text color="#fff" class="mr-8 ml-40" :fontSize="22" label="开市中"></tm-text>
						<tm-sheet :round="3" color="red" :shadow="0" :margin="[0,0]" :height="12" :width="12"
							:padding="[0,0]">
						</tm-sheet>
					</view>
					<view class="flex  flex-2">
						<tm-text class="" color="#fff" :fontSize="32" label="《吉祥纹》"></tm-text>
					</view>
				</view>
			</tm-sheet>
			<view class="content">
				<view class="pl-15 pr-21 pt-15 flex">
					<tm-image :width="146" :height="146" :src="space"></tm-image>
					<view class="ml-n10 flex flex-col flex-between">
						<view class="">
							<tm-text class="" color="#FDC675" :fontSize="20" label="当前平均价"></tm-text>
							<view class="flex flex-between mt-5" style="width:480rpx">
								<tm-text class="text-weight-b" color="#fff" :fontSize="38" label="399.35"></tm-text>
								<tm-text class="flex-center" color="#F90808" :fontSize="24" label="+10.02%"></tm-text>
								<tm-text class="flex-center" color="#F90808" :fontSize="18" label="+8.25"></tm-text>
								<view class="flex flex-center">
									<tm-text class="" color="#dadada" :fontSize="24" label="换手率"></tm-text>
									<tm-text class="ml-5" color="#fff" :fontSize="24" label="2%"></tm-text>
								</view>
							</view>
						</view>
						<view class="">
							<tm-text class="" color="#fff" :fontSize="26" label="浔画艺术平台"></tm-text>
						</view>
					</view>
				</view>
				<view class="pl-15 pr-21 pt-25 flex flex-wrap flex-between">
					<view class="flex " style="width:33.33%">
						<view class="flex flex-between" style="width:70%">
							<tm-text class="" color="#dadada" :fontSize="24" label="今开"></tm-text>
							<tm-text class="" color="red" :fontSize="24" label="99.36"></tm-text>
						</view>
					</view>
					<view class="flex flex-row-center-center" style="width:33.33%">
						<view class="flex flex-between" style="width:70%">
							<tm-text class="" color="#dadada" :fontSize="24" label="最高"></tm-text>
							<tm-text class="" color="#fff" :fontSize="24" label="99.36"></tm-text>
						</view>
					</view>
					<view class="flex flex-row-center-end" style="width:33.33%">
						<view class="flex flex-between" style="width:70%">
							<tm-text class="" color="#dadada" :fontSize="24" label="总市值"></tm-text>
							<tm-text class="" color="#fff" :fontSize="24" label="99.36"></tm-text>
						</view>
					</view>
					<view class="flex mt-10" style="width:33.33%">
						<view class="flex flex-between" style="width:70%">
							<tm-text class="" color="#dadada" :fontSize="24" label="昨收"></tm-text>
							<tm-text class="" color="#fff" :fontSize="24" label="88.02"></tm-text>
						</view>
					</view>
					<view class="flex flex-row-center-center mt-10" style="width:33.33%">
						<view class="flex flex-between" style="width:70%">
							<tm-text class="" color="#dadada" :fontSize="24" label="最低"></tm-text>
							<tm-text class="" color="#fff" :fontSize="24" label="88.02"></tm-text>
						</view>
					</view>
					<view class="flex flex-row-center-end mt-10" style="width:33.33%">
						<view class="flex flex-between" style="width:70%">
							<tm-text class="" color="#dadada" :fontSize="24" label="流通量"></tm-text>
							<tm-text class="" color="#fff" :fontSize="24" label="9999"></tm-text>
						</view>
					</view>
					<view class="flex mt-10" style="width:33.33%">
						<view class="flex flex-between" style="width:70%">
							<tm-text class="" color="#dadada" :fontSize="24" label="涨停价"></tm-text>
							<tm-text class="" color="#fff" :fontSize="24" label="88.02"></tm-text>
						</view>
					</view>
					<view class="flex flex-row-center-center mt-10" style="width:33.33%">
						<view class="flex flex-between" style="width:70%">
							<tm-text class="" color="#dadada" :fontSize="24" label="跌停价"></tm-text>
							<tm-text class="" color="#fff" :fontSize="24" label="88.02"></tm-text>
						</view>
					</view>
					<view class="flex flex-row-center-end mt-10" style="width:33.33%">
					</view>
				</view>
			</view>
			<tm-sheet color="#1E1F28" :margin="[0,0]" :padding="[40,20]" :shadow="0" :round="0">
				<view class="flex flex-between">
					<view class="flex  mr-40" @click="numberSort">
							<tm-text color="#FDE2BC" :font-size="26" label="编号"></tm-text>
							<view class="flex flex-col">
								<tm-icon :fontSize="14" :color="number?'':bgColor" name="tmicon-sort-up">
								</tm-icon>
								<tm-icon :fontSize="14" :color="number?bgColor:''" name="tmicon-sort-down">
								</tm-icon>
							</view>
						</view>
					<view class="flex">
						<view class="flex  mr-40" @click="newPriceSort">
							<tm-text color="#FDE2BC" :font-size="26" label="最新价"></tm-text>
							<view class="flex flex-col">
								<tm-icon :fontSize="14" :color="newPrice?'':bgColor" name="tmicon-sort-up">
								</tm-icon>
								<tm-icon :fontSize="14" :color="newPrice?bgColor:''" name="tmicon-sort-down">
								</tm-icon>
							</view>
						</view>
						<view class="flex" @click="upSort">
							<tm-text color="#FDE2BC" :font-size="26" label="涨跌幅"></tm-text>
							<view class="flex flex-col">
								<tm-icon :fontSize="14" :color="up?'':bgColor" name="tmicon-sort-up"></tm-icon>
								<tm-icon :fontSize="14" :color="up?bgColor:''" name="tmicon-sort-down"></tm-icon>
							</view>
						</view>
					</view>
				</view>
			</tm-sheet>
			<view class="list flex flex-row-center-between relative" 
				@click="gonav('pages/space/goodpage?id=35433')">
				<view class="flex flex-center">
					<tm-text class="" :font-size="22" color="#FDE2BC" label="浔画艺术平台"></tm-text>
					<view class="absolute b-20  ">
						<tm-text class="" :font-size="24" color="#00a8ff" label="交易中"></tm-text>
					</view>
				</view>
				<tm-text color="white" :font-size="38" label="99.35"></tm-text>
				<view class="flex">
					<tm-text class="flex-end mb-4" color="red" :font-size="26" label="+"></tm-text>
					<tm-text color="red" :font-size="38" label="10.02%"></tm-text>
				</view>
			</view>
		</view>
	</tm-app>
</template>
<script setup>
	import space from "@/static/space/xlogo.png"
	import r from "@/static/space/right.png"
	import { ref } from 'vue'
	// 是否排序
	const newPrice = ref(true)
	const up = ref(true)
	const number = ref(true)
	const newPriceSort = () => {
		newPrice.value = !newPrice.value;
	}
	const upSort = () => {
		up.value = !up.value
	}
	const numberSort = () => {
		number.value = !number.value
	}
	const add = () => {
		tabsTitle1.value.push({ key: "2", title: "哈哈哈" })
	}
</script>

<style scoped>
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 88rpx);
	}
	.list {
		width: 670rpx;
		height: 137rpx;
		background-image: url('../../static/space/list.png');
		background-size: 100% 100%;
		margin: 0 auto;
		padding:0rpx 20rpx
	}
	.content{
		background-image: url('../../static/space/content.png');
		background-size: 100% 100%;
		width: 710rpx;
		height: 326rpx;
		margin: 10rpx auto;
	}
</style>
