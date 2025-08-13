import {
    FETCH_ERROR_MISSING_CREDENTIALS,
    FETCH_ERROR_UNAUTHORIZED,
    FetchError
} from "../../../util/relay/useRelayEnvironmentCreator.ts";
import {LoginForm} from "../../LoginForm.tsx";
import {useRouter} from "../../../util/router/util.ts";
import {HttpError, useLocation} from "found";
import {NotFound} from "../NotFound.tsx";
import {Button} from "./Button.tsx";
import {ifTruthy} from "tssentials";
import {useEffect, useState} from "react";

type Props = { error: Error & FetchError | HttpError, resetErrorBoundary: () => void};

export function ErrorFallback({ error, resetErrorBoundary }: Props) {
    const {router} = useRouter()
    const {pathname} = useLocation()
    const [errorPathname] = useState(pathname)

    useEffect(() => {
        // for some reason, the reset does not work directly after navigating
        // makes sure that the error-boundary is reset after navigating away from it
        if (pathname !== errorPathname) {
            setTimeout(resetErrorBoundary, 1000)
        }
    }, [pathname])

    if (error instanceof HttpError && error.status === 404) {
        return <NotFound message={ifTruthy(typeof error.data == 'string', () => error.data)} />
    } else if (error instanceof Error) {
        if (error.message === FETCH_ERROR_UNAUTHORIZED || error.message === FETCH_ERROR_MISSING_CREDENTIALS) {
            return (
                <div className="m-8">
                    <h2 className="text-blue-500 font-bold text-2xl mb-4">Sitzung abgelaufen</h2>
                    <LoginForm onSuccess={() => router.go(0)}/>
                </div>
            )
        }
        return (
            <div role="alert" className="m-8">
                <div className="flex flex-col gap-4">
                    <h2 className="text-red-500 font-bold text-2xl">{error.name}</h2>
                    <p className="text-red-500">{error.message}</p>
                    <pre className="text-red-500 overflow-scroll">{error.stack}</pre>
                    <Button onClick={resetErrorBoundary}>Retry</Button>
                </div>
            </div>
        )
    }
}
