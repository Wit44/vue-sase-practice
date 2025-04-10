import axios, { AxiosError, type AxiosResponse } from "axios"
import { AuthService } from "./auth.service"

const client = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status: number) => {
        return status === 200 || status === 204
    }
})

export class MainService {

    static async login(email: string, password: string) {
        return await client.request({
            url: '/user/login',
            method: 'post',
            data: {
                email: email,
                password: password
            }
        })
    }

    static async useAxios<T>(
        url: string,
        method: 'get' | 'post' | 'put' | 'delete' = 'get',
        data: any = {}): Promise<AxiosResponse<T, any>> {

        let rsp: AxiosResponse

        try {
            rsp = await client.request<T>({
                url: url,
                method: method,
                headers: {
                    'Authorization': `Bearer ${AuthService.getAccessToken()}`
                },
                data: data
            }) as AxiosResponse
        } catch (e) {
            rsp = (e as AxiosError).response as AxiosResponse
        }

        if (rsp == undefined) {
            throw new Error('BACKEND_UNREACHABLE')
        }

        if (rsp.status == 403) {
            // Access token as expired
            // We have to refresh it and then repeat the request again

            try {
                const tokenRequest = await client.request({
                    url: '/user/refresh',
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${AuthService.getRefreshToken()}`
                    }
                })

                AuthService.createAuth(tokenRequest.data)

                rsp = await client.request<T>({
                    url: url,
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${AuthService.getAccessToken()}`
                    },
                    data: data
                })

            } catch (e) {
                AuthService.removeAuth()
                throw new Error('REFRESH_FAILED')
            }
        }

        if (rsp.status == 404) {
            throw new Error('NOT_FOUND')
        }

        return rsp
    }
}