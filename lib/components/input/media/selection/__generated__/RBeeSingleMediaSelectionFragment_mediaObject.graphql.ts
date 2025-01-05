/**
 * @generated SignedSource<<ba9744c36fd7ff54074d5f93d2c301ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RBeeSingleMediaSelectionFragment_mediaObject$data = {
  readonly contentUrl: string | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "RBeeSingleMediaSelectionFragment_mediaObject";
};
export type RBeeSingleMediaSelectionFragment_mediaObject$key = {
  readonly " $data"?: RBeeSingleMediaSelectionFragment_mediaObject$data;
  readonly " $fragmentSpreads": FragmentRefs<"RBeeSingleMediaSelectionFragment_mediaObject">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RBeeSingleMediaSelectionFragment_mediaObject",
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

(node as any).hash = "8a01aa8a7f8b2206ec61361dd01eb03d";

export default node;
