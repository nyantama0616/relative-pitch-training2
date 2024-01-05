import IIntervalGenerator from "../interfaces/IIntervalGenerator";
import IInterval from "../interfaces/IInterval";
import Note from "../../sounds/enums/Note";

const note1Candidates = [Note.D3, Note.E3, Note.F3, Note.G3, Note.A3, Note.B3, Note.D4, Note.E4, Note.F4, Note.G4, Note.A4, Note.B4];
// const note1Candidates = [Note.B3, Note.D4];

//TODO: やっぱhookにするかも
export default class IntervalGeneratorRandom implements IIntervalGenerator {
    private notes: Note[] = [];
    private index: number = 0;

    constructor(n: number) {
        this._initNotes(n);
        this.generate = this.generate.bind(this);
    }

    public generate(): IInterval {
        if (this.index >= this.notes.length) {
            console.error(`IntervalGeneratorRandom: index out of range, index = ${this.index}, notes.length = ${this.notes.length}`);
        }

        const note0 = Note.C4;
        const note1 = this.notes[this.index++];

        return {
            note0, //C4
            note1 //D3 ~ B3 or D4 ~ B4
        }
    }
    
    private _randInt(min: number, max: number): number {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    //各音をn回ずつ配列に入れてシャッフルする
    private _initNotes(n: number) {
        this.notes = [];
        for (let i = 0; i < note1Candidates.length; i++) {
            for (let j = 0; j < n; j++) {
                this.notes.push(note1Candidates[i]);
            }
        }
        this._shuffleNotes(this.notes);
    }

    // Fisher-Yates shuffleを少し改良した
    private _shuffleNotes(notes: Note[]) {
        let prevNote = Note.C0;
        for (let i = notes.length - 1; i > 0; i--) {
            let j;

            // 同じ音が連続しないようにする
            while (true) {
                j = this._randInt(0, i);
                if (notes[j] !== prevNote) {
                    break;
                }
            }

            [notes[i], notes[j]] = [notes[j], notes[i]];
            prevNote = notes[i];
        }
    }
}
