import { IDocument } from "../interfaces/idocument";
import { ILeaf } from "../interfaces/ileaf";

export class Document implements IDocument {
    constructor(
        public Title: string,
        public Description: string,
        public Leafs: Array<ILeaf>,
        public Tags: Array<string>)
    {}
}
