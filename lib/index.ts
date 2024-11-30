import "./index.css"

export type {EntityDescription} from "./EntityDescription.tsx"
export {SystemEnvContext} from "./SystemEnvContext.ts"

// -- util
export type {ExtractNodeFromEdges} from "./util/util.ts"
export {useBackendPath} from "./util/util.ts"
export {useAuth} from "./util/useAuth.ts"
export {typeGQL, untypeGQL} from "./util/typeGQL.ts"

// util/relay
export {useRBeeEnvironment} from "./util/relay/useRBeeEnvironment.ts"
export {RBeeEnvironmentProvider} from "./util/relay/RBeeEnvironmentProvider.tsx"

// util/router
export {createRouteConfig} from "./util/router/createRouteConfig.ts"
export {RBeeRouterProvider} from "./util/router/RBeeRouterProvider.tsx"

// -- components
export {LoadingIndicator} from "./components/LoadingIndicator.tsx"
export {PromptLayout} from "./components/PromptLayout.tsx"

// components/util
export {EndlessScrollContainer} from "./components/util/endless-scroll/EndlessScrollContainer.tsx"
export {ErrorFallback} from "./components/util/ErrorFallback.tsx"
// components/util/escape
export {EscapeContext} from "./components/util/escape/EscapeContext.ts"
export {useBackOnEscape} from "./components/util/escape/useBackOnEscape.ts"

// components/page
export {RefetchListContextProvider} from "./components/page/refetch-list-context/RefetchListContextProvider.tsx"
export {useRefetchListContext} from "./components/page/refetch-list-context/useRefetchListContext.ts"
export {ListPage} from "./components/page/list/ListPage.tsx"
// components/page/list/table
export {useTable} from "./components/page/list/table/useTable.ts"
export {TableHeader} from "./components/page/list/table/TableHeader.tsx"
export {TableCell} from "./components/page/list/table/TableCell.tsx"
export {TableButtons} from "./components/page/list/table/TableButtons.tsx"
export {TableBody} from "./components/page/list/table/TableBody.tsx"
export {AutoLoadTable} from "./components/page/list/table/AutoLoadTable.tsx"
// components/page/detail
export type {ValidData} from "./components/page/detail/useEntitySaver.ts"
export {useEntitySaver} from "./components/page/detail/useEntitySaver.ts"
export {useNewEntityHandler} from "./components/page/detail/useNewEntityHandler.ts"
export {useEntityState} from "./components/page/detail/useEntityState.ts"
export {DetailPage} from "./components/page/detail/DetailPage.tsx"

// components/input
export {DateInput} from "./components/input/DateInput.tsx"
export {NumberInput} from "./components/input/NumberInput.tsx"
export {SelectInput} from "./components/input/SelectInput.tsx"
export {TextInput} from "./components/input/TextInput.tsx"
export {Toggle} from "./components/input/Toggle.tsx"
// components/input/media
export {MediaSelection} from "./components/input/media/selection/MediaSelection.tsx"
export {useSelectedMedia} from "./components/input/media/selection/useSelectedMedia.ts"

// components/alert
export {AlertContextProvider} from "./components/alert/AlertContextProvider.tsx"
export {AlertList} from "./components/alert/AlertList.tsx"
