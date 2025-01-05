/**
 * @generated SignedSource<<e92f48ed66298e01bfbc6f246b3a26ed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SingleMediaSelection$data = {
  readonly contentUrl: string | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "SingleMediaSelection";
};
export type SingleMediaSelection$key = {
  readonly " $data"?: SingleMediaSelection$data;
  readonly " $fragmentSpreads": FragmentRefs<"SingleMediaSelection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SingleMediaSelection",
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

(node as any).hash = "4b1882edd71ff98f0bd9e8e84715b80f";

export default node;
