import {MainApi} from './endpoint'

export function login(payload) {
    return MainApi.post(`/auth/login`, payload)
}

export function register(payload) {
    return MainApi.post(`/auth/register`, payload)
}
