import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage'
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
<<<<<<< HEAD
import ProfilePage from '../pages/Profile/ProfilePage'
=======
import AdminPage from '../pages/AdminPage/AdminPage'
>>>>>>> 042a1f2a122311ca9c412de78bf46c25731f0891

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
<<<<<<< HEAD
        path: '/products/:type',
=======
        path: '/product/:type',
>>>>>>> 042a1f2a122311ca9c412de78bf46c25731f0891
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/product-details-page',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
<<<<<<< HEAD
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
=======
        path: '/admin',
        page: AdminPage,
        isShowheader: false,
        isPrivate: true,
>>>>>>> 042a1f2a122311ca9c412de78bf46c25731f0891
    },
    {
        path: '*',
        page: NotFoundPage
    }
]
