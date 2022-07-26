## 系统说明
1. 我们的系统是在一个商城系统上二次开发

 #这套商城演示地址:
[演示地址](http://pc.qingwuit.com)

> * [后台地址](http://pc.qingwuit.com/Admin/login): admin 123456 
> * [商家地址](http://pc.qingwuit.com/Seller/login): 18888888888 123456 
> * [用户登录](http://pc.qingwuit.com/user/login): 18888888888 123456 (数据库每日会重新导入数据信息)

2. 前端VUE 安装和使用

```vue
npm install (安装扩展)

npm run serve (启动)

npm run build （编译）
```
或者 cnpm run serve

## 常见问题

1. 刷新404 后台无法访问。
https://router.vuejs.org/zh/guide/essentials/history-mode.html   可根据自己环境修改

2. http 访问 类似这样:  [不需要url 前缀]
this.$get("Pc.HomePage.getData").then(res=>{
				
				this.banner_list = res.data.img_ad;
				}
            });

