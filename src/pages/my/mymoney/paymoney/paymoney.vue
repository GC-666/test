<template>
	<tm-app>
		<tm-navbar title="充值账户钱包">
		</tm-navbar>

		<view class="mt-n4">
			<tm-sheet :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<tm-cell :margin="[0, 10]" :padding="[0,0]" >
					<template v-slot:title>
						<view class="flex flex-center">
							<tm-icon class="ml-10" :fontSize="60" name="xh-yinlian"></tm-icon>
						</view>
					</template>
					<template v-slot:right>
						<tm-text :fontSize="24" class="text-weight-b mr-20" label="自定义充值必须是10的倍数"></tm-text>
					</template>
				</tm-cell>
			</tm-sheet>
		</view>
		<view class="mt-n10">
			<tm-sheet :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<view class="flex flex-around flex-wrap">
					<view class="box" v-for="(item,index) in data" :key="item.id">
						<view class="box1" v-if="item.num!==0" :class="active == index?'active':''" @click="btn(index)">
							<tm-text _class="felx flex-row-bottom-end mb--10" :fontSize="15" class="text-weight-n "
								label="￥"></tm-text>
							<tm-text :fontSize="35" class="text-weight-b " :label="item.num"></tm-text>
						</view>
						<view class="box1" v-if="item.num==0">
							<tm-text v-if="item.num==0" :fontSize="25" class="text-weight-n " label="￥"></tm-text>
							<view class="" v-if="item.num==0">
								<tm-input v-model="inp" @focus="focus" :margin="[0,0]" :width="160" placeholder="自定义">
								</tm-input>
							</view>
						</view>
					</view>
				</view>
			</tm-sheet>
		</view>
		<view class="flex flex-col flex-col-center-center" style="margin-top: 180rpx;">
			<tm-button :fontSize="28" :round="12" :width="280" label="立即充值" @click="pay"></tm-button>
			<tm-checkbox class="flex-row-center-center" v-model="loot" :size="28" :round="10">
				<template v-slot:default="{checked}">
					<view class="flex flex-row">
						<tm-text :fontSize="20" label="我已经阅读并同意"></tm-text>
						<tm-text :fontSize="20" color="red" label="《浔画账户钱包充值协议》"></tm-text>
					</view>
				</template>
			</tm-checkbox>
		</view>
		<web-view v-if="unionLink!==''" :src="unionLink"></web-view>
	</tm-app>
</template>

<script setup>
	import { My } from "@/api/api.ts"
	import { ref } from "vue";
	const data = ref([{ id: 0, num: 10 }, { id: 1, num: 20 }, { id: 2, num: 50 }, { id: 3, num: 100 }, { id: 4, num: 300 },
		{ num: 0 }
	])
	const active = ref(0)
	const loot = ref(true)
	const inp = ref('')
	const num = ref('')
	const btn = (index) => {
		active.value = index
	}
	const focus = () => {
		active.value = -1
	}
	const unionLink = ref('')
	const pay = () => {
		if (active.value == -1 && inp.value === '') {
			uni.showToast({
				title: '请选择金额',
				icon: 'none'
			})
			active.value = -1
			return
		}
		data.value.forEach((item, index) => {
			if (active.value == index) {
				num.value = item.num

			}
		})
		let aa = '0'
		if (inp.value !== '') {
			aa = inp.value
		} else {
			aa = num.value
		}
		My.placeOrder({ type: '00', value: aa }).then(res => {
			uni.showLoading({
				title: '支付请求中...',
				mask: true
			});
			let order = res.operationData;
			My.orderPay({ payType: '03', id: order.id }).then(resPay => {

				let link = resPay.payData.payUrl;
				//#ifdef APP-PLUS
				unionLink.value = resPay.payData.payUrl;
				// #endif

				// //#ifdef APP-PLUS
				// plus.runtime.openURL(unionLink)
				// // #endif
				// #ifdef H5
				location.href = link;
				// #endif
			})
			uni.hideLoading()
		})
	}
</script>

<style scoped>
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
