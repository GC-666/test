<template>
	<tm-app>
		<tm-navbar  title="求购">
		</tm-navbar>
		<view class="flex flex-row-center-center">
			<tm-image :width="500" :height="500" :src="a1"></tm-image>
		</view>
		<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,10]">
			<view class="flex flex-between pt-10 pb-10">
				<view class="">
					<tm-text :font-size="32" _class="text-weight-b" label="《艺术藏品》 "></tm-text>
					<tm-text class="mt-14" color="#999" :font-size="18" _class="text-weight-n" label="所属系列：三国武将"></tm-text>
				</view>
				<view class="flex flex-row-center-center">
					<tm-text color="#FFCE92" :font-size="36" _class="text-weight-b" label="￥199起"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,0]" :padding="[20,10]">
			<view class="flex flex-between pt-20 pb-20 pl-n10 pr-n10">
				<tm-text :font-size="22" _class="text-weight-b" label="收购单价"></tm-text>
				<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="请填写收购单价"></tm-text>
			</view>
			<view class="flex flex-between pt-20 pb-20 pl-n10 pr-n10">
				<tm-text :font-size="22" _class="text-weight-b" label="收购数量"></tm-text>
				<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="请填写收购数量"></tm-text>
			</view>
			<view class="flex flex-between pt-20 pb-20 pl-n10 pr-n10">
				<tm-text :font-size="22" _class="text-weight-b" label="总金额"></tm-text>
				<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="支付总金额"></tm-text>
			</view>
		</tm-sheet>
		<view class="flex flex-center" style="margin-top: 100rpx;">
			<view style="width:100%">
				<tm-button  @click="consignment()"  :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="立即发布"></tm-button>	
			</view>
		</view>
		<tm-modal :height="380" title="提示" splitBtn okText="确认" v-model:show="show" :beforeClose="beforeClose"
			@ok="submit" :close="pwd=''">
			<tm-input placeholder="请输入交易密码" v-model="pwd"></tm-input>
			<view class="flex flex-row-center-center">
				<tm-text class="mt-30" :font-size="26" :label="content"></tm-text>
			</view>
		</tm-modal>
	</tm-app>
</template>


<script setup>
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import { My } from "@/api/api.ts"
	import a1 from "@/static/market/1.png"
	//配置信息
	const id = ref("");
	onLoad((e)=>{
		id.value=e.id
	})
	onShow((e)=>{
	})
	//出售点击
	const consignment = (id) => {
		content.value = "总共发布3个，单个￥100,总计￥300";
		show.value = true;
	}
	//出售提示
	const show = ref(false);
	const content = ref("");
	//交易密码
	const pwd = ref("");
	//出售提交
	const submit = () => {
		uni.showToast({
			title: "出售成功",
			icon: 'none'
		})
		show.value = false;
	}
	//输入密码验证
	const beforeClose = () => {
		if (pwd.value != '') {
			return true;
		} else {
			uni.showToast({
				title: "未输入密码",
				icon: 'none'
			})
			return false;
		}
	}
	
</script>

<style>

</style>
