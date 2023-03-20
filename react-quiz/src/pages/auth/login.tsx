import React, { Suspense, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { auth, Providers } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import firebase from 'firebase/compat/app';
import { SignInWithSocialMedia } from './modules';
import i18n from 'i18next';
import { initReactI18next, useTranslation} from 'react-i18next';



const translationEn = {login:"Login", missingAccount:"Don't have an account?", registerHere:"Register here."}
const translationHu = {login:"Belépés", missingAccount:"Nem vagy még regisztrálva?", registerHere:"Regisztrálj itt."}


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: translationEn },
      hu: { translation: translationHu },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });




    
const LoginPage: React.FunctionComponent<IPageProps> = props => {
    const {t} = useTranslation();
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const signInWithEmailAndPassword = () => {
        if (error !== '') setError('');

        setAuthenticating(true);

        auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            logging.info(result);
            navigate('/quiz');
        })
        .catch(error => {
            logging.error(error);
            setAuthenticating(false);
            setError(error.message);
        });
    }

    const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
        if (error !== '') setError('');

        setAuthenticating(true);

        SignInWithSocialMedia(provider)
        .then(result => {
            logging.info(result);
            navigate('/quiz');
        })
        .catch(error => {
            logging.error(error);
            setAuthenticating(false);
            setError(error.message);
        });
    }

    const onChange = (event: any) =>{
        i18n.changeLanguage(event.target.value);
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
                    disabled={authenticating}
                    color="success"
                    block
                    onClick={() => signInWithEmailAndPassword()}
                >
                    Login
                </Button>
                <small>
                    <p className='m-1 text-center'>{t("missingAccount")} <Link to="/register">{t("registerHere")}</Link></p>
                    <p className='m-1 text-center'><Link to="/forget">Forget your password?</Link></p>
                </small>
                <ErrorText error={error} />
                <hr className="bg-info m-3" />
                <Button
                    block
                    disabled={authenticating}
                    onClick={() => signInWithSocialMedia(Providers.google)}
                    style={{ backgroundColor:'#ea4335', borderColor: '#ea4335'}} 
                >
                    <i className="fab fa-google mr-2"></i> Sign in with Google
                </Button>
            </AuthContainer>
            <select name="language" onChange={onChange}>
                <option value="en">English</option>
                <option value="hu">Magyar</option>
            </select>
        </Suspense>
    );
}

export default LoginPage;