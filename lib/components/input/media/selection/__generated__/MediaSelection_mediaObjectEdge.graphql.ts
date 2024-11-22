/**
 * @generated SignedSource<<43c7cc60ba5e053ab3099e600025d5a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaSelection_mediaObjectEdge$data = {
  readonly node: {
    readonly contentUrl: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"MediaSelection_mediaObject">;
  } | null | undefined;
  readonly " $fragmentType": "MediaSelection_mediaObjectEdge";
};
export type MediaSelection_mediaObjectEdge$key = {
  readonly " $data"?: MediaSelection_mediaObjectEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"MediaSelection_mediaObjectEdge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MediaSelection_mediaObjectEdge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MediaObject",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
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
          "name": "MediaSelection_mediaObject"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MediaObjectEdge",
  "abstractKey": null
};

(node as any).hash = "7da4360623405c5000197e077f02ec3c";

export default node;
