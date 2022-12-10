<template>
	<tm-app>
		<tm-navbar title="英雄详情">
		</tm-navbar>
		<view class="bg">
			<tm-image preview :round="4" :width="410" :height="630" model="aspectFill"
				src="https://picsum.photos/200/300">
			</tm-image>
		</view>
		<tm-sheet :shadow="0" :round="4" :margin="[10,15]" :padding="[0,0]">
			<view class="flex flex-between">
				<view class="">
					<tm-text :font-size="28" _class="text-weight-b" class=" ma-20" label="米利恩·夏亚">
					</tm-text>
					<view class="flex ma-20">
						<tm-text :font-size="18" _class="text-weight-s" label="职业：高级法师">
						</tm-text>
						<tm-text :font-size="18" _class="text-weight-s" label="等级：80">
						</tm-text>
					</view>
				</view>
				<view class="flex flex-center flex-end mr-20">
					<tm-text :font-size="22" _class="text-weight-b" label="￥">
					</tm-text>
					<tm-text :font-size="38" _class="text-weight-b ml-4" label="999">
					</tm-text>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :round="4" :margin="[10,0]" :padding="[0,0]">
			<view class="flex flex-col">
				<tm-text :font-size="28" _class="text-weight-b" class=" ml-20 mt-20" label="米利恩·夏亚">
				</tm-text>
				<tm-divider :margin="[10,10]"></tm-divider>
				<view class="flex flex-around">
					<view class="flex flex-col flex-col-center-center ">
						<tm-text :font-size="22" _class="text-weight-s" label="命中">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ">
						<tm-text :font-size="22" _class="text-weight-s" label="力量">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ">
						<tm-text :font-size="22" _class="text-weight-s" label="敏捷">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ">
						<tm-text :font-size="22" _class="text-weight-s" label="智力">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ">
						<tm-text :font-size="22" _class="text-weight-s" label="命中">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="-999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ">
						<tm-text :font-size="22" _class="text-weight-s" label="攻击力">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="999">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ">
						<tm-text :font-size="22" _class="text-weight-s" label="防御力">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="1">
						</tm-text>
					</view>
					<view class="flex flex-col flex-col-center-center ">
						<tm-text :font-size="22" _class="text-weight-s" label="魔法抗性">
						</tm-text>
						<tm-text :font-size="20" _class="text-weight-s" class="mt-10 mb-10" label="100%">
						</tm-text>
					</view>
				</view>
			</view>
		</tm-sheet>
		<tm-sheet :shadow="0" :round="4" :margin="[10,10]" :padding="[20,10]" style="margin-bottom: 120rpx;">
			<tm-text class="ml-10" :font-size="28" _class="text-weight-b" label="支付方式">
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

		<view class="fixed b-0 r-0 l-0 " :style="{'background-color': store.tmStore.dark?'#fff': '#25262E' }">

			<tm-sheet :round="0" :shadow="2" :margin="[0,0]" :padding="[0,0]">
				<view class="flex flex-row-center-between">
					<view class="flex flex-col ml-40">
						<view class="flex  flex-col-bottom-center ">
							<tm-text :font-size="22" _class="text-weight-b" label="¥"></tm-text>
							<tm-text class="ml-10" :font-size="38" _class="text-weight-b" label="999">
							</tm-text>
						</view>
					</view>
					<view class="mr-50">
						<tm-image :margin="[0, 20]" :padding="[0,0]" :round="4" :width="200" :height="60"
							model="aspectFill" :src="ljgm" @click="placeOrder">
						</tm-image>
					</view>
				</view>
			</tm-sheet>
		</view>

		<tm-modal :height="350" :border="0" text okColor="black" okText="购买" cancelColor="white" linear="bottom"
			title="请输入交易密码" v-model:show="showWin" @ok="submit">
			<view class="flex flex-center">
				<tm-text :font-size="22" _class="text-weight-s" label="米利恩·夏亚    高级法师    等级: 80"></tm-text>

			</view>
			<tm-input :margin="[0,34]" password placeholder="请输入交易密码" v-model="pwd"></tm-input>
		</tm-modal>
	</tm-app>
</template>


<script setup>
	import { Role } from "@/api/api.ts"
	import { onLoad } from "@dcloudio/uni-app";
	import { onBeforeMount, onMounted, reactive, ref } from 'vue';
	import detailsBg from "@/static/role/detailsBg.png"
	import ljgm from "@/static/role/ljgm.png"

	import { useTmpiniaStore } from '@/tmui/tool/lib/tmpinia';
	const store = useTmpiniaStore();
	const checkboxlist = ref(['05'])
	const checkboxlist1 = ref(['00'])
	const pwd = ref('')
	const showWin = ref(false)
	onLoad((context) => {
		console.log("接收参数", context.id);
	})
	// 立即购买
	const placeOrder = () => {
		showWin.value = true
	}
	// 购买
	const submit = () => {
		console.log("购买", pwd.value);
	}
</script>
<style>
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
