import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './general/components/Layout';
import HomePage from './features/home/HomePage';

import TestRequestPage from './features/test/TestRequestPage';
import TestKeyPressPage from './features/test/TestKeyPressPage';
import TestMidiIOPage from './features/test/TestMidiIOPage';
import TestTimerPage from './features/test/TestTimerPage';
import TestTrainManager from './features/test/TestTrainManager';
import TestFetchTrainRecord from './features/test/TestFetchTrainRecord';
import TestFetchQuestionnaireTemplate from './features/test/TestFetchQuestionnaireTemplate';
import TestFormQuestionnaire from './features/test/TestFormQuestionnaire';

import StartPage from './features/train/components/StartPage';
import MainPage from './features/train/components/MainPage';
import ResultPage from './features/train/components/ResultPage';
import QuestionnairePage from './features/train/components/QuestionnairePage';

import { DependencyProvider } from './general/contexts/DependencyContext';
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
                  <Route path="request" element={<TestRequestPage />} />
                  <Route path="key-press" element={<TestKeyPressPage />} />
                  <Route path="midi-io" element={<TestMidiIOPage />} />
                  <Route path="timer" element={<TestTimerPage />} />
                  <Route path="train" element={<TestTrainManager />} />
                  <Route path="fetch-train-record" element={<TestFetchTrainRecord />} />
                  <Route path="fetch-questionnaire-template" element={<TestFetchQuestionnaireTemplate />} />
                  {/* <Route path="form-questionnaire" element={<TestFormQuestionnaire />} /> */}
                </Route>

                <Route path="questionnaire">
                  <Route path="attribute" element={<TestFormQuestionnaire questionnaireName="attribute"/>} />
                  <Route path="interest" element={<TestFormQuestionnaire questionnaireName="interest"/>} />
                  <Route path="self_efficacy" element={<TestFormQuestionnaire questionnaireName="self_efficacy"/>} />
                  <Route path="motivation" element={<TestFormQuestionnaire questionnaireName="motivation"/>} />
                </Route>

                <Route path="train">
                  <Route path="start" element={<StartPage />} />
                  <Route path="main" element={<MainPage />} />
                  <Route path="test" element={<MainPage isTest={true} />} />
                  <Route path="result" element={<ResultPage />} />
                  <Route path="questionnaire" element={<QuestionnairePage />} />
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
