import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Dashboard from './pages/dashboard/Dashboard'
import FoodPage from './pages/food/FoodPage'
import RecipePage from './pages/recipe/RecipePage'
import MealPage from './pages/meal/MealPage'
import GroceryPage from './pages/grocery/GroceryPage'
import LoginPage from './pages/login/LoginPage'
import UserInfoPage from './pages/userInfo/UserInfoPage'

import { Layout } from 'antd'
import './App.css'

function App () {
  return (
    <Router>
      <Nav />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/signup"
            element={<LoginPage form={'signup'} />}
          />
          <Route
            path="/user"
            element={<UserInfoPage />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
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
          <Route
            path="/grocery"
            element={<GroceryPage />}
          />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
