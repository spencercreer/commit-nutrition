import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import FoodPage from './pages/food/FoodPage'
import RecipePage from './pages/recipe/RecipePage'
import MealPage from './pages/meal/MealPage'

import { Layout } from 'antd'
import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      <Layout>
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
      </Layout>
    </Router>
  );
}

export default App;
