import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/*
 * 路由放置到当个产品中
 * 默认使用静态路由
 * 可以设置为动态路由
 */

const titles = {
  '/a': '首页',
  '/HelloWorld': '填写信息'
};

// 获取views文件夹下所有的vue文件，然后使用动态路由
const views = require.context('../views/', true, /.*\.vue$/).keys();
console.log(views)
let routeConfig = views.map(v => {
  console.log(v)
  const name = v.match(/\.\/(.*)\.vue/)[1];
  console.log(name)
  const path = '/' + name;
  // const comp = () => import(`./views/${name}.vue`);
  const comp = () => Promise.resolve(require(`../views/${name}.vue`));

  return {
    path: path,
    component: comp,
    meta: { title: titles[path] || '' }
  }
});
console.log(routeConfig)
// 默认跳到index
routeConfig.push({
  path: '/',
  redirect: '/a',
  meta: {
    title: '加载中'
  }
});

let router = new Router();
// 添加动态路由
router.addRoutes(routeConfig);

export default router
