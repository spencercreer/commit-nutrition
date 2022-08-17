// React
import { useState, useEffect } from 'react'
// Components
import MealCard from '../../components/MealCard'
import ProfileForm from './components/ProfileForm'
import NutrientsChart from '../../components/NutrientsChart'
import LoadingCards from '../../components/LoadingCards'
// Antd
import { Layout, Row, Col, Card, Skeleton } from 'antd'
// Utils
import { usePost } from '../../utils/API'
import { useGet } from '../../utils/API'

const { Content } = Layout

const Dashboard = () => {
  const [mealData, setMealData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filterMeals] = usePost('/api/meal/filter')

  useEffect(() => {
    setLoading(true)
    filterMeals({
      filter: 'today'
    })
      .then(data => {
        setMealData(data[0] || {})
        setLoading(false)
      })
  }, [])

  return (
    <>
      {
        loading ?
          <Content>
            <Row>
              <Col xs={24} style={{ padding: '5px' }}>
                <Card>
                  <Skeleton.Input active={true} size={'large'} />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={14} style={{ padding: '5px' }}>
                <LoadingCards number={1} rows={10} />
              </Col>
              <Col xs={24} md={10} style={{ padding: '5px' }}>
                <LoadingCards number={1} rows={10} />
              </Col>
            </Row>
          </Content>
          :
          <Content style={{ margin: '15px' }}>
            <Row>
              <Col xs={24} style={{ padding: '5px' }}>
                <Card>
                  <h1>Welcome Spencer</h1>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={14} style={{ padding: '5px' }}>
                {/* <h2>Today's Meal Plan</h2> */}
                <MealCard meal={mealData} />
              </Col>
              <Col xs={24} md={10} style={{ padding: '5px' }}>
                <NutrientsChart
                  nutrients={{ calories: mealData?.calories, carbs: mealData?.carbs, protein: mealData?.protein, fat: mealData?.fat, sodium: mealData?.sodium }}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={10} style={{ padding: '5px' }}>
                <Card title='Estimates' />
              </Col>
              <Col xs={24} md={14} style={{ padding: '5px' }}>
                <Card>
                  <ProfileForm />
                </Card>
              </Col>
            </Row>
          </Content>
      }
    </>
  )
}

export default Dashboard