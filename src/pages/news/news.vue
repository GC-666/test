<template>
	<tm-app>

		<tm-sheet :margin="[0,0]" :padding="[0,statusBarHeight]">
		</tm-sheet>
		<tm-sheet :margin="[0,0]">
			<view class="flex flex-center">
				<tm-dropdown :width="220" :list="data.chatList" rangKey="content" @click="handleContentClick1">
					<tm-icon :fontSize="40" name="tmicon-plus-circle mr-20"></tm-icon>
				</tm-dropdown>
			</view>
		</tm-sheet>
		<tm-slide-switch :width="750" :height="120" :action="action" @action-click="aa">
			<tm-cell showAvatar bottomBorder label="2222" :margin="[0, 0]" :titleFontSize="30" title="头像 Avatar">
				<template v-slot:right>
					<tm-text :fontSize="22" color="grey" label="10分钟前"></tm-text>
				</template>
				<template v-slot:avatar>
					<view class="flex flex-row">
						<tm-badge count="5" color="red" >
							<tm-avatar color="green" :size="82" :round="2"  :margin="[10,0]"
								img="https://picsum.photos/200/300"></tm-avatar>
						</tm-badge>
					</view>
				</template>
			</tm-cell>
		</tm-slide-switch>
		<TUIConversationList :currentID="data.currrentConversationID" :conversationList="data.conversationList"
			@handleGotoItem="handleCurrrentConversation" />
	</tm-app>
</template>

<script setup>
	import TUIConversationList from "@/pages/TUIKit/TUIPages/TUIConversation/conversation-list";
	import Dialog from "@/pages/TUIKit/TUIPages/TUIConversation/components/dialog.vue";
	import store from "@/pages/TUIKit/TUICore/store";
	import { TUIConversationServer, TUIProfileServer } from "@/pages/TUIKit/TUICore/server";
	import { reactive, computed, onMounted, ref } from "vue";
	import { onNavigationBarButtonTap, onShow } from "@dcloudio/uni-app";
	const timStore = store.state.timStore;
	const action = ref([
		{ text: "消息免打扰", color: "#3B5CF0", width: 150 },
		{ text: "置顶会话", color: "grey", width: 130 },
		{ text: "删除会话", color: "red", width: 130 },
	])
	const aa = (i, w) => {
		console.log(i, w);
	}
	uni.$TUIKit.TUIConversationServer = new TUIConversationServer();
	uni.$TUIKit.TUIProfileServer = new TUIProfileServer();
	const data = reactive({
		conversationList: computed(() => timStore.conversationList),
		currrentConversationID: "",
		open: false,
		searchUserID: "",
		selectedList: [],
		searchUserList: [],
		step: 1,
		showDialog: false,
		item: {
			flow: "out",
			status: "success",
		},
		styleConfig: {
			width: "150px",
			// height: '160px',
			padding: "16px 16px 0px",
			top: "8px",
			right: "8px",
		},
		chatList: [{
				imgType: "SINGLE",
				type: uni.$TIM.TYPES.CONV_C2C,
				id: 1,
				content: "发起会话",
			},
			{
				imgType: "GROUP",
				type: uni.$TIM.TYPES.GRP_WORK,
				id: 1,
				content: "工作群",
			},
			{
				imgType: "GROUP",
				type: uni.$TIM.TYPES.GRP_PUBLIC,
				id: 2,
				content: "社交群",
			},
			{
				imgType: "GROUP",
				type: uni.$TIM.TYPES.GRP_MEETING,
				id: 3,
				content: "会议群",
			},
		],
	});
	onNavigationBarButtonTap(() => {
		data.showDialog = !data.showDialog;
	});
	onShow(() => {
		store.commit("timStore/setConversationID", "");
	});
	// 切换当前会话
	const handleCurrrentConversation = (value) => {
		data.currrentConversationID = value.conversationID;
		store.commit("timStore/setConversationID", value.conversationID);
		//uni.$TUIKit.TUIChatServer.updateStore(value.conversationID)
		uni.navigateTo({
			url: `/pages/TUIKit/TUIPages/TUIChat/index?conversationName=${handleItemName(value)}`,
		});
		uni.$TUIKit.TUIConversationServer.setMessageRead(value.conversationID);
		const curConversation = data.conversationList.filter((item) => {
			return item.conversationID === value.conversationID;
		});
		store.commit("timStore/setConversation", curConversation);
		uni.$TUIKit.TUIConversationServer.getConversationProfile(
			value.conversationID
		).then((res) => {
			// 通知 TUIChat 关闭当前会话
			store.commit("timStore/setConversation", res.data.conversation);
			// uni.$TUIKit.getStore()['TUIChat'].conversation = res.data.conversation;
		});
	};
	const handleShow = () => {
		data.showDialog = true;
	};
	// dialog 内部有效区域点击
	const handleContentClick = (item) => {
		data.showDialog = false;
		console.log(item);
		uni.navigateTo({
			url: `/pages/TUIKit/TUIPages/TUIConversation/create?title=${item.content}&type=${item.type}`
		})
	};
	// dialog 内部有效区域点击
	const handleContentClick1 = (data) => {
		console.log(data.data);
		console.log(data.index);
		data.showDialog = false;
		uni.navigateTo({
			url: `/pages/TUIKit/TUIPages/TUIConversation/create?title=${data.data.content}&type=${data.data.type}`
		})
	};
	// 关闭 dialog
	const handleClose = () => {
		data.showDialog = false;
	};
	const handleItemName = (item) => {
		let name = "";
		switch (item.type) {
			case uni.$TIM.TYPES.CONV_C2C:
				name = item?.userProfile.nick || item?.userProfile?.userID || "";
				break;
			case uni.$TIM.TYPES.CONV_GROUP:
				name = item.groupProfile.name || item?.groupProfile?.groupID || "";
				break;
			case uni.$TIM.TYPES.CONV_SYSTEM:
				name = "系统通知";
				break;
		}
		return name;
	};
</script>

<style>

</style>
