import { SxProps } from "@mui/system";
import PageTemplate from "../../general/components/PageTemplate";

interface HomePageProps {
    sx?: SxProps;
}
export default function HomePage({ sx }: HomePageProps) {
    return (
        <PageTemplate className="home-page" sx={sx}>
            <h1>Home</h1>
        </PageTemplate>
    )
}
