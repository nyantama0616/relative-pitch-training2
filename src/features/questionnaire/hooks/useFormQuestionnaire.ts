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
                        const prevAnswer = prev[itemId] as boolean[];
                        let newAnswers = [...prevAnswer];
                        newAnswers[index] = !newAnswers[index];
                        return {
                            ...prev,
                            [itemId]: newAnswers,
                        }
                    });
                }
            });
        } else {
            setAnswers(prev => {
                return {
                    ...prev,
                    [itemId]: value,
                }
            });
        }
    }

    function handleReset() {
        _initAnswers();
    }

    function handleSubmit() {
        let data: IQuestionnaireItem[] = [];
        items.forEach(item => {
            let answer: string;
            if (typeof answers[item.id] == "string") {
                // _answers[item.id] = answers[item.id] as string;
                answer = answers[item.id] as string;
            } else {
                const flags = answers[item.id] as boolean[];
                let t: string[] = [];
                item.answer.split(", ").forEach((x, index) => {
                    if (flags[index]) {
                        t.push(x);
                    }
                });
                // _answers[item.id] = t.join(", ");
                answer = t.join(", ");
            }
            data.push({
                id: item.id,
                content: item.content,
                answer: answer,
                maxSelectNum: item.maxSelectNum,
                remark: item.remark,
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
                _answers[item.id] = Array(len).fill(false);
            } else {
                _answers[item.id] = "";
            }
        });
        setAnswers(_answers);
    }

    return {
        items,
        answers,
        handleChangeItem,
        handleReset,
        handleSubmit,
    }
}
