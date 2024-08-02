import Index from "../pages/Index.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserPage from "../pages/UserPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";

//定义一些路由
const routes=[
    { path:'/',component:Index },
    { path:'/team',component:TeamPage },
    { path:'/user',component:UserPage },
    { path:'/search',component:SearchPage },
    { path:'/user/edit',component:UserEditPage },
    { path:'/user/list',component:SearchResultPage },
    { path:'/user/login',component:UserLoginPage}


]
export default routes