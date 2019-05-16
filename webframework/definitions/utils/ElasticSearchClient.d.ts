/// <reference types="elasticsearch" />
import es = require('elasticsearch');
export declare class ElasticSearchClient {
    client: es.Client;
    _index: string;
    _type: string;
    constructor(index: string, type: string);
    putDoc(_body: Object, _id?: string): void;
}
