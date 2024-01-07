import { SxProps } from "@mui/system";
import { Box, Grid, Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDependency } from "../../../general/contexts/DependencyContext";
import PageTemplate from "../../../general/components/PageTemplate";
import IQuestionnaire from "../../questionnaire/interfaces/IQuestionnaire";
import FormQuestionnaire from "../../questionnaire/components/FormQuestionnaire";
import { useNavigate } from "react-router";

interface QuestionnairePageProps {
    sx?: SxProps;
}
export default function QuestionnairePage({ sx }: QuestionnairePageProps) {
    const questionnaireNames = ["attribute", "interest", "self_efficacy"];

    const hook = useQuestionnairePage({ questionnaireNames });
    const navigate = useNavigate();

    useEffect(() => {
        hook.next();
    }, []);

    function _finish() {
        hook.next();
        navigate("/train/main");
    }

    return (
        <PageTemplate className="train-train-page" sx={sx}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <h3>アンケート</h3>
                </Grid>
                
                <Grid item xs={12}>
                    <FormQuestionnaire hook={hook.formQuestionnaire} />
                </Grid>

                <Grid item xs={12}>
                    {hook.isLast
                        ? < Button variant="contained" onClick={_finish}>終了</Button>
                        : <Button variant="contained" onClick={hook.next}>次へ</Button>
                    }
                </Grid>
            </Grid>
        </PageTemplate>
    );
}

const initialQuestionnaire: IQuestionnaire = {
    id: -1,
    questionnaireName: "",
    data: [],
    userId: -1,
    createdAt: "",
};

interface State {
    questionnaire: IQuestionnaire;
    questionPos: number;
}
interface Props {
    questionnaireNames: string[];
}
function useQuestionnairePage({questionnaireNames}: Props) {
    const { useFormQuestionnaire, useFetchQuestionnaireTemplate } = useDependency();
    const fetchQuestionnaireTemplate = useFetchQuestionnaireTemplate();
    const [state, setState] = useState<State>({questionnaire: initialQuestionnaire, questionPos: 0});
    const formQuestionnaire = useFormQuestionnaire(state.questionnaire);

    function next() {
        if (state.questionPos > 0 && !formQuestionnaire.isFullFilled()) return; 
        
        if (state.questionPos > 0) formQuestionnaire.handleSubmit();

        if (state.questionPos >= questionnaireNames.length) {
            return;
        }

        const questionnaireName = questionnaireNames[state.questionPos];
        
        fetchQuestionnaireTemplate
            .fetch(questionnaireName)
            .then((res) => {
                const questionnaire = {
                    ...state.questionnaire,
                    questionnaireName,
                    data: res!.questionnaire,
                };
                setState({ questionnaire, questionPos: state.questionPos + 1 });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return {
        isLast: state.questionPos >= questionnaireNames.length,
        formQuestionnaire,
        next,
    }
}
