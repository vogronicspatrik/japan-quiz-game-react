import React, { useState } from 'react';
import IPageProps from '../../interfaces/page';
import { Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import { useTranslation } from 'react-i18next';
import {Button, FormGroup, Input, Typography, Container, TextField} from '@mui/material';
import { makeStyles } from '@mui/styles';


// import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';

const RegisterPage: React.FunctionComponent<IPageProps> = props => {
    const {t} = useTranslation(["register"]);
    const[registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const signUpWithEmailAndPassword = () => {
        if (password !== confirm)
        {
            const errorMsg = t('notMachedPw');
            setError(errorMsg);
            return;
        }

        if (error !== '') setError('');

        setRegistering(true);

        auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            logging.info(result);
            navigate('/login');
        })
        .catch(error => {
            logging.error(error);

            if (error.code.includes('auth/weak-password'))
            {
                const msg = t('strongerPw');
                setError(msg);
            }
            else if (error.code.includes('auth/email-already-in-use'))
            {
                const msg = t('usedEmail');
                setError(msg);
            }
            else if(error.code.includes('auth/invalid-email')){
                const msg = t('invalidEmail');
                setError(msg);
            }
            else
            {
                const msg = t('unableToRegister');
                setError(msg);
            }

            setRegistering(false);
        });

        
    }

    return (
        <AuthContainer header={t("register")}>
            <FormGroup>
                <Input 
                    type="firstName"
                    name="firstName"
                    id="firstName"
                    placeholder={t("firstName") as string}
                    onChange={event => setFirstName(event.target.value)}
                    value={firstName}
                />
            </FormGroup>
            <FormGroup>
                <Input 
                    type="lastName"
                    name="lastName"
                    id="lastName"
                    placeholder={t("lastName") as string}
                    onChange={event => setLastName(event.target.value)}
                    value={lastName}
                />
            </FormGroup>
            <FormGroup>
                <Input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("email") as string}
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                />
            </FormGroup>
            <FormGroup>
                <Input 
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder={t("password") as string}
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />
            </FormGroup>
            <FormGroup>
                <Input 
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder={t("confirmPassword") as string}
                    onChange={event => setConfirm(event.target.value)}
                    value={confirm}
                />
            </FormGroup>
            <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            disabled={registering}
            onClick={() => signUpWithEmailAndPassword()}
          >
            {t('signUp')}
          </Button>
            <small>
                <p className='m-1 text-center'>{t('alreadyReg')} <Link to="/login">{t('login')}.</Link></p>
            </small>
            <ErrorText error={error} />
        </AuthContainer>
    );
}

export default RegisterPage;