import IQuestionnaire from "../interfaces/IQuestionnaire";
import IFormQuestionnaire, { Answers } from "../interfaces/IFormQuestionnaire";
import { useDependency } from "../../../general/contexts/DependencyContext";
import { useAuth } from "../../auth/contexts/AuthContext";
import { IQuestionnaireItem } from "../interfaces/IQuestionnaire";

import { useEffect, useState } from "react";
export default function useFormQuestionnaire(questionnaire: IQuestionnaire): IFormQuestionnaire {
    const items = questionnaire.data;
    const [answers, setAnswers] = useState<Answers>({});

    const { usePostQuestionnaire } = useDependency();
    const postQuestionnaire = usePostQuestionnaire();
    const { currentUser } = useAuth();

    useEffect(() => {
        _initAnswers();
    }, [questionnaire]);

    function handleChangeItem(itemId: number, value: string) {
        console.log(`handleChangeItem(${itemId}, ${value})`);
        
        const item = items.find(item => {
            return item.id == itemId
        });

        if (item === undefined) {
            console.error(`Cannot find item with id ${itemId}`);
            return;
        }
        
        if (item.maxSelectNum > 1) {
            item.answer.split(", ").forEach((x, index) => {                
                if (x === value) {
                    setAnswers(prev => {
                        const prevAnswer = prev[itemId].answer as boolean[];
                        let newAnswers = [...prevAnswer];
                        newAnswers[index] = !newAnswers[index];

                        const prevItem = prev[itemId];
                        return {
                            ...prev,
                            [itemId]: {
                                ...prevItem,
                                answer: newAnswers,
                            }
                        }
                    });
                }
            });
        } else {
            setAnswers(prev => {
                const prevItem = prev[itemId];
                return {
                    ...prev,
                    [itemId]: {
                        ...prevItem,
                        answer: value,
                    }
                }
            });
        }
    }

    function handleChangeRemarks(itemId: number, value: string) {
        setAnswers(prev => {
            const prevItem = prev[itemId];
            return {
                ...prev,
                [itemId]: {
                    ...prevItem,
                    remarks: value,
                }
            }
        });
    }

    function handleReset() {
        _initAnswers();
    }

    function handleSubmit() {
        let data: IQuestionnaireItem[] = [];
        items.forEach(item => {
            let answer: string;
            if (typeof answers[item.id].answer == "string") {
                answer = answers[item.id].answer as string;
            } else {
                const flags = answers[item.id].answer as boolean[];
                let t: string[] = [];
                item.answer.split(", ").forEach((x, index) => {
                    if (flags[index]) {
                        t.push(x);
                    }
                });
                answer = t.join(", ");
            }
            data.push({
                id: item.id,
                content: item.content,
                answer: answer,
                maxSelectNum: item.maxSelectNum,
                remarks: answers[item.id].remarks,
            });
        });

        if (currentUser === null) {
            console.error("User is null");
            return;
        }

        console.log(data);
        
        postQuestionnaire.post({
            questionnaireName: questionnaire.questionnaireName,
            data: data,
            userId: currentUser!.id,
        });
    }

    function _initAnswers() {
        let _answers: Answers = {};
        items.forEach(item => {
            if (item.maxSelectNum > 1) {
                const len = item.answer.split(", ").length;
                _answers[item.id] = {
                    answer: Array(len).fill(false),
                    remarks: "",
                };
            } else {
                _answers[item.id] = {
                    answer: "",
                    remarks: "",
                };
            }
        });
        setAnswers(_answers);
    }

    function isFullFilled() {
        let fullFilled = true;
        items.forEach(item => {
            if (item.maxSelectNum == 1) {
                if (answers[item.id].answer === "") {
                    fullFilled = false;
                }
            }
        });
        return fullFilled;
    }

    return {
        items,
        answers,
        handleChangeItem,
        handleChangeRemarks,
        handleReset,
        handleSubmit,
        isFullFilled,
    }
}
