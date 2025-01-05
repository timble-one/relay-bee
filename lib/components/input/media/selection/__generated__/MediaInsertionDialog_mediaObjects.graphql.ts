/**
 * @generated SignedSource<<0e674ca704365ef2b9c2013629e87d80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaInsertionDialog_mediaObjects$data = {
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
  readonly " $fragmentType": "MediaInsertionDialog_mediaObjects";
};
export type MediaInsertionDialog_mediaObjects$key = {
  readonly " $data"?: MediaInsertionDialog_mediaObjects$data;
  readonly " $fragmentSpreads": FragmentRefs<"MediaInsertionDialog_mediaObjects">;
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
  "name": "MediaInsertionDialog_mediaObjects",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
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

(node as any).hash = "6ee172ff32bc577a94c208b680315db4";

export default node;
