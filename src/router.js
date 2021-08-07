import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue';
import UserPosts from './components/UserPosts.vue';


const router = createRouter({
    history: createWebHistory(), routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: "/UserPosts",
            name: 'UserPosts',
            component: UserPosts,
        }

    ]
})
export default router;