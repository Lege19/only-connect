import { createRouter, createWebHistory } from "vue-router";

import Home from "./Home";
import Play from "./Play";
import Create from "./Create";

const routes = [
    Home,
    Play,
    Create
]

export const router = createRouter({
    history: createWebHistory(), 
    routes
});