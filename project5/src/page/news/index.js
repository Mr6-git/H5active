import React, { Component, Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import styles from './styles.module.scss';
import net from '../../net/index.js';
import { PullToRefresh } from 'antd-mobile';
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			down: false,
			height: document.documentElement.clientHeight - 50,
			data: [],
		}
	}

	componentDidMount() {
		this.getDate();
	}

	getDate = () => {
		net.GET(`/media/article/GetList?has_link=1&assort=2`, 'get').then(res => {
			this.setState({
				data: res.data,
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

	render() {
		const { data } = this.state;
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
					<div className={styles.banner}></div>
					<span className={styles.gap}></span>
					<div className={styles.listInfo}>
						<ul className={styles.info_ul}>
							{data.map((item, index) => (
								item.is_top == 1 ? (
									<li className={styles.stick_li}>
										<a href={item.url}>
											<p className={styles.title}>{item.title}</p>
											<div className={styles.li_source}>
												<span style={{ color: 'rgba(227,74,68,1)', marginRight: '15px' }}>置顶</span>
												<span>{item.source}</span>
												<span style={{ marginLeft: '15px' }}>{this.countDate(item.create_time)}</span>
											</div>
										</a>
									</li>
								) : null
							))
							}
							{data.map((item, index) => (
								item.is_top == 0 ? (
									<li className={styles.info_li}>
										<a href={item.url}>
											<p className={styles.title}>{item.title}</p>
											<img className={styles.li_pic} src={item.images[0]} alt="" />
											<div className={styles.li_source}>
												<span>{item.source}</span>
												<span style={{ marginLeft: '30px' }}>{this.countDate(item.create_time)}</span>
											</div>
										</a>
									</li>
								) : null
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
