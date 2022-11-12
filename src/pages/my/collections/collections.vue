<template>
	{{screenWidth}}--{{screenHeight}}--{{windowWidth}}--{{windowHeight}}--{{statusBarHeight}}--{{safeArea}}
</template>


<script setup>
	const {screenWidth,screenHeight,windowWidth, windowHeight, statusBarHeight,safeArea } =uni.getWindowInfo()
	
		console.log("屏幕宽度",screenWidth);
		console.log("屏幕高度",screenHeight);
		console.log("可使用窗口宽度",windowWidth);
		console.log("可使用窗口高度",windowHeight);
		console.log("手机状态栏的高度",statusBarHeight);
		console.log("安全区域",safeArea);
	const { height, width, top } = uni.$tm.u.getWindow()
	const hh=ref("");
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
	
	onLoad((e)=>{
		// // #ifdef APP-PLUS
		// hh.value = height - 44 - 80 + 6
		// // #endif
		// // #ifdef H5
		// if(windowTop>0){//0		44
		// 	hh.value = height  - windowTop
		// }else{
		// 	hh.value = height   - 80 -6
		// }
		// // #endif
	})

	const tabsTitle = ref([{
			key: "1",
			title: "我的藏品"
		},
		{
			key: "2",
			title: "藏品记录"
		}
	]);
	//类型下标
	const index = ref(1);
	//藏品类型列表
	const mineFindCollReport = ref({});
	//页面加载完成执行
	onMounted(() => {
		tabsChange(1);
	})
	//藏品记录列表
	const userRecrodFindCollPageList = ref({});
	//配置参数
	const pageData = ref({
		page: 1,
		limit: 10
	});
	const bool = ref(true);
	// 下拉刷新
	const lower = () => {
		pageData.value.page = pageData.value.page + 1;
		if (bool.value) {
			if (index.value == 1) {
				My.mineFindCollReport(pageData.value).then(res => {
					mineFindCollReport.value = mineFindCollReport.value.concat(res)
					if (res.length = pageData.value.limit) {
						bool.value = true;
					} else {
						bool.value = false;
					}
				})
			} else {
				My.userRecrodFindCollPageList(pageData.value).then(res => {
					userRecrodFindCollPageList.value = userRecrodFindCollPageList.value.concat(res)
					if (res.length = pageData.value.limit) {
						bool.value = true;
					} else {
						bool.value = false;
					}
				})
			}
		}
	}
	const tabsChange = (i) => {
		index.value = i;
		pageData.value.page = 1;
		mineFindCollReport.value = [];
		userRecrodFindCollPageList.value = [];
		if (i == 1) {
			My.mineFindCollReport(pageData.value).then(res => {
				mineFindCollReport.value = res;
				if (res.length == pageData.value.limit) {
					bool.value = true;
				} else {
					bool.value = false;
				}
			})
		} else {
			My.userRecrodFindCollPageList(pageData.value).then(res => {
				userRecrodFindCollPageList.value = res;
				if (res.length == pageData.value.limit) {
					bool.value = true;
				} else {
					bool.value = false;
				}
			})
		}
	}

</script>

<style>

</style>
