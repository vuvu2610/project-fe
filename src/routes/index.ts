import config from "../config"
import DefaultLayout from "../layouts/DefaultLayout"
import Home from "../pages/Home"

const publicRoutes = [
    {path: config.routes.home, component: Home, layout: DefaultLayout}
]

const privateRoutes: any[] = [
    
]

export {publicRoutes, privateRoutes}