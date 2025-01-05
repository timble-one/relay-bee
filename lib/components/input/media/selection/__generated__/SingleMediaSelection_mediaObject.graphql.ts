/**
 * @generated SignedSource<<b03f0d1079c5d697ea9172e7af57747d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SingleMediaSelection_mediaObject$data = {
  readonly contentUrl: string | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "SingleMediaSelection_mediaObject";
};
export type SingleMediaSelection_mediaObject$key = {
  readonly " $data"?: SingleMediaSelection_mediaObject$data;
  readonly " $fragmentSpreads": FragmentRefs<"SingleMediaSelection_mediaObject">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SingleMediaSelection_mediaObject",
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

(node as any).hash = "d906554d19b186cf4ea96cba030684a8";

export default node;
