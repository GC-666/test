<template>
	<tm-app>
		<tm-navbar hideHome title="申请开票" :height="44" :shadow="0">
		</tm-navbar>
		<tm-sheet :shadow="0" :margin="[0,20]" :padding="[0,0]">
			<tm-checkbox class="ml-10" v-model="loot" :size="25" :round="10">
				<template v-slot:default="{checked}">
					<tm-text :fontSize="20" label="个人"></tm-text>
				</template>
			</tm-checkbox>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
		</tm-sheet>
	</tm-app>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	const orderMoney = ref(0)
	const orderIds = ref('')
	const loot = ref(false)
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
</script>


<style>
</style>
