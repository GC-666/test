<template>
	<tm-app style="">
		<tm-navbar :title="config.boxName" :shadow="0">
		</tm-navbar>
		<view style="">
			<tm-sheet :transprent="false" :margin="[0,0]">
				<tm-tabs @change="tabsChange" :transprent="false" activeFontColor="#07EBFE" align="center"
					:list="tabsTitle" :itemHeight="30" :itemWidth="130" :width="700" :height="30" default-name="0">
				</tm-tabs>
			</tm-sheet>
		</view>
		<scroll-view scroll-y="true" :class="userBoxFindPageList.length>0?'scroll-Y':''" @scrolltolower="lower" > 
			<view  style="margin: 0rpx 20rpx 0rpx 20rpx;">
				<view class="" v-for="(data,index) in userBoxFindPageList"
					@click="gonav('pages/my/box/boxDetails?id='+data.id)">
					<view class="pa-10">
						<tm-sheet :round="4" :shadow="0" :margin="[0,0]" :padding="[20,10]">
							<view class="flex flex-between" style="margin: 0rpx 10rpx;">
								<tm-text :font-size="32" _class="text-weight-b" :label="config.boxName"></tm-text>
								<view class="flex flex-center">
									<tm-text v-if="data.type=='0'" color="#FFCE92" :font-size="24" _class="text-weight-b"
										label="未开启"></tm-text>
									<tm-text v-else-if="data.type=='1'" color="#FFCE92" :font-size="24"
										_class="text-weight-b" label="已开启"></tm-text>
									<tm-text v-else-if="data.type=='2'" color="#FFCE92" :font-size="24"
										_class="text-weight-b" label="待发行"></tm-text>
									<tm-text v-else-if="data.type=='3'" color="#FFCE92" :font-size="24"
										_class="text-weight-b" label="已上架"></tm-text>
									<tm-text v-else-if="data.type=='4'" color="#FFCE92" :font-size="24"
										_class="text-weight-b" label="交易中"></tm-text>
									<tm-text v-else-if="data.type=='5'" color="#FFCE92" :font-size="24"
										_class="text-weight-b" label="交易完成"></tm-text>
								</view>
							</view>
							<view class="flex flex-between"
								style="margin:20rpx 10rpx 0rpx 10rpx;padding: 0rpx 0rpx 10rpx 0rpx">
								<view class="flex">
									<tm-text color="#07EBFE" :font-size="22" _class="text-weight-n" :label="data.no">
									</tm-text>
								</view>
								<view class="flex" v-if="data.time!==null && data.time!==''">
									<view class="flex" v-if="data.type=='0'">
										<!-- <tm-text color="#999" :font-size="18" _class="text-weight-b" label="获取时间"></tm-text> -->
										<tm-text class="ml-4" color="#999" :font-size="22" _class="text-weight-b"
											:label="DateUtils.formatDateTime(data.time)"></tm-text>
									</view>
									<view class="flex" v-else-if="data.type=='1' || data.type=='2'">
										<!-- <tm-text color="#999" :font-size="20" _class="text-weight-b" label="开启时间"></tm-text> -->
										<tm-text class="ml-4" color="#999" :font-size="22" _class="text-weight-b"
											:label="DateUtils.formatDateTime(data.time)"></tm-text>
									</view>
									<view class="flex" v-else-if="data.type=='3' || data.type=='4' || data.type=='5'">
										<!-- <tm-text color="#999" :font-size="20" _class="text-weight-b" label="上架时间"></tm-text> -->
										<tm-text class="ml-4" color="#999" :font-size="22" _class="text-weight-b"
											:label="DateUtils.formatDateTime(data.time)"></tm-text>
									</view>
								</view>
							</view>
						</tm-sheet>
					</view>
				</view>
			</view>
			<view v-if="index==0" style="width:750rpx;height:80rpx">
			</view>
		</scroll-view>
		<view v-if="index==0" class="fixed b-0 r-0 l-0 ">
			<tm-sheet :round="0" :shadow="2" :margin="[0,0]" :padding="[0,0]">
				<view class="flex flex-center">
					<tm-button :round="4" :margin="[20, 10]" :padding="[0,0]" :fontSize="38" 
						:shadow="0" :height="70" :width="300" label="开启5个" color="#60beff"
						@click="conversion(5)"></tm-button>
					<tm-button :round="4" :margin="[20, 10]" :padding="[0,0]" :fontSize="38" 
						:shadow="0" :height="70" :width="300" label="开启10个" 
						@click="conversion(10)"></tm-button>
				</view>
			</tm-sheet>
		</view>
		<view v-if="userBoxFindPageList.length<=0" class="flex flex-wrap flex-row-center-center" style="margin-top:150rpx">
			<tm-image :round="4" class="flex-start" :width="350" :height="280" :src="wushuju"></tm-image>
		</view>
		<tm-modal :height="350" title="提示" okText="确认" splitBtn v-model:show="show2" @ok="submit2" >
			<view class="flex flex-col flex-center">
				<view class="flex">
					<tm-text :font-size="28" label="开启将消耗"></tm-text>
					<tm-text :font-size="28" color="red" :label="`${config.boxName}x${idType}`"></tm-text>
				</view>
				
				<tm-text :font-size="26" class="mt-10" label="是否确认开启盲盒"></tm-text>
			</view>
		</tm-modal>
		<view class="cover" v-if="show3">
			<tm-image @load="aa" :width="750" :height="heig" :src="kj2">
			</tm-image>
		</view>
		<tm-overlay v-model:show="show4" contentAnimation @close="close">
			<view class="bj">
				<view class="flex flex-between" v-if="idType==10">
					<view class="flex flex-col flex-center" style="width: 250rpx;">
						<tm-image v-if="batchOpenBox.length>0" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[0].boxImg">
						</tm-image>
						<tm-image v-if="batchOpenBox.length>3" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[3].boxImg">
						</tm-image>
						<tm-image v-if="batchOpenBox.length>6" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[6].boxImg">
						</tm-image>
					</view>
					<view class="flex flex-col flex-center" style="width: 250rpx;">
						<tm-image v-if="batchOpenBox.length>1" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[1].boxImg">
						</tm-image>
						<tm-image v-if="batchOpenBox.length>4" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[4].boxImg">
						</tm-image>
						<tm-image v-if="batchOpenBox.length>7" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[7].boxImg">
						</tm-image>
						<tm-image v-if="batchOpenBox.length>9" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[9].boxImg">
						</tm-image>
					</view>
					<view class="flex flex-col flex-center" style="width: 250rpx;">
						<tm-image v-if="batchOpenBox.length>2" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[2].boxImg">
						</tm-image>
						<tm-image v-if="batchOpenBox.length>5" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[5].boxImg">
						</tm-image>
						<tm-image v-if="batchOpenBox.length>8" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[8].boxImg">
						</tm-image>
					</view>
				</view>
				<view class="mt-n25" v-if="idType==5">
					<view class="flex flex-around" style="width: 600rpx;margin: 0 auto;">
						<tm-image v-if="batchOpenBox.length>0" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[0].boxImg">
						</tm-image>
						<tm-image v-if="batchOpenBox.length>3" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[1].boxImg">
						</tm-image>
					</view>
					<view class="flex flex-around">
						<tm-image round="4" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[2].boxImg">
						</tm-image>
						<tm-image round="4" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[3].boxImg">
						</tm-image>
						<tm-image round="4" class="main1 mt-n10 mb-n10" model="aspectFill" :round="4" :width="200" :height="200"
							:src="batchOpenBox[4].boxImg">
						</tm-image>
					</view>
				</view>
				<tm-text class="flex flex-center mt-10 mb-n10" color="#CCCCCC" :font-size="30" _class="text-weight-b"
						label="点击空白处关闭此页面"></tm-text>
			</view>
		</tm-overlay>
	</tm-app>
