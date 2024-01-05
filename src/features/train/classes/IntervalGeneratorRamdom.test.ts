import IntervalGeneratorRandom from "./IntervalGeneratorRandom";
import Note from "../../sounds/enums/Note";

const note1Candidates = [Note.D3, Note.E3, Note.F3, Note.G3, Note.A3, Note.B3, Note.D4, Note.E4, Note.F4, Note.G4, Note.A4, Note.B4];

describe("Test GenerateCounterRandom", () => {
    let n: number;
    let questionNum: number;
    let generator: IntervalGeneratorRandom;
    beforeEach(() => {
        n = 5;
        questionNum = n * note1Candidates.length;
        generator = new IntervalGeneratorRandom(n);
    });

    test("note0がC4である", () => {
        for (let i = 0; i < questionNum; i++) {
            const interval = generator.generate();
            expect(interval.note0).toBe(Note.C4);
        }
    });

    test("note1がD3 ~ B3 or D4 ~ B4である", () => {
        for (let i = 0; i < questionNum; i++) {
            const interval = generator.generate();
            expect(note1Candidates).toContain(interval.note1);
        }
    });

    test("ランダムに問題が生成される", async () => {
        let dict: { [key: number]: number } = {};
        for (let note of note1Candidates) {
            dict[note] = 0;
        }
        
        for (let i = 0; i < questionNum; i++) {
            const question = generator.generate();
            dict[question.note1]++;
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
            const question = generator.generate();
            dict[question.note1]++;
        }

        for (let note of note1Candidates) {
            expect(dict[note]).toBe(n);
        }
    });

    test("連続した音が生成されない", async () => {
        let prevNote = Note.C0;
        for (let i = 0; i < questionNum; i++) {
            const question = generator.generate();
            expect(question.note1).not.toBe(prevNote);
            prevNote = question.note1;
        }
    });
});
