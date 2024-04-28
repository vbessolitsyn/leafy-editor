export class Alert {
    constructor(public Type: ALertTypes,
        public Message: string
    ) {}
}

export enum ALertTypes {
    Info = 1,
    Warning
}