</template>


<script setup>
	const hh = ref("");
	onLoad((e) => {

	})
	import { onShow, onLoad } from '@dcloudio/uni-app';
	import { onMounted, reactive, ref } from 'vue';
	import { My } from "@/api/api.ts"
	import kj from "@/static/my/kj.gif"
	import kj2 from "@/static/my/kj2.gif"
	const heig=uni.getWindowInfo().windowHeight * 2 - uni.getWindowInfo().statusBarHeight;

	import wushuju from "@/static/my/wushuju.png"
	const tabsTitle = ref([{
			key: "0",
			title: "未开启"
		},
		{
			key: "1",
			title: "已开启"
		},
		{
			key: "2",
			title: "寄售中"
		},
	]);
	//开启盲盒
	const show2 = ref(false);
	//点击开盲盒
	const conversion=(type)=>{
		idType.value=type;
		show2.value=true
	}
	//开奖动画
	const show3 = ref(false);
	//点击确认开盲盒
	const batchOpenBox = ref([]);
	
	const submit2=()=>{
		let ids="";
		if(idType.value==5){
			ids=ids5.value;
		}else if(idType.value==10){
			ids=ids10.value;
		}
		My.userBatchOpenBox({
			id: JSON.stringify(ids)
		}).then(res => {
			batchOpenBox.value=res;
			show3.value=true;
		})
		ids5.value=[]
		ids10.value=[]
	}
	const aa=(b)=>{
		setTimeout(()=>{
			show3.value=false;
			if(batchOpenBox.value.length==10 || batchOpenBox.value.length==5){
				show4.value=true
			}
		},1500)
	}
	const close=()=>{
		tabsChange(index.value);
	}
	//开启盲盒
	const show4 = ref(false);
	//类型下标
	const index = ref(0);
	//配置参数
	const config = ref({});
	//盲盒类型详情
	const userBoxFindPageList = ref({});
	onLoad((e) => {
		config.value = e;
		pageData.value.boxId = config.value.id
		//tabsChange(index.value);
	})
	onShow(() => {
		ids5.value=[]
		ids10.value=[]
		batchOpenBox.value=[];
		tabsChange(index.value);
	})
	//配置参数
	const pageData = ref({
		boxId: 0,
		page: 1,
		limit: 20,
		boxType: 0
	});
	const bool = ref(true);
	//选择的是5连抽还是10连抽
	const idType = ref(0);
	//5个盲盒的id
	const ids5 = ref([]);
	//10个盲盒的id
	const ids10 = ref([]);
	// 下拉刷新
	const lower = () => {
		pageData.value.page = pageData.value.page + 1;
		if (bool.value) {
			My.userBoxFindPageList(pageData.value).then(res => {
				userBoxFindPageList.value = userBoxFindPageList.value.concat(res)
				if (res.length == pageData.value.limit) {
					bool.value = true;
				} else {
					bool.value = false;
				}
			})
		}
	}

	const tabsChange = (i) => {
		index.value = i;
		pageData.value.boxType = i;
		pageData.value.page = 1;
		userBoxFindPageList.value = [];
		My.userBoxFindPageList(pageData.value).then(res => {
			userBoxFindPageList.value = res;
			for(var i=0;i<res.length;i++){
				if(res[i].type=="0"){
					if(ids5.value.length<5){
						ids5.value = ids5.value.concat(parseInt(res[i].id));
					}
					if(ids10.value.length==10){
						break;
					}else{
						ids10.value = ids10.value.concat(parseInt(res[i].id));
					}
				}
			}
			if (res.length == pageData.value.limit) {
				bool.value = true;
			} else {
				bool.value = false;
			}
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
	.scroll-Y {
		height: calc(100vh - var(--status-bar-height) - 172rpx);
	}
	.bj{
		background-image: url("@/static/my/cj210.png");
		background-size: 100% 100%;
		width: 750rpx;
		height: calc(100vh - 88rpx);
		overflow: auto;
	}
	.main1{
		/* width: 200rpx;
		 height: 200rpx;
		 background-color: antiquewhite;
		 box-shadow: 0px 0px 10px red ;
		 border-radius: 10rpx; */
	}
</style>
