/**
 * @generated SignedSource<<9b81c9f63a3902c98e00dca06046712f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaInsertionDialog_mediaObject$data = {
  readonly contentUrl: string | null | undefined;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"MediaInsertionDialogPotentialObject_mediaObject">;
  readonly " $fragmentType": "MediaInsertionDialog_mediaObject";
};
export type MediaInsertionDialog_mediaObject$key = {
  readonly " $data"?: MediaInsertionDialog_mediaObject$data;
  readonly " $fragmentSpreads": FragmentRefs<"MediaInsertionDialog_mediaObject">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MediaInsertionDialog_mediaObject",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MediaInsertionDialogPotentialObject_mediaObject"
    }
  ],
  "type": "MediaObject",
  "abstractKey": null
};

(node as any).hash = "16c1e68dd74f119e975d4f1e874a8da2";

export default node;
