import React, { Component, Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { TabBar } from 'antd-mobile';
import styles from './styles.module.scss';
import home from '../resource/images/home.png';
import home_check from '../resource/images/home_check.png';
import news from '../resource/images/news.png';
import news_check from '../resource/images/news_check.png';
import pic from '../resource/images/pic.png';
import pic_check from '../resource/images/pic_check.png';
import video from '../resource/images/video.png';
import video_check from '../resource/images/video_check.png';
import ticket from '../resource/images/ticket.png';
import ticket_check from '../resource/images/ticket_check.png';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 'home',
			defaultUrl: '/home',
			hidden: false,
			fullScreen: false,
		}
	}

	componentDidMount() {
		this.props.history.push(this.state.defaultUrl);
	}

	renderContent(type) {
		console.log(type)
		switch (type) {
			case 'home' : this.props.history.push('/home');
			case 'news' : this.props.history.push('/news');
		}
	}

	render() {
		return (
			<div className={styles.TabBar}>
				<TabBar
					unselectedTintColor="#666666"
					tintColor="#f60"
					barTintColor="white"
					hidden={this.state.hidden}
					tabBarPosition="bottom"
				>
					<TabBar.Item
						title="首页"
						key="home"
						icon={<img src={home} alt="" className={styles.tabPic}/>}
						selectedIcon={<img src={home_check} alt="" className={styles.tabPic}/>}
						selected={this.state.selectedTab === 'home'}
						onPress={() => {
							this.props.history.push('/home')
							this.setState({
								selectedTab: 'home',
							});
						}}
						data-seed="logId"
					>
					</TabBar.Item>
					<TabBar.Item
						icon={<img src={news} alt="" className={styles.tabPic}/>}
						selectedIcon={<img src={news_check} alt="" className={styles.tabPic}/>}
						title="新闻"
						key="news"
						selected={this.state.selectedTab === 'news'}
						onPress={() => {
							this.props.history.push('/news')
							this.setState({
								selectedTab: 'news',
							});
						}}
						data-seed="logId1"
					>
					</TabBar.Item>
					<TabBar.Item
						icon={<img src={video} alt="" className={styles.tabPic}/>}
						selectedIcon={<img src={video_check} alt="" className={styles.tabPic}/>}
						title="视频"
						key="video"
						selected={this.state.selectedTab === 'video'}
						onPress={() => {
							this.props.history.push('/video')
							this.setState({
								selectedTab: 'video',
							});
						}}
						data-seed="logId1"
					>
					</TabBar.Item>
					<TabBar.Item
						icon={<img src={pic} alt="" className={styles.tabPic}/>}
						selectedIcon={<img src={pic_check} alt="" className={styles.tabPic}/>}
						title="图片"
						key="pic"
						selected={this.state.selectedTab === 'pic'}
						onPress={() => {
							this.props.history.push('/picture')
							this.setState({
								selectedTab: 'pic',
							});
						}}
						data-seed="logId1"
					>
					</TabBar.Item>
					<TabBar.Item
						icon={<img src={ticket} alt="" className={styles.tabPic}/>}
						selectedIcon={<img src={ticket_check} alt="" className={styles.tabPic}/>}
						title="购票"
						key="ticket"
						selected={this.state.selectedTab === 'ticket'}
						onPress={() => {
							this.props.history.push('/news')
							this.setState({
								selectedTab: 'ticket',
							});
						}}
						data-seed="logId1"
					>
					</TabBar.Item>
				</TabBar>
			</div>
		);
	}
}

export default App;
