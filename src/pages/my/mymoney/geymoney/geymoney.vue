<template>
	<tm-app>
		<tm-navbar title="提现">
		</tm-navbar>

		<view class="mt-n14">
			<tm-text :fontSize="26" class="text-weight-b  ml-20" label="提现方式"></tm-text>
			<tm-sheet :shadow="0" :margin="[20,20]" :padding="[0,0]">
				<tm-cell :margin="[0, 10]" rightText="单笔提现金额必须为100的倍数" :rightTextSize="15" @click="">
					<template v-slot:title>
						<view class="flex" style="align-items: center;">
							<tm-icon class="ml-10" :fontSize="46" name="tmicon-yinhangqia"></tm-icon>
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
	import { ref } from "vue";
	const loot = ref(true)
	const show = ref({
		pwd: '',
		value: '',
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
