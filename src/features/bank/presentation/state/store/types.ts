import {BankEntity} from "@/features/bank/domain/entity/bank.entity";

export type BankSlice = {
    // State
    banks: BankEntity[] | null;
    bank: BankEntity | null;
    // actions
    setBanks: (banks: BankEntity[] | null) => void;
    setBank: (bank: BankEntity | null) => void;
}