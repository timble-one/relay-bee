import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";
import {useAuth} from "../useAuth.ts";
import {useContext} from "react";
import {SystemEnvContext} from "../../SystemEnvContext.ts";

export type FetchError = {message: 'unauthorized' | 'missing-credentials'};

export const useRelayEnvironmentCreator = () => {
  const env = useContext(SystemEnvContext)
  const {getCurrentUser} = useAuth()

  const fetchFn: FetchFunction = async (operation, variables, _cacheConfig, uploadables) => {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('missing-credentials');
    }

    const request: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`
      },
    }

    if (uploadables) {
      if (!window.FormData) {
        throw new Error('Uploading files without `FormData` not supported.');
      }

      const form = new FormData();
      form.append('operations', JSON.stringify({query: operation.text, variables: {file: [null]}}));

      /*
      Could be useful for upload of multiple files
      const map: {[key: string]: Array<string>} = {};
      let i = 0;
      Object.values(uploadables).forEach(() => {
          map[i] = ['variables.file.' + i];
          i++;
      });*/
      form.append("map", JSON.stringify({0: ['variables.file']}));

      form.append("0", variables.file[0]);

      request.body = form;
    } else {
      request.headers = {...request.headers, 'Content-Type': 'application/json'};
      request.body = JSON.stringify({
        query: operation.text,
        variables,
      });
    }

    const resp = await fetch(`${env?.httpEndpoint}/graphql`, request);
    const data = await resp.json();
    if (data.code === 401) {
      throw new Error('unauthorized');
    }
    return data;
  };

  return () => (
    new Environment({
      network: Network.create(fetchFn),
      store: new Store(new RecordSource())
    })
  )
}
