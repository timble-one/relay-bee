import "./index.css"

export type {EntityDescription} from "./EntityDescription.tsx"

// -- util
export type {ExtractNodeFromEdges} from "./util/util.ts"
export {validateJSON, notEmpty} from "./util/util.ts"
export {useAuth} from "./util/useAuth.ts"
export {typeGQL, untypeGQL} from "./util/typeGQL.ts"
export {useBackendPath, useImagePath} from "./util/usePath.ts"

// util/relay
export {usePeerRelayEnv} from "./util/relay/usePeerRelayEnv.ts"
export {PeerRelayEnvironmentProvider} from "./util/relay/PeerRelayEnvironmentProvider.tsx"
export {useTypedMutation} from "./util/relay/useTypedMutation.ts"

// util/environment
export type {EnvironmentContextType} from "./util/environment/EnvironmentContext.ts"
export {EnvironmentContext} from "./util/environment/EnvironmentContext.ts"
export {useEnv} from "./util/environment/useEnv.ts"

// util/router
export {createRouteConfig} from "./util/router/createRouteConfig.tsx"
export {PeerRouterProvider} from "./util/router/PeerRouterProvider.tsx"

// -- components
export {LoadingIndicator} from "./components/LoadingIndicator.tsx"
export {PromptLayout} from "./components/PromptLayout.tsx"
export {LoginForm} from "./components/LoginForm.tsx"

// components/button
export {CircularButton} from "./components/input/button/CircularButton.ts"
export {SecondaryButton} from "./components/input/button/SecondaryButton.ts"

// components/util
export {EndlessScrollContainer} from "./components/util/endless-scroll/EndlessScrollContainer.tsx"
export {ErrorFallback} from "./components/util/ErrorFallback.tsx"
// components/util/escape
export {EscapeContext} from "./components/util/escape/EscapeContext.ts"
export {useBackOnEscape} from "./components/util/escape/useBackOnEscape.ts"

// components/page
export {RefetchListContextProvider} from "./components/page/refetch-list-context/RefetchListContextProvider.tsx"
export {ListPage} from "./components/page/list/ListPage.tsx"
export {getDefaultListRoute} from "./components/page/list/getDefaultListRoute.ts"
// components/page/list/table
export {TableHeader} from "./components/page/list/table/TableHeader.tsx"
export {TableCell} from "./components/page/list/table/TableCell.tsx"
export {TableButtons} from "./components/page/list/table/TableButtons.tsx"
export {TableBody} from "./components/page/list/table/TableBody.tsx"
export {AutoLoadTable} from "./components/page/list/table/AutoLoadTable.tsx"
export {useSorting} from "./components/page/list/table/sort/useSorting.ts"
export {useTable} from "./components/page/list/table/useTable.ts"
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
export type {SortedMediaObjectCursorConnection} from "./components/input/media/selection/multi/MultiMediaSelection.tsx"
export type {MediaObject} from "./components/input/media/selection/MediaInsertionDialog.tsx"
export {SingleMediaSelection} from "./components/input/media/selection/SingleMediaSelection.tsx"
export {MultiMediaSelection} from "./components/input/media/selection/multi/MultiMediaSelection.tsx"
export {TextEditor} from "./components/input/text-editor/TextEditor.tsx"

// components/alert
export {AlertContextProvider} from "./components/alert/AlertContextProvider.tsx"
export {AlertList} from "./components/alert/AlertList.tsx"
