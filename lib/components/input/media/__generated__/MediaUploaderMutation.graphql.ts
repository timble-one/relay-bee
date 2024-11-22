/**
 * @generated SignedSource<<9a1d9c3ecc55ea0bef790291ba1e5c85>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MediaUploaderMutation$variables = {
  connections: ReadonlyArray<string>;
  file: any;
};
export type MediaUploaderMutation$data = {
  readonly uploadMediaObject: {
    readonly mediaObject: {
      readonly contentUrl: string | null | undefined;
      readonly id: string;
    } | null | undefined;
  } | null | undefined;
};
export type MediaUploaderMutation = {
  response: MediaUploaderMutation$data;
  variables: MediaUploaderMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "connections"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "file"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "file",
        "variableName": "file"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "MediaObject",
  "kind": "LinkedField",
  "name": "mediaObject",
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
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MediaUploaderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "uploadMediaObjectPayload",
        "kind": "LinkedField",
        "name": "uploadMediaObject",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MediaUploaderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "uploadMediaObjectPayload",
        "kind": "LinkedField",
        "name": "uploadMediaObject",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "mediaObject",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "MediaObjectEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "048768f7a3239be9266876b571092f43",
    "id": null,
    "metadata": {},
    "name": "MediaUploaderMutation",
    "operationKind": "mutation",
    "text": "mutation MediaUploaderMutation(\n  $file: Upload!\n) {\n  uploadMediaObject(input: {file: $file}) {\n    mediaObject {\n      id\n      contentUrl\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ab1ef97fce19c28f6cf4afb43267361d";

export default node;
