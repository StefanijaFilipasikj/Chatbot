import './App.scss';
import {Component} from "react";
import ChatbotService from "../../repository/ChatbotRepository";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductList from "../Product/ProductList/ProductList"
import ProductDetails from "../Product/ProductDetails/ProductDetails";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import OrderList from "../Order/OrderList";
import ProductAdd from "../Product/ProductForm/ProductAdd";
import ProductEdit from "../Product/ProductForm/ProductEdit";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import CategoryFilter from "../Product/Filters/CategoryFilter/CategoryFilter";
import Chatbot from '../Chatbot/Chatbot';
import Home from '../Home/Home';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            selectedProduct: {},
            selectedShoppingCart: {},
            orders: [],
            roles: [],
            username: null,
            searchTerm: "",
        }
    }

    render(){
        const showFooter = window.location.pathname !== '/chatbot';
        return (<>
                <Router>
                    <div className={"min-vh-100 d-flex flex-column justify-content-between"}>
                        <Header username={this.state.username} setFilteredProducts={this.setFilteredProducts} setSearchTerm={this.setSearchTerm}/>
                        <Routes>
                            <Route path={'/products/add'} element={<ProductAdd onAddProduct={this.addProduct}/>}></Route>
                            <Route path={'/products/edit/:id'} element={<ProductEdit product={this.state.selectedProduct} onEditProduct={this.editProduct} />}></Route>
                            <Route path={'/products'} element={<ProductList onAddToCart={this.addProductToCart} products={this.state.products} onDetails={this.getProduct} onEdit={this.getProduct} onDelete={this.deleteProduct} setFilteredProducts={this.setFilteredProducts} clearFilters={this.loadProducts} category={"ALL PRODUCTS"} searchTerm={this.state.searchTerm} setSearchTerm={this.setSearchTerm}/>}></Route>
                            <Route path={'/product/:id'} element={<ProductDetails product={this.state.selectedProduct} getProduct={this.getProduct} onAddToCart={this.addProductToCart} onEdit={this.getProduct} onDelete={this.deleteProduct}/>}></Route>
                            <Route path={'/products/category/:category'} element={<CategoryFilter onAddToCart={this.addProductToCart} products={this.state.products} onDetails={this.getProduct} onEdit={this.getProduct} onDelete={this.deleteProduct} setFilteredProducts={this.setFilteredProducts} clearFilters={this.loadProducts} setSearchTerm={this.setSearchTerm}/>} />
                            <Route path={'/shopping-cart/:username'} element={<ShoppingCart shoppingCart={this.state.selectedShoppingCart} getShoppingCart={this.getShoppingCart} onEditProduct={this.editProductInCart} onRemoveProduct={this.removeProductFromCart} onOrder={this.makeOrder} onDetails={this.getProduct}/>}></Route>
                            <Route path={'/orders/:username'} element={<OrderList orders={this.state.orders} getOrders={this.getOrders}/>}></Route>
                            <Route path='/chatbot' element={<Chatbot/>}/>
                            <Route path={"/login"} element={<Login refreshUsername={this.loadUsername}/>}/>
                            <Route path='/register' element={<Register roles={this.state.roles}/>}/>
                            <Route path={'/'} element={<Home/>}></Route>
                        </Routes>
                    </div>
                    {showFooter && <Footer/>}
                </Router>
            </>
        )
    }

    loadProducts = () => {
        ChatbotService.getAllProducts()
            .then((data) => {
                this.setState({
                    products: data.data.content
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadRoles = () => {
        ChatbotService.getAllRoles()
            .then((data) => {
                this.setState({
                    roles: data.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadUsername = () => {
        ChatbotService.getUserUsername()
        .then(resp => {
            this.setState({
                username: resp.data
            });
        }).catch((error) => {
            console.log(error)
        });
    }

    setSearchTerm = (term) =>{
        this.setState({
            searchTerm: term
        });
    }

    getProduct = (id) => {
        ChatbotService.getProduct(id)
            .then((data) => {
                this.setState({
                    selectedProduct: data.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    setFilteredProducts = (filteredProducts) => {
        this.setState({
            products: filteredProducts
        });
    }

    addProduct = (url, title, warranty, regularPrice, happyPrice, imageUrl, category, descriptions, navigate) => {
        ChatbotService.addProduct(url, title, warranty, regularPrice, happyPrice, imageUrl, category, descriptions)
            .then((data) => {
                this.loadProducts();
                navigate(`/product/${data.data.id}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    editProduct = (id, url, title, warranty, regularPrice, happyPrice, imageUrl, category, descriptions, navigate) => {
        ChatbotService.editProduct(id, url, title, warranty, regularPrice, happyPrice, imageUrl, category, descriptions)
            .then((data) => {
                this.loadProducts();
                navigate(`/product/${id}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    deleteProduct = (id) => {
        ChatbotService.deleteProduct(id)
            .then((data) => {
                // this.loadProducts();
            })
            .catch((error) => {
                console.log(error)
            });
    }

    getShoppingCart = (username) => {
        ChatbotService.getShoppingCart(username)
            .then((data) => {
                this.setState({
                    selectedShoppingCart: data.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    addProductToCart = (productId, quantity, navigate) => {
        ChatbotService.addProductToShoppingCart(this.state.username, productId, quantity)
            .then((data) => {
                this.loadProducts();
                navigate(`/shopping-cart/${this.state.username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    editProductInCart = (id, productId, quantity, navigate) => {
        ChatbotService.editProductInShoppingCart(id, this.state.username, productId, quantity)
            .then((data) => {
                this.getShoppingCart(this.state.username);
                navigate(`/shopping-cart/${this.state.username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    removeProductFromCart = (id, navigate) => {

        ChatbotService.removeProductFromShoppingCart(id)
            .then((data) => {
                this.getShoppingCart(this.state.username);
                navigate(`/shopping-cart/${this.state.username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    getOrders = (username) => {
        ChatbotService.getAllOrdersFromUser(username)
            .then((data) => {
                this.setState({
                    orders: data.data,
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    makeOrder = (cartId, navigate) => {

        ChatbotService.makeOrder(cartId)
            .then((data) => {
                this.getOrders(this.state.username);
                navigate(`/orders/${this.state.username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    componentDidMount(){
        // this.loadProducts();
        this.loadUsername();
        this.loadRoles();
    }
}

export default App;