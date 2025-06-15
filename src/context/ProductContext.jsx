import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/productReducer";
// step 1 Context create kiya
const ProductsContext = createContext();

const intialState = {
  allProducts: [],
  isLoading: false,
  isError: false,
  isSingleProductLoading: false,
  singleProduct: {},
  productsCatagories: [],
  setcategory: [],
  selectedCategory: "all", // new field
};
// 2.Provider Component banaya
export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const API = "https://dummyjson.com/products?limit=0";
  // 3 Api Call karna he
  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" }); // jab bhi hum dispatch function ko call krte ye to yah reducer function ke action method ko call krta he or waha par type check krta he then uske according work karta he

    try {
      const response = await axios.get(url);
      const allProducts = await response.data.products;
      dispatch({ type: "SET_API_DATA", payload: allProducts });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
      return error;
    }
  };

  // API for single product page
  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const response = await axios.get(url);
      const singleProduct = response.data; // <-- sirf data lena hai, data.products nahi
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SINGLEPRODUCT_ERROR" });
      return error;
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);
  const setCategory = (category) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };
  return (
    <ProductsContext.Provider
      value={{ ...state, setCategory, getSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Step 3: Custom hook
export const useProducts = () => useContext(ProductsContext);
