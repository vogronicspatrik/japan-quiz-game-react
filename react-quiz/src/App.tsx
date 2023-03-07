import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import routes from './config/routes';

export interface IApplicationProps { }

const App: React.FunctionComponent<IApplicationProps> = props => {
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