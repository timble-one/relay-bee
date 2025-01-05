/**
 * @generated SignedSource<<e95cf47d5f622cd9e852ec1c5dc8cba6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SingleMediaSelection_mediaObjectCursorConnection$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MediaInsertionDialog_mediaObjectCursorConnection">;
  readonly " $fragmentType": "SingleMediaSelection_mediaObjectCursorConnection";
};
export type SingleMediaSelection_mediaObjectCursorConnection$key = {
  readonly " $data"?: SingleMediaSelection_mediaObjectCursorConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"SingleMediaSelection_mediaObjectCursorConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SingleMediaSelection_mediaObjectCursorConnection",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MediaInsertionDialog_mediaObjectCursorConnection"
    }
  ],
  "type": "MediaObjectCursorConnection",
  "abstractKey": null
};

(node as any).hash = "e5356d8fecdebfa9dcf91f58c55b7fa5";

export default node;
