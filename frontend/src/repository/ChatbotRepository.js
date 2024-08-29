import axios from "../custom-axios/axios";

const ChatbotService = {
    getAllProducts: () => {
        return axios.get("/products");
    },
    getProduct: (id) => {
        return axios.get(`/products/${id}`);
    },
    addProduct: (url, title, warranty, regularPrice, happyPrice, imageUrl, descriptions) => {
        return axios.post("/products/add", {
            "url": url,
            "title": title,
            "warranty": warranty,
            "regularPrice": regularPrice,
            "happyPrice": happyPrice,
            "imageUrl": imageUrl,
            "descriptions": descriptions,
        });
    },
    editProduct: (id, url, title, warranty, regularPrice, happyPrice, imageUrl, descriptions) => {
        return axios.put(`/products/edit/${id}`, {
            "url": url,
            "title": title,
            "warranty": warranty,
            "regularPrice": regularPrice,
            "happyPrice": happyPrice,
            "imageUrl": imageUrl,
            "descriptions": descriptions,
        });
    },
    deleteProduct: (id) => {
        return axios.delete(`/products/delete/${id}`);
    },
    getShoppingCart: (username) => {
        return axios.get(`/shopping-cart/${username}`)
    },
    addProductToShoppingCart: (username, productId, quantity) => {
        return axios.post("/shopping-cart/add-product", {
            "username": username,
            "productId": productId,
            "quantity": quantity,
        });
    },
    editProductInShoppingCart: (id, username, productId, quantity) => {
        return axios.put(`/shopping-cart/edit-product/${id}`, {
            "username": username,
            "productId": productId,
            "quantity": quantity,
        });
    },
    removeProductFromShoppingCart: (id) => {
        return axios.delete(`/shopping-cart/remove-product/${id}`);
    },
    getAllOrdersFromUser: (username) => {
        return axios.get(`/orders/${username}`);
    },
    makeOrder: (cartId) => {
        return axios.post(`/orders/make-order/${cartId}`);
    },
    getAllRoles: () => {
        return axios.get("/user/roles")
    },
    login: (username, password) => {
        return axios.post("/login", {
            "username": username,
            "password": password
        })
    },
    register: (username, password, repeatPassword, role) => {
        return axios.post("/user/register", {
            "username": username,
            "password": password,
            "repeatPassword": repeatPassword,
            "role": role
        })
    },
    getUserRole: () => {
        return axios.get("/user/role")
    },
    getUserUsername: () => {
        return axios.get("/user/username")
    },
    getAllCategories: () => {
        return axios.get("/products/categories");
    },
    getProductsByCategory: (category) => {
        return axios.get(`/products/category/${category}`);
    },
    getMaxPrice: () => {
        return axios.get('/products/max-price');
    },
    filterProductsByPrice: (minPrice, maxPrice) => {
        return axios.get(`/products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    },
    filterProductsByCategoryAndPrice: (category, minPrice, maxPrice) => {
        return axios.get(`/products/filter/${category}?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    },
}

export default ChatbotService;