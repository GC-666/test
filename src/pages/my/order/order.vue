<template>
	<tm-app style="">
		<tm-navbar title="订单管理" :shadow="0">
		</tm-navbar>
		<view class="aaaa">
			<tm-sheet :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
				<view class="flex flex-around " style="align-items: center;height: 100rpx;">
					<tm-text :color="acvite === 0? `${bgColor}` :''"
						:class="acvite === 0? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 0? 30: 28"
						label="全部" @click="tabsClick(0)"></tm-text>
					<view class="flex" @click="tabsClick(1)">
						<tm-text :color="acvite ===1? `${bgColor}` :''"
							:class="acvite === 1? `text-weight-b active` :'text-weight-n'"
							:font-size="acvite === 1? 30: 28" label="已完成"></tm-text>
						<tm-icon class="ml-5" v-if="!typeShow" :color="acvite === 1? bgColor:''" :fontSize="25"
							name="tmicon-angle-down"></tm-icon>
						<tm-icon class="ml-5" v-if="typeShow" :color="bgColor" :fontSize="25" name="tmicon-angle-up">
						</tm-icon>
					</view>
					<tm-text :color="acvite === 2? `${bgColor}` :''"
						:class="acvite === 2? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 2? 30: 28"
						label="待付款" @click="tabsClick(2)"></tm-text>
					<tm-text :color="acvite === 3? `${bgColor}` :''"
						:class="acvite === 3? `text-weight-b active` :'text-weight-n'" :font-size="acvite === 3? 30: 28"
						label="已失效" @click="tabsClick(3)"></tm-text>

				</view>
				<tm-sheet v-if="typeShow" :round="0" :shadow="0" :margin="[0,0]" :padding="[0,0]">
					<tm-sheet class="absolute flex flex-around" :width="750" :round="0" :shadow="0" :margin="[0,0]"
						:padding="[0,0]">
						<view class="flex overflow-y flex-wrap" style="max-height: 500rpx;">
							<view class="">
								<tm-tag checkable :checked="acc ===0? true :false" size="m" label="全部"
									@click="tagChange(0)"></tm-tag>
							</view>
							<view class="">
								<tm-tag checkable :checked="acc ===1? true :false" size="m" label="首发"
									@click="tagChange(1)"></tm-tag>
							</view>
							<view class="">
								<tm-tag checkable :checked="acc ===2? true :false" size="m" label="市场"
									@click="tagChange(2)"></tm-tag>
							</view>
							<view class="">
								<tm-tag checkable :checked="acc ===3? true :false" size="m" label="寄售"
									@click="tagChange(3)"></tm-tag>
							</view>
							<view class="">
								<tm-tag checkable :checked="acc ===4? true :false" size="m" label="充值"
									@click="tagChange(4)"></tm-tag>
							</view>
							<view class="">
								<tm-tag checkable :checked="acc ===5? true :false" size="m" label="提现"
									@click="tagChange(5)"></tm-tag>
							</view>
						</view>
					</tm-sheet>
				</tm-sheet>
			</tm-sheet>
		</view>
		<scroll-view class="scroll-Y" scroll-y="true" @scrolltolower="lower" v-if="orderFindPageList.length>0">
			<view  class="flex flex-row-center-between flex-wrap" style="margin: 0rpx 20rpx 0rpx 20rpx;">
				<view class="relative" v-for="(data,index) in orderFindPageList">
					<tm-sheet :round="4" :shadow="0" :margin="[0,10]" :padding="[20,20]" style="width:710rpx">
						<view class="flex flex-between">
							<view class="flex flex-center">
								<tm-text :font-size="24" _class="text-weight-n" :label="`订单编号:${data.orderNo}`">
								</tm-text>
							</view>
							<view class="flex flex-center" v-if="data.orderStatus==0 && data.orderType!='01'">
								<tm-text :font-size="30" color="red" _class="text-weight-b" label="剩余时间:"></tm-text>
								<tm-countdown class="text-size-n ml-10" color="red"
									:time="parseInt(data.endTime)-new Date().getTime()" format="HH:MM:SS" autoStart>
								</tm-countdown>
							</view>
							<view class="flex flex-center" v-if="data.orderStatus==0 && data.orderType=='01'">
								<tm-text :font-size="30" color="red" _class="text-weight-b" label="审核中"></tm-text>
							</view>
							<tm-text color="red" v-else-if="data.orderStatus==1" :font-size="24" _class="text-weight-b"
								label="待发货"></tm-text>
							<tm-text color="green" v-else-if="data.orderStatus==2" :font-size="24"
								_class="text-weight-b" label="已完成"></tm-text>
							<tm-text v-else-if="data.orderStatus==9" :font-size="24" _class="text-weight-b" label="已失效">
							</tm-text>
						</view>
						<view class="flex flex-between mt-20">
							<view class="flex">
								<tm-image v-if="data.orderType=='00'" :round="3" :width="120" :height="120"
									:src="chongzhi">
								</tm-image>
								<tm-image v-else-if="data.orderType=='01'" :round="3" :width="120" :height="120"
									:src="tixian">
								</tm-image>
								<tm-image v-else :round="3" :width="120" :height="120" :src="data.objectImg">
								</tm-image>
								<view class="flex flex-col flex-around ml-20">
									<tm-text :font-size="28" _class="text-overflow text-weight-b"
										_style="width: 230rpx;text-overflow: ellipsis;" :label="data.objectName">
									</tm-text>
									<tm-text :font-size="24" _class="text-weight-n" :label="`类型:${data.orderTypeName}`">
									</tm-text>
									<tm-text v-if="data.orderStatus==0" :font-size="24" _class="text-weight-n"
										label="状态:待付款"></tm-text>
									<tm-text v-else-if="data.orderStatus==1" :font-size="24" _class="text-weight-n"
										label="状态:待发货"></tm-text>
									<tm-text v-else-if="data.orderStatus==2" :font-size="24" _class="text-weight-n"
										label="状态:已完成"></tm-text>
									<tm-text v-else-if="data.orderStatus==9" :font-size="24" _class="text-weight-n"
										label="状态:已失效"></tm-text>
								</view>
							</view>
							<view class="flex flex-col flex-row-bottom-end">
								<tm-text class="mb-10" :font-size="24" _class="text-weight-n"
									:label="`${DateUtils.formatDateTime(data.orderTime)}`"></tm-text>
								<tm-text v-if="data.payType=='00' || data.payType=='04'" :font-size="24" _class="text-weight-n" :label="`支付方式:${data.payType=='00'?'余额':'积分'}`">
								</tm-text>
								<view class="flex">
									<tm-text v-if="data.payType=='00'"  :font-size="30" _class="text-weight-b" label="¥"></tm-text>
									<tm-text :font-size="30" _class="text-weight-b" :label="data.totalMoney"></tm-text>
								</view>
							</view>
						</view>
						<view class="flex flex-row-bottom-end mt-20">
							<tm-button v-if="data.orderStatus==0 || data.orderStatus==1" @click="kefu" :margin="[0, 0]"
								:padding="[0,4]" :height="40" :width="160" outlined :round="20" size="normal"
								fontColor="#FBB900" color="#FBB900" :shadow="0" label="联系客服"></tm-button>
							<tm-button :margin="[10, 0]" :padding="[0,4]"
								@click="gonav('pages/my/order/orderDetails?id='+data.id)" :height="40" :width="160"
								outlined :round="20" size="normal" :shadow="0" label="查看详情"></tm-button>
							<tm-button v-if="data.orderStatus==0 && data.orderType!='01'" :margin="[10, 0]" :padding="[0,4]"
								@click="orderCancel(data.id)" :height="40" :width="160" outlined :round="20"
								size="normal" :shadow="0" fontColor="#808080" color="#808080" label="取消订单"></tm-button>
							<tm-button v-if="data.orderStatus==0 && data.orderType!='01'" :margin="[10, 0]" :padding="[0,4]"
								@click="gonav('pages/my/order/orderpay?id='+data.id)" :height="40" :width="160" outlined
								:round="20" size="normal" :shadow="0" fontColor="#EB3938" color="#EB3938" label="立即支付">
							</tm-button>
						</view>
					</tm-sheet>
				</view>
			</view>
		</scroll-view>
		<view v-if="orderFindPageList.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="320" :height="280" :src="wushuju"></tm-image>
		</view>
		<view v-show="cover" class="cover" @click.stop="cover=false;typeShow = false"></view>
	</tm-app>
