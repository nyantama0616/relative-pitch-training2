import Note from "../enums/Note";
import { IMidiMessage } from "./IMidiMessage";
import Sound from "../enums/Sound";

export default interface ISoundPlayer {
    playNote(note: Note, duration: number, sound: Sound): void
    sendMessage(message: IMidiMessage): void
}
