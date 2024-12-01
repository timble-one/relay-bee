import {TypedGQL, untypeGQL} from "../typeGQL.ts";
import {useMutation} from "react-relay";
import {MutationParameters} from "relay-runtime";

export const useTypedMutation = <T extends MutationParameters>(mutation: TypedGQL<T>) => {
    return useMutation<T>(untypeGQL(mutation))
}