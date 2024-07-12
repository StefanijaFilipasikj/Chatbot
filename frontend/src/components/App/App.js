import './App.css';
import {Component} from "react";
import ChatbotService from "../../repository/ChatbotRepository";
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import ProductList from "../Product/ProductList"
import ProductDetails from "../Product/ProductDetails";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import OrderList from "../Order/OrderList";
import ProductAdd from "../Product/ProductAdd";
import ProductEdit from "../Product/ProductEdit";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            selectedProduct: {},
            selectedShoppingCart: {},
            orders: [],
        }
    }

    render(){
        return (
            <Router>
                <Routes>
                    <Route path={'/products/add'} element={<ProductAdd onAddProduct={this.addProduct}/>}></Route>
                    <Route path={'/products/edit/:id'} element={<ProductEdit product={this.state.selectedProduct} onEditProduct={this.editProduct} />}></Route>
                    <Route path={'/products'} element={<ProductList products={this.state.products} onDetails={this.getProduct} onEdit={this.getProduct} onDelete={this.deleteProduct}/>}></Route>
                    <Route path={'/product/:id'} element={<ProductDetails product={this.state.selectedProduct} getProduct={this.getProduct} onAddToCart={this.addProductToCart}/>}></Route>
                    <Route path={'/shopping-cart/:username'} element={<ShoppingCart shoppingCart={this.state.selectedShoppingCart} getShoppingCart={this.getShoppingCart} onEditProduct={this.editProductInCart} onRemoveProduct={this.removeProductFromCart} onOrder={this.makeOrder}/>}></Route>
                    <Route path={'/orders/:username'} element={<OrderList orders={this.state.orders} getOrders={this.getOrders}/>}></Route>
                    <Route path={'/'} element={<div>hi im your chatbot</div>}></Route>
                </Routes>
            </Router>
        )
    }

    loadProducts = () => {
        ChatbotService.getAllProducts()
            .then((data) => {
                this.setState({
                    products: data.data
                })
            })
            .catch((error) => {
                console.log(error)
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

    addProduct = (url, title, warranty, regularPrice, happyPrice, imageUrl, descriptions, navigate) => {
        ChatbotService.addProduct(url, title, warranty, regularPrice, happyPrice, imageUrl, descriptions)
            .then((data) => {
                this.loadProducts();
                navigate('/products');
            })
            .catch((error) => {
                console.log(error)
            });
    }

    editProduct = (id, url, title, warranty, regularPrice, happyPrice, imageUrl, descriptions, navigate) => {
        ChatbotService.editProduct(id, url, title, warranty, regularPrice, happyPrice, imageUrl, descriptions)
            .then((data) => {
                this.loadProducts();
                navigate('/products');
            })
            .catch((error) => {
                console.log(error)
            });
    }

    deleteProduct = (id) => {
        ChatbotService.deleteProduct(id)
            .then((data) => {
                this.loadProducts();
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
        let username = "user"; // default for now

        ChatbotService.addProductToShoppingCart(username, productId, quantity)
            .then((data) => {
                this.loadProducts();
                navigate(`/shopping-cart/${username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    editProductInCart = (id, productId, quantity, navigate) => {
        let username = "user"; // default for now

        ChatbotService.editProductInShoppingCart(id, username, productId, quantity)
            .then((data) => {
                this.getShoppingCart(username);
                navigate(`/shopping-cart/${username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    removeProductFromCart = (id, navigate) => {
        let username = "user"; // default for now

        ChatbotService.removeProductFromShoppingCart(id)
            .then((data) => {
                this.getShoppingCart(username);
                navigate(`/shopping-cart/${username}`);
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
        let username = "user"; // default for now

        ChatbotService.makeOrder(cartId)
            .then((data) => {
                this.getOrders(username);
                navigate(`/orders/${username}`);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    componentDidMount(){
        this.loadProducts();
    }
}

export default App;