/**
 * @generated SignedSource<<35e901c41857b963b20a0f357e993df1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaSelectionQuery$variables = Record<PropertyKey, never>;
export type MediaSelectionQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MediaSelection_mediaObjects">;
};
export type MediaSelectionQuery = {
  response: MediaSelectionQuery$data;
  variables: MediaSelectionQuery$variables;
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
    "name": "MediaSelectionQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "MediaSelection_mediaObjects"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MediaSelectionQuery",
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
                    "name": "contentUrl",
                    "storageKey": null
                  },
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
    "cacheID": "a9b370a18e30451f070e1a5c2887e5c2",
    "id": null,
    "metadata": {},
    "name": "MediaSelectionQuery",
    "operationKind": "query",
    "text": "query MediaSelectionQuery {\n  ...MediaSelection_mediaObjects\n}\n\nfragment MediaSelection_mediaObject on MediaObject {\n  id\n  contentUrl\n}\n\nfragment MediaSelection_mediaObjectEdge on MediaObjectEdge {\n  node {\n    contentUrl\n    ...MediaSelection_mediaObject\n    id\n  }\n}\n\nfragment MediaSelection_mediaObjects on Query {\n  mediaObjects(order: [{id: \"DESC\"}], first: 12) {\n    edges {\n      ...MediaSelection_mediaObjectEdge\n      cursor\n      node {\n        __typename\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a7175f6b5278988f0803095bec298be5";

export default node;
