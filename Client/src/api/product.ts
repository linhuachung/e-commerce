import { MainApi } from './endpoint'

export function getProduct() {
    return MainApi.get('/product/product')
}

export function searchProduct(payload: string) {
    return MainApi.post('/product/search/product', { title: payload })
}

export function searchProductPageList(payload: string) {
    return MainApi.post('/product/search/product', { title: payload })
}
