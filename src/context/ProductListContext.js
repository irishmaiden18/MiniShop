import { createContext } from "react";

const ProductListContext = createContext({
    productList: [],
    setProductList: () => {}
})

export default ProductListContext