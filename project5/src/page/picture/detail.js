import React, { Component, Suspense } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import styles from './styles.module.scss';
import net from '../../net/index.js';
import { Toast, Carousel } from 'antd-mobile';
import classnames from 'classnames';
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			GetCategoryList: [],
			data: [],
			open: false,
		}
	}

	componentDidMount() {
		this.getData();
	}

	openTaggle = () => {
		this.setState({
			open: !this.state.open
		})
	}

	getData = () => {
		const id = this.props.match.params.id;
		net.GET(`/media/album/GetInfo?id=${id}`, 'get').then(res => {
			this.setState({
				data: res.data.images
			})
		}).catch(res => {
			Toast.info('服务器返回故障', 1);
		})
	}

	renderContent = (data) => (
		<div className={styles.picList}>
			<ul>
				{
					data.map(item => (
						<li onClick={this.openTaggle}>
							<img src={item} alt="" className={styles.liImg} />
						</li>
					))
				}
			</ul>
		</div>
	);

	render() {
		const { data, open } = this.state;
		return (
			<div className={styles.index_warp}>
				<div className={styles.index_warp}>
					{this.renderContent(data)}
				</div>
				<div onClick={this.openTaggle} className={classnames(styles.drawer, open ? styles.open : null)}>
					<Carousel
						autoplay={false}
						infinite
						beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
						afterChange={index => console.log('slide to', index)}
						dots={false}
					>
						{data.map((val,index) => (
							<a
								key={index}
								// style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
								className={styles.imgA}
							>
								<img
									src={val}
									alt=""
									style={{ width: '100%', verticalAlign: 'top' }}
									onLoad={() => {
									}}
								/>
							</a>
						))}
					</Carousel>
				</div>
			</div>
		);
	}
}

export default App;
