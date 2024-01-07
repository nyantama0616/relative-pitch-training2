import IIntervalGenerator from "../interfaces/IIntervalGenerator";
import IInterval from "../interfaces/IInterval";
import Note from "../../sounds/enums/Note";
import { useEffect, useState, useCallback } from "react";

// const note1Candidates = [Note.D3, Note.E3, Note.F3, Note.G3, Note.A3, Note.B3, Note.D4, Note.E4, Note.F4, Note.G4, Note.A4, Note.B4];
const note1Candidates = [Note.B3, Note.D4];

export default function useIntervalGeneratorRandom(n: number): IIntervalGenerator {
    const [notes, setNotes] = useState<Note[]>([]);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        _initNotes(n);
    }, []);

    function generate(): IInterval | null {        
        if (index >= notes.length) {
            return null;
        }

        const note0 = Note.C4;
        const note1 = notes[index];

        setIndex(index + 1);

        return {
            note0, //C4
            note1 //D3 ~ B3 or D4 ~ B4
        }
    }

    //各音をn回ずつ配列に入れてシャッフルする
    function _initNotes(n: number) {
        let a: Note[] = [];
        for (let i = 0; i < note1Candidates.length; i++) {
            for (let j = 0; j < n; j++) {
                a.push(note1Candidates[i]);
            }
        }
        _shuffleNotes(a);
        
        setNotes(a);
    }

    // Fisher-Yates shuffleを少し改良した
    function _shuffleNotes(notes: Note[]) {
        let prevNote = Note.C0;
        for (let i = notes.length - 1; i > 0; i--) {
            let j;

            // 同じ音が連続しないようにする
            while (true) {
                j = _randInt(0, i);
                if (notes[j] !== prevNote) {
                    break;
                }
            }

            [notes[i], notes[j]] = [notes[j], notes[i]];
            prevNote = notes[i];
        }
    }

    function _randInt(min: number, max: number): number {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    return {
        generate,
        note1Candidates,
    }
}
