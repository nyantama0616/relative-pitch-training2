import Note from "../../sounds/enums/Note";

export default interface IKeyPush {
    Note: Note,
    Time: number, //トレーニング開始からの経過時間
}
