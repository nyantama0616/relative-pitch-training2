import { Box, Button } from "@mui/material";
import { SxProps } from "@mui/system";
import PageTemplate from "../../general/components/PageTemplate";
import { useDependency } from "../../general/contexts/DependencyContext";
import { useEffect, useState } from "react";
import IQuestionnaire from "../questionnaire/interfaces/IQuestionnaire";
import FormQuestionnaire from "../questionnaire/components/FormQuestionnaire";

interface HomePageProps {
    sx?: SxProps;
}

const initialQuestionnaire: IQuestionnaire = {
    id: -1,
    QuestionnaireName: "",
    data: [],
    userId: -1,
    createdAt: "",
};

export default function TestFormQuestionnaire({ sx }: HomePageProps) {
    const { useFetchQuestionnaireTemplate, useFormQuestionnaire } = useDependency();
    const fetchQuestionnaireTemplate = useFetchQuestionnaireTemplate();
    const [quest, setQuest] = useState<IQuestionnaire>(initialQuestionnaire);
    const formQuestionnaire = useFormQuestionnaire(quest);
    const questionnaireName = "interest";

    useEffect(() => {
        fetchQuestionnaireTemplate
            .fetch(questionnaireName)
            .then((res) => {
                const questionnaire: IQuestionnaire = {
                    id: -1,
                    QuestionnaireName: questionnaireName,
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
            <Button
                variant="contained"
                onClick={formQuestionnaire.handleSubmit}
            >
                Submit
            </Button>
        </PageTemplate>
    )
}
