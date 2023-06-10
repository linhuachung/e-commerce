import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '../../utils/saga-helper'
import { TYPES } from '../actions'
import { getProduct, searchProduct, searchProductPageList } from '../../api/product';

export default function* watcher() {
    yield all([
        takeLatest(TYPES.GET_PRODUCT, sagaHelper({
            api: getProduct
        })),
        takeLatest(TYPES.SEARCH_PRODUCT, sagaHelper({
            api: searchProduct
        })),
        takeLatest(TYPES.SEARCH_PRODUCT_PAGE_LIST, sagaHelper({
            api: searchProductPageList
        })),

    ])
}
