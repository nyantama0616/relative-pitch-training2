export default interface IKeyPressManager {
    keyDownInfo: IKeyDownInfo //押されたキーの情報
    handleKeyDown(e: React.KeyboardEvent<Element>): void //この関数をdiv要素などのonKeyDownにセットする
    keyUpInfo: IKeyUpInfo //離されたキーの情報
    handleKeyUp(e: React.KeyboardEvent<Element>): void //この関数をdiv要素などのonKeyUpにセットする
}

export interface IKeyDownInfo {
    count: number //キーが今までに押された回数. 多分countがないと、前回と同じキーを押された時にstateが更新されない TODO: いらんかも
    key: string //どのキーが押されたか
}

export interface IKeyUpInfo {
    count: number //キーが今までに離された回数. 多分countがないと、前回と同じキーを押された時にstateが更新されない
    key: string //どのキーが離されたか
}
