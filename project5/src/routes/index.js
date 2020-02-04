import React from 'react';

const routes = [
	{
		path: '/home',
		name: '首页',
		// component: React.lazy(() => import('@/page/index')),
		component: React.lazy(()=>import('../page/home/index.js')),
		exact: true,
		auth: true,
	}, {
		path: '/news',
		name: '新闻',
		component: React.lazy(()=>import('../page/news/index.js')),
	}, {
		path: '/video',
		name: '视频',
		component: React.lazy(()=>import('../page/video/index.js')),
	}, {
		path: '/picture',
		name: '图片',
		component: React.lazy(()=>import('../page/picture/index.js')),
	}, {
		path: '/picDetail/:id',
		name: '图片详情',
		component: React.lazy(()=>import('../page/picture/detail.js')),
	},
]


export default routes;
