import { IMidiMessage } from "./IMidiMessage";

export default interface IMidiIO {
    availableInputDevices: string[]; //使用可能な可能なMIDI Inputデバイス一覧
    availableOutputDevices: string[]; //使用可能な可能なMIDI Outputデバイス一覧
    updateAvailableDevices(): void //利用可能なデバイス一覧を更新
    currentInputDevice: string //現在使用中のInputデバイス
    currentOutputDevice: string //現在使用中のOutputデバイス
    setInput(deviceName: string): void; //Inputに使用するMIDIデバイスを決定
    setOutput(deviceName: string): void; //Outputに使用するMIDIデバイスを決定
    inputMessage: IMidiMessage | null //MIDIデバイスから受け取ったメッセージ. こいつをstateで管理する.
    sendMessage(message: IMidiMessage): void; //MIDIデバイスにメッセージ送信
}
