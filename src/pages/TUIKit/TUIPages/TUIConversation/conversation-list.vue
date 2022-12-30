<template>


	<view class="TUI-conversation-list" @click="dialogID = ''">
		<view v-for="(item, index) in conversationList" :key="index">
			<view class="TUI-conversation-item" :class="[
          dialogID === item.conversationID && 'selected',
          item.isPinned && 'pinned', 
        ]" @longpress="handleItemLongpress(item)">
				<tm-slide-switch v-model:openStatus="openStatus" @update:open-status="Status" :width="750" :height="120"
					:action="action" @action-click="aa(item,i)">
					<tm-cell showAvatar bottomBorder :label="handleItemMessage(item.lastMessage)" :margin="[0, 0]"
						:titleFontSize="30" :title="handleItemName(item)" @click="handleGotoItem(item)">
						<template v-slot:right>
							<view class="flex flex-col">
								<tm-text :fontSize="22" color="grey" :label="handleItemTime(item.lastMessage.lastTime)">
								</tm-text>
								<tm-icon :fontSize="34" v-if="item.messageRemindType === 'AcceptNotNotify'"
									name="tmicon-bell"></tm-icon>
							</view>
						</template>
						<template v-slot:avatar>
							<view class="flex flex-row">
								<tm-badge :count="item.unreadCount" color="red">
									<tm-avatar color="green" :size="82" :round="2" :margin="[10,0]"
										:img="handleItemAvator(item)"></tm-avatar>
								</tm-badge>
							</view>
						</template>
					</tm-cell>
				</tm-slide-switch>
				<view class="dialog-box dialog-item" v-if="item.conversationID === dialogID">
					<view class="conversation-options" @click.stop="handleConversation('delete', dialogID)">删除会话</view>
					<view class="conversation-options" v-if="!item.isPinned"
						@tap.stop="handleConversation('ispinned', dialogID)">置顶会话</view>
					<view class="conversation-options" v-if="item.isPinned"
						@click.stop="handleConversation('dispinned', dialogID)">取消置顶</view>
					<view class="conversation-options" v-if="
              item.messageRemindType === '' ||
              item.messageRemindType === 'AcceptAndNotify'
            " @click.stop="handleConversation('mute', dialogID)">消息免打扰</view>
					<view class="conversation-options" v-if="item.messageRemindType === 'AcceptNotNotify'"
						@click.stop="handleConversation('notMute', dialogID)">取消免打扰</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
	import { nextTick } from "process";
