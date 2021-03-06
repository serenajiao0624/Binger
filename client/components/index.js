/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar'
export {default as Home} from './Home'
export { Login, Signup } from './AuthForm'
export { default as AdminTools } from './AdminTools'
//--
export { default as AdminProducts } from '../components/Admin/AdminProducts'
export { default as AdminUsers } from '../components/Admin/AdminUsers'
export { default as ProductForm } from '../components/Admin/ProductForm'
//--
export { default as AllProducts } from './AllProducts'
export { default as SingleProduct } from './SingleProduct'
export { default as Cart } from './Cart'
//--
export { default as SingleUser } from './SingleUser'
export { default as UserForm } from './UserForm'