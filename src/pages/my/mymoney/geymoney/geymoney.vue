<template>
	<tm-app>
		<tm-navbar title="提现">
		</tm-navbar>

		<view class="mt-n14">
			<tm-text :fontSize="26" class="text-weight-b  ml-20" label="提现方式"></tm-text>
			<!-- <tm-sheet :shadow="0" :margin="[20,20]" :padding="[0,0]">
				<tm-cell :margin="[10, 10]" :padding="[0,0]" rightText="单笔提现金额必须为100的倍数" :rightTextSize="15" @click="">
					<template v-slot:title>
						<view class="flex" style="align-items: center;">
							<tm-icon class="ml-10" :fontSize="70" name="xh-yinlian"></tm-icon>
						</view>
					</template>
				</tm-cell>
			</tm-sheet> -->
			<tm-sheet :shadow="0" :margin="[20,10]" :padding="[0,0]">
				<tm-cell :margin="[10, 0]" :padding="[0,0]" :titleFontSize="28" :rightText="rightText"
					@click="gonav('pages/my/mymoney/bdyhk/bdyhk')">
					<template v-slot:title>
						<view class="flex " style="align-items: center;">
							<tm-icon class="ml-10" :fontSize="70" name="xh-yinlian"></tm-icon>
							<tm-text class="ml-44" :fontSize="26" :label="data.alipay"></tm-text>
						</view>
					</template>
				</tm-cell>
			</tm-sheet>
		</view>
		<view class="mt-n14">
			<tm-form @submit="confirm" :margin="[0,0]" v-model="show" transprent :border="false">
				<tm-text :fontSize="30" class="text-weight-b" label="请输入提现金额"></tm-text>
				<tm-sheet :shadow="0" :margin="[0,20]" :padding="[10,10]">
					<tm-form-item label=""
						:rules="[{required:true,message:'请输入提现金额',validator:(val)=> val === '' ? false : true}]">
						<tm-input placeholder="请输入提现金额" prefix="tmicon-renminbi3" :inputPadding="[0,0]"
							v-model="show.value" :transprent="true" :showBottomBotder="false">
						</tm-input>
					</tm-form-item>
				</tm-sheet>
				<tm-text :fontSize="30" class="text-weight-b " label="请输入支付密码"></tm-text>
				<tm-sheet :shadow="0" :margin="[0,20]" :padding="[10,10]">
					<tm-form-item label=""
						:rules="[{required:true,message:'请输入支付密码',validator:(val)=> val === '' ? false : true}]">
						<tm-input placeholder="请输入支付密码" :password="true" :inputPadding="[0,0]" v-model="show.type"
							:transprent="true" :showBottomBotder="false">
						</tm-input>
					</tm-form-item>
				</tm-sheet>
				<tm-text :fontSize="24" class="text-weight-n " label="tips：单笔提现金额必须为100的倍数"></tm-text>
				<tm-button form-type="submit" :fontSize="38" linearDeep="accent" block label="提现"></tm-button>
				<view class="flex-row-center-center mt-10">
					<tm-checkbox class="flex-row-center-center" v-model="loot" :size="28" :round="10">
						<template v-slot:default="{checked}">
							<view class="flex flex-row">
								<tm-text :fontSize="20" label="我已经阅读并同意"></tm-text>
								<tm-text :fontSize="20" color="red" label="《浔画账户钱包提现协议》"></tm-text>
							</view>
						</template>
					</tm-checkbox>
				</view>
			</tm-form>
		</view>
	</tm-app>
</template>

<script setup>
	import { My } from "@/api/api.ts"
	import { onShow } from "@dcloudio/uni-app";
	import { ref } from "vue";
	const loot = ref(true)
	const show = ref({
		pwd: '',
		value: '',
	})
	const data = ref({})
	const rightText = ref('绑定银行卡')
	onShow(() => {
		My.Acsecurity().then(res => {
			if (res.alipay !== '') {
				rightText.value = "更换银行卡"
			}
			data.value = res
		})
	})
	const confirm = (e) => {
		My.placeOrder({ type: '01', value: e.data.value }).then(resPay => {
			uni.showToast({
				title: '提现成功',
				icon: 'none'
			})
			setTimeout(() => {
				uni.navigateBack({ delta: 1 })
			}, 1500)

		})
	}
</script>

<style>
	.box {}

	.active {
		border: 1px solid #07EBFE;
	}

	.box1 {
		width: 164rpx;
		height: 110rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		margin: 30rpx;
	}
</style>
