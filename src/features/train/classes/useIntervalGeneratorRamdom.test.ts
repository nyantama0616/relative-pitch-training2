import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Note from "../../sounds/enums/Note";
import useIntervalGeneratorRandom from "./useIntervalGeneratorRandom";
import IIntervalGenerator from "../interfaces/IIntervalGenerator";
import IInterval from "../interfaces/IInterval";

describe("Test GenerateCounterRandom", () => {
    let n: number;
    let result: { current: IIntervalGenerator; } = null!;
    let questionNum: number;
    let note1Candidates: number[];
    beforeEach(() => {
        n = 5;
        result = renderHook(() => {
            return useIntervalGeneratorRandom(n);
        }).result; 
        note1Candidates = result.current.note1Candidates;
        questionNum = n * note1Candidates.length;
    });

    test("note0がC4である", async () => {
        for (let i = 0; i < questionNum; i++) {
            let interval: IInterval;
            
            await act(async () => {
                interval = result.current.generate()!;
            });

            expect(interval!.note0).toBe(Note.C4);
        }
    });

    test("note1がD3 ~ B3 or D4 ~ B4である", async () => {
        for (let i = 0; i < questionNum; i++) {
            let interval: IInterval;
            
            await act(async () => {
                interval = result.current.generate()!;
            });

            expect(note1Candidates).toContain(interval!.note1);
        }
    });

    test("ランダムに問題が生成される", async () => {
        let dict: { [key: number]: number } = {};
        for (let note of note1Candidates) {
            dict[note] = 0;
        }
        
        for (let i = 0; i < questionNum; i++) {
            let interval: IInterval;
            
            await act(async () => {
                interval = result.current.generate()!;
            });

            dict[interval!.note1]++;
        }

        const diffMinMax = Math.max(...Object.values(dict)) - Math.min(...Object.values(dict));
        expect(diffMinMax).toBe(0);
    });

    test("問題がn回ずつ生成される", async () => {
        let dict: { [key: number]: number } = {};
        for (let note of note1Candidates) {
            dict[note] = 0;
        }
        
        for (let i = 0; i < questionNum; i++) {
            let interval: IInterval;

            await act(async () => {
                interval = result.current.generate()!;
            });

            dict[interval!.note1]++;
        }

        for (let note of note1Candidates) {
            expect(dict[note]).toBe(n);
        }
    });

    test("連続した音が生成されない", async () => {
        let prevNote = Note.C0;
        for (let i = 0; i < questionNum; i++) {
            let interval: IInterval;

            await act(async () => {
                interval = result.current.generate()!;
            });

            expect(interval!.note1).not.toBe(prevNote);
            prevNote = interval!.note1;
        }
    });

    test("questionNumを超えてgenerate()を呼び出すとnullが返る", async () => {
        for (let i = 0; i < questionNum; i++) {
            await act(async () => {
                result.current.generate();
            });
        }

        let interval: IInterval | null;
        await act(async () => {
            interval = result.current.generate();
        });

        expect(interval!).toBeNull(); 
    });
});
