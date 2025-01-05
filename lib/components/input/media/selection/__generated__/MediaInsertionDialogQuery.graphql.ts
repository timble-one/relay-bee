/**
 * @generated SignedSource<<a3a65503e785c5efec6c1e57273cecec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaInsertionDialogQuery$variables = Record<PropertyKey, never>;
export type MediaInsertionDialogQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MediaInsertionDialog_mediaObjects">;
};
export type MediaInsertionDialogQuery = {
  response: MediaInsertionDialogQuery$data;
  variables: MediaInsertionDialogQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MediaInsertionDialogQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "MediaInsertionDialog_mediaObjects"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MediaInsertionDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
        "storageKey": "mediaObjects(first:12,order:[{\"id\":\"DESC\"}])"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": [
          "order"
        ],
        "handle": "connection",
        "key": "MediaSelection_mediaObjects",
        "kind": "LinkedHandle",
        "name": "mediaObjects"
      }
    ]
  },
  "params": {
    "cacheID": "31287f045c8510308ef5a6c1456e60e3",
    "id": null,
    "metadata": {},
    "name": "MediaInsertionDialogQuery",
    "operationKind": "query",
    "text": "query MediaInsertionDialogQuery {\n  ...MediaInsertionDialog_mediaObjects\n}\n\nfragment MediaInsertionDialogPotentialObject_mediaObject on MediaObject {\n  id\n  contentUrl\n}\n\nfragment MediaInsertionDialog_mediaObjects on Query {\n  mediaObjects(order: [{id: \"DESC\"}], first: 12) {\n    edges {\n      node {\n        id\n        contentUrl\n        ...MediaInsertionDialogPotentialObject_mediaObject\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7c4a5e9f6493509bf5fa7ed835c65daa";

export default node;
