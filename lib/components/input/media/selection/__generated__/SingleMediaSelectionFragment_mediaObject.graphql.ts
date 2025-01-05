/**
 * @generated SignedSource<<42352f48ea18d338fcdef2e95d01fd74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SingleMediaSelectionFragment_mediaObject$data = {
  readonly contentUrl: string | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "SingleMediaSelectionFragment_mediaObject";
};
export type SingleMediaSelectionFragment_mediaObject$key = {
  readonly " $data"?: SingleMediaSelectionFragment_mediaObject$data;
  readonly " $fragmentSpreads": FragmentRefs<"SingleMediaSelectionFragment_mediaObject">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SingleMediaSelectionFragment_mediaObject",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contentUrl",
      "storageKey": null
    }
  ],
  "type": "MediaObject",
  "abstractKey": null
};

(node as any).hash = "764af7890139941712fcf316da87e8d0";

export default node;
