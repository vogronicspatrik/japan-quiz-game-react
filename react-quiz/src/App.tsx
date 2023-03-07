import React, { useEffect, useState } from 'react';
import { auth } from './config/firebase';
import logging from './config/logging';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import routes from './config/routes';
import { Spinner } from 'reactstrap';

export interface IApplicationProps { }

const App: React.FunctionComponent<IApplicationProps> = props => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user)
            {
                logging.info('User detected.');
            }
            else
            {
                logging.info('No user detected');
            }

            setLoading(false);
        })
    }, []);

    if (loading)
        return <Spinner color="info" />
    return (
        <div>
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