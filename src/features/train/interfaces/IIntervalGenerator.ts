import IInterval from "./IInterval";

//問題を生成する役割
export default interface IIntervalGenerator {
    generate(): IInterval | null//次の問題を生成する
    note1Candidates: number[]//音程の候補
}
