<template>
	<tm-app>
		<tm-navbar title="我的资产">
		</tm-navbar>
		<!-- 	<view class="flex flex-center mt-n15">
			<tm-text color="#808080" :fontSize="22" label="总资产（元）"></tm-text>
		</view> -->
		<!-- <view class="flex flex-center">
			<view class="flex ma-10">
				<view class="felx flex-row-bottom-end mb-15">
					<tm-text :fontSize="22" label="￥"></tm-text>
				</view>
				<tm-text :fontSize="50" label="99999"></tm-text>
			</view>
		</view> -->
		<view class="zhye">
			<view class="flex ma-10">
				<tm-icon  :fontSize="35" name="xh-zhanghuqianbao"></tm-icon>
				<tm-text  class="ml-10" :fontSize="25" label="账户钱包"></tm-text>
			</view>

			<view class="flex ml-10">
				<view class="felx flex-row-bottom-end mb-15">
					<tm-text  :fontSize="22" label="￥"></tm-text>
				</view>
				<tm-text  :fontSize="50" class="ml-10" :label="data.balance"></tm-text>
			</view>
			<tm-divider :margin="[1,10]"></tm-divider>
			<view class="flex flex-around" style="height: 50rpx;align-items: center;">
				<tm-text  :fontSize="22" _class="text-weight-b" label="充值"
					@click="gonav('pages/my/mymoney/money/money')"></tm-text>
				<tm-divider vertical :height="50"></tm-divider>
				<tm-text  :fontSize="22" _class="text-weight-b" label="提现"
					@click="gonav('pages/my/mymoney/geymoney/geymoney')"></tm-text>
				<tm-divider vertical :height="50"></tm-divider>
				<tm-text  :fontSize="22" _class="text-weight-b" label="资金流水"
					@click="gonav('pages/my/mymoney/moneydetail/moneydetail?money='+data.balance)"></tm-text>
			</view>
		</view>

		<view class="yqb">
			<view class="flex ma-10">
				<tm-icon   :fontSize="35" name="xh-yunqianbao"></tm-icon>
				<tm-text  :fontSize="25" class="ml-10" label="云钱包"></tm-text>
			</view>

			<view class="mt-n19">
				<tm-divider  :margin="[1,10]"></tm-divider>
			</view>
			<view class="flex ml-20" style="height: 50rpx;align-items: center;">

				<tm-text  v-if="data.isCloudWallet === '1'" :fontSize="22" _class="text-weight-b" label="进入云钱包"
					@click="cloudWallet"></tm-text>
				<tm-text  v-else :fontSize="22" _class="text-weight-b" label="开通云钱包" @click="cloudWallet"></tm-text>
			</view>
		</view>
		<view class="jf">
			<view class="flex ma-10">
				<tm-icon  :fontSize="35" name="xh-bonus-line"></tm-icon>
				<tm-text  :fontSize="25" class="ml-10" label="积分"></tm-text>
			</view>
			<view class="flex ml-10">
				<tm-text  :fontSize="50" :label="data.integal"></tm-text>
			</view>
			<tm-divider :margin="[1,10]"></tm-divider>
			<view class="flex ml-20" style="height: 50rpx;align-items: center;">
				<tm-text  :fontSize="22" _class="text-weight-b" label="积分流水"
					@click="gonav('pages/my/mymoney/moneydetail/integraldetail?integal='+data.integal)"></tm-text>
			</view>
		</view>
		<tm-modal :height="300" splitBtn title="开通云钱包" okText="确定" v-model:show="Cloudshow" @ok="cloudOpen">
			<view class="flex flex-center">
				<tm-text  :font-size="35" _class="text-weight-b" :label="`开通云钱包需要从账户扣款${data.openCloudWalletMoney}元`">
				</tm-text>
			</view>
		</tm-modal>
	</tm-app>
</template>


<script setup>
	
	import { My } from "@/api/api.ts"
	import { ref } from "vue";
	const data = ref({})
	const Cloudshow = ref(false)
	My.Myassets().then(res => {
		data.value = res
	})
	const cloudOpen = () => {
		Cloudshow.value = false
		My.openSdCloudWallet().then(res => {
			// #ifdef H5
			window.location.href = res
			// #endif
			// #ifdef APP-PLUS
			plus.runtime.openURL(res)
			// #endif
		})
	}
	const cloudWallet = () => {
		if (data.value.isCloudWallet === '0') {
			Cloudshow.value = true

		} else if (data.value.isCloudWallet === '1') {
			My.openSdCloudWallet().then(res => {
				// #ifdef H5
				window.location.href = res
				// #endif
				// #ifdef APP-PLUS
				plus.runtime.openURL(res)
				// #endif
			})

		}
	}
</script>

<style>
	.zhye {

		width: 710rpx;
		height: 200rpx;
		background-image: url('@/static/img/zhqb.png');
		margin-left: auto;
		margin-right: auto;
		margin-top: 70rpx;
		margin-bottom: 20rpx;
		background-size: 100% 100%;
		border-radius: 10rpx;
	}

	.yqb {
		width: 710rpx;
		height: 200rpx;
		background-image: url('@/static/img/yqb.png');
		margin: 20rpx auto;
		background-size: 100% 100%;
		border-radius: 10rpx;
	}

	.jf {
		width: 710rpx;
		height: 200rpx;
		background-image: url('@/static/img/jf.png');
		margin: 20rpx auto;
		background-size: 100% 100%;
		border-radius: 10rpx;
	}
</style>
