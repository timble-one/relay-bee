import {graphql} from "relay-runtime";

export const RBeeSingleMediaSelectionFragment = graphql`
    fragment RBeeSingleMediaSelectionFragment_mediaObject on MediaObject {
        id contentUrl
    }
`