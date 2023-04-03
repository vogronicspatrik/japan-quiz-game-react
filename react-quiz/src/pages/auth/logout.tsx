import React from 'react';
import {  useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/AuthContainer';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import { Typography, Button} from '@mui/material';
import { useTranslation } from 'react-i18next';

const LogoutPage: React.FunctionComponent<IPageProps> = props => {
    const navigate = useNavigate();
    const {t} = useTranslation(["logout"]);
    const Logout = () => {
        auth.signOut()
        .then(() => navigate('/'))
        .catch(error => logging.error(error));
    }

    return (
    <AuthContainer header={t("logout")}>
    <Typography variant="body1" align="center">
        {t('sureLogout')}
    </Typography>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button variant="contained" color="error" sx={{ marginRight: '10px' }} onClick={() => navigate(-1)}>
        {t('cancel')}
        </Button>
        <Button variant="contained" color="info" onClick={() => Logout()}>
        {t('logout')}
        </Button>
    </div>
    </AuthContainer>
    );
}
export default LogoutPage;