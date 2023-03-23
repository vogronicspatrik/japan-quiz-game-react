import React, { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import { UserContext } from "../../UserContext";
const LogoutPage: React.FunctionComponent<IPageProps> = props => {
    const navigate = useNavigate();
    const {  setIsLoggedIn } = useContext(UserContext);
    const Logout = () => {
        auth.signOut()
        .then(() => navigate('/'))
        .catch(error => logging.error(error));
        setIsLoggedIn(false);
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