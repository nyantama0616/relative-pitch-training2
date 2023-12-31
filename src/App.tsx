import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './general/components/Layout';
import HomePage from './features/home/HomePage';
import TestPingPage from './features/test/TestPingPage';

import { DependencyProvider } from './general/contexts/DependencyContext';
import StartPage from './features/train/components/StartPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <DependencyProvider>
        <Layout>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/test">
                <Route path="ping" element={<TestPingPage />} />
              </Route>
              <Route path="train">
                <Route path="start" element={<StartPage />} />
              </Route>
            </Routes>
          </Router>
        </Layout>
      </DependencyProvider>
    </div>
  );
}

export default App;
