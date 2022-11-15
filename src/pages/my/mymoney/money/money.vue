<template>
	<tm-app>
		<tm-navbar title="充值方式">
		</tm-navbar>
		<tm-text :fontSize="26" class="text-weight-b mt-n10 ml-20" label="请选择支付方式"></tm-text>
		<view class="flex flex-around">
			<view class="zf mt-n10" @click="gonav('pages/my/mymoney/paymoney/paymoney')">
				<tm-icon :fontSize="80" name="tmicon-yinhangqia"></tm-icon>
				<tm-text :fontSize="22" class="text-weight-n " label="银联"></tm-text>
			</view>
			<view class="zf mt-n10">
				<tm-icon :fontSize="80" name="tmicon-weixinzhifu"></tm-icon>
				<tm-text :fontSize="22" class="text-weight-n " label="微信支付"></tm-text>

			</view>
			<view class="zf mt-n10">
				<tm-icon :fontSize="80" name="tmicon-alipay"></tm-icon>
				<tm-text :fontSize="22" class="text-weight-n" label="支付宝支付"></tm-text>
			</view>
		</view>
		<view class="flex flex-end">
			<tm-text :fontSize="18" class="text-weight-s mt-n5 mr-n10" label="暂未支持 敬请期待"></tm-text>
			<tm-text :fontSize="18" class="text-weight-s mt-n5 mr-n10" label="暂未支持 敬请期待"></tm-text>
		</view>
		<view class="mt-n25">
			<tm-sheet :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<tm-cell :margin="[10, 10]" :titleFontSize="28" :rightText="rightText"
					@click="gonav('pages/my/mymoney/bdyhk/bdyhk')">
					<template v-slot:title>
						<view class="flex" style="align-items: center;">
							<tm-icon class="ml-10" :fontSize="46" name="tmicon-yinhangqia"></tm-icon>
							<tm-text class="ml-44" :fontSize="26" :label="data.alipay"></tm-text>
						</view>
					</template>
				</tm-cell>
			</tm-sheet>
		</view>

	</tm-app>
</template>

<script setup>
	import { My } from "@/api/api.ts"
	import { ref } from "vue";
	const rightText = ref('绑定银行卡')
	const data = ref({})
	My.Acsecurity().then(res => {
		console.log(res);
		if (res.alipay !== '') {
			rightText.value = "更换银行卡"
		}
		data.value = res
	})
	const pay = () => {
		if (res.alipay === '') {
			uni.showToast({
				title: "请先绑定银行卡",
				icon: 'none'
			})
			return
		}
		
	}
</script>

<style>
	.zf {
		width: 207rpx;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.zf:first-child {
		border: 1px solid #4169E1;
		border-radius: 10rpx;
	}
</style>
