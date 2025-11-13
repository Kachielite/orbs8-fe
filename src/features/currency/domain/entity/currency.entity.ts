export class CurrencyEntity {
    public id: number;
    public name: string;
    public symbol: string;
    public code: string;

    constructor(params: { id: number; name: string; symbol: string; code: string }) {
        this.id = params.id;
        this.name = params.name;
        this.symbol = params.symbol;
        this.code = params.code;
    }
}