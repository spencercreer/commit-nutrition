// Components
import MealCard from "../../components/MealCard"
import ProfileForm from "./components/ProfileForm"
import NutrientsChart from "../../components/NutrientsChart"
import LoadingCards from "../../components/LoadingCards"
// Antd
import { Layout, Row, Col, Card, Skeleton } from 'antd'
// Utils
import { useGet } from '../../utils/API'

const { Content } = Layout

const Dashboard = () => {
  const { data: mealData, loading } = useGet('/api/meals/today')
  // console.log(mealData)
  // loading = true
  return (
    <>
      {
        loading ?
          <Content>
            <Row style={{ padding: '5px' }}>
              <Col xs={24}>
                <Card>
                  <Skeleton.Input active={true} size={'large'} />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={14} style={{ padding: '5px' }}>
                <LoadingCards number={1} />
              </Col>
              <Col xs={24} md={10} style={{ padding: '5px' }}>
                <LoadingCards number={1} />
              </Col>
            </Row>
          </Content>
          :
          <Content style={{ margin: '10px 60px' }}>
            <Row style={{ padding: '5px' }}>
              <Col xs={24}>
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
            <ProfileForm />
          </Content>
      }
    </>
  )
}

export default Dashboard