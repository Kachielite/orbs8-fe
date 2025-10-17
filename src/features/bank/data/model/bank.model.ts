import {BankEntity} from "@/features/bank/domain/entity/bank.entity";

export class BankModel extends BankEntity {
    constructor(params: { id: number; name: string }) {
        super(params);
    }

    static fromJSON(entity: BankEntity): BankModel {
        return new BankModel({
            id: entity.id,
            name: entity.name,
        });
    }
}