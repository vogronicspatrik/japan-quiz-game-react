import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';

const LogoutPage: React.FunctionComponent<IPageProps> = props => {
    const navigate = useNavigate();

    const Logout = () => {
        auth.signOut()
        .then(() => navigate('/login'))
        .catch(error => logging.error(error));
    }

    return (
        <AuthContainer header="Logout">
            <p className='text-center'>Are you sure you want to logout?</p>
            <div className='text-center'>
                <Button color="danger" className="mr-2" onClick={() => navigate(-1)}>Cancel</Button>
                <Button color="info" className="mr-2" onClick={() => Logout()}>Logout</Button>
            </div>
        </AuthContainer>
    );
}

export default LogoutPage;