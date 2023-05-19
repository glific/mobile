export interface Contact {
    index: number,
    name: string|null;
};

export interface Conversation {
    __typename: string;
    contact: Contact[];
};

export interface SearchResponse {
    search: Conversation[];
};


