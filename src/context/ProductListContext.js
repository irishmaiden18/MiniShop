import { createContext } from "react";

const ProductListContext = createContext({
    productList: [],
    setProductList: () => {},
    addProduct: () => {}
})

export default ProductListContext