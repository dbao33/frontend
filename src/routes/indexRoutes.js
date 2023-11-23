import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage'
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import ProfilePage from '../pages/Profile/ProfilePage'
import AdminPage from '../pages/AdminPage/AdminPage'
import PaymentPage from '../pages/PaymentPage/PaymentPage'
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess'
import MyOrderPage from '../pages/MyOrderPage/MyOrderPage'
import DetailsOrderPage from '../pages/DetailsOrderPage/DetailsOrderPage'
import Map from '../pages/Map/Map'
import SearchPage from '../pages/SearchPage/SearchPage'

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
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
    },
    {
        path: '/order-success',
        page: OrderSuccess,
        isShowHeader: true,
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true,
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true,
    },
    {
        path: '/product',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/product-details-page/:id',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: '/map',
        page: Map,
        isShowHeader: true,
    },
    {
        path: '/search',
        page: SearchPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]