import { defineComponent, reactive, toRefs, watchEffect, ref } from "vue";
	import { caculateTimeago } from "../../utils/date";
	const TUIConversationList = defineComponent({
		props: {
			conversationList: {
				type: Array,
				default: () => {
					return [];
				},
			},
			currentID: {
				type: String,
				default: () => {
					return "";
				},
			},
		},

		setup(props: any, ctx: any) {
			const obj = reactive({
				conversationList: [],
				currentID: "",
				isOpened: "none",
				currentConversation: {},
				dialogID: "",
			});
			const openStatus = ref(false)
			const action = ref([
				{ text: "消息免打扰", color: "#3B5CF0", width: 150 },
				{ text: "置顶会话", color: "grey", width: 130 },
				{ text: "删除会话", color: "red", width: 130 },
			])
			const Status = (aa) => {
				openStatus.value = aa
				console.log(aa);
			}
			const aa = (item: any, index: number) => {
				obj.currentConversation = item;
				obj.dialogID = item.conversationID;

				if (item.type === "C2C") {
					obj.currentuserID = item.userProfile.userID;
				} else if (item.type === "GROUP") {
					obj.currentuserID = item.groupProfile.groupID;
				}
				obj.conversationType = item.type;
				if (index === 0) { // 消息免打扰
					handleConversation('mute', item.conversationID)
				} else if (index === 1) { // 置顶会话
					handleConversation('ispinned', item.conversationID)
				} else if (index === 2) { // 删除会话
					handleConversation('delete', item.conversationID)
				}
			}
			watchEffect(() => {
				obj.conversationList = props.conversationList;
				obj.currentID = props.currentID;
			});

			// 处理头像
			const handleItemAvator = (item: any) => {
				let avatar = "";
				switch (item.type) {
					case uni.$TIM.TYPES.CONV_C2C:
						avatar =
							item?.userProfile?.avatar ||
							"https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png";
						break;
					case uni.$TIM.TYPES.CONV_GROUP:
						avatar =
							item?.groupProfile?.avatar ||
							"https://web.sdk.qcloud.com/component/TUIKit/assets/group_avatar.png";
						break;
					case uni.$TIM.TYPES.CONV_SYSTEM:
						avatar =
							item?.groupProfile?.avatar ||
							"https://web.sdk.qcloud.com/component/TUIKit/assets/group_avatar.png";
						break;
				}
				return avatar;
			};
			// 处理昵称
			const handleItemName = (item: any) => {
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
			// 处理时间
			const handleItemTime = (time: number) => {
				if (time > 0) {
					return caculateTimeago(time * 1000);
				}
				return "";
			};
			// 处理lastMessage
			const handleItemMessage = (message: any) => {
				switch (message.type) {
					case uni.$TIM.TYPES.MSG_TEXT:
						return message.payload.text;
					default:
						return message.messageForShow;
				}
			};

			const handleGotoItem = (item: any) => {
				ctx.emit("handleGotoItem", item);
			};

			const handleItemLongpress = (item: any) => {
				obj.currentConversation = item;
				obj.dialogID = item.conversationID;
				if (item.type === "C2C") {
					obj.currentuserID = item.userProfile.userID;
				} else if (item.type === "GROUP") {
					obj.currentuserID = item.groupProfile.groupID;
				}
				obj.conversationType = item.type;
			};
			// todo
			const handlerIsOpened = (item: any) => {
				if (item.conversationID === obj.doalogID) {
					return "right";
				} else {
					return "none";
				}
			};

			// 删除会话,后续TODO,置顶聊天,消息免打扰
			const handleConversation = (type: string, id: string) => {
				switch (type) {
					case "delete":
						uni.$TUIKit.TUIConversationServer.deleteConversation(
							obj.dialogID
						).then((imResponse: any) => {
							const { conversationID } = imResponse.data;
						});
						obj.dialogID = "";
						break;
					case "ispinned":
						if (type === "ispinned") {
							const options: any = {
								conversationID: obj.dialogID,
								isPinned: true,
							};
							uni.$TUIKit.TUIConversationServer.pinConversation(options).then(
								(imResponse: any) => {
									console.log(imResponse);
								}
							);
						}
						obj.dialogID = "";
						break;
					case "dispinned":
						if (type === "dispinned") {
							const options: any = {
								conversationID: obj.dialogID,
								isPinned: false,
							};
							uni.$TUIKit.TUIConversationServer.pinConversation(options).then(
								(imResponse: any) => {}
							);
						}
						obj.dialogID = "";
						break;
					case "mute":
						if (type === "mute" && obj.conversationType === "C2C") {
							const options: any = {
								userIDList: [obj.currentuserID],
								messageRemindType: uni.$TIM.TYPES.MSG_REMIND_ACPT_NOT_NOTE,
							};
							uni.$TUIKit.TUIConversationServer.muteConversation(options).then(
								(imResponse: any) => {
									console.log(imResponse);
								}
							);
						} else if (type === "mute" && obj.conversationType === "GROUP") {
							const options: any = {
								groupID: obj.currentuserID,
								messageRemindType: uni.$TIM.TYPES.MSG_REMIND_ACPT_NOT_NOTE,
							};
							uni.$TUIKit.TUIConversationServer.muteConversation(options).then(
								(imResponse: any) => {
									console.log(imResponse);
								}
							);
						}
						obj.dialogID = "";
						break;
					case "notMute":
						if (type === "notMute" && obj.conversationType === "C2C") {
							const options: any = {
								userIDList: [obj.currentuserID],
								messageRemindType: uni.$TIM.TYPES.MSG_REMIND_ACPT_AND_NOTE,
							};
							uni.$TUIKit.TUIConversationServer.muteConversation(options).then(
								(imResponse: any) => {
									console.log(imResponse);
								}
							);
						} else if (type === "notMute" && obj.conversationType === "GROUP") {
							const options: any = {
								groupID: obj.currentuserID,
								messageRemindType: uni.$TIM.TYPES.MSG_REMIND_ACPT_AND_NOTE,
							};
							uni.$TUIKit.TUIConversationServer.muteConversation(options).then(
								(imResponse: any) => {
									console.log(imResponse);
								}
							);
						}
						obj.dialogID = "";
						break;
				}
			};
			return {
				...toRefs(obj),
				handleGotoItem,
				handleItemAvator,
				handleItemTime,
				handleItemMessage,
				handleItemName,
				handleItemLongpress,
				handleConversation,
				handlerIsOpened,
				action,
				aa,
				openStatus,
				Status
			};
		},
	});
	export default TUIConversationList;
</script>
<style lang="scss" scoped>
	.TUI-conversation {
		font-family: PingFangSC-Regular;
		font-weight: 400;
		letter-spacing: 0;

		&-list {
			list-style: none;
		}

		&-item {
			position: relative;
			// padding: 12px;
			display: flex;
			align-items: center;

			.left {
				position: relative;

				.num {
					font-family: PingFangSC-Regular;
					position: absolute;
					display: inline-block;
					right: -8px;
					top: -8px;
					background: red;
					width: 20px;
					height: 20px;
					font-size: 11px;
					text-align: center;
					line-height: 20px;
					border-radius: 50%;
					color: #ffffff;
					font-weight: 600;
					letter-spacing: 0;
				}

				.num-notNotify {
					position: absolute;
					display: inline-block;
					right: -4px;
					top: -4px;
					background: red;
					width: 11px;
					height: 11px;
					border-radius: 50%;
					color: #ffffff;
				}

				.avatar {
					width: 48px;
					height: 48px;
					border-radius: 6px;
				}
			}

			.content {
				flex: 1;
				padding-left: 10px;
				position: relative;

				p {
					width: 200px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-weight: 400;
					font-size: 14px;
					color: #999999;
					letter-spacing: 0;
					line-height: 19px;
					font-family: PingFangSC-Regular;
				}

				.conversation-line {
					position: absolute;
					display: block;
					left: 0;
					right: -12px;
					height: 0.5px;
					transform: scaleY(0.3);
					background: #b0b0b0;
					/* padding-top: 10px; */
					bottom: -15px;
				}

				.name {
					font-weight: 400;
					font-size: 16px;
					color: #000000;
					letter-spacing: 0;
					margin-bottom: 5px;
					font-family: PingFangSC-Regular;
				}

				&-header {
					display: flex;
					justify-content: space-between;
					align-items: center;

					label {
						flex: 1;
						font-size: 14px;
						color: #000000;

						.name {
							width: 110px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}

					.time {
						font-size: 12px;
						color: #b0b0b0;
						line-height: 16px;
						display: inline-block;
						max-width: 75px;
						font-weight: 400;
					}
				}

				&-footer {
					color: #999999;
					line-height: 16px;
					display: flex;

					.message-text {
						margin-left: 4px;
						display: block;
						width: 240px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.item-footer {
					position: absolute;
					right: 0;
					top: 0;
					justify-items: center;
					display: flex;
					flex-direction: column;
					align-items: flex-end;

					.time {
						font-size: 12px;
						color: #b0b0b0;
						line-height: 16px;
						display: inline-block;
						max-width: 75px;
						font-weight: 400;
						margin-bottom: 5px;
					}

					.mute-icon {
						display: block;
						width: 20px;
						height: 20px;
					}
				}
			}

			.dialog-box {
				position: absolute;
				z-index: 5;
				background: #fff;
				border: 1px solid #dddddd;
				padding: 15px 20px;
				right: 15px;
				top: 30px;

				&-item {
					top: 60px;
					right: 40px;
					box-shadow: 0 11px 20px 0 rgb(0 0 0 / 30%);
					background: #ffffff;
					border: 1px solid #e0e0e0;
					box-shadow: 0 -4px 12px 0 rgb(0 0 0 / 6%);
					border-radius: 8px;
				}

				.conversation-options {
					height: 35px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 14px;
					color: #4f4f4f;
					letter-spacing: 0;
					line-height: 35px;
				}
			}
		}
	}

	.selected {
		background: #edf0f5;
	}

	.pinned {
		background: #eef0f3;
	}
</style>
