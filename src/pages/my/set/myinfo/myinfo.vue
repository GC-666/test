<template>
	<tm-app>
		<tm-navbar title="个人信息" :height="44" :shadow="0">
		</tm-navbar>
		<view class="mt-20">
			<tm-sheet :round="0" :margin="[0,0]" :padding="[20,10]" :shadow="0">
				<view class="flex flex-row-center-between">
					<tm-text :font-size="30" _class="text-weight-b" label="头像"></tm-text>
					<tm-avatar :round="12" :img="headimg" @click="avatarShow = true"></tm-avatar>
				</view>
			</tm-sheet>
			<tm-divider color="grey" :margin="[0,1]"></tm-divider>
			<tm-sheet :round="0" :margin="[0,0]" :padding="[20,30]" :shadow="0">
				<view class="flex flex-row-center-between">
					<tm-text :font-size="30" _class="text-weight-b" label="昵称"></tm-text>
					<view class="flex flex-between" @click="nicknameShow= true">
						<tm-text :font-size="30" _class="text-weight-n mr-20" :label="user.nickname"></tm-text>
						<tm-icon :font-size="25" name="tmicon-angle-right"></tm-icon>
					</view>

				</view>
			</tm-sheet>
			<tm-divider color="grey" :margin="[0,1]"></tm-divider>
			<tm-sheet :round="0" :margin="[0,0]" :padding="[20,30]" :shadow="0">
				<view class="flex flex-row-center-between">
					<tm-text :font-size="30" _class="text-weight-b" label="手机号"></tm-text>
					<tm-text :font-size="30" _class="text-weight-n" :label="user.phone1"></tm-text>
				</view>
			</tm-sheet>

			<tm-divider color="grey" :margin="[0,1]"></tm-divider>
			<tm-sheet :round="0" :margin="[0,0]" :padding="[20,30]" :shadow="0">
				<view class="flex flex-row-center-between" @click="copy(user.address)">
					<tm-text :font-size="30" _class="text-weight-b" label="区块链地址"></tm-text>
					<tm-text _class="text-overflow" _style="width: 400rpx;text-overflow: ellipsis;" :font-size="30"
						:label="user.address"></tm-text>
				</view>
			</tm-sheet>
			<tm-divider color="grey" :margin="[0,1]"></tm-divider>
			<tm-sheet :round="0" :margin="[0,0]" :padding="[20,30]" :shadow="0">
				<view class="flex flex-row-center-between">
					<tm-text :font-size="30" _class="text-weight-b" label="个性签名"></tm-text>
					<view class="flex flex-between" @click="autographShow = true">
						<tm-text _class="text-overflow text-weight-n mr-20"
							_style="width: 200rpx;text-overflow: ellipsis;" :font-size="30" :label="user.autograph">
						</tm-text>
						<tm-icon :font-size="25" name="tmicon-angle-right"></tm-icon>
					</view>
				</view>
			</tm-sheet>
		</view>

		<tm-sheet :round="0" :margin="[0,20]" :padding="[20,30]" :shadow="0">
			<view class="flex flex-row-center-between" @click="gonav('pages/my/set/name/name?isRealName='+user.isRealName)">
				<tm-text :font-size="30" _class="text-weight-b" label="实名认证"></tm-text>
				<tm-icon :font-size="25" name="tmicon-angle-right"></tm-icon>
			</view>
		</tm-sheet>

		<tm-drawer :round="4" :height="470" placement="bottom" hideCancel closeable v-model:show="avatarShow">
			<tm-sheet :round="0" :margin="[0,0]" :padding="[0,20]" :shadow="0">
				<view class="flex flex-center mb-20">
					<tm-text :font-size="30" _class="text-weight-b" label="查看头像" @click="avatarClick"></tm-text>
				</view>
				<tm-divider color="grey" :margin="[0,1]"></tm-divider>
				<view class="flex flex-center mt-30 mb-20">
					<tm-text :font-size="30" _class="text-weight-b" label="从相册中选择" @click="albumClick()"></tm-text>
				</view>
				<tm-divider color="grey" :margin="[0,1]"></tm-divider>
				<view class="flex flex-center mt-30 mb-5">
					<tm-text :font-size="30" _class="text-weight-b" label="拍照" @click="albumClick1()"></tm-text>
				</view>
				<tm-divider color="grey" :border="10"></tm-divider>
				<view class="flex flex-center mt-10">
					<tm-text :font-size="30" _class="text-weight-b" label="取消" @click="avatarShow = false"></tm-text>
				</view>

			</tm-sheet>

		</tm-drawer>
		<!-- 修改昵称 -->
		<tm-modal :height="400" splitBtn title="修改昵称" v-model:show="nicknameShow" :beforeClose="nicknameClose"
			@ok="updateName">
			<view class="flex flex-center">
				<tm-text :font-size="35" _class="text-weight-b" :label="`原昵称：${user.nickname}`"></tm-text>
			</view>
			<view class="mt-30">
				<tm-input v-model="nickname" placeholder="请输入昵称"></tm-input>
			</view>
		</tm-modal>
		<!-- 修改签名 -->
		<tm-modal :height="550" splitBtn title="修改签名" v-model:show="autographShow" :beforeClose="autographClose"
			@ok="updateAutograph">
			<tm-input v-model="user.autograph" confirm-hold placeholder="请输入签名" confirm-type="换行" :border="1"
				color="grey-5" :height="300" type="textarea"></tm-input>
		</tm-modal>
	</tm-app>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { onBeforeMount, ref } from 'vue';
	import { My } from "@/api/api.ts"
	const user = ref({});
	const avatarShow = ref(false)
	onBeforeMount(() => {
		personal()
	})

	// 复制区块链地址
	const copy = (data) => {
		uni.setClipboardData({
			data: data,
			success: function() {
				uni.showToast({
					title: "复制成功",
					icon: "none"
				})
			}
		})
	}
	const avatarClick = () => {
		console.log(user.value.avatar);
		// uni.$tm.u.preview(user.value.avatar)
		uni.previewImage({ urls: [user.value.avatar] })
	}
	const headimg = ref('')
	const headimg1 = ref('')
	const baseUrl =
		import.meta.env.VITE_APP_BASE_API
	const subimg = () => {
		My.updateUserInfo({ avatar: headimg1.value }).then(res => {
			personal()
		})
	}
	/* 修改昵称签名 */
	const nickname = ref('')
	const autograph = ref('')
	const nicknameShow = ref(false)
	const autographShow = ref(false)
	const nicknameClose = () => {
		if (nickname.value === '') {
			uni.showToast({
				title: "请输入昵称",
				icon: 'none'
			})
			return false;
		} else {
			return true;
		}
	}
	const autographClose = () => {
		if (user.value.autograph === '') {
			uni.showToast({
				title: "请输入签名",
				icon: 'none'
			})
			return false;
		} else {
			autograph.value = user.value.autograph
			return true;
		}
	}
	const updateName = () => {
		My.updateUserInfo({ nickname: nickname.value }).then(res => {
			personal()
		})
	}
	const updateAutograph = () => {
		My.updateUserInfo({ autograph: autograph.value }).then(res => {
			personal()
		})
	}
	/* 修改昵称 结束 */
	// 从相册中选择  拍照
	const albumClick = () => {
		// 1 相册  2 拍照
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: (res) => {

				let imgPath = res.tempFilePaths[0]
				headimg.value = res.tempFilePaths[0]
				uni.showLoading({})
				uni.uploadFile({
					url: baseUrl + '/upload',
					method: 'POST',
					filePath: imgPath,
					name: 'uploadFile',
					success: (res) => {
						if (res.data) {
							let data = JSON.parse(res.data)
							headimg1.value = "/" + data.data
							subimg()
						}
					},
					complete: () => {
						uni.hideLoading()
					},
					fail: (err) => {
						if (err) {
							uni.showToast({
								icon: 'none',
								title: '服务器繁忙' //'服务器繁忙'
							})
						}
					}
				})
			}
		});
	}
	const albumClick1 = () => {
		// 2 拍照
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['camera'], //从相册选择
			success: (res) => {

				let imgPath = res.tempFilePaths[0]
				headimg.value = res.tempFilePaths[0]
				uni.showLoading({})
				uni.uploadFile({
					url: baseUrl + '/upload',
					method: 'POST',
					filePath: imgPath,
					name: 'uploadFile',
					success: (res) => {
						if (res.data) {
							let data = JSON.parse(res.data)
							headimg1.value = "/" + data.data
							subimg()
						}
					},
					complete: () => {
						uni.hideLoading()
					},
					fail: (err) => {
						if (err) {
							uni.showToast({
								icon: 'none',
								title: '服务器繁忙' //'服务器繁忙'
							})
						}
					}
				})
			}
		});
	}
	// 获取个人信息
	const personal = () => {
		My.personal().then(res => {
			user.value = res;
			headimg.value = res.avatar
		})
	}
</script>

<style>
</style>
