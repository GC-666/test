<template>
	<view class="bg">
		<view class="main">
		</view>
		<tm-sheet :shadow="0" :round="4" :margin="[20,20]" :padding="[0,0]">
			<view class="" style="margin: 0rpx auto;">
				<view class="flex flex-row-center-start">
					<tm-image :round="4" :margin="[0,20]" :width="34" :height="24" :src="express"></tm-image>
					<tm-text :font-size="20" class="ml-10" label="浔画快递"></tm-text>
				</view>
				<tm-image :round="4" :margin="[0,0]" :width="670" :height="706" :src="drawCardCard">
				</tm-image>
				<view class="flex flex-col flex-center">
					<tm-image @click="luckDraw" :round="4" :margin="[0,20]" :width="382" :height="66" :src="drawCard">
					</tm-image>
					<!-- <tm-text :font-size="20" class="ml-10 mb-20" :label="`每次抽卡时须消耗一张***卡`"></tm-text> -->
				</view>
				<scroll-view scroll-x="true" style="width: 700rpx;">
					<view class="flex " style="width: 700rpx;">
						<view class="flex flex-center pt-10 pb-10" style="width:25%" v-for="(item,index) in materialList">
							<view :class="checkCollectionsId==item.id?'flex flex-col flex-center choujiangyes':'flex flex-col flex-center'" 
							style="width:90%">
								<tm-image @click="checkCollections(item.id,index)" :round="4" :margin="[0,10]" :width="120" :height="120" :src="item.collImg">
								</tm-image>
								<tm-text :font-size="20" class="" :label="`消耗${item.collValue}张`"></tm-text>
								<tm-text :font-size="20" class="mt-5 mb-20" :label="`剩余${item.collCount}张`"></tm-text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</tm-sheet>
		<view class="chouka ml-20" style="padding: 73rpx 0rpx;">
			<view class="" style="overflow: auto;height: 250rpx;margin-left: 30rpx;">
				<tm-text :font-size="20" class="ma-10" :label="basic.profitConsumeRemarks"></tm-text>
			</view>
		</view>
		<view :style="`height: calc(${tabbarHeight}rpx);`">
		</view>
	</view>
	<tm-overlay v-model:show="show" :overlayClick="true">
		<view class="cover">
			<view class="flex flex-center" style="margin-top: 50rpx;">
				<tm-image :margin="[0,0]" :width="350" :height="130" :src="drawhead"></tm-image>
			</view>
			<view class="flex flex-center">
				<tm-image :margin="[0,0]" :width="629" :height="858" :src="drawHeroes.heroImg"></tm-image>
			</view>
			<view class="drawtitle flex flex-col flex-between">
				<view class="" style="margin-left: 50rpx;">
					<tm-text color="#F5F5AC" style="line-height: 85rpx;" _class="text-weight-b" :font-size="40"
							label="drawHeroes.name"></tm-text>
					<!-- <tm-text color="#F5F5AC" style="line-height: 85rpx;" _class="text-weight-b" :font-size="40"
						:label="drawHeroes.name"></tm-text> -->
				</view>
				<view class="flex flex-center" style="margin-right: 140rpx;">
					<tm-text style="line-height: 85rpx;" color="#F5F5AC" :font-size="26" :label="drawHeroes.heroRare=='1'?`职业: 稀有${drawHeroes.heroName}`:`职业: 高级${drawHeroes.heroName}`"></tm-text>
					<tm-text style="margin-left: 30rpx;line-height: 85rpx;" color="#F5F5AC" :font-size="26"
						:label="`Lv: ${drawHeroes.heroGrade}`"></tm-text>
				</view>
			</view>
			<view class=" mt-n10 mb-n10">
				<view class="drawcontent flex flex-around flex-wrap">
					<view class="flex flex-col flex-center" style="width:25%">
						<tm-text color="#fff" :font-size="20" label="生命"></tm-text>
						<tm-text color="#fff" :font-size="20" :label="drawHeroes.heroLife"></tm-text>
					</view>
					<view class="flex flex-col flex-center" style="width:25%">
						<tm-text color="#fff" :font-size="20" label="力量"></tm-text>
						<tm-text color="#fff" :font-size="20" :label="drawHeroes.heroPower"></tm-text>
					</view>
					<view class="flex flex-col flex-center" style="width:25%">
						<tm-text color="#fff" :font-size="20" label="敏捷"></tm-text>
						<tm-text color="#fff" :font-size="20" :label="drawHeroes.heroAgile"></tm-text>
					</view>
					<view class="flex flex-col flex-center" style="width:25%">
						<tm-text color="#fff" :font-size="20" label="智力"></tm-text>
						<tm-text color="#fff" :font-size="20" :label="drawHeroes.heroIntelligence"></tm-text>
					</view>
					<view class="flex flex-col flex-center" style="width:25%">
						<tm-text color="#fff" :font-size="20" label="攻击力"></tm-text>
						<tm-text color="#fff" :font-size="20" :label="drawHeroes.heroAttack"></tm-text>
					</view>
					<view class="flex flex-col flex-center" style="width:25%">
						<tm-text color="#fff" :font-size="20" label="防御力"></tm-text>
						<tm-text color="#fff" :font-size="20" :label="drawHeroes.heroDefense"></tm-text>
					</view>
					<view class="flex flex-col flex-center" style="width:25%">
						<tm-text color="#fff" :font-size="20" label="魔法抗性"></tm-text>
						<tm-text color="#fff" :font-size="20" :label="drawHeroes.heroMagic"></tm-text>
					</view>
					<view class="flex flex-col flex-center" style="width:25%">
						<tm-text color="#fff" :font-size="20" label="命中"></tm-text>
						<tm-text color="#fff" :font-size="20" :label="drawHeroes.heroHit"></tm-text>
					</view>
				</view>
			</view>
		</view>
	</tm-overlay>
