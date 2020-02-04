import React, { Component, Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import styles from './styles.module.scss';
import net from '../../net/index.js';
import { Tabs, Toast, List } from 'antd-mobile';


class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			GetCategoryList: [],
			data: [],
			open: false,
			pagination: {
				limit: 20,
				latest_id: ""
			}
		}
	}

	componentDidMount() {
		this.getData();
		this.getPictureData();
	}

	getData = () => {
		// media/video/GetCategoryList
		net.GET(`/media/album/GetCategoryList`, 'get').then(res => {
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

	getPictureData = (id) => {
		const { pagination } = this.state;
		if (id == undefined || id == null) {
			id = ""
		}
		net.GET(`/media/album/GetList?category_id=${id}&limit=${pagination.limit}&latest_id=${pagination.latest_id}`, 'get').then(res => {
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
		this.getPictureData(e._id)
	}

	open = (id) => {
		this.props.history.push(`picDetail/${id}`);
	}

	renderContent = (data) => (
		<div className={styles.infoList}>
			<ul>
				{data.map(item => (
					<li className={styles.picLi} onClick={() => { this.open(item._id) }}>
						<img src={item.cover} alt="" className={styles.cover} />
						<p className={styles.picTitle}>{item.name}</p>
						<p className={styles.picCount}>共{item.number}张照片</p>
					</li>
				))
				}
			</ul>
		</div>
	);

	render() {
		const { GetCategoryList, data, open } = this.state;
		let tabs = [];
		GetCategoryList.map(item => {
			item.title = item.name;
			tabs.push(item);
		})
		return (
			<div className={styles.index_warp}>
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
			</div>
		);
	}
}

export default App;
