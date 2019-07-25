##技术栈  

  前端：parcel + react + ant + react-router + redux  
  后端：node + express + mysql 

##运行项目

前端
```
yarn(推荐) 或者运行  npm install  
yarn start
yarn build
```
后端
```
安装mysql
导入polc.sql
cd polc/server
pm2 start index.js
```
##结构说明
```
├── server  
│   ├── db.js                数据库配置  
│   ├── index.js             后端入口  
│   ├── api                  后端api  
│        └── sqlApi.js       后端接口  
├── src  
│   ├── utils                工具库  
|         ├── api.js         请求封装  
|         ├── loadAsync.js   页面懒加载  
|         ├── tipbox.js      提示类  
│   ├── view                 业务通用组件  
│         ├── actions        redux-action  
│         ├── constants      redux-event
│         ├── page           业务页面 
│         ├── reducer        redux-reducer 
│         ├── routes         react-router
|         ├── store.js       redux-store
│         ├── index.js       应用入口js 
│         ├── index.less     全局样式  
│         └── index.html     应用入口html
├── src                      静态资源
├── polc.sql                 sql
├── README.md        
└── package.json

```

##说明

>应用只是一个熟悉react parcel的项目，数据需要可以修改，不用数据库跟后端  
> parcel 打包会放到polc文件夹;因为开箱即用，目前没有去先清空dist或者polc的内容  
> parcel 打包后assets里面有img的话会到polc目录，有强迫症者会很难受  
> redux 没有必要就不必要使用-（作者原话）  
> 目前路由采用的是BrowserRouter，需要HashRouter的话可以修改router.js里面的，二者区别略。。。