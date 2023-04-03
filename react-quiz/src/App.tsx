import React, { useEffect, useState, useContext } from 'react';
import { auth } from './config/firebase';
import logging from './config/logging';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import routes from './config/routes';
import { Spinner } from 'reactstrap';
import Header from "./components/Header";
import { UserContext } from "./UserContext";



export interface IApplicationProps { }

const App: React.FunctionComponent<IApplicationProps> = props => {
    const [loading, setLoading] = useState<boolean>(true);
    const {  setIsLoggedIn } = useContext(UserContext);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user)
            {
                setIsLoggedIn(true);
                logging.info('User detected.');
            }
            else
            {
                setIsLoggedIn(false);
                logging.info('No user detected');
            }

            setLoading(false);
        })
    }, []);

    if (loading)
        return <Spinner color="info" />
    return (
        <div>
            <Header />
            <Routes>
                {routes.map((route, index) => 
                    <Route
                        key={index}
                        path={route.path} 
                        element={
                            route.protected ? (
                                <AuthRoute>
                                    <route.component {...route} />
                                </AuthRoute>
                            ) : (
                                <route.component {...route} />
                            )
                        }
                    />
                )}
            </Routes>
        </div>
    );
}

export default App;