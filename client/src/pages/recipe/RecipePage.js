// React
import React, { useState } from 'react'
// Components
import PageSider from '../components/PageSider'
import FilterSelect from '../components/FilterSelect'
import RecipeList from './components/RecipeList'
import AddRecipeModal from './components/AddRecipeModal'
// Antd
import { Layout, Row, Col, Button, Input } from 'antd'
// Utils
import { recipeCategories } from '../../utils/form'
import { useFilterGet } from '../../utils/API'

const { Content } = Layout

const RecipePage = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [modalVisible, setModalVisible] = useState(false)
  const [{ data: recipeData, loading }, filterRecipes] = useFilterGet('/api/recipe')

  const handleToggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    filterRecipes(filter, event.target.value)
  }

  const handleFilterChange = (value) => {
    setFilter(value)
    filterRecipes(value, search)
  }

  return (
        <>
            <PageSider
                title='Recipes'
                filter={filter}
                handleFilterChange={handleFilterChange}
                categories={recipeCategories}
            />
            <Content style={{ margin: '15px' }}>
                <Row>
                    <Col xs={24} md={4} >
                        <Button
                            style={{ width: '100%', marginBottom: '10px' }}
                            type='primary'
                            onClick={() => setModalVisible(true)}
                        >
                            Add Recipe
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Input
                            style={{ width: '100%', marginBottom: '10px' }}
                            placeholder='Search Recipes'
                            onChange={handleSearch}
                        />
                    </Col>
                    <Col xs={24} md={0} >
                        <FilterSelect
                            defaultValue='all'
                            handleFilterChange={handleFilterChange}
                            categories={recipeCategories}
                        />
                    </Col>
                </Row>
                <RecipeList
                    loading={loading}
                    recipeData={recipeData}
                />
                <AddRecipeModal
                    visible={modalVisible}
                    handleCloseModal={handleToggleModal}
                />
            </Content>
        </>
  )
}

export default RecipePage
