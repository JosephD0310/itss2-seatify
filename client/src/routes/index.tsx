import type { ComponentType } from "react";
import config from "../config";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home";
import Room from "../pages/Room";

interface IRoute {
    path: string;
    component: ComponentType<any>;
    layout?: ComponentType<any>;
}

const publicRoutes : IRoute[] = [
    {
        path: config.routes.home, component: Home, layout: DefaultLayout,
    },
    {
        path: config.routes.room, component: Room, layout: DefaultLayout,
    }
]

export {publicRoutes}