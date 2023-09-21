import { createRouter, createWebHistory } from "vue-router";

import Home from "./Home";
import Host from "./Host";
import Play from "./Play";
import Create from "./Create";

const routes = [
    Home,
    Host,
    Play,
    Create
]

export const router = createRouter({
    history: createWebHistory(), 
    routes
});