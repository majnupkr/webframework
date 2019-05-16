"use strict";
const es = require("elasticsearch");
const Settings = require("../lib/metadata/Settings");
class ElasticSearchClient {
    constructor(index, type) {
        this.client = new es.Client({
            host: Settings.getDBHost()
        });
        this._index = index.toLowerCase();
        this._type = type.toLowerCase();
    }
    putDoc(_body, _id) {
        this.client.index({
            opType: "index",
            index: this._index,
            type: this._type,
            body: _body,
            id: _id
        });
    }
}
exports.ElasticSearchClient = ElasticSearchClient;
