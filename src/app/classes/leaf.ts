import { ILeaf } from '../interfaces/ileaf';

export class Leaf implements ILeaf {
    constructor(
        public Id: string,
        public Title: string,
        public Content: string | undefined,
        public Tags: Array<string>)
    { }
}
