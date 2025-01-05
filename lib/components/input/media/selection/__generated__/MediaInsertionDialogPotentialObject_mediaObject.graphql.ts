/**
 * @generated SignedSource<<f7a886d7611667e761c2e80a9890799b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaInsertionDialogPotentialObject_mediaObject$data = {
  readonly contentUrl: string | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "MediaInsertionDialogPotentialObject_mediaObject";
};
export type MediaInsertionDialogPotentialObject_mediaObject$key = {
  readonly " $data"?: MediaInsertionDialogPotentialObject_mediaObject$data;
  readonly " $fragmentSpreads": FragmentRefs<"MediaInsertionDialogPotentialObject_mediaObject">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MediaInsertionDialogPotentialObject_mediaObject",
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

(node as any).hash = "38ae188c1eb6e2efa9bbcfd00cfe1197";

export default node;
