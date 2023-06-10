import { TYPES } from '../actions'

interface INIT_STATE {

    productList: any,
    searchProductList: any
    searchProductPageList: any
    cart: any
    submitting: any
}

const INIT_STATE: INIT_STATE = {
    productList: {
        total: 0,
        totalPage: 1,
        limit: 20,
        data: []
    },
    searchProductList: {
        data: []
    },
    searchProductPageList: {
        data: []
    },
    cart: {
        data: [],
        totalCount: 0
    },
    submitting: null,

}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case TYPES.GET_PRODUCT_SUCCESS:
            const { payload } = action
            return {
                ...state,
                productList: {
                    total: action.data.length,
                    page: payload.page,
                    totalPage: Math.ceil(action.data.length / 8),
                    limit: 8,
                    result: action.data,
                    data: action.data.slice(0, 8 * payload.page)
                }
            }
        case TYPES.SEARCH_PRODUCT_SUCCESS:
            return {
                ...state,
                searchProductList: {
                    data: action.data
                },

            }
        case TYPES.SEARCH_PRODUCT_PAGE_LIST_SUCCESS:
            return {
                ...state,
                searchProductPageList: {
                    data: action.data
                }
            }
        case TYPES.CLEAR_SEARCH_PRODUCT:
            return {
                ...state,
                searchProductList: {
                    data: []
                }
            }
        case TYPES.ADD_TO_CART:
            if (!state.cart.data) {
                const dataCart = {
                    quality: action.data.quality,
                    title: action.data.title,
                    price: action.data.price,
                    productId: action.data.productId,
                }
                state.cart.data.push(dataCart)
            } else {
                let isDuplicateData = false
                state.cart.data.map((item, index) => {
                    if (item.productId == action.data.productId) {
                        if (!action.data.type) {
                            state.cart.data[index].quality += action.data.quality
                            isDuplicateData = true
                        }
                        if (action.data.type === 'minus') {
                            state.cart.data[index].quality--
                            isDuplicateData = true
                        }
                        if (action.data.type === 'plus') {
                            state.cart.data[index].quality++
                            isDuplicateData = true
                        }
                        if (action.data.type === 'delete') {
                            state.cart.data = state.cart.data.filter(x => x.productId !== action.data.productId)
                            isDuplicateData = true
                        }
                    }
                })

                if (!isDuplicateData) {
                    const cart = {
                        quality: action.data.quality,
                        title: action.data.title,
                        price: action.data.price,
                        productId: action.data.productId,
                    }
                    state.cart.data.push(cart)
                }
            }
            const totalCount = state.cart.totalCount = state.cart.data.length
            const data = state.cart.data
            console.log(action)
            return {
                ...state,
                submitting: action.type,
                cart: {
                    data: data,
                    totalCount: totalCount
                }
            }
        default:
            return state
    }
}
