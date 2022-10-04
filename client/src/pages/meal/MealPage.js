// React
import React, { useState, useEffect } from 'react'
// Components
import PageSider from '../components/PageSider'
import FilterSelect from '../components/FilterSelect'
import AddMealPlanModal from './components/AddMealPlanModal'
import MealCard from '../components/MealCard'
import LoadingCards from '../components/LoadingCards'
// Antd
import { Layout, Row, Col, Button, Select } from 'antd'
// Utils
import { usePost } from '../../utils/API'
import { mealCategories } from '../../utils/form'
// Styles
import './style.css'

const { Content } = Layout
const { Option } = Select

const MealPage = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [sort, setSort] = useState('desc')
  const [filter, setFilter] = useState('week')
  const [mealData, setMealData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filterMeals] = usePost('/api/meal/filter')

  useEffect(() => {
    setLoading(true)
    filterMeals({
      sort,
      filter
    })
      .then(data => {
        setMealData(data)
        setLoading(false)
      })
  }, [sort, filter])

  const handleToggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleFilterChange = (value) => {
    setFilter(value)
  }

  // mealData.forEach(element => {
  //     console.log(moment(element?.date).format('L'), moment(Date.now()).format('L'))
  // });

  return (
        <>
            <PageSider
                title='Meal Plans'
                filter={filter}
                handleFilterChange={handleFilterChange}
                categories={mealCategories}
            />
            <Content className='content'>
                <Row>
                    <Col xs={24} md={6} >
                        <Button
                            className='control'
                            type='primary'
                            onClick={() => setModalVisible(true)}
                        >
                            Add Meal Plan
                        </Button>
                    </Col>
                    <Col xs={24} md={12} >
                        <Select
                            style={{ width: '100%', marginBottom: '10px' }}
                            defaultValue='desc'
                            onChange={(event) => setSort(event)}
                        >
                            <Option
                                key='desc'
                                value='desc'
                            >
                                Newest to Oldest
                            </Option>
                            <Option
                                key='asc'
                                value='asc'
                            >
                                Oldest to Newest
                            </Option>
                        </Select>
                    </Col>
                    <Col xs={24} md={0} >
                        <FilterSelect
                            defaultValue='week'
                            handleFilterChange={handleFilterChange}
                            categories={mealCategories}
                        />
                    </Col>
                </Row>
                {/* <MealForm /> */}
                {/* Below will be moved to meal list */}
                {
                    loading
                      ? <LoadingCards number={12} />
                      : mealData
                      // ?.filter(({ date }) => moment(date).isSame(moment(), 'week'))
                        .map((meal, i) => (
                                <MealCard
                                    key={i}
                                    meal={meal}
                                />
                        ))
                }
                <AddMealPlanModal
                    visible={modalVisible}
                    handleCloseModal={handleToggleModal}
                />
            </Content>
        </>
  )
}

export default MealPage
