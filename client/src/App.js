import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FoodPage from './pages/FoodPage'
import RecipePage from './pages/RecipePage'
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
          <Route
            path="/foods"
            element={<FoodPage />}
          />
          <Route
            path="/recipes"
            element={<RecipePage />}
          />
          <Route
            path="/meals"
            element={<MealPage />}
          />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