</template>

<script setup>
	import { Role } from "@/api/api.ts"
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import yjsj from "@/static/role/yjsj.png"
	import drawCardCard from "@/static/role/drawCardCard.png"
	import drawCard from "@/static/role/drawCard.png"
	import express from "@/static/role/express.png"
	import drawhead from "@/static/role/drawhead.png"
	import drawrole from "@/static/role/drawrole.png"
	const percent = ref(20)
	const tabbarHeight = ref('')
	const show = ref(false);
	const aaa = ref(uni.getWindowInfo().windowHeight * 2);
	
	const drawHeroes = ref({"createTime":1670829650449,"heroAgile":"90","heroAttack":"75","heroDefense":"26","heroExp":"0","heroGrade":"1","heroHash":"36be15377622db36343c957246e0f4c49fb058bb","heroHit":"0.51","heroId":"2","heroImg":"http://156.240.123.168:9705/apknull","heroIntelligence":"23","heroLife":"97","heroMagic":"0.27","heroName":"刺客","heroPower":"12","heroRare":"1","heroTaskId":0,"heroTaskUserId":0,"heroUpExp":"100","id":0,"masterAttribute":"2","rareMinAttribute":"86","receiveNoCount":0,"status":"0","totalWorkCount":"0","userId":"3","userPhone":"18295918785","workCount":"1"})
	const luckDraw = () => {
		if(checkCollectionsId.value>0){
			show.value = true;
			// Role.drawHeroes({
			// 	id:checkCollectionsId.value
			// }).then(res => {
			// 	materialList.value[checkCollectionsIndex.value].collCount=res.drawHeroesMaterialCount;
			// 	show.value = true;
			// })
		}else{
			uni.showToast({
				title: "未选择消耗的材料",
				icon: 'none'
			})
		}
	}
	onBeforeMount(() => {
		// #ifdef APP-PLUS
		if (uni.getSystemInfoSync().platform == "android") {
			tabbarHeight.value = '110'
		} else if (uni.getSystemInfoSync().platform == "ios") {
			tabbarHeight.value = '125'
		}
		// #endif
		// #ifdef H5
		tabbarHeight.value = '110'
		// #endif
		findDrawHeroesMaterial()
	})
	// 获取抽卡信息
	const basic = ref({})
	const materialList = ref([])
	const findDrawHeroesMaterial = () => {
		Role.findDrawHeroesMaterial().then(res => {
			basic.value = res.basic
			materialList.value = res.materialList
		})
	}
	//选择抽卡的材料
	const checkCollectionsId = ref(0);
	const checkCollectionsIndex = ref(0);
	const checkCollections = (id,index) => {
		checkCollectionsIndex.value=index;
		checkCollectionsId.value=id;
	}
</script>

<style scoped>
	.drawtitle {
		background-image: url("@/static/role/drawtitle.png");
		background-size: 100% 100%;
		width: 710rpx;
		height: 150rpx;
		margin: 0 auto;
	}

	.drawcontent {
		background-image: url("@/static/role/drawcontent.png");
		background-size: 100% 100%;
		width: 710rpx;
		height: 150rpx;
		margin: 0 auto;
	}

	.cover {
		width: 100%;
		min-height: 100%;
		background-image: url("@/static/role/drawbj.png");
		background-size: 100% 100%;
		z-index: 1;
		overflow: auto;
	}

	.chouka {
		background-image: url("@/static/role/drawCardCardExplain.png");
		background-size: 100% 100%;
		width: 710rpx;
		height: 250rpx;
	}

	.bg {
		width: 100%;
		height: 100%;
		background-image: url('@/static/role/detailsBg.png');
		background-size: 100% 100%;
		overflow: hidden;
	}
	
	.choujiangyes {
		background-image: url("@/static/activity/loot/choujiangyes.png");
		background-size: 100% 100%;
	}
</style>
