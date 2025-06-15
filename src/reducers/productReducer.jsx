const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_API_DATA":
      return {
        ...state,
        isLoading: false,
        allProducts: action.payload,
        isError: false,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleProductLoading: true,
      };
    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleProductLoading: false,
        singleProduct: action.payload,
      };
    case "SINGLEPRODUCT_ERROR":
      return {
        ...state,
        isSingleProductLoading: false,
        isError: true,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
