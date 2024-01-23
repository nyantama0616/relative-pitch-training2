import IMidiIO from "../../sounds/interfaces/IMidiIO";
import IAnswerManager from "../interfaces/IAnswerManager";
import Note from "../../sounds/enums/Note";
import { useEffect, useRef, useState } from "react";
import getNoteName from "../../sounds/lib/getNoteName";
import IInterval from "../interfaces/IInterval";
import { useDependency } from "../../../general/contexts/DependencyContext";

interface Props {
    midiIO: IMidiIO;
    isAnswerable: boolean;
    currentInterval: IInterval | null;
    flagPlayNoteOnAnswer?: boolean;
    onRight: (note: Note) => void;
    onWrong: (note: Note) => void;
}
export default function useAnswerManager({ midiIO, isAnswerable, currentInterval, flagPlayNoteOnAnswer=false, onRight, onWrong }: Props): IAnswerManager {
    const [isRunning, setIsRunning] = useState(false);
    
    const pushedNotesRef = useRef<Set<Note>>(new Set());
    
    const { useSoundPlayerWithTone } = useDependency();
    const soundPlayer = useSoundPlayerWithTone();

    useEffect(() => {
        if (!isRunning) return;

        const note = midiIO.inputMessage?.note;
        if (!note) return;
        
        /*
            TODO: [要修正] addされたのにdeleteされない時がある
            恐らく、keyPressManagerのせい
        */
        if (midiIO.inputMessage!.type === "On") {
            pushedNotesRef.current.add(note);
            if (flagPlayNoteOnAnswer) soundPlayer.playNote(note, 500); //TODO: 適切な長さにする
        } else {
            pushedNotesRef.current.delete(note);
        }

        // console.log(pushedNotesRef.current);
        
        if (!isAnswerable || currentInterval === null || pushedNotesRef.current.size !== 2) return;
        
        //正解判定
        //TODO: 1音目がC4であることを正解条件に追加する
        if (pushedNotesRef.current.has(currentInterval.note0) && pushedNotesRef.current.has(currentInterval.note1)) {
            // console.log("right!");
            onRight(note);
            
        } else {
            // console.log("wrong!");
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
