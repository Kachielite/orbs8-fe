import {CurrencyEntity} from '@/features/currency/domain/entity/currency.entity';

export class CurrencyModel extends CurrencyEntity {
    constructor(params: {
        id: number;
        name: string;
        symbol: string;
        code: string;
    }) {
        super(params);
    }

    static fromJSON(entity: CurrencyEntity): CurrencyModel {
        return new CurrencyModel({
            id: entity.id,
            name: entity.name,
            symbol: entity.symbol,
            code: entity.code,
        });
    }
}
