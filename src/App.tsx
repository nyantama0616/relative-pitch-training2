import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './general/components/Layout';
import HomePage from './features/home/HomePage';
import TestRequestPage from './features/test/TestRequestPage';

import { DependencyProvider } from './general/contexts/DependencyContext';
import StartPage from './features/train/components/StartPage';
import { AuthProvider } from './features/auth/contexts/AuthContext';

import './App.css';

function App() {
  return (
    <div className="App">
      <DependencyProvider>
        <AuthProvider>
          <Layout>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/test">
                  <Route path="ping" element={<TestRequestPage />} />
                </Route>
                <Route path="train">
                  <Route path="start" element={<StartPage />} />
                </Route>
              </Routes>
            </Router>
          </Layout>
        </AuthProvider>
      </DependencyProvider>
    </div>
  );
}

export default App;
