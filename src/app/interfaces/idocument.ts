import { ILeaf } from "./ileaf";

export interface IDocument {
    Title: string,
    Description: string,
    Leafs: Array<ILeaf>,
    Tags: Array<string>
}