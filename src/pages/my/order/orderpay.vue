<template>
	<tm-app>
		<tm-navbar title="订单支付" :shadow="0">
		</tm-navbar>
		<tm-sheet :round="3" :shadow="0" :margin="[20,10]" :padding="[0,10]">
			<view class="flex ml-15">
				<tm-image preview :round="4" :width="160" :height="160" :src="data.objectImg">
				</tm-image>
				<view class="flex flex-col flex-around">
					<tm-text class="ml-15" :font-size="30" _class="text-weight-b" :label="data.objectName">
					</tm-text>
					<tm-text class="ml-15" color="#A6A6A6" :font-size="18" _class="text-weight-s"
						:label="`编号：${data.objectTruenumber}`"></tm-text>
					<tm-text class="ml-15" color="#A6A6A6" :font-size="18" _class="text-weight-s"
						:label="`持有者：${data.toUserName}`"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :round="3" :shadow="0" :margin="[20,10]" :padding="[0,10]">
			<tm-text class="ml-15" :font-size="30" _class="text-weight-b" label="订单详情"></tm-text>
			<tm-divider color="grey" :margin="[1,10]"></tm-divider>
			<view class="flex ma-15 flex-between">
				<tm-text :font-size="25" _class="text-weight-n" label="订单金额"></tm-text>
				<view class="flex flex-center">
					<tm-text :font-size="6" class="mb--10" _class="text-weight-n" label="￥"></tm-text>
					<tm-text :font-size="32" _class="text-weight-b" :label="data.payMoney"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex ma-15 flex-between">
				<tm-text :font-size="25" _class="text-weight-n" label="订单ID号"></tm-text>
				<view class="flex flex-center">
					<tm-text :font-size="32" _class="text-weight-n" :label="data.orderNo"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet v-if="data.orderStatus == 0" :round="0" :shadow="0" :margin="[20,10]" :padding="[20,20]">
			<view class="flex flex-between">
				<tm-text :font-size="28" color="red" _class="text-weight-b" label="剩余时间:"></tm-text>
				<tm-countdown  class="text-size-n ml-10" color="red" @change="change"
					:time="parseInt(data.endTime)- new Date().getTime()" format="HH:MM:SS" autoStart>
				</tm-countdown>
				
			</view>
		</tm-sheet>

		<tm-sheet :round="3" :shadow="0" :margin="[20,10]" :padding="[0,10]">
			<tm-text class="ml-15" :font-size="30" _class="text-weight-b" label="支付方式"></tm-text>
			<tm-divider color="grey" :margin="[1,10]"></tm-divider>
			<view class="ml-15 flex flex-between pt-20 pb-20" v-for="item in payList">
				<view class="flex flex-row-center-center">
					<tm-icon v-if="item.key==='00'"  name="xh-zhanghuqianbao"></tm-icon>
					<tm-icon  v-if="item.key==='04'" :fontSize="38" name="xh-bonus-line"></tm-icon>
					<tm-icon  v-if="item.key==='05'" name="xh-yunqianbao"></tm-icon>
					<tm-text class="ml-10" color="#808080" :font-size="22" _class="text-weight-b" :label="item.value">
					</tm-text>
				</view>
				<tm-radio-group @change="boxlistchange" v-model="radiolist">
					<tm-radio :defaultChecked="item.value =='05'? true:false" :size="30" :round="10" :value="item.key">
					</tm-radio>
				</tm-radio-group>
			</view>
		</tm-sheet>
		
		<tm-sheet v-if="radiolist=='00' || radiolist=='04'" :round="3" :shadow="0" :margin="[20,10]" :padding="[0,10]">
			<tm-text class="ml-15" :font-size="30" _class="text-weight-b" label="支付密码"></tm-text>
			<tm-input :margin="[20,10]" outlined v-model="inp" placeholder="请输入支付密码">
			</tm-input>
		</tm-sheet>
		<view class="fixed b-0 r-0 l-0" :style="{'background-color': store.tmStore.dark?'#fff': '#25262E' }">
			<view class="" style="">
				<tm-sheet _class=" " :round="0" :shadow="2" :margin="[0,0]" :padding="[0,0]">
					<view class="flex flex-row-center-between aa">
						<view class="flex flex-col ml-40">
							<view class="flex  flex-col-bottom-center ">
								<tm-text :font-size="18" _class="text-weight-n" label="¥"></tm-text>
								<tm-text class="ml-10" :font-size="38" _class="text-weight-b" :label="data.payMoney">
								</tm-text>
							</view>
						</view>
						<view class="mr-50">
							<tm-button :round="13" :margin="[0, 10]" :padding="[0,0]" :shadow="0" :height="60"
								:width="200" label="立即支付" @click="placeOrder"></tm-button>
						</view>
					</view>
				</tm-sheet>
			</view>
		</view>
	</tm-app>
</template>

<script setup>
	import { My } from "@/api/api.ts"
	import { onLoad } from "@dcloudio/uni-app";
	import { onBeforeMount, onMounted, ref, reactive } from "vue";
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	const data = ref({})
	const id = ref('')
	const payList = ref([])
	onLoad((o) => {
		id.value = o.id
	})
	const seconds = ref('')
	const change = (e) => {
		if (e.value.seconds == '00' && e.value.minutes == "00") {
			data.value = {}
			setTimeout(()=>{
				find()
			},5000)
		}
	}
	const inp = ref('')
	const placeOrder = () => {
		
		if (radiolist.value == '') {
			uni.showToast({
				title: '请选择支付方式',
				icon: 'none'
			})
			return
		}
		if ((radiolist.value == '00' && inp.value=='') || (radiolist.value == '04' && inp.value=='')) {
			uni.showToast({
				title: '请输入密码',
				icon: 'none'
			})
			return
		}
		My.orderPay({ payType: radiolist.value, id: id.value, payPassword: inp.value, isRemember: 0 }).then(res => {
			if (radiolist.value == '00' || radiolist.value=='04') {
				uni.showToast({
					title: '支付成功',
					icon: 'none'
				})
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1500)

			} else if (radiolist.value == '05') {
				// #ifdef APP-PLUS
				plus.runtime.openURL(res.payData.payUrl)
				// #endif
				// #ifdef H5
				window.location.href = res.payData.payUrl
				// #endif
			}

		})
	}
	const radiolist = ref('')
	const boxlistchange = (e) => {
		console.log(e);
	}
	const find = ()=>{
		My.find({ id: id.value }).then(res => {
			data.value = res.data
			payList.value = res.payTypeList
			res.payTypeList.forEach((item, index) => {
				console.log();
				let i = Object.values(item).includes('05')
				if (i) {
					radiolist.value = '05'
				} else {
					radiolist.value = '00'
				}
		
			})
		
		})
	}
	onBeforeMount(() => {
		find()
	})
</script>


<style>
</style>
