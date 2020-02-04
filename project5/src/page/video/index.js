import React, { Component, Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import styles from './styles.module.scss';
import net from '../../net/index.js';
import { Tabs, WhiteSpace, PullToRefresh, Toast } from 'antd-mobile';
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			GetCategoryList: [],
			data: [],
			down: false,
			height: document.documentElement.clientHeight - 50,
		}
	}

	componentDidMount() {
		this.getDate();
		this.getVideoData();
	}

	getDate = () => {
		net.GET(`/media/video/GetCategoryList`, 'get').then(res => {
			let defaultTabs = {
				name: '全部',
				_id: ''
			};
			res.data.unshift(defaultTabs);
			this.setState({
				GetCategoryList: res.data
			})
		}).catch(res => {
			Toast.info('服务器返回故障', 1);
		})
	}

	getVideoData = (id) => {
		if (id == undefined || id == null) {
			id = ''
		}
		net.GET(`/media/video/GetList?category_id=${id}`, 'get').then(res => {
			this.setState({
				data: res.data
			})
		}).catch(res => {
			Toast.info('服务器返回故障', 1);
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

	onChange = (e) => {
		this.getVideoData(e._id)
	}

	renderContent = (data) => (
		<div className={styles.infoList}>
			<ul>
				{data.map(item => (
					<li className={styles.videoLi}>
						<p className={styles.liTitle}>{item.title}</p>
						<div><video src={item.video_url} className={styles.video} controls x5-video-player-type="h5"></video></div>
						<p className={styles.liTime}>{this.countDate(item.create_time)}</p>
					</li>
				))}
			</ul>
		</div>
	);

	render() {
		const { GetCategoryList, data } = this.state;
		const tabs = [
		];

		GetCategoryList.map(item => {
			item.title = item.name;
			tabs.push(item);
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
					<Tabs
						tabs={tabs}
						tabBarUnderlineStyle={{ height: '3px', border: 'none', background: '#f60' }}
						onChange={(e) => { this.onChange(e) }}
						renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
						tabBarActiveTextColor="#000000"
						tabBarInactiveTextColor="#999999"
					>
						{this.renderContent(data)}
					</Tabs>
				</PullToRefresh>
			</div>
		);
	}
}

export default App;
