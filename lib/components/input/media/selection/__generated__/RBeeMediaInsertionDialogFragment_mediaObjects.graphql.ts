/**
 * @generated SignedSource<<2d749fea9430f839b2d18ea0eab1e7f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RBeeMediaInsertionDialogFragment_mediaObjects$data = {
  readonly mediaObjects: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly contentUrl: string | null | undefined;
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"RBeeMediaInsertionDialogPotentialObjectFragment_mediaObject">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "RBeeMediaInsertionDialogFragment_mediaObjects";
};
export type RBeeMediaInsertionDialogFragment_mediaObjects$key = {
  readonly " $data"?: RBeeMediaInsertionDialogFragment_mediaObjects$data;
  readonly " $fragmentSpreads": FragmentRefs<"RBeeMediaInsertionDialogFragment_mediaObjects">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RBeeMediaInsertionDialogFragment_mediaObjects",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 12
        },
        {
          "kind": "Literal",
          "name": "order",
          "value": [
            {
              "id": "DESC"
            }
          ]
        }
      ],
      "concreteType": "MediaObjectCursorConnection",
      "kind": "LinkedField",
      "name": "mediaObjects",
      "plural": false,
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
                  "name": "RBeeMediaInsertionDialogPotentialObjectFragment_mediaObject"
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
      "storageKey": "mediaObjects(first:12,order:[{\"id\":\"DESC\"}])"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "78d2730d92f038ebfca285d2fea618e2";

export default node;
