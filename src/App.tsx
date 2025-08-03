import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import UseStateExamples from './pages/UseStateExamples';
import UseEffectExamples from './pages/UseEffectExamples';
import UseLayoutEffectExamples from './pages/UseLayoutEffectsExamples';
import UseReducerExamples from './pages/UseReducerExamples';
import UseContextExamples from './pages/UseContextExamples';
import UseRefExamples from './pages/UseRefExamples';

function App() {
 return (
    <div className="app-container">
      <Router>
        <Layout>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/use-state" element={<UseStateExamples />} />
              <Route path="/use-effect" element={<UseEffectExamples />} />
              <Route path="/use-layout-effect" element={<UseLayoutEffectExamples />} />
              <Route path="/use-reducer" element={<UseReducerExamples />} />
              <Route path="/use-context" element={<UseContextExamples />} />
              <Route path="/use-ref" element={<UseRefExamples />} />
            </Routes>
          </main>
        </Layout>
      </Router>
    </div>
  );
};

export default App;