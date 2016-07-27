export class Field {
    constructor(
       public name: string,
       public title: string,
       public mask: string
    ) {}
}

export class Provider {
    constructor(
        public id: number,
        public name: string,
        public commission: number,
        public fields: Field[]
    ) {}
}