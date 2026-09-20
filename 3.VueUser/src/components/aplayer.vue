<template>
	<div>
		<div class="audioAnimation-box" :class="showType?'audioAnimation-box1':''" v-if="audioList.length"
			style="width: 100%;position: fixed;bottom: 0;left: 0;z-index: 99999;background: #fff;"
			@mouseover="showmouseover">
			<div @click="suoClick"
				style="position: absolute;top: -20px;right: 40%;background: #fff;border-radius: 50% 50% 0 0;font-size: 0;width: 30px;height: 30px;display: flex;justify-content: center;align-items: center;cursor: pointer;">
				<img v-if="suoType" style="width: 24px;height: 24px;" src="../assets/aplayer/suo.png">
				<img v-else style="width: 24px;height: 24px;" src="../assets/aplayer/jiesuo.png">
			</div>
			<div class="aplayer">
				<audio @ended="audioEnd" style="display: none;" :src="audioList[audioIndex].url" controls
					ref="audioPlayer" @play="audioPlay" @pause="audioPause" @timeupdate="audioTimeupdate"></audio>
				<div class="audio_top">
					<div class="audio_top_left">
						<div style="width: 40px;height: 40px;border-radius: 10px;overflow: hidden;margin-right: 20px;">
							<img v-if="audioList[audioIndex].pic" style="width:100%;height: 100%;" :src="audioList[audioIndex].pic">
							<img v-else style="width:100%;height: 100%;" src="../assets/aplayer/music.jpg">
						</div>
						<div class="audio_title">{{audioList[audioIndex].title}}</div> - <div class="audio_singer">
							{{audioList[audioIndex].artist}}
						</div>
					</div>
					<div class="audio_top_right">
						<img v-if="playIndex==1" @click="playIndexClick" src="../assets/aplayer/xunhuan.png" alt=""
							style="width: 24px;height: 24px;margin-right: 20px;cursor: pointer;">
						<img v-if="playIndex==3" @click="playIndexClick" src="../assets/aplayer/danqu.png" alt=""
							style="width: 24px;height: 24px;margin-right: 20px;cursor: pointer;">
						<img v-if="playIndex==2" @click="playIndexClick" src="../assets/aplayer/suiji.png" alt=""
							style="width: 24px;height: 24px;margin-right: 20px;cursor: pointer;">
						<img @click="showAudioListClick" src="../assets/aplayer/list.png" alt=""
							style="width: 24px;height: 24px;cursor: pointer;margin-right: 20px">
						<div class="audio_bottom_right">
							<img style="width: 24px;height: 24px;margin-right: 10px;cursor: pointer;" v-if="value2==0"
								src="../assets/aplayer/volumeNo.png" alt="" @click="volumneClick">
							<img style="width: 24px;height: 24px;margin-right: 10px;cursor: pointer;" v-if="value2>50"
								src="../assets/aplayer/volumeBig.png" alt="" @click="volumneClick">
							<img style="width: 24px;height: 24px;margin-right: 10px;cursor: pointer;"
								v-if="value2>0&&value2<=50" src="../assets/aplayer/volumeSmall.png" alt=""
								@click="volumneClick">
							<el-slider class="volume" :show-tooltip="false" size="small" v-model="value2"
								@change="volumeChange" />
						</div>
					</div>

				</div>
				<div class="audio_center">
					<div class="player_view">
						<img @click="playClick" v-if="!playType" src="../assets/aplayer/bofang.png" alt=""
							style="width: 24px;height: 24px;margin-right: 20px;cursor: pointer;">
						<img @click="playClick" v-if="playType" src="../assets/aplayer/zanting.png" alt=""
							style="width: 24px;height: 24px;margin-right: 20px;cursor: pointer;">
					</div>
					<el-slider v-model="value1" @change="playChange" :show-tooltip="false" />
					<div class="audio_time_view">
						{{nowTime}} / {{allTime}}
					</div>
				</div>
			</div>
		</div>
		<div class="audioList_view" v-if="audioList.length" :class="showAudioList?'audioList_view1':''">
			<div class="audioList" :class="audioIndex==index?'audioListActive':''" v-for="(item,index) in audioList"
				:key="index" @click.stop="audioClick(index)">
				<div class="audioList_left">
					<div class="audioNum">{{index+1}}</div>{{item.title}} - {{item.artist}}
				</div>
				<div class="audioList_right">
					<img @click.stop="audioDelClick(index)" src="../assets/aplayer/shanchu.png"
						style="width: 24px;height: 24px;cursor: pointer;" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		onBeforeUnmount,
		getCurrentInstance,
		nextTick,
		computed,
		watch,
	} from 'vue';
	import {
		useStore
	} from 'vuex';
	const context = getCurrentInstance()?.appContext.config.globalProperties;

	//音乐
	const store = useStore()
	//底部播放器显示定时器
	const showTimer = ref(null)
	//底部播放器是否显示
	const showType = ref(false)
	//底部播放器是否缩回锁定
	const suoType = ref(false)
	//播放器ref
	const audioPlayer = ref(null)
	//是否播放
	const playType = ref(false)
	//播放第几首
	const audioIndex = computed({
		get() {
			return store.state.audioIndex
		},
		set(val) {
			return store.state.audioIndex = val
		}
	})
	//播放列表
	const audioList = computed({
		get() {
			return store.state.audioList
		},
		set(val) {
			return store.state.audioList = val
		}
	})
	const suoClick = () => {
		suoType.value = !suoType.value
		if (showType.value) {
			clearTimeout(showTimer.value)
		} else {
			showmouseover()
		}
	}
	watch(audioIndex, () => {
		showmouseover()
		nextTick(() => {
			audioPlayer.value.play()
		})
	})
	const showmouseover = () => {
		if (suoType.value) {
			return false
		}
		clearTimeout(showTimer.value)
		showType.value = true
		showTimer.value = setTimeout(() => {
			showType.value = false
			showAudioList.value = false
		}, 6000)
	}

	const audioPlay = (e) => {
		value2.value = audioPlayer.value.volume * 100
		playType.value = true
	}
	const audioPause = (e) => {
		playType.value = false
	}
	//播放类型
	const playIndex = ref(1)
	//播放时间
	const allTime = ref('00:00')
	const nowTime = ref('00:00')
	const audioTimeupdate = (e) => {
		if (audioPlayer.value) {
			allTime.value = getTimeStr(audioPlayer.value.duration * 1000)
			nowTime.value = getTimeStr(audioPlayer.value.currentTime * 1000)
			let a = audioPlayer.value.currentTime / audioPlayer.value.duration * 100
			value1.value = a
		}
	}
	//播放进度
	const value1 = ref(0)
	const playChange = (e) => {
		let a = e / 100 * audioPlayer.value.duration
		audioPlayer.value.currentTime = a
		audioPlayer.value.play()
	}
	const getTimeStr = (game_over_timestamp) => {
		if (game_over_timestamp == 0)
			return "00:00";
		var date = new Date(parseInt(game_over_timestamp));
		var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes();
		var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds();

		return minutes + ":" + seconds
	}
	//音量
	const value2 = ref(0)
	const volumeChange = (e) => {
		audioPlayer.value.volume = e / 100
	}
	const volumneClick = () => {
		if (value2.value > 0) {
			value2.value = 0
		} else {
			value2.value = 100
		}
		audioPlayer.value.volume = value2.value / 100
	}
	//播放与暂停
	const playClick = () => {
		if (playType.value) {
			audioPlayer.value.pause()
		} else {
			audioPlayer.value.play()
		}
	}
	const audioEnd = () => {
		if (playIndex.value == 1) {
			if (audioIndex.value == audioList.value.length - 1) {
				store.dispatch('setIndex', 0)
			} else {
				store.dispatch('setIndex', Number(audioIndex.value) + 1)
			}
		} else if (playIndex.value == 2) {
			store.dispatch('setIndex', random(0, audioList.value.length))
		} else if (playIndex.value == 3) {

		}
		audioPlayer.value.play()
	}
	const random = (min, max) => {

		return Math.floor(Math.random() * (max - min)) + min;

	}
	//播放类型切换
	const playIndexClick = () => {
		if (playIndex.value == 3) {
			playIndex.value = 1
			return false
		}
		playIndex.value++
	}
	//播放列表
	const showAudioList = ref(false)
	const showAudioListClick = () => {
		showAudioList.value = !showAudioList.value
	}
	//切歌
	const audioClick = (index) => {
		store.dispatch('setIndex', index)
	}
	const audioDelClick = (index) => {
		store.dispatch('delAudio', index)
	}
