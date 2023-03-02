// router.js
import {RouterMount,createRouter} from 'uni-simple-router';

console.log('ROUTES', ROUTES)
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});

const beforeEachList = [redirectRouter, base];

//全局路由前置守卫
router.beforeEach((to, from, next) => {
    console.log('hickeyBeforeEach')
    for (let i = 0; i < beforeEachList.length; i++) {
        const func = beforeEachList[i];
        const goOn = func(to, from, next);
        if (!goOn) {
            break;
        }
    }
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

/**
 * @description 新旧分包路由拦截重定向,如果有配置meta并且meta.redirectName不为空，则执行这个方法
 * @param { RouteRule } to
 * @param { RouteRule } from
 * @param { function } next
 * @returns { boolean }
 */
 function redirectRouter(to, from, next) {
    const { redirectName } = to?.meta || {};
    if (redirectName) {

        // 以路由原有的跳转方式带参跳转
        next({
            name: redirectName,
            params: {},
        });
        return false;
    }
    return true;
}



/**
 * @description 兜底next
 * @param { RouteRule } to
 * @param { RouteRule } from
 * @param { function } next
 * @returns { boolean }
 */
function base(to, from, next) {
    next();
    return false;
}


export {
	router,
	RouterMount
}