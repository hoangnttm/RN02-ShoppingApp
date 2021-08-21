import { getProductfavoriteAPI, likeProductAPI, unlikeProductAPI } from '../../apis/productApi'

export const UNLIKE_PRODUCT = 'UNLIKE_PRODUCT';
export const LIKE_PRODUCT = 'LIKE_PRODUCT';
export const FETCH_PRODUCT_FAVOURITE = 'FETCH_PRODUCT_FAVOURITE';
export const PURCHARSE_ORDER = 'PURCHARSE_ORDER';

export const likeProduct = payload => ({ type: LIKE_PRODUCT, payload });
export const unlikeProduct = payload => ({ type: UNLIKE_PRODUCT, payload });
export const fetchProductsFavourite = payload => ({ type: FETCH_PRODUCT_FAVOURITE, payload });

export const likeProductAction = id => {
    return dispatch=> likeProductAPI(id)
        .then(res => {
            console.info(res.data);
            if(res.data.statusCode==200)
            {
                dispatch(likeProduct(id));
                return true;
            }
            return false;

        })
        .catch(err => {
            console.error(err);
            return false;
        });
};
export const unlikeProductAction = id => {
    return dispatch=> unlikeProductAPI(id)
        .then(res => {
            console.info(res.data);
            dispatch(unlikeProduct(id));
            return true;
        })
        .catch(err => {
            console.error(err);
            return false;
        });
};
export const fetchProductsFavoriteAction = id => {
    return dispatch => {
        getProductfavoriteAPI(id)
            .then(res => {
                console.log(res.data.productsFavorite);

                dispatch(fetchProductsFavourite(res.data.content.productsFavorite));
                //  dispatch(changeLoading(false));
            })
            .catch(err => {
                // dispatch(changeLoading(false));
                console.log(err);
            });
    };
};

