import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage'
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import AdminPage from '../pages/AdminPage/AdminPage'

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/product-details-page',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowheader: false,
        isPrivate: true,
    },
    {
        path: '*',
        page: NotFoundPage
    }
]
