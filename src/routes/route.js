import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from "../components/auth/LoginComponent"
import MasterComponent from "../components/layouts/MasterComponent"
import PortfolioIndex from '@/components/portfolio/PortfolioIndex'
import DashboardComponent from '@/components/DashboardComponent'
import AboutMe from '@/components/AboutMe'
const routes = [{
        name: "login",
        path: "/",
        component: LoginComponent,
    },
    {
        name: "Login",
        path: "/login",
        component: LoginComponent,
    },

    // admin routes
    {
        name: "admin",
        path: "/admin",
        redirect: "/dashboard",
        component: MasterComponent,
        children: [{
                path: "/dashboard",
                name: "Dashboard",
                component: DashboardComponent,
            },
            {
                path: "/portfolio",
                name: "Portfolio",
                component: PortfolioIndex,
            },
            {
                path: "/about",
                name: "AboutMe",
                component: AboutMe,
            },
            {
                path: "/educations",
                name: "Educations",
                component: AboutMe,
            },
            {
                path: "/experience",
                name: "Experience",
                component: AboutMe,
            },
            {
                path: "/services",
                name: "Services",
                component: AboutMe,
            },
            {
                path: "/contact",
                name: "Contact",
                component: PortfolioIndex,
            },
        ],
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;