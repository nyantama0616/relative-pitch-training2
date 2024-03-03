import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './features/home/HomePage';

import TestRequestPage from './features/test/TestRequestPage';
import TestKeyPressPage from './features/test/TestKeyPressPage';
import TestMidiIOPage from './features/test/TestMidiIOPage';
import TestTimerPage from './features/test/TestTimerPage';
import TestTrainManager from './features/test/TestTrainManager';
import TestFetchTrainRecord from './features/test/TestFetchTrainRecord';
import TestFetchQuestionnaireTemplate from './features/test/TestFetchQuestionnaireTemplate';
import TestFormQuestionnaire from './features/test/TestFormQuestionnaire';
import TestFetchMeans from './features/test/TestFetchMeans';

import StartPage from './features/train/components/StartPage';
import MainPage from './features/train/components/MainPage';
import ResultPage from './features/train/components/ResultPage';
import QuestionnairePage from './features/train/components/QuestionnairePage';

import UserListPage from './features/user/pages/UserListPage';

import TodoListPage1 from './features/home/TodoListPageFrom2To4';
import TodoListPageFrom2To4 from './features/home/TodoListPageFrom2To4';

import ShimamuraPage from './features/train/components/ShimamuraPage';

import { DependencyProvider } from './general/contexts/DependencyContext';
import { AuthProvider } from './features/auth/contexts/AuthContext';

import './App.css';

function App() {
  return (
    <div className="App">
      <DependencyProvider>
        <AuthProvider>
          <Router basename={process.env.PUBLIC_URL}>
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
                <Route path="fetch-means" element={<TestFetchMeans />} />
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
                <Route path="shimamura" element={<ShimamuraPage />} />
              </Route>

              <Route path="users" element={<UserListPage/>}/>

              <Route path="todo">
                <Route path="1" element={<TodoListPage1 />} />
                <Route path="from2to4" element={<TodoListPageFrom2To4 />} />
                <Route path="5" element={<TodoListPageFrom2To4 />} />
              </Route>

            </Routes>
          </Router>
        </AuthProvider>
      </DependencyProvider>
    </div>
  );
}

export default App;
