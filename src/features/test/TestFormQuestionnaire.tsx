import { Box, Button } from "@mui/material";
import { SxProps } from "@mui/system";
import PageTemplate from "../../general/components/PageTemplate";
import { useDependency } from "../../general/contexts/DependencyContext";
import { useEffect, useState } from "react";
import IQuestionnaire from "../questionnaire/interfaces/IQuestionnaire";
import FormQuestionnaire from "../questionnaire/components/FormQuestionnaire";
import ButtonWithStatus from "../../general/components/ButtonWithStatus";

interface TestQuestionnaireProps {
    questionnaireName: string;
    sx?: SxProps;
}

const initialQuestionnaire: IQuestionnaire = {
    id: -1,
    questionnaireName: "",
    data: [],
    userId: -1,
    createdAt: "",
};

export default function TestFormQuestionnaire({ questionnaireName, sx }: TestQuestionnaireProps) {
    const { useFetchQuestionnaireTemplate, useFormQuestionnaire } = useDependency();
    const fetchQuestionnaireTemplate = useFetchQuestionnaireTemplate();
    const [quest, setQuest] = useState<IQuestionnaire>(initialQuestionnaire);
    const formQuestionnaire = useFormQuestionnaire(quest);

    useEffect(() => {
        fetchQuestionnaireTemplate
            .fetch(questionnaireName)
            .then((res) => {
                const questionnaire: IQuestionnaire = {
                    id: -1,
                    questionnaireName: questionnaireName,
                    data: res!.questionnaire,
                    userId: -1,
                    createdAt: "",
                };
                setQuest(questionnaire);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <PageTemplate className="test-form-questionnaire-page" sx={sx}>
            <h1>Test Form Questionnaire</h1>
            {quest &&
                <FormQuestionnaire
                    hook={formQuestionnaire}
                />
            }

            <ButtonWithStatus
                status={formQuestionnaire.status}
                onClick={formQuestionnaire.handleSubmit}
                sx={{ mt: 2 }}
                normalText="送信"
                loadingText="送信中..."
                errorText="再送"
                successText="送信済み"
            />
        </PageTemplate>
    )
}
