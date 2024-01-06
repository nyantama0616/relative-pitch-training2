import IInterval from "./IInterval";

//問題を生成する役割
export default interface IIntervalGenerator {
    generate(): IInterval //次の問題を生成する
}
