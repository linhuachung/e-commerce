import Request from '../utils/request'
import Configs from '../configs'

const endpoint = `${Configs.API_URL}`
const MainApi = Request.create({
    endpoint,
    handleToken: true
})
const ExternalApi = Request.create({
    endpoint: ''
})

class PreSigned {
    post = (url, payload) => this._request(url, payload, 'post')

    put = (url, payload) => this._request(url, payload, 'put')

    // eslint-disable-next-line
    _request = (url, {files, handlePayload}, method) => new Promise(async (resolve) => {
        const signedPayload = Array.from(files).map((file) => {
            const fileNamePaths = file.name.split('.')
            return ({
                fileName: 'img',
                fileType: fileNamePaths[fileNamePaths.length - 1]
            })
        })

        const signedResult = await MainApi.post('/images/pre-signed', signedPayload)

        if (!signedResult.status) {
            resolve(signedResult)

            return
        }

        const promiseArray = []
        signedResult.data.forEach(async (item, index) => {
            promiseArray.push(ExternalApi.put(item.preSignedURL, files[index]))
        })
        await Promise.all(promiseArray)

        const payload = handlePayload(signedResult.data.map((item) => item.url))

        const result = await MainApi[method](url, payload)

        resolve(result)
    })
}

const PreSignedApi = new PreSigned()

export {MainApi, PreSignedApi, ExternalApi}
