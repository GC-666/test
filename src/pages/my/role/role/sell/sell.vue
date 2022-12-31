<template>
	<tm-app>
		<tm-navbar title="发布寄售">
		</tm-navbar>
		<tm-sheet :shadow="0" :round="4" :margin="[10,15]" :padding="[20,20]">
			<view class="flex flex-between ">
				<view class="flex flex-1">
					<tm-image :round="3" :width="120" :height="120" src="https://picsum.photos/200/300">
					</tm-image>
					<view class="flex flex-col  ml-20 flex-1 flex-around">
						<view class="flex ">
							<tm-text :font-size="28" _class="text-overflow text-weight-b"
								_style="width:200rpx;text-overflow: ellipsis;" label="米利恩·夏亚">
							</tm-text>

						</view>
						<view class="flex flex-between">
							<tm-text :font-size="22" _class="text-weight-s" :label="`职业：高级法师`">
							</tm-text>
						</view>
						<view class="flex flex-row-center-between">
							<tm-text :font-size="22" _class="text-weight-s" label="等级：80">
							</tm-text>
							<view class="flex flex-end">
								<tm-text :font-size="20" _class="text-weight-s" label="市场价¥"></tm-text>
								<tm-text :font-size="32" _class="text-weight-b ml-10" label="999"></tm-text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :round="4" :margin="[10,10]" :padding="[20,10]">
			<view class="flex flex-between mt-10 mb-10">
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
		<tm-sheet :shadow="0" :round="4" :margin="[10,10]" :padding="[0,0]">
			<view class="flex flex-col">
				<tm-text :font-size="28" _class="text-weight-b" class=" ml-20 mt-20" label="米利恩·夏亚">
				</tm-text>
				<tm-divider :margin="[10,10]"></tm-divider>
				<view class="flex flex-around">
					<view class="flex flex-col flex-col-center-center ml-20">
						<tm-text :font-size="22" _class="text-weight-s" label="命中">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ml-20">
						<tm-text :font-size="22" _class="text-weight-s" label="力量">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ml-20">
						<tm-text :font-size="22" _class="text-weight-s" label="敏捷">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ml-20">
						<tm-text :font-size="22" _class="text-weight-s" label="智力">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ml-20">
						<tm-text :font-size="22" _class="text-weight-s" label="命中">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="-999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ml-20">
						<tm-text :font-size="22" _class="text-weight-s" label="攻击力">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ml-20">
						<tm-text :font-size="22" _class="text-weight-s" label="防御力">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="1">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ml-20">
						<tm-text :font-size="22" _class="text-weight-s" label="魔法抗性">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="100%">
						</tm-text>
					</view>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :round="4" :margin="[10,10]" :padding="[20,10]">
			<tm-text class="ml-10 mb-10" :fontSize="32" _class="text-weight-b" label="到款账户">
			</tm-text>
			<tm-divider color="grey" :margin="[1,5]"></tm-divider>
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
			<tm-divider color="grey" :margin="[1,5]"></tm-divider>
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-icon name="xh-yunqianbao" :font-size="35"></tm-icon>
					<tm-text class="ml-10" color="#808080" :font-size="22" _class="text-weight-b" label="云钱包"></tm-text>
					<tm-text class="ml-10" color="red" :font-size="22" _class="text-weight-b" label="(推荐)"></tm-text>
				</view>
				<tm-checkbox-group v-if="1==1" v-model="checkboxlist">
					<tm-checkbox defaultChecked :size="30" :round="10" value="05"></tm-checkbox>
				</tm-checkbox-group>
				<tm-text color="red" v-else :font-size="30" _class="text-weight-b" label="暂未开通"></tm-text>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :round="4" :margin="[10,10]" :padding="[20,10]">
			<view class="flex flex-between pt-20 pb-20">
				<view class="flex flex-row-center-center">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b" label="服务费"></tm-text>
				</view>
				<view class="flex flex-row-center-center">
					<tm-text color="#808080" :font-size="22" _class="text-weight-b"
						:label="`(手续费${fwf.serviceCharge}版税${fwf.royalties})`">
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
		<view class="mt-n20 flex flex-center">
			<tm-image :margin="[0, 0]" :padding="[0,0]" :round="4" :width="200" :height="60" model="aspectFill"
				:src="qrcs" @click="consignment">
			</tm-image>
		</view>
		<view class="flex-row-center-center mt-10">
			<tm-checkbox class="flex-row-center-center" v-model="loot" :size="22" :round="10">
				<template v-slot:default="{checked}">
					<view class="flex flex-row">
						<tm-text :fontSize="22" label="我知晓并同意"></tm-text>
						<tm-text @click="gonav('pages/my/collections/saleAgreement')" :fontSize="22" :color="bgColor"
							label="《用户出售协议》"></tm-text>
					</view>
				</template>
			</tm-checkbox>
		</view>
		<tm-modal :height="350" :border="0" text okColor="black" okText="出售" cancelColor="white" linear="bottom"
			title="请输入交易密码" v-model:show="showWin" @ok="submit">
			<view class="flex flex-center">
				<tm-text :font-size="22" _class="text-weight-s" label="米利恩·夏亚    高级法师    等级: 80"></tm-text>

			</view>
			<tm-input :margin="[0,34]" password placeholder="请输入交易密码" v-model="pwd"></tm-input>
		</tm-modal>
	</tm-app>
</template>


<script setup>
	import { Role, My } from "@/api/api.ts"
	import { onLoad } from "@dcloudio/uni-app";
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import detailsBg from "@/static/role/detailsBg.png"
	import ljgm from "@/static/role/ljgm.png"
	import qrcs from "@/static/role/qrcs.png"
	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	const checkboxlist = ref(['05'])
	const checkboxlist1 = ref(['00'])
	const pwd = ref('')
	const price = ref('')
	const getprice = ref('')
	const showWin = ref(false)
	const loot = ref(true)
	//我的寄售服务费和云钱包
	const fwf = ref({});
	onLoad((context) => {
		console.log("接收参数", context.id);
		My.orderFindMySellServiceCharge({
			id: context.id
		}).then(res => {
			fwf.value = res;
		})
	})
	// 出售
	const consignment = () => {
		if (price.value == '') {
			uni.showToast({
				title: "请输入售价",
				icon: 'none'
			})
			return
		}
		console.log("出售", pwd.value);
		showWin.value = true
	}
	//确认出售
	const submit = () => {}
	// 输入框失去焦点
	const calculation = () => {
		if (price.value <= 0) {
			return;
		}
		let x = Number(fwf.value.serviceCharge) + Number(fwf.value
			.royalties);
		let reprice = (x / 100) * parseInt(price.value);
		if (fwf.value.RightsValue > 0) {
			getprice.value = price.value - reprice * (fwf.value.RightsValue / 100);
		} else {
			getprice.value = price.value - reprice
		}
	}
</script>
<style scoped>
	.bg {
		width: 100%;
		height: 750rpx;
		background-image: url('@/static/role/detailsBg.png');
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
