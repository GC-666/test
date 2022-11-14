<template>
	<tm-app>
		<tm-navbar title="申请开票" :height="44" :shadow="0">
		</tm-navbar>
		<tm-sheet :shadow="0" :margin="[0,0]" :padding="[10,10]">
			<view class="flex ">
				<tm-text :font-size="28" _class="text-weight-b flex-1" label="抬头类型"></tm-text>
				<view class="flex flex-around">

					<tm-radio-group class="ml-50" v-model="radiolist" direction="row" @change="radioClick">
						<tm-radio :size="25" :fontSize="22" value="qiye" label="企业单位"></tm-radio>
						<tm-radio :size="25" :fontSize="22" value="geren" label="个人/非企业单位"></tm-radio>
					</tm-radio-group>
				</view>
			</view>
		</tm-sheet>
		<tm-divider color="grey" :margin="[1,1]"></tm-divider>
	</tm-app>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	const orderMoney = ref(0)
	const orderIds = ref('')
	const radiolist = ref('')
	onLoad(() => {
		let data = uni.getStorageSync('ids')
		orderMoney.value = data.money
		data.ids.forEach((item, index) => {
			index += 1
			if (data.ids.length === index) {
				orderIds.value = orderIds.value + item
			} else {
				orderIds.value = orderIds.value + item + ","
			}
		})
	})
	const radioClick = (val) => {
		console.log(val);
	}
</script>


<style>
</style>
