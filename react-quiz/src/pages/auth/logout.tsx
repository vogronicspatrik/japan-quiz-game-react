import React, { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';

import AuthContainer from '../../components/AuthContainer';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import { Typography, Button, createTheme, ThemeProvider, Container, MenuItem, Select } from '@mui/material';

const LogoutPage: React.FunctionComponent<IPageProps> = props => {
    const navigate = useNavigate();
    const Logout = () => {
        auth.signOut()
        .then(() => navigate('/'))
        .catch(error => logging.error(error));
    }

    return (
    <AuthContainer header="Logout">
    <Typography variant="body1" align="center">
        Are you sure you want to logout?
    </Typography>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button variant="contained" color="error" sx={{ marginRight: '10px' }} onClick={() => navigate(-1)}>
        Cancel
        </Button>
        <Button variant="contained" color="info" onClick={() => Logout()}>
        Logout
        </Button>
    </div>
    </AuthContainer>
    );
}
export default LogoutPage;