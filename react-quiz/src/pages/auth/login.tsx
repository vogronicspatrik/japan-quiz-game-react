import React, { Suspense, useState, useContext   } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { auth, Providers } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import firebase from 'firebase/compat/app';
import { SignInWithSocialMedia } from './modules';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { UserContext } from "../../UserContext";

import {Button, FormGroup, Input} from '@mui/material';
import { makeStyles } from '@mui/styles';

import UserService from '../../services/user-service';

  const useStyles = makeStyles((theme: any) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      marginTop: theme.spacing(3),
      width: "100%",
      maxWidth: 360,
    },
    button: {
      margin: theme.spacing(2, 0),
    },
  }));

  interface UserProfile{
    family_name: string;
    given_name: string;
    email: string;
  }
    
const LoginPage: React.FunctionComponent<IPageProps> = props => {
    const {t} = useTranslation(["login"]);
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const {  setIsLoggedIn } = useContext(UserContext);

    const classes = useStyles();
    const navigate = useNavigate();

    const userService = new UserService();

    const signInWithEmailAndPassword = () => {
        if (error !== '') setError('');

        setAuthenticating(true);
        setIsLoggedIn(true);

        auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            logging.info(result);
            navigate('/');
        })
        .catch(error => {
            logging.error(error);
            setAuthenticating(false);
            setIsLoggedIn(false);
            setError(error.message);
        });
    }

    const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
        if (error !== '') setError('');

        setAuthenticating(true);
        setIsLoggedIn(true);

        SignInWithSocialMedia(provider)
        .then(result => {
            logging.info(result);
            console.log("innen jon a result");
            console.log(result);
            const profile = result.additionalUserInfo?.profile as UserProfile;
            console.log(profile.email, profile.given_name, profile.family_name);
            if(result.additionalUserInfo?.isNewUser == true){
                userService.createUser(profile.email, profile.given_name, profile.family_name);
            }
            console.log("eddig");
            
            navigate('/');
        })
        .catch(error => {
            logging.error(error);
            setAuthenticating(false);
            setIsLoggedIn(false);
            setError(error.message);
        });
    }

    return (
        <Suspense fallback="Loading...">
            <AuthContainer header="Login">
                <FormGroup>
                    <Input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
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
                        placeholder="Enter Password"
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                    />
                </FormGroup>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={authenticating}
                    onClick={() => signInWithEmailAndPassword()}
                >
                Login
                </Button>
                <small>
                    <p className='m-1 text-center'>{t("missingAccount")} <Link to="/register">{t("registerHere")}</Link></p>
                    <p className='m-1 text-center'><Link to="/forget">{t("forgotPw")}</Link></p>
                </small>
                <ErrorText error={error} />
                <hr className="bg-info m-3" />
                <Button
                    fullWidth
                    variant="contained"
                    className={classes.button}
                    style={{ backgroundColor:'#ea4335', borderColor: '#ea4335'}}
                    onClick={() => signInWithSocialMedia(Providers.google)}
                    disabled={authenticating}
                >
                    <i className="fab fa-google mr-2"></i> Sign in with Google
                </Button>
            </AuthContainer>
        </Suspense>
    );
}

export default LoginPage;