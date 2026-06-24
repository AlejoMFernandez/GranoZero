import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import PublicChat from "../pages/PublicChat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Profiles from "../pages/Profiles.vue";
import Posts from "../pages/Posts.vue";

const routes = [
    { path: '/',                    component: Home, },
    { path: '/chat',                component: PublicChat, },
    { path: '/ingresar',            component: Login, },
    { path: '/crear-cuenta',        component: Register, },
    { path: '/perfil/:id',          component: Profile },
    { path: '/cafeteros',           component: Profiles },
    { path: '/posts',               component: Posts }
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
