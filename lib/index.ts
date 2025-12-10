import "./index.css"

export {HttpError} from "found"
export type {EntityDescription} from "./EntityDescription.tsx"

// -- util
export {validateJSON, notEmpty, nameToId} from "./util/util.ts"
export {useAuth} from "./util/useAuth.ts"
export {typeGQL, untypeGQL} from "./util/typeGQL.ts"
export {useBackendPath, useImagePath} from "./util/usePath.ts"
export {usePrevious} from "./util/usePrevious.ts"

// util/relay
export {usePeerRelayEnv} from "./util/relay/usePeerRelayEnv.ts"
export {PeerRelayEnvironmentProvider} from "./util/relay/PeerRelayEnvironmentProvider.tsx"
export {useTypedMutation} from "./util/relay/useTypedMutation.ts"
export type {ExtractNodeFromEdges} from "./util/relay/util.ts"

// util/environment
export type {EnvironmentContextType} from "./util/environment/EnvironmentContext.ts"
export {EnvironmentContext} from "./util/environment/EnvironmentContext.ts"
export {useEnv} from "./util/environment/useEnv.ts"

// util/router
export {createRouteConfig} from "./util/router/createRouteConfig.tsx"
export {PeerRouterProvider} from "./util/router/PeerRouterProvider.tsx"
export {useRouter, useRoute} from "./util/router/util.ts"

// -- components
export {LoadingIndicator} from "./components/LoadingIndicator.tsx"
export {PromptLayout} from "./components/PromptLayout.tsx"
export {LoginForm} from "./components/LoginForm.tsx"
// components/link
export {Link} from "./components/link/Link.tsx"
export {TextLink} from "./components/link/TextLink.tsx"

// components/icon
export {Spinner} from "./components/icon/Spinner.tsx"

// components/button
export {CircularButton} from "./components/input/button/CircularButton.ts"
export {SecondaryButton} from "./components/input/button/SecondaryButton.ts"
// components/button/actions
export {AddButton} from "./components/input/button/actions/AddButton.tsx"
export {DeleteButton} from "./components/input/button/actions/DeleteButton.tsx"

// components/util
export {EndlessScrollContainer} from "./components/util/endless-scroll/EndlessScrollContainer.tsx"
// components/util/escape
export {EscapeContext} from "./components/util/escape/EscapeContext.ts"
export {useBackOnEscape} from "./components/util/escape/useBackOnEscape.ts"

// components/error
export {ErrorFallback} from "./components/error/error-fallback/ErrorFallback.tsx"
export {applyZodErrors} from "./components/error/applyZodErrors.ts"
export {NotFound} from "./components/error/NotFound.tsx"

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
export {CompactSection, WideSection, HybridSection, SectionTitle} from "./components/page/detail/Sections.tsx"

// components/input
export {DateTimeInput, DateInput} from "./components/input/DateTimeInput.tsx"
export {NumberInput} from "./components/input/NumberInput.tsx"
export {TextInput} from "./components/input/TextInput.tsx"
export {Toggle} from "./components/input/Toggle.tsx"
export {InputLabel} from "./components/input/InputLabel.tsx"
// components/input/media
export type {SortedMediaObjectCursorConnection} from "./components/input/media/selection/multi/MultiMediaSelection.tsx"
export type {MediaObject} from "./components/input/media/selection/insertion-dialog/MediaInsertionDialog.tsx"
export {MediaInsertionDialog} from "./components/input/media/selection/insertion-dialog/MediaInsertionDialog.tsx"
export {SingleMediaSelection} from "./components/input/media/selection/SingleMediaSelection.tsx"
export {MultiMediaSelection} from "./components/input/media/selection/multi/MultiMediaSelection.tsx"
// components/input/text-editor
export {TextEditor} from "./components/input/text-editor/TextEditor.tsx"
export type {Serializer as TextEditorSerializer} from "./components/input/text-editor/plugins/StatePlugin.tsx"
// components/input/select
export {SelectInput} from "./components/input/select/SelectInput.tsx"
export {SelectField} from "./components/input/select/SelectField.tsx"
export {SelectFieldInput} from "./components/input/select/SelectFieldInput.tsx"
export {BadgeSelection} from "./components/input/select/badge/BadgeSelection.tsx"
export {Badge} from "./components/input/select/badge/Badge.tsx"

// components/alert
export {AlertContextProvider} from "./components/alert/AlertContextProvider.tsx"
export {AlertList} from "./components/alert/AlertList.tsx"
