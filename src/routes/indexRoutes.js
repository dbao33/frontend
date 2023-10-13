import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'



export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/Order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/Products',
        page: ProductsPage,
        isShowHeader: true
    },

    {
        path: '*',
        page: NotFoundPage
    }
]
