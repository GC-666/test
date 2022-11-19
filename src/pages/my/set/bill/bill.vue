<template>
	<tm-app>
		<tm-navbar hideHome title="申请开票" :height="44" :shadow="0">
			<template v-slot:right>
				<tm-text class="mr-20" :fontSize="22" label="开票记录" @click="gonav('pages/my/set/bill/billlist')">
				</tm-text>
			</template>
		</tm-navbar>

		<!-- 可开票列表 -->

		<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
			<tm-sheet :round="3" :border="item.c? '4':'0'" :shadow="0" :margin="[20,20]" :padding="[0,10]"
				v-for="(item,index) in list" :key="index">
				<view class="flex flex-between">
					<view class="">
						<tm-text class="ma-20 text-weight-b" :fontSize="26" :label="item.objectTruenumber"></tm-text>
						<tm-text class="ma-20 " color="#1A1A1A" :fontSize="18" :label="`订单编号：${item.orderNo}`">
						</tm-text>
						<tm-text class="ma-20" color="#1A1A1A" :fontSize="18"
							:label="`时间：${DateUtils.formatDateTime(item.payTime)}`">
						</tm-text>
					</view>
					<view class="flex flex-around flex-col">
						<tm-text class="mr-20 " :fontSize="22" label="已购买"></tm-text>
						<view class="flex mr-20 flex-end">
							<tm-text class="text-size-xxs" label="￥"></tm-text>
							<tm-text class="text-weight-b" :fontSize="30" :label="item.payMoney"></tm-text>
						</view>

					</view>
				</view>
			</tm-sheet>

		</scroll-view>

		<view class="fixed b-0 r-0 l-0" :style="{'background-color': store.tmStore.dark?'#fff': '#25262E' }">

			<tm-sheet _class=" " :round="0" :shadow="2" :margin="[0,0]" :padding="[0,0]">
				<view class="flex flex-row-center-between">
					<view class="flex flex-col">

						<tm-checkbox class="ml-10" v-model="loot" :size="25" :round="10" @change="checkbox">
							<template v-slot:default="{checked}">
								<tm-text :fontSize="20" :label="checkboxText"></tm-text>
							</template>
						</tm-checkbox>
						<view class="flex ml-20 mb-10 mt-15">
							<tm-text color="#808080" :fontSize="18" label="已选中订单数量:"></tm-text>
							<tm-text class="ml-10" :fontSize="18" :label="count"></tm-text>
							<tm-text class="ml-20" color="#808080" :fontSize="18" label=" 开票金额:"></tm-text>
							<tm-text class="ml-10" :fontSize="18" :label="`￥${money}`"></tm-text>
						</view>
					</view>
					<view class="mr-50">
						<tm-button :round="13" :margin="[0, 10]" :padding="[0,0]" :shadow="0" :height="60" :width="200"
							label="申请开票" @click="tobill"></tm-button>
					</view>
				</view>
			</tm-sheet>
		</view>
	</tm-app>
</template>

<script setup>
	import { onBeforeMount, ref } from 'vue'
	import { useTmpiniaStore } from '@/xhui/tool/lib/tmpinia';
	import { My } from "@/api/api.ts"
	const store = useTmpiniaStore();
	const checkboxText = ref("全选")
	const list = ref([])
	const ListNum = ref(0)
	const count = ref(0)
	const money = ref(0.00)
	const loot = ref(false)
	const checkItem = ref(false)
	const params = ref({ page: 1, limit: 10 })
	const ids = []
	// 下拉刷新
	const lower = () => {
		console.log("到底部");
		if (ListNum.value > 0) {
			params.value.page += 1
			findOpenTicketForOrder()
		}
	}
	const checkbox = () => {
		if (loot.value) {
			count.value = list.value.length
			list.value.forEach((item) => {
				ids.push(item.id)
				money.value = money.value + keepTwoDecimal(item.payMoney)
				money.value = keepTwoDecimal(money.value)
			})
		} else {
			money.value = 0
			count.value = 0
		}
		console.log(loot.value);
	}

	// 结算
	const tobill = () => {
		if (ids.length <= 0) {
			uni.showToast({
				title: "请选择订单",
				icon: "none"
			})
			return
		}
		let data = {
			"ids": ids,
			"money": money.value
		}
		uni.setStorageSync('data', data)
		uni.navigateTo({
			url: '/pages/my/set/bill/billorder',
		})
	}
	const keepTwoDecimal = (num) => {
		var result = parseFloat(num);
		if (isNaN(result)) {
			alert('传递参数错误，请检查！');
			return false;
		}
		result = Math.round(num * 100) / 100;
		return result;
	}
	onBeforeMount(() => {
		findOpenTicketForOrder()
	})
	const findOpenTicketForOrder = () => {
		My.findOpenTicketForOrder(params.value).then(res => {
			list.value = res.map((item) => {
				return { ...item, c: false }
			})
			ListNum.value = res.length
			list.value = list.value.concat(res)
		})
	}
</script>


<style>
</style>
