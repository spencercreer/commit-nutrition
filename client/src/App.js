import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MealPage from './pages/MealPage'

import { Layout } from 'antd'
import './App.css';

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<MealPage />}
          />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
