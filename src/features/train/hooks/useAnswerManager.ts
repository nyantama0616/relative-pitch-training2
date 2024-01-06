import IMidiIO from "../../sounds/interfaces/IMidiIO";
import IAnswerManager from "../interfaces/IAnswerManager";
import Note from "../../sounds/enums/Note";
import { useEffect, useRef, useState } from "react";
import getNoteName from "../../sounds/lib/getNoteName";
import IInterval from "../interfaces/IInterval";

interface Props {
    midiIO: IMidiIO;
    isAnswerable: boolean;
    currentInterval: IInterval | null;
    onRight: (note: Note) => void;
    onWrong: (note: Note) => void;
}
export default function useAnswerManager({ midiIO, isAnswerable, currentInterval, onRight, onWrong }: Props): IAnswerManager {
    const [isRunning, setIsRunning] = useState(false);

    const pushedNotesRef = useRef<Set<Note>>(new Set());

    useEffect(() => {
        if (!isRunning) return;
        
        const note = midiIO.inputMessage?.note;
        if (!note) return;
        
        if (midiIO.inputMessage!.type === "On") {
            pushedNotesRef.current.add(note);
        } else {
            pushedNotesRef.current.delete(note);
        }        
        
        if (!isAnswerable || currentInterval === null || pushedNotesRef.current.size !== 2) return;
        
        //正解判定
        //TODO: 1音目がC4であることを正解条件に追加する
        if (pushedNotesRef.current.has(currentInterval.note0) && pushedNotesRef.current.has(currentInterval.note1)) {
            onRight(note);
        } else {
            onWrong(note);
        }
    }, [midiIO.inputMessage]);

    function start() {
        setIsRunning(true);
    }
    
    function stop() {
        setIsRunning(false);
    }

    return {
        start,
        stop,
    }
}
