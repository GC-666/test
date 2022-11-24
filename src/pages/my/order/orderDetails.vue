<template>
	<tm-app style="">
		<tm-navbar  title="订单详情">
		</tm-navbar>
		<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,20]" style="width:710rpx">
			<view class="flex">
				<tm-image v-if="find.orderType=='00'" :round="3" :width="120" :height="120" :src="chongzhi">
				</tm-image>
				<tm-image v-else-if="find.orderType=='01'" :round="3" :width="120" :height="120" :src="tixian">
				</tm-image>
				<tm-image v-else :round="3" :width="120" :height="120" :src="find.objectImg">
				</tm-image>
				<view class="flex flex-col flex-around ml-20">
					<tm-text :font-size="26" _class="text-weight-b" :label="find.objectName"></tm-text>
					<tm-text :font-size="18" _class="text-weight-s" :label="`编号:${find.orderNo}`"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,20]" style="width:710rpx">
			<view class="flex flex-between pt-20 pb-20">
				<tm-text :font-size="30" _class="text-weight-b" label="订单详情"></tm-text>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20">
				<tm-text color="#808080" :font-size="22"  label="类型"></tm-text>
				<tm-text :font-size="22" _class="text-weight-b" :label="find.orderTypeName"></tm-text>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20">
				<tm-text color="#808080" :font-size="22" label="实付款"></tm-text>
				<tm-text v-if="find.isMy=='0'" :font-size="30" _class="text-weight-b" :label="`¥${find.totalMoney}`"></tm-text>
				<tm-text v-else-if="find.isMy=='1'" :font-size="30" _class="text-weight-b" :label="`¥${find.totalMoney}`"></tm-text>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20">
				<tm-text color="#808080" :font-size="22" label="订单时间"></tm-text>
				<tm-text :font-size="22" _class="text-weight-b" :label="DateUtils.formatDateTime(find.orderTime)"></tm-text>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20">
				<tm-text color="#808080" :font-size="22" label="截至时间"></tm-text>
				<tm-text :font-size="22" _class="text-weight-b" :label="DateUtils.formatDateTime(find.endTime)"></tm-text>
			</view>
			<tm-divider color="grey" :margin="[1,1]" v-if="find.payTime!=null"></tm-divider>
			<view class="flex flex-between pt-20 pb-20" v-if="find.payTime!=null">
				<tm-text color="#808080" :font-size="22" label="支付时间"></tm-text>
				<tm-text :font-size="22" _class="text-weight-b" :label="DateUtils.formatDateTime(find.payTime)"></tm-text>
			</view>
			<tm-divider color="grey" :margin="[1,1]" v-if="find.payTime!=null"></tm-divider>
			<!-- <view class="flex flex-between pt-20 pb-20" v-if="find.payTime!=null" >
				<tm-text color="#808080" :font-size="22" label="支付方式"></tm-text>
				<tm-text :font-size="22" _class="text-weight-b" :label="find.payType"></tm-text>
			</view> -->
			<tm-divider color="grey" :margin="[1,1]" v-if="find.orderStatus == '失效订单'"></tm-divider>
			<view class="flex flex-between pt-20 pb-20" v-if="find.orderStatus == '失效订单'">
				<tm-text color="#808080" :font-size="22" label="失效原因"></tm-text>
				<tm-text :font-size="22" _class="text-weight-b" :label="find.orderStatusRemarks"></tm-text>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20">
				<tm-text color="#808080" :font-size="22" label="发货时间"></tm-text>
				<tm-text v-if="find.payIssueTime==null" :font-size="22" _class="text-weight-b" label="暂未发货"></tm-text>
				<tm-text v-else :font-size="22" _class="text-weight-b" :label="DateUtils.formatDateTime(find.payIssueTime)"></tm-text>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20">
				<tm-text color="#808080" :font-size="22" label="订单金额"></tm-text>
				<tm-text :font-size="22" _class="text-weight-b" :label="find.totalMoney"></tm-text>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20" v-if="find.orderStatus == '2'">
				<tm-text color="#808080" :font-size="22" label="到款账户"></tm-text>
				<tm-text v-if="find.payType=='00'" :font-size="22" _class="text-weight-b" label="余额"></tm-text>
				<tm-text v-else-if="find.payType=='03'" :font-size="22" _class="text-weight-b" label="余额"></tm-text>
				<tm-text v-else-if="find.payType=='04'" :font-size="22" _class="text-weight-b" label="积分"></tm-text>
				<tm-text v-else-if="find.payType=='05'" :font-size="22" _class="text-weight-b" label="云钱包"></tm-text>
			</view>
		</tm-sheet>
		<!-- <tm-sheet _class="flex-col">
			<view >
				<tm-timeline >
					<tm-timeline-item style="width:500rpx" color="green" :size="32" type="fill" icon="tmicon-check" time="藏品上架成功">
					</tm-timeline-item>
					<tm-timeline-item style="width:500rpx" color="red" time="藏品已寄售，结算中">
					</tm-timeline-item>
					<tm-timeline-item style="width:500rpx" color="blue" time="藏品已寄售，结算成功">
					</tm-timeline-item>
				</tm-timeline>
			</view>
		</tm-sheet> -->
	</tm-app>
</template>

<script setup>
	import { onShow,onLoad } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import { My } from "@/api/api.ts"
	import chongzhi from "@/static/my/chongzhi.png"
	import tixian from "@/static/my/tixian.png"
	const id=ref(0);
	const find=ref({});
	onLoad((e)=>{
		id.value=e.id;
	})
	onShow(() => {
		My.find({
			id: id.value
		}).then(res => {
			find.value = res.data;
		})
	})
</script>

<style>

</style>
