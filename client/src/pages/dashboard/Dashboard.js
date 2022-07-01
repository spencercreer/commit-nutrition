import MealCard from "../../components/MealCard"
import ProfileForm from "./components/ProfileForm"
import LoadingCards from "../../components/LoadingCards"
// Antd
import { Layout, Skeleton } from 'antd'
// Utils
import { useGet } from '../../utils/API'

const { Content, Sider } = Layout

const Dashboard = () => {
  const { data: mealData, loading } = useGet('/api/meals/today')
  // console.log(mealData)
  return (
    <>
      {
        loading ?
          <>
            <Skeleton.Input active={true} size={'large'} />
            <LoadingCards number={12} />
          </>
          :
          <Content style={{ margin: '10px 60px' }}>
            <h1>Welcome Spencer</h1>
            <h2>Today's Meal Plan</h2>
            <MealCard meal={mealData} />
            <ProfileForm />
          </Content>
      }
    </>
  )
}

export default Dashboard