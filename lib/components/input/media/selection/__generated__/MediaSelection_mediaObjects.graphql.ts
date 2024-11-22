/**
 * @generated SignedSource<<504a3d223d26e5a66adeaa870b21ac62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaSelection_mediaObjects$data = {
  readonly mediaObjects: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"MediaSelection_mediaObjectEdge">;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "MediaSelection_mediaObjects";
};
export type MediaSelection_mediaObjects$key = {
  readonly " $data"?: MediaSelection_mediaObjects$data;
  readonly " $fragmentSpreads": FragmentRefs<"MediaSelection_mediaObjects">;
};

import MediaSelectionPaginationQuery_graphql from './MediaSelectionPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "mediaObjects"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": 12,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": MediaSelectionPaginationQuery_graphql
    }
  },
  "name": "MediaSelection_mediaObjects",
  "selections": [
    {
      "alias": "mediaObjects",
      "args": [
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
      "name": "__MediaSelection_mediaObjects_connection",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "MediaSelection_mediaObjectEdge"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
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
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "MediaObjectPageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
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
      "storageKey": "__MediaSelection_mediaObjects_connection(order:[{\"id\":\"DESC\"}])"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "d195871ba8d88533be6b3beed7422c8f";

export default node;
