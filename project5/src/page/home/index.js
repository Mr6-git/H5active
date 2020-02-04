import React, { Component, Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import styles from './styles.module.scss';
import net from '../../net/index.js';
import { PullToRefresh } from 'antd-mobile';
import { from } from 'rxjs';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			baseUrl: '',
			videoList: [],
			infoList: [],
			allData: [],
			down: false,
			height: document.documentElement.clientHeight - 50,
			data: [],
			refreshing: false,
			pagination: {
				limit: 20,
				latest_id: 0
			}
		}
	}

	componentDidMount() {
		this.getVideoData();
	}

	getVideoData = () => {
		const { pagination } = this.state;
		net.GET(`/media/video/GetList?limit=3`, 'get').then(res => {
			res.data.map((item, index) => {
				this.state.videoList.push(item);
			})
			this.setState({
				videoList: this.state.videoList
			}, () => {
				let len = this.state.videoList.length
				this.getInfoData(len);
			})
		})
	}

	spliceDate = (videoList, infoList) => {
		infoList.map((item, index) => {		// 用来判断新闻内容是否置顶
			if (item.is_top == 1) {
				infoList.splice(index, 1);
				infoList.unshift(item);
			}
		})
		for (let i = 0; i < videoList.length; i++) {	//拼接新闻列表数据和视频列表数据
			infoList.splice(2 * (i + 1) + i, 0, videoList[i]);
		}
		this.setState({
			allData: infoList
		})
	}

	getInfoData = (num) => {
		net.GET(`/media/article/GetList?has_link=1&assort=2`, 'get').then(res => {
			this.setState({
				infoList: res.data
			}, () => {
				this.spliceDate(this.state.videoList, this.state.infoList)
			})
		})
	}

	countDate = (time) => {
		let date = new Date(time * 1000),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			Y = date.getFullYear() + '-',
			M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
			D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ',
			h = date.getHours() + ':',
			m = date.getMinutes() + ':',
			s = date.getSeconds();
		return Y + M + D + h + m + s;
	}

	onRefresh = () => {
		this.setState({ refreshing: true });
		setTimeout(() => {
			this.setState({ refreshing: false });
		}, 1000);
	}

	render() {
		const { videoList, infoList, allData } = this.state;
		let hasTopData = [];
		allData.map(item => {
			if (item.video_url == '' && item.images.length <= 1 && item.is_top == 1) {
				hasTopData.push(item)
			}
		})
		return (
			<div className={styles.index_warp}>
				<PullToRefresh
					damping={80}
					ref={el => this.ptr = el}
					style={{
						height: this.state.height,
						overflow: 'auto',
					}}
					indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
					direction={this.state.down ? 'down' : 'up'}
					refreshing={this.state.refreshing}
					onRefresh={() => {
						this.setState({ refreshing: true });
						setTimeout(() => {
							this.setState({ refreshing: false });
						}, 1000);
					}}
				>
					<div className={styles.topPic}></div>
					<div className={styles.infoList}>
						<ul>
							{allData.map((item, index) => (
								item.video_url != '' ? (
									<li className={styles.videoLi}>
										<p className={styles.liTitle}>{item.title}</p>
										<div><video src={item.video_url} className={styles.video} controls x5-video-player-type="h5"></video></div>
										<p className={styles.liTime}>{this.countDate(item.create_time)}</p>
									</li>
								) : (
										item.images.length > 1 ? (
											<li className={styles.picLi}>
												<p className={styles.liTitle}>{item.title}</p>
												<img src={item.images[0]} alt="" className={styles.picList} />
												<img src={item.images[1]} alt="" className={styles.picList} />
												<img src={item.images[2]} alt="" className={styles.picList} />
												<p className={styles.liTime}>{this.countDate(item.create_time)}</p>
											</li>
										) : (
												item.is_top == 1 ? (
													<li className={styles.stickLi}>
														<a href="">
															<p className={styles.liTitle}>{item.title}</p>
															<div className={styles.liTime}><span style={{ color: 'rgb(227, 74, 68)', marginRight: '15px' }}>置顶</span>{this.countDate(item.create_time)}</div>
														</a>
													</li>
												) : (
														<li className={styles.infoLi}>
															<a href={item.url}>
																<p className={styles.liTitle}>{item.title}</p>
																<img src={item.images[0]} alt="" className={styles.liPic} />
																<div className={styles.liTime}>{this.countDate(item.create_time)}</div>
															</a>
														</li>
													)
											)
									)
							))
							}
						</ul>
					</div>
				</PullToRefresh>
			</div>
		);
	}
}

export default App;
