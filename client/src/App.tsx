import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { publicRoutes } from './routes';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        fetch('https://itss2-seatify-tevf.onrender.com/cookies/create', {
            method: 'POST',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.sessionId) {
                    localStorage.setItem('sessionId', data.sessionId);
                }
            });
    }, []);

    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Layout = route.layout || Fragment;
                    const Page = route.component;
                    const Element = (
                        <Layout>
                            <Page />
                        </Layout>
                    );
                    return <Route key={index} path={route.path} element={Element} />;
                })}
            </Routes>
        </Router>
    );
}

export default App;
