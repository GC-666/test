<template>
	<tm-app>
		<tm-navbar  title="我要卖">
		</tm-navbar>
		<view class="mt-n5 ml-20 mr-20 scroll-Y2" style="overflow-y: auto;">
			<view class="flex flex-row-center-start mb-10" style="width:710rpx">
				<tm-text _class="text-weight-b ml-15" :font-size="30" label="需求信息"></tm-text>
			</view>
			<tm-sheet :shadow="0" :round="4" :margin="[0,0]" :padding="[0,20]">
				<view class="flex flex-around mb-10">
					<view class="flex flex-center" style="width:20%">
						<tm-text _class="text-weight-b " :font-size="30" label="发布者"></tm-text>
					</view>
					<view class="flex flex-center" style="width:20%">
						<tm-text _class="text-weight-b " :font-size="30" label="ID"></tm-text>
					</view>
					<view class="flex flex-center" style="width:20%">
						<tm-text _class="text-weight-b " :font-size="30" label="藏品"></tm-text>
					</view>
					<view class="flex flex-center" style="width:20%">
						<tm-text _class="text-weight-b " :font-size="30" label="出价"></tm-text>
					</view>
					<view class="flex flex-center" style="width:20%">
						<tm-text _class="text-weight-b " :font-size="30" label="数量"></tm-text>
					</view>
				</view>
				<view class="flex flex-around">
					<view class="flex flex-center" style="width:20%">
						<tm-text color="#808080"  :font-size="22" label="Xaadfwe"></tm-text>
					</view>
					<view class="flex flex-center" style="width:20%">
						<tm-text color="#808080"  :font-size="22" label="159***922"></tm-text>
					</view>
					<view class="flex flex-col flex-center" style="width:20%">
						<tm-image class="mb-10" :width="102" :height="102" :src="a1"></tm-image>
						<tm-text color="#808080"  :font-size="18" label="萌萌星球"></tm-text>
					</view>
					<view class="flex flex-center" style="width:20%">
						<tm-text color="#808080"  :font-size="22" label="￥922"></tm-text>
					</view>
					<view class="flex flex-center" style="width:20%">
						<tm-text color="#808080"  :font-size="22" label="159922"></tm-text>
					</view>
				</view>
			</tm-sheet>
			<view class="flex flex-row-center-start mt-10 mb-10" style="width:710rpx">
				<tm-text _class="text-weight-b ml-15" :font-size="30" label="我的藏品"></tm-text>
			</view>
			<tm-sheet :shadow="0" :round="4" :margin="[0,0]" :padding="[0,20]">
				<view class="flex flex-around mb-20">
					<view class="flex flex-center" style="width:20%">
						<tm-text _class="text-weight-b " :font-size="30" label="藏品"></tm-text>
					</view>
					<view class="flex flex-center" style="width:20%">
						<tm-text _class="text-weight-b " :font-size="30" label="编号"></tm-text>
					</view>
					<view class="flex flex-center" style="width:20%">
						<tm-text _class="text-weight-b " :font-size="30" label="状态"></tm-text>
					</view>
					<view class="flex flex-center" style="width:20%">
						<tm-text _class="text-weight-b " :font-size="30" label="价格"></tm-text>
					</view>
					<view class="flex flex-center" style="width:20%">
						<tm-text _class="text-weight-b " :font-size="30" label="操作"></tm-text>
					</view>
				</view>
				<view v-for="(data,index) in 4">
					<view class="flex flex-around">
						<view class="flex flex-center" style="width:20%">
							<tm-image class="mb-10" :width="90" :height="90" :src="a1"></tm-image>
						</view>
						<view class="flex flex-center" style="width:20%">
							<tm-text color="#808080" :font-size="22" label="159922"></tm-text>
						</view>
						<view class="flex flex-center" style="width:20%">
							<tm-text _class="text-weight-b" :font-size="22" label="可出售"></tm-text>
						</view>
						<view class="flex flex-col flex-center" style="width:20%">
							<tm-text color="#808080"  :font-size="22" label="买入价"></tm-text>
							<tm-text class="mt-10" color="#808080" :font-size="22" label="￥922"></tm-text>
						</view>
						<view class="flex flex-center" style="width:20%">
							<tm-image @click="consignment(index)" class="mb-10" :width="90" :height="50" :src="cushou"></tm-image>
						</view>
					</view>
					<tm-divider v-if="index!=3" color="#f5f5f5"></tm-divider>
				</view>
			</tm-sheet>
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
	import a1 from "@/static/market/1.png"
	import cushou from "@/static/market/cushou.png"
	//收购列表
	const sellList = ref([{}]);
	//页面加载完成执行
	onShow(() => {
		//tabsChange();
	})
	//出售点击
	const consignment = (id) => {
		console.log(id);
		content.value = "预计获得：" + 1 + "元";
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
