import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './general/components/Layout';
import HomePage from './features/home/HomePage';

// import { DependencyProvider } from './general/contexts/DependencyContext';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <DependencyProvider> */}
        <Layout>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Router>
        </Layout>
      {/* </DependencyProvider> */}
    </div>
  );
}

export default App;
