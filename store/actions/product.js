export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const addProduct = (title, imageUrl, price, description) => {
  return {
    type: ADD_PRODUCT,
    productDetails: {
      title,
      imageUrl,
      price,
      description,
    },
  };
};

export const editProduct = (productId, title, imageUrl, description) => {
  return {
    type: EDIT_PRODUCT,
    productId,
    productDetails: {
      title,
      imageUrl,
      description,
    },
  };
};

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
};
