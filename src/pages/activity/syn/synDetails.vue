<template>
	<tm-app>
		<tm-navbar  title="合成">
		</tm-navbar>
		<view class="head">
			<view class="bg"
				:style="{'background-image': store.tmStore.dark? `url(${bg})`: `url(${bg1})` ,'background-size':' 100% 100%','margin':'0 auto','position':'relative','width':'500rpx','height':'200rpx'}">
				<view class="img">
					<tm-image preview :round="4" :width="300" :height="300" :src="composeFind.image">
					</tm-image>
				</view>
			</view>
		</view>
		<tm-sheet :shadow="0" :margin="[20,0]" :padding="[20,10]">
			<tm-divider :color="bgColor" :font-color="bgColor" :border="10" :font-size="32" :label="`${composeFind.name}合成通道`"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="每人限合成数量"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text :font-size="22" _class="text-weight-b" :label="composeFind.userLimitNumber"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="剩余数量"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text  :font-size="22" _class="text-weight-b"  :label="composeFind.limitNumber-composeFind.useFalseNumber"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="最少材料数"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text :font-size="22" _class="text-weight-b" :label="composeFind.minNumber"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="最多材料数"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text :font-size="22" _class="text-weight-b" :label="composeFind.maxNumber"></tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex pt-20 pb-20">
				<view class="" style="width: 375rpx;">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="合成时间"></tm-text>
				</view>
				<view class="" style="width: 375rpx;">
					<tm-text :font-size="22" _class="text-weight-b" :label="DateUtils.formatDateTime(composeFind.startTime)"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,10]">
			<view class="flex">
				<view class="flex flex-center pt-20 pb-20">
					<tm-text color="#808080" :font-size="30" _class="text-weight-b" label="作品描述"></tm-text>
					<tm-text :font-size="22" label="你可能合成到以下作品中的一个"></tm-text>
				</view>
			</view>
			<view class="flex flex-wrap">
				<view class="flex flex-center" style="width:25%;height:146rpx;overflow: hidden;margin-top: 10rpx;" v-for="(data,index) in composeFind.collectionsList">
					<view class="" :style="`background-image: url(${data.collImg});background-size: 100% 100%;
									width:146rpx;height:146rpx;border-radius: 20rpx;overflow: hidden;`">
						<view class="" :style="`background-color: ${bgColor};transform: rotate(-45deg);
									margin-left: -38rpx;margin-top: 10rpx;color: #fff;
									width: 140rpx;text-align: center;height:42rpx;line-height: 42rpx;font-size: 24rpx;
									`">
							{{data.chance}}%
						</view>
					</view>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,0]" :padding="[20,10]">
			<view class="flex">
				<view class="flex flex-center pt-20 pb-20">
					<tm-text color="#808080" :font-size="30" _class="text-weight-b" label="合成材料"></tm-text>
				</view>
			</view>
			<view class="flex flex-wrap">
				<view class="flex flex-center" style="width:50%;" v-for="(data,index) in composeFind.materialList">
					<tm-sheet :shadow="10" >
						<view class="" :style="`background-image: url(${data.collImg});background-size: 100% 100%;
										width:300rpx;height:300rpx;border-radius: 20rpx;overflow: hidden;`"
										@click="selectMaterial(index)" >
							<view class="" :style="`background-color: ${bgColor};color: #fff;margin-left: 10rpx;margin-top: 10rpx;
										width: 50rpx;text-align: center;height:50rpx;line-height: 50rpx;font-size: 26rpx;
										border-radius: 50rpx;
										`">
								{{data.count}}
							</view>
						</view>
						<view class="flex-center mt-10">
							<tm-text :font-size="30" _class="text-weight-b" label="合成材料"></tm-text>
						</view>
					</tm-sheet>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,0]" :padding="[20,10]">
			<view class="pt-20 pb-20">
				<tm-text :font-size="30" _class="text-weight-b" label="合成须知"></tm-text>
				<tm-text class="mt-10" style="text-indent: 1.8em;letter-spacing:2rpx;letter-spacing:4rpx;" :font-size="22" label="数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满14周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，不得将数字藏品用于任何商业用途，不支持退换。本商品源文件不支持本地下载。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用"></tm-text>
			</view>				
		</tm-sheet>
		<view style="margin-top: 50rpx;">
			<tm-button @click="composeCompose" :margin="[40,0]" form-type="submit" :fontSize="38" linearDeep="accent" block label="合成"></tm-button>
		</view>
		<tm-drawer ref="calendarView" :hideCancel="true" v-model:show="showWin">
			<template v-slot:title>
				<tm-text :font-size="28" _class="text-weight-b" :label="title"></tm-text>
			</template>
			<view class="" v-for="(data,i) in composeFind.materialList[index].userCollList">
				<tm-cell :margin="[0, 0]" :titleFontSize="30">
					<template v-slot:title>
						<tm-text :font-size="26" class="mt-10"  :label="data.collTruenumber"></tm-text>	
						<!-- <view class="flex">
							<tm-image preview :round="4" :width="80" :height="80" :src="composeFind.materialList[index].collImg"></tm-image>
							<view class="flex flex-col flex-row-top-center ml-10">
								<tm-text :font-size="28" _class="text-weight-b" :label="composeFind.materialList[index].collName"></tm-text>
								<tm-text :font-size="22" class="mt-10"  :label="data.collTruenumber"></tm-text>	
							</view>
						</view> -->
					</template>
					<template v-slot:right>
						<tm-checkbox-group @change="setSyntheticMaterialList(i)">
							<tm-checkbox :defaultChecked="data.isSelect" :size="30" :round="10" :value="i"></tm-checkbox>
						</tm-checkbox-group>
					</template>
				</tm-cell>
			</view>
		</tm-drawer>
	</tm-app>
</template>


<script setup>
	import { onLoad,onShow } from '@dcloudio/uni-app';
	import { onMounted , reactive , ref } from 'vue';
	import bg1 from "@/static/img/shopBg.png"
	import bg from "@/static/img/bg.png"
	import { Activity } from "@/api/api.ts"
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	//合成详情
	const composeFind = ref({});
	//配置信息
	const id = ref("");
	//首次加载页面执行
	onLoad((e)=>{
		id.value=e.id
	})
	//每次加载页面执行
	onShow(()=>{
		Activity.composeFind({
			id:id.value
		}).then(res => {
			syntheticMaterialList.value=[];
			res.image=res.imgPath+res.img;
			for(let i=0;i<res.materialList.length;i++){
				let count=0;
				for(let j=0;j<res.materialList[i].userCollList.length;j++){
					if(res.materialList[i].userCollList[j].isSelect){
						count++;
						syntheticMaterialList.value.push(res.materialList[i].userCollList[j]);
					}
				}
				res.materialList[i].count=count;
			}
			composeFind.value = res;
		})
	})
	//选择卡片
	const showWin = ref(false);
	//选择的合成材料的下标
	const index = ref(0);
	//选择的合成材料状态名称
	const title = ref('');
	//选择合成材料
	const selectMaterial=(i)=>{
		index.value=i;
		if(composeFind.value.materialList[i].userCollList.length>0){
			title.value='选择合成材料';
		}else{
			title.value='暂无材料';
		}
		showWin.value=true;
	}
	//合成提交的参数
	const syntheticMaterialList = ref([]);
	const setSyntheticMaterialList=(e)=>{
		let bool=true;
		for(let i=0;i<syntheticMaterialList.value.length;i++){
			if(syntheticMaterialList.value[i].id==composeFind.value.materialList[index.value].userCollList[e].id){
				syntheticMaterialList.value.splice(i, 1);
				composeFind.value.materialList[index.value].userCollList[e].isSelect=false;
				composeFind.value.materialList[index.value].count--;
				bool=false;
				break;
			}
		}
		if(bool){
			composeFind.value.materialList[index.value].userCollList[e].isSelect=true;
			syntheticMaterialList.value.push(composeFind.value.materialList[index.value].userCollList[e]);
			composeFind.value.materialList[index.value].count++;
		}
	}
	//合成
	const composeCompose=(e)=>{
		// uni.navigateTo({
		// 	url: '/pages/activity/syn/synDetailsSuccess?config='+encodeURIComponent(JSON.stringify(composeFind.value.collectionsList[0])), 
		// 	success: function() {
		// 	}
		// })
		Activity.composeCompose({
			id:id.value,
			collJson:JSON.stringify(syntheticMaterialList.value)
		}).then(res => {
			uni.navigateTo({
				url: '/pages/activity/syn/synDetailsSuccess?config='+encodeURIComponent(JSON.stringify(res)), 
				success: function() {
				}
			})
		})
	}
	
</script>

<style>
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
