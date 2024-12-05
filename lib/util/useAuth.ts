import {useContext} from "react";
import {setObjectProperty} from "./util.ts";
import {EnvironmentContext} from "../EnvironmentContext.ts";

type User = {token: string};

export type LoginResult = 'success' | 'invalid-credentials' | 'error';

export const useAuth = () => {
    const env = useContext(EnvironmentContext)

    const login = async (email: string, password: string): Promise<LoginResult> => {
        const credentials = {email}
        setObjectProperty(credentials, env?.passwordPath ?? 'password', password)
        const response = await fetch(`${env?.httpEndpoint}${env?.basePath}/auth`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        try {
            const data = await response.json()
            if (data.token) {
                localStorage.setItem('user', JSON.stringify(data))
                return Promise.resolve('success')
            }
            if (data.code === 401) {
                console.warn(data)
                return Promise.reject('invalid-credentials')
            }
        } catch (e) {
            console.error(e)
        }
        return Promise.reject('error')
    }

    const logout = () => {
        localStorage.removeItem('user')
    }

    const getCurrentUser = (): User | undefined => {
        const localStorageUser = localStorage.getItem('user')
        return localStorageUser ? JSON.parse(localStorageUser) : undefined
    }

    return ({login, logout, getCurrentUser})
}
