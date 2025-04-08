import type { AuthModel } from "@/models/auth.model";

export class AuthService {

    private static STORAGE_KEY = 'auth'

    static createAuth(model: AuthModel){
        localStorage.removeItem(this.STORAGE_KEY)
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(model))
    }
}