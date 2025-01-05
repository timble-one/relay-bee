/**
 * @generated SignedSource<<2ec0788e86d4e601c8b321ef564ddbe4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MediaSelectionPaginationQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
};
export type MediaSelectionPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MediaInsertionDialog_mediaObjects">;
};
export type MediaSelectionPaginationQuery = {
  response: MediaSelectionPaginationQuery$data;
  variables: MediaSelectionPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MediaSelectionPaginationQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          }
        ],
        "kind": "FragmentSpread",
        "name": "MediaInsertionDialog_mediaObjects"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MediaSelectionPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "cacheID": "4ba276bfd11b8605a124b073c169b5e1",
    "id": null,
    "metadata": {},
    "name": "MediaSelectionPaginationQuery",
    "operationKind": "query",
    "text": "query MediaSelectionPaginationQuery(\n  $count: Int = 12\n  $cursor: String = null\n) {\n  ...MediaInsertionDialog_mediaObjects_1G22uz\n}\n\nfragment MediaInsertionDialogPotentialObject_mediaObject on MediaObject {\n  id\n  contentUrl\n}\n\nfragment MediaInsertionDialog_mediaObjects_1G22uz on Query {\n  mediaObjects(order: [{id: \"DESC\"}], first: $count, after: $cursor) {\n    edges {\n      node {\n        id\n        contentUrl\n        ...MediaInsertionDialogPotentialObject_mediaObject\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6ee172ff32bc577a94c208b680315db4";

export default node;
