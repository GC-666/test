<template>
	<tm-app class="overflow-y">
		<tm-navbar title="藏品寄售" :height="44" :shadow="0">
		</tm-navbar>
		<view class="head">
			<view class="bg"
				:style="{'background-image': store.tmStore.dark? `url(${bg})`: `url(${bg1})` ,'background-size':' 100% 100%','margin':'0 auto','position':'relative','width':'500rpx','height':'200rpx'}">
				<view class="img">
					<tm-image preview :round="4" :width="300" :height="300" :src="collectionDetails.img">
					</tm-image>
				</view>
			</view>
		</view>
		<tm-sheet :shadow="0" :margin="[20,0]" :padding="[20,10]">
			<view class="flex flex-between pt-10 pb-10">
				<view class="">
					<tm-text :font-size="32" _class="text-weight-b" :label="collectionDetails.name"></tm-text>
					<tm-text class="mt-14" color="#999" :font-size="18" _class="text-weight-n"
						:label="collectionDetails.no"></tm-text>
				</view>
				<view class="flex flex-row-center-center">
					<tm-text color="#FFCE92" :font-size="18" _class="text-weight-b" label="买入价￥:"></tm-text>
					<tm-text color="#FFCE92" :font-size="36" _class="text-weight-b" :label="collectionDetails.buyprice">
					</tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,10]">
			<view class="flex flex-between pt-10 pb-10">
				<view class="flex flex-row-center-center">
					<tm-text :font-size="26" _class="text-weight-b" label="寄售价格"></tm-text>
				</view>
				<view class="flex">
					<tm-input @blur="calculation" style="width: 400rpx;" placeholder="请输入售价" prefix="tmicon-renminbi3"
						v-model="price">
					</tm-input>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,0]" :padding="[20,10]">
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-icon name="xh-zhanghuqianbao" :font-size="35"></tm-icon>
					<tm-text class="ml-10" color="#808080" :font-size="22" _class="text-weight-b" label="平台钱包">
					</tm-text>
				</view>
				<tm-checkbox-group v-model="checkboxlist1">
					<tm-checkbox disabled defaultChecked :size="30" :round="10" value="00"></tm-checkbox>
				</tm-checkbox-group>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-icon name="xh-yunqianbao" :font-size="35"></tm-icon>
					<tm-text class="ml-10" color="#808080" :font-size="22" _class="text-weight-b" label="云钱包"></tm-text>
					<tm-text class="ml-10" color="red" :font-size="22" _class="text-weight-b" label="(推荐)"></tm-text>
				</view>
				<tm-checkbox-group v-if="orderFindMySellServiceCharge.isCloudWallet =='1'" v-model="checkboxlist">
					<tm-checkbox defaultChecked :size="30" :round="10" value="05"></tm-checkbox>
				</tm-checkbox-group>
				<tm-text color="red" v-else :font-size="30" _class="text-weight-b" label="暂未开通"></tm-text>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :margin="[20,20]" :padding="[20,10]">
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="购买价格"></tm-text>
				</view>
				<view class="flex flex-row-center-center">
					<tm-icon :fontSize="22" color="#07EBFE" name="tmicon-renminbi3"></tm-icon>
					<tm-text color="#07EBFE" :font-size="30" _class="text-weight-b" :label="collectionDetails.buyprice">
					</tm-text>
				</view>
			</view>
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="服务费"></tm-text>
				</view>
				<view class="flex flex-row-center-center">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b"
						:label="`(手续费${orderFindMySellServiceCharge.serviceCharge}版税${orderFindMySellServiceCharge.royalties})`">
					</tm-text>
				</view>
			</view>
			<tm-divider color="grey" :margin="[1,1]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="预计收入"></tm-text>
				</view>
				<view class="flex flex-row-center-center">
					<tm-icon :fontSize="22" color="#07EBFE" name="tmicon-renminbi3"></tm-icon>
					<tm-text color="#07EBFE" :font-size="30" _class="text-weight-b" :label="getprice"></tm-text>
				</view>
			</view>
		</tm-sheet>
		<view style="margin-top: 30rpx;">
			<tm-button @click="consignment" :margin="[40,0]" form-type="submit" :fontSize="38" linearDeep="accent" block
				label="寄售"></tm-button>
		</view>
		<view class="flex-row-center-center mt-20 mb-40">
			<tm-checkbox class="flex-row-center-center" v-model="loot" :size="28" :round="10">
				<template v-slot:default="{checked}">
					<view class="flex flex-row">
						<tm-text :fontSize="20" label="我已经阅读并同意"></tm-text>
						<tm-text @click="gonav('pages/my/collections/saleAgreement')" :fontSize="20" color="red"
							label="《用户出售协议》"></tm-text>
					</view>
				</template>
			</tm-checkbox>
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
	import { My } from "@/api/api.ts"
	import { onLoad } from "@dcloudio/uni-app";
	import { onBeforeMount, ref, reactive } from "vue";
	import bg1 from "@/static/img/shopBg.png"
	import bg from "@/static/img/bg.png"
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	const loot = ref(true);
	const price = ref("")
	//配置参数
	const config = ref({});
	const checkboxlist = ref(['05'])
	const checkboxlist1 = ref(['00'])
	//藏品详情
	const collectionDetails = ref({});
	//我的寄售服务费和云钱包
	const orderFindMySellServiceCharge = ref({});
	onLoad((e) => {
		config.value = e;
		My.collectionDetails({
			id: e.id
		}).then(res => {
			collectionDetails.value = res;
		})
		My.orderFindMySellServiceCharge({
			id: e.id
		}).then(res => {
			orderFindMySellServiceCharge.value = res;

		})
	})
	//获取支付平台
	const paymentPlatform = ref([]);

	//计算的结果
	const getprice = ref(0)
	const calculation = () => {
		if (price.value <= 0) {
			return;
		}
		let x = Number(orderFindMySellServiceCharge.value.serviceCharge) + Number(orderFindMySellServiceCharge.value
			.royalties);
		let reprice = (x / 100) * parseInt(price.value);
		if (orderFindMySellServiceCharge.value.RightsValue > 0) {
			getprice.value = price.value - reprice * (orderFindMySellServiceCharge.value.RightsValue / 100);
		} else {
			getprice.value = price.value - reprice
		}
	}
	//寄售提示
	const show = ref(false);
	const content = ref("");
	//寄售点击
	const consignment = () => {

		if (checkboxlist.value.length > 0 && checkboxlist1.value.length > 0) {
			paymentPlatform.value.push({
				type: "00",
				name: "平台支付"
			})
			paymentPlatform.value.push({
				type: "05",
				name: "云钱包"
			})
		} else {
			paymentPlatform.value.push({
				type: "00",
				name: "平台支付"
			})
		}
		if (loot.value) {
			if (getprice.value > 0) {
				if (paymentPlatform.value.length > 0) {
					show.value = true;
					content.value = "预计获得：" + getprice.value + "元";
				} else {
					uni.showToast({
						title: "未选择支付方式",
						icon: 'none'
					})
				}
			} else {
				uni.showToast({
					title: "未输入价格",
					icon: 'none'
				})
			}
		} else {
			uni.showToast({
				title: "未阅读用户出售协议",
				icon: 'none'
			})
		}
	}
	//交易密码
	const pwd = ref("");
	//寄售提交
	const submit = () => {
		show.value = false;
		My.collectionSell({
			id: collectionDetails.value.id,
			pass: pwd.value,
			price: price.value,
			payTypeJson: JSON.stringify(paymentPlatform.value)
		}).then(res => {
			uni.showToast({
				title: '寄售成功',
				icon: 'none'
			})
		})
		paymentPlatform.value = []
	}
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
	.img {
		display: flex;
		justify-content: center;
		margin-bottom: 150rpx;
		position: relative;
		top: -300rpx;
	}

	.head {
		margin-top: 350rpx;
	}
</style>
