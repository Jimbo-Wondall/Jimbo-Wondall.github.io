import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';
import APIAccess from '../views/APIAccess.vue';
import Game from '../views/Game.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/projects', name: 'Projects', component: Projects },
    { path: '/apiaccess', name: 'APIAccess', component: APIAccess },
    { path: '/game', name: 'Game', component: Game },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
