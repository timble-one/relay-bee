import {useState} from "react";
import {Form} from "./input/form/Form.tsx";
import {LoginResult, useAuth} from "../util/useAuth";

type StateType = {
    email: string,
    password: string,
    message?: string,
}

export default function LoginForm({onSuccess}: {onSuccess: () => void}) {
    const [state, setState] = useState<StateType>({email: '', password: ''})
    const {login} = useAuth()

    const loginAction = () => {
        if (!(state.email && state.password)) {
            setState({...state, message: 'Bitte Email und Passwort angeben.'})
        } else {
            login(state.email, state.password)
            .then(onSuccess)
            .catch((result: LoginResult) => {
                if (result === 'invalid-credentials') {
                    setState({...state, message: 'Deine Angaben sind ungültig.'});}
                else if (result === 'error') {
                    setState({...state, message: 'Es gab einen Fehler beim Anmelden.'});
                }
            })
        }
    }

    return <>
        <Form className="space-y-4 md:space-y-6" onSubmit={loginAction}>
            <div>
                <label htmlFor="email"
                       className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                </label>
                <input
                    type="email" name="email" id="email" required={true}
                    placeholder="name@openairdeisswil.ch"
                    value={state.email} onChange={(e) => setState({...state, email: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Passwort
                </label>
                <input
                    type="password" name="password" id="password"
                    placeholder="••••••••" required={true} autoComplete="on"
                    value={state.password} onChange={(e) => setState({...state, password: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                />
            </div>
            <div className="flex-row space-x-4">
                <button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                >
                    Login
                </button>
            </div>
            {state.message && <p className="text-red-500">{state.message}</p>}
        </Form>
    </>
}
