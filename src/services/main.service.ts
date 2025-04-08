import axios from "axios"

const client = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status: number) => {
        return status === 200
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

    static async useAxios<T>(url: string,
        method: 'get' | 'post' | 'put' | 'delete' = 'get',
        data: any = {}) {
        return await client.request<T>({
            url: url,
            method: method,
            data: data
        })
    }
}