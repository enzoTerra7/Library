export declare class BookDTO {
    id?: string;
    title: string;
    userId: string;
    collectionId?: string;
}
export interface GoogleApiReturn {
    kind: string;
    totalItems: number;
    items: {
        "kind": string;
        "id": string;
        "etag": string;
        "selfLink": string;
        "volumeInfo": {
            "title": string;
            "authors": string[];
            "publishedDate": string;
            "description": string;
            "industryIdentifiers": {
                "type": string;
                "identifier": string;
            }[];
            "readingModes": {
                "text": boolean;
                "image": boolean;
            };
            "pageCount": number;
            "printType": string;
            "categories": string[];
            "maturityRating": string;
            "allowAnonLogging": boolean;
            "contentVersion": string;
            "panelizationSummary": {
                "containsEpubBubbles": boolean;
                "containsImageBubbles": boolean;
            };
            "language": string;
            "previewLink": string;
            "infoLink": string;
            "canonicalVolumeLink": string;
        };
        "saleInfo": {
            "country": string;
            "saleability": string;
            "isEbook": boolean;
        };
        "accessInfo": {
            "country": string;
            "viewability": string;
            "embeddable": boolean;
            "publicDomain": boolean;
            "textToSpeechPermission": string;
            "epub": {
                "isAvailable": boolean;
            };
            "pdf": {
                "isAvailable": boolean;
            };
            "webReaderLink": string;
            "accessViewStatus": string;
            "quoteSharingAllowed": boolean;
        };
        "searchInfo": {
            "textSnippet": string;
        };
    }[];
}
