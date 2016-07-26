export class User {
    constructor(
        public username: string,
        public enabled: boolean,
        public id: number,
        creationDate: string
    ) {}
}

export class AmountState {
    constructor(
        public count: number,
        public sum: number,
        public max: number,
        public min: number,
        public avg: number,
        public date: string
    ) {}
}

export class GroupedActionCodes {
    constructor(
        public time: string,
        public codes : {
            name: string,
            count: number
        }[]
    ) {}
}

export class PaymentState {
    constructor(
        public state: string,
        public count: number
    ) {}
}