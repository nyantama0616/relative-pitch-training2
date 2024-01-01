export interface IMidiMessage {
    type: MessageType
    note: number
    options?: IMessageOption
}

export enum MessageType {
    On = "On",
    Off = "Off"
}

export interface IMessageOption {
    duration?: number //msec
    velocity?: number //0 ~ 127?
}
