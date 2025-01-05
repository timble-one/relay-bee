/**
 * @generated SignedSource<<005ccd03f1aab9e066a1f3728febcda8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaInsertionDialog_mediaObjectCursorConnection$data = {
  readonly __id: string;
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly contentUrl: string | null | undefined;
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"MediaInsertionDialogPotentialObject_mediaObject">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "MediaInsertionDialog_mediaObjectCursorConnection";
};
export type MediaInsertionDialog_mediaObjectCursorConnection$key = {
  readonly " $data"?: MediaInsertionDialog_mediaObjectCursorConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"MediaInsertionDialog_mediaObjectCursorConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MediaInsertionDialog_mediaObjectCursorConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MediaObjectEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
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
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__id",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "MediaObjectCursorConnection",
  "abstractKey": null
};

(node as any).hash = "af8621f5a6eedc6927f13ea89da62693";

export default node;
