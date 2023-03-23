import React from 'react';
import IPageProps from '../interfaces/page';
import { useTranslation } from "react-i18next";
import {Card, CardContent, Container} from '@mui/material';

const HomePage: React.FunctionComponent<IPageProps> = props => {
    const { t } = useTranslation(["home"]);
    return (
        <Container sx={{paddingTop: '100px'}}>
            <Card>
                <CardContent sx={{textAlign: 'center'}}>
                    <p>
                        {t("welcome")}
                    </p>
                    {/* <p>
                        Change your password <Link to="/change">here</Link>.
                    </p> */}
                </CardContent>
            </Card>
        </Container>
    );
}

export default HomePage;