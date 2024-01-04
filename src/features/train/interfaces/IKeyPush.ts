import Note from "../../sounds/enums/Note";

export default interface IKeyPush {
    note: Note,
    time: number, //トレーニング開始からの経過時間
}