</script>

<style lang="scss">
	//音乐
	.audioAnimation-box {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 100px, 0px);
		-webkit-perspective: 1000px;
		perspective: 1000px;
		transition: 0.3s;
		width: 100%;
		padding: 10px 30px 10px;
		box-sizing: border-box;
		height: 100px;
		z-index: 1002;
		display: flex;
		flex-direction: column;
		box-shadow: 0 -4px 12px rgba(0,0,0,.1);
	}

	.audioAnimation-box1 {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0, 0px) !important;
	}

	.audio_top {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.audio_top_left {
			display: flex;
			align-items: center;
			line-height: 1;

			.audio_title {
				font-size: 17px;
				padding-right: 6px;
			}

			.audio_singer {
				font-size: 13px;
				padding-left: 6px;
				color: #000;
			}
		}

		.audio_top_right {
			display: flex;
			align-items: center;
		}

		.audio_bottom_right {
			display: flex;
			align-items: center;
			width: 100px;

			.volume {
				.el-slider__bar {
					background: #666 !important;
				}

				.el-slider__button {
					border-color: #666;
				}
			}
		}

	}


	.audio_center {
		display: flex;
		align-items: center;
		padding: 10px 0;

		.audio_time_view {
			color: #333;
			font-size: 13px;
			padding-left: 20px;
			width: 100px;
		}
	}

	.audio_bottom {
		width: 100%;
		display: flex;
		justify-content: flex-end;


	}

	.audioList_view {
		width: 100%;
		max-height: 200px;
		color: #ccc;
		position: fixed;
		transform: translate3d(0px, 300px, 0px);
		bottom: 100px;
		left: 0;
		padding: 10px;
		transition: 0.3s;
		overflow-y: scroll;
		box-sizing: border-box;
		background: #28292d;
		z-index: 999;
		display: flex;
		flex-direction: column;

		.audioList {
			background: #28292d;
			display: flex;
			width: 100%;
			padding: 6px 20px;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			cursor: pointer;
		}

		.audioList_left {
			display: flex;
			align-items: center;
		}

		.audioNum {
			padding: 0 20px 0 0;

		}

		.audioListActive {
			background: #2d2d35;
			color: #329bf1;
		}
	}

	.audioList_view1 {
		transform: translate3d(0px, 0, 0px) !important;
	}

	::-webkit-scrollbar {
		width: 0 !important;
	}

	::-webkit-scrollbar {
		width: 0 !important;
		height: 0;
	}
</style>