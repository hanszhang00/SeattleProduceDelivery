import { ShopActionType } from "./shopActionType";

import { firestore, convertProductsToMap } from "../../firebase/firebase";

export const fetchProductsStart = (products) => ({
  type: ShopActionType.FETCH_COLLECTION_START,
});

export const fetchProductsSuccess = (products) => ({
  type: ShopActionType.FETCH_COLLECTION_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (errMesg) => ({
  type: ShopActionType.FETCH_COLLECTION_FAILURE,
  payload: errMesg,
});

export const fetchProductsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("products");
    dispatch(fetchProductsStart());
    collectionRef
      .get()
      .then(async (snapshot) => {
        const products = convertProductsToMap(snapshot);
        console.log("products are ", products);
        dispatch(fetchProductsSuccess(products));
      })
      .catch((err) => dispatch(fetchProductsFailure(err.message)));
  };
};