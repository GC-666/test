<template>
	<tm-app>
		<tm-navbar  title="盲盒详情" :shadow="0">
		</tm-navbar>
		<view class="flex-col 	flex-center	">
			<tm-text class="mt-14" :font-size="32" _class="text-weight-b" :label="userBoxFindItem.boxName"></tm-text>
			<view class="flex flex-center">
				<tm-text style="background-color: #FFCE92;border-radius: 8rpx;height:40rpx;line-height: 40rpx;" class="mt-14" :font-size="24" _class="text-weight-b" label="编号"></tm-text>
				<tm-text color="#FFCE92" class="mt-14" :font-size="24" _class="text-weight-n" :label="userBoxFindItem.no"></tm-text>
			</view>
		</view>
		<view class="head">
			<view class="bg"
				:style="{'background-image': store.tmStore.dark? `url(${bg})`: `url(${bg1})` ,'background-size':' 100% 100%','margin':'0 auto','position':'relative','width':'500rpx','height':'200rpx'}">
				<view class="img">
					<tm-image preview :round="4" :width="300" :height="300" :src="userBoxFindItem.boxImg">
					</tm-image>
				</view>
			</view>
		</view>
		<view class="detbox">
			<tm-text style="margin: 0rpx 20rpx;padding: 10rpx 20rpx;" :font-size="30" color="#07EBFE" _class="text-weight-b" label="有机会获得："></tm-text>
			<tm-sheet :round="4" :shadow="0" :margin="[20,0]" :padding="[20,10]">
				<view class="flex flex-between pt-20 pb-20" v-for="(item,index) in userBoxFindItem.boxProbablyList">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" :label="item.name"></tm-text>
					<tm-text :font-size="22" _class="text-weight-b" :label="`概率：${item.chance}%`"></tm-text>
				</view>
			</tm-sheet>
		</view>
		<view style="margin-top: 100rpx;">
			<view class="flex flex-center">
				<view v-if="userBoxFindItem.isOpen==0 && userBoxFindItem.type==0" style="width:100%">
					<tm-button @click="conversion" :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="开盲盒"></tm-button>	
				</view>
				<view v-if="userBoxFindItem.isBuy==1 && userBoxFindItem.type==0" style="width:100%">
					<tm-button color="#3b66f5" @click="gonav('pages/my/box/boxConsignment?id='+userBoxFindItem.id)" :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="寄售"></tm-button>
				</view>
				<view v-if="userBoxFindItem.type==3" style="width:100%">
					<tm-button color="#808080" @click="consignment" :margin="[20,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="撤回"></tm-button>
				</view>
			</view>
		</view>
		<tm-modal :height="300" title="提示" okText="确认" splitBtn v-model:show="show" @ok="submit" >
			<view class="flex flex-row-center-center">
				<tm-text :font-size="26" label="确认取消寄售"></tm-text>
			</view>
		</tm-modal>
		<tm-modal :height="300" title="提示" okText="确认" splitBtn v-model:show="show2" @ok="submit2" >
			<view class="flex flex-row-center-center">
				<tm-text :font-size="26" label="确认开启盲盒"></tm-text>
			</view>
		</tm-modal>
		<view class="cover" v-if="show3">
			<tm-image @load="aa" :width="750" :height="heig" :src="kj2">
			</tm-image>
		</view>
		<!-- <tm-overlay v-model:show="show3" :overlayClick="false">
		</tm-overlay> -->
		<tm-modal :height="340" title="恭喜" okText="确认" splitBtn v-model:show="show4" @cancel="cancel" @ok="submit3" >
			<view class="flex flex-row-center-center">
				<tm-text :font-size="26" :label="`恭喜获得“藏品:${openRemarks}”`"></tm-text>
			</view>
			<view class="flex flex-row-center-center mt-10">
				<tm-text :font-size="26" label="已放入我的收藏，快去看看吧”"></tm-text>
			</view>
		</tm-modal>
	</tm-app>
</template>


<script setup>
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import { My } from "@/api/api.ts"
	import bg1 from "@/static/img/shopBg.png"
	import bg from "@/static/img/bg.png"
	import kj from "@/static/my/kj.gif"
	import kj2 from "@/static/my/kj2.gif"
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	const heig=uni.getWindowInfo().windowHeight * 2 - uni.getWindowInfo().statusBarHeight;
	//盲盒详情
	const userBoxFindItem = ref({});
	//配置信息
	const id = ref("");
	onLoad((e)=>{
		id.value=e.id
	})
	onShow((e)=>{
		My.userBoxFindItem({
			id:id.value
		}).then(res => {
			userBoxFindItem.value = res;
		})
	})
	
	//开启盲盒
	const show2 = ref(false);
	//点击开盲盒
	const conversion=()=>{
		show2.value=true
	}
	//开奖动画
	const show3 = ref(false);
	//开启盲盒
	const show4 = ref(false);
	//开启的奖励
	const openRemarks = ref({});
	//点击确认开盲盒
	const submit2=()=>{
		My.userBoxOpenBox({
			id: userBoxFindItem.value.id,
		}).then(res => {
			show3.value=true;
			openRemarks.value=res;
		})
	}
	const aa=(b)=>{
		setTimeout(()=>{
			uni.navigateTo({
				url: '/pages/my/box/boxDetailsSuccess?config='+ encodeURIComponent(JSON.stringify(openRemarks.value))
			});
			show3.value=false
			
			//show4.value=true;
		},2500)
	}
	//点击确认奖励
	const submit3=()=>{
		uni.navigateBack({
			delta:2,
		})
	}
	//点击取消奖励
	const cancel=()=>{
		My.userBoxFindItem({
			id:id.value
		}).then(res => {
			userBoxFindItem.value = res;
		})
	}
	
	//寄售提示
	const show = ref(false);
	//取消寄售点击
	const consignment=()=>{
		show.value=true;
	}
	//取消寄售提交
	const submit=()=>{
		My.userBoxLowerShelfBox({
			id: userBoxFindItem.value.id
		}).then(res => {
			My.userBoxFindItem({
				id:userBoxFindItem.value.id
			}).then(res => {
				userBoxFindItem.value = res;
			})
		})
	}
	
</script>

<style scoped>
	.cover {
		position: fixed;
		top: 88rpx;
		left: 0;
		width: 100%;
		height: 100%;
		/* background-image: url("@/static/my/kj.gif");
		background-size: 100% 100%; */
		z-index: 1;
	}
	.img {
		display: flex;
		justify-content: center;
		margin-bottom: 150rpx;
		position: relative;
		top: -300rpx;
	}

	.head {
		margin-top: 320rpx;
	}
</style>