</template>


<script setup>
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	import {
		My
	} from "@/api/api.ts"
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import chongzhi from "@/static/my/chongzhi.png"
	import tixian from "@/static/my/tixian.png"
	import wushuju from "@/static/my/wushuju.png"

	const list = ref([])
	const acvite = ref(0)
	const typeShow = ref(false)
	const cover = ref(false)
	const params = ref({
		page: 1,
		limit: 10,
		orderNewType: "",
		orderStatus: ""
	})
	const tabsClick = (i) => {
		acvite.value = i
		if (i == 1) {
			params.value.orderNewType = "";
			params.value.orderStatus = "2";
			if (typeShow.value) {
				typeShow.value = false
				cover.value = false
			} else {
				typeShow.value = true
				cover.value = true
			}
		} else {
			params.value.page = 1
			list.value = []
			if (i == 0) {
				params.value.orderNewType = "";
				params.value.orderStatus = "";
				typeShow.value = false
				cover.value = false
			} else if (i == 2) {
				params.value.orderNewType = "";
				params.value.orderStatus = "0";
				typeShow.value = false
				cover.value = false
			} else if (i == 3) {
				params.value.orderNewType = "";
				params.value.orderStatus = "9";
				typeShow.value = false
				cover.value = false
			}
			tabsChange();
		}
	}

	const acc = ref(0)
	const tagChange = (index) => {
		params.value.orderStatus = "2";
		if (index == 0) {
			params.value.orderNewType = "";
		} else if (index == 1) {
			params.value.orderNewType = "01";
		} else if (index == 2) {
			params.value.orderNewType = "02";
		} else if (index == 3) {
			params.value.orderNewType = "03";
		} else if (index == 4) {
			params.value.orderNewType = "04";
		} else if (index == 5) {
			params.value.orderNewType = "05";
		}
		acc.value = index
		tabsChange();
	}
	//页面加载完成执行
	onMounted(() => {
		tabsChange();
	})
	//订单列表
	const orderFindPageList = ref({});
	const bool = ref(true);
	const tabsChange = (i) => {
		params.value.page = 1;
		orderFindPageList.value = [];
		My.orderFindPageList(params.value).then(res => {
			orderFindPageList.value = res;
			if (res.length == params.value.limit) {
				bool.value = true;
			} else {
				bool.value = false;
			}
		})
	}
	const lower = () => {
		params.value.page = params.value.page + 1;
		if (bool.value) {
			My.orderFindPageList(params.value).then(res => {
				orderFindPageList.value = orderFindPageList.value.concat(res)
				if (res.length = params.value.limit) {
					bool.value = true;
				} else {
					bool.value = false;
				}
			})
		}
	}

	const kefu = () => {
		// #ifdef APP-PLUS
		plus.runtime.openURL('https://xunmeta.rocknft.top/chat.html')
		// #endif
		// #ifdef H5
		window.location.href = 'https://xunmeta.rocknft.top/chat.html'
		// #endif
	}
	//订单取消
	const orderCancel = (id) => {
		My.orderCancel({
			id: id
		}).then(res => {

		})
	}
</script>

<style scoped>
	.aaaa {
		position: relative;
		z-index: 11;
	}

	.cover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 188rpx - var(--window-bottom));
	}
</style>
