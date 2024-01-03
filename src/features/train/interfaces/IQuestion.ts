import IInterval from "./IInterval";
import IKeyPush from "./IKeyPush";

export default interface IQuestion {
    interval: IInterval, 
    startTime: number, //問題が開始された時刻(トレーニング開始からの経過時間)
    keyPushes: IKeyPush[], //正答までに押されたキーの配列
}
