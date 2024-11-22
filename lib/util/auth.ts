type User = {token: string};

export type LoginResult = 'success' | 'invalid-credentials' | 'error';

export async function login(email: string, password: string): Promise<LoginResult> {
    const response = await fetch(`${import.meta.env.VITE_HTTP_ENDPOINT}/auth`, {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: new Headers({'Content-Type': 'application/json'})
    });
    try {
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('user', JSON.stringify(data));
            return Promise.resolve('success');
        }
        if (data.code === 401) {
            console.warn(data);
            return Promise.reject('invalid-credentials');
        }
    } catch (e) {
        console.error(e);
    }
    return Promise.reject('error');
}

export function logout() {
    localStorage.removeItem('user');
}

export function getCurrentUser(): User | undefined {
    const localStorageUser = localStorage.getItem('user');
    return localStorageUser ? JSON.parse(localStorageUser) : undefined;
}
