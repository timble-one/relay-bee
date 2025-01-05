/**
 * @generated SignedSource<<28910c1708707bcfd179d0d2da773077>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RBeeMediaInsertionDialogPotentialObjectFragment_mediaObject$data = {
  readonly contentUrl: string | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "RBeeMediaInsertionDialogPotentialObjectFragment_mediaObject";
};
export type RBeeMediaInsertionDialogPotentialObjectFragment_mediaObject$key = {
  readonly " $data"?: RBeeMediaInsertionDialogPotentialObjectFragment_mediaObject$data;
  readonly " $fragmentSpreads": FragmentRefs<"RBeeMediaInsertionDialogPotentialObjectFragment_mediaObject">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RBeeMediaInsertionDialogPotentialObjectFragment_mediaObject",
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

(node as any).hash = "2d4727bb60185da5486a440e6a6b88ab";

export default node;
