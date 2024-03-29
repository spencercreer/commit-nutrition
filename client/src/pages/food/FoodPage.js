// React
import React, { useState } from 'react'
// Components
import PageSider from '../components/PageSider'
import FilterSelect from '../components/FilterSelect'
import FoodList from './components/FoodList'
import AddFoodModal from './components/AddFoodModal'
// Antd
import { Layout, Row, Col, Button, Input } from 'antd'
// Utils
import { foodCategories } from '../../utils/form'
import { useFilterGet } from '../../utils/API'

const { Content } = Layout

const FoodPage = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [modalVisible, setModalVisible] = useState(false)
  const [{ data: foodData, loading }, filterFoods] = useFilterGet('/api/food')

  const handleToggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    filterFoods(filter, event.target.value)
  }

  const handleFilterChange = (value) => {
    setFilter(value)
    filterFoods(value, search)
  }

  return (
        <>
            <PageSider
                title='Foods'
                filter={filter}
                handleFilterChange={handleFilterChange}
                categories={foodCategories}
            />
            <Content style={{ margin: '15px' }}>
                <Row>
                    <Col xs={24} md={4} >
                        <Button
                            style={{ width: '100%', marginBottom: '10px' }}
                            type='primary'
                            onClick={() => setModalVisible(true)}
                        >
                            Add Food
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Input
                            style={{ width: '100%', marginBottom: '10px' }}
                            placeholder='Search Foods'
                            onChange={handleSearch}
                        />
                    </Col>
                    <Col xs={24} md={0} >
                        <FilterSelect
                            defaultValue='all'
                            handleFilterChange={handleFilterChange}
                            categories={foodCategories}
                        />
                    </Col>
                </Row>
                <FoodList
                    loading={loading}
                    foodData={foodData}
                />
                {/* Make add, and update a page, and food info only modal */}
                <AddFoodModal
                    visible={modalVisible}
                    handleCloseModal={handleToggleModal}
                />
            </Content>
        </>
  )
}

export default FoodPage
