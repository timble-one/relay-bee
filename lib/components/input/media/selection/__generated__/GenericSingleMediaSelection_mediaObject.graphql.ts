/**
 * @generated SignedSource<<e2e67103440a79ed89748cfd9e1f0c47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GenericSingleMediaSelection_mediaObject$data = {
  readonly contentUrl: string | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "GenericSingleMediaSelection_mediaObject";
};
export type GenericSingleMediaSelection_mediaObject$key = {
  readonly " $data"?: GenericSingleMediaSelection_mediaObject$data;
  readonly " $fragmentSpreads": FragmentRefs<"GenericSingleMediaSelection_mediaObject">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GenericSingleMediaSelection_mediaObject",
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

(node as any).hash = "21c48e6e7c1f2f0f354b0da54191f4e7";

export default node;
