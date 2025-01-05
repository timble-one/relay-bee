/**
 * @generated SignedSource<<497a242c3166a91dd04134711af00854>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaInsertionDialogFragment_mediaObjects$data = {
  readonly mediaObjects: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly contentUrl: string | null | undefined;
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"MediaInsertionDialogPotentialObject_mediaObject">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "MediaInsertionDialogFragment_mediaObjects";
};
export type MediaInsertionDialogFragment_mediaObjects$key = {
  readonly " $data"?: MediaInsertionDialogFragment_mediaObjects$data;
  readonly " $fragmentSpreads": FragmentRefs<"MediaInsertionDialogFragment_mediaObjects">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MediaInsertionDialogFragment_mediaObjects",
  "selections": [
    {
      "alias": null,
      "args": null,
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
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "d3208176e1ee298ff08b1982bfb60d41";

export default node;
