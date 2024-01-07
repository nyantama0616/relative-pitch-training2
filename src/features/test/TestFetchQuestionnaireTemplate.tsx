import { Box, Button } from "@mui/material";
import { SxProps } from "@mui/system";
import PageTemplate from "../../general/components/PageTemplate";
import { useDependency } from "../../general/contexts/DependencyContext";

interface HomePageProps {
    sx?: SxProps;
}
export default function TestFetchQuestionnaireTemplate({ sx }: HomePageProps) {
    const { useFetchQuestionnaireTemplate } = useDependency();
    const fetchQuestionnaireTemplate = useFetchQuestionnaireTemplate();

    function _fetch(questName: string) {
        fetchQuestionnaireTemplate
            .fetch(questName)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <PageTemplate className="test-fetch-questionnaire-template-page" sx={sx}>
            <h1>Test Fetch Questionnaire Template</h1>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
            }}>
                <Button variant="contained" onClick={() => _fetch("attribute")}>Attribute</Button>
                <Button variant="contained" onClick={() => _fetch("interest")}>Interest</Button>
                <Button variant="contained" onClick={() => _fetch("self_efficacy")}>Self Efficacy</Button>
            </Box>
        </PageTemplate>
    )
}
