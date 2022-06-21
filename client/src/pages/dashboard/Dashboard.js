import MealCard from "../../components/MealCard"
import ProfileForm from "./components/ProfileForm"
// Antd
import { Layout } from 'antd'

const { Content, Sider } = Layout

const Dashboard = () => {
  return (
    <Content style={{ margin: '10px 60px' }}>
      <h1>Welcome Spencer</h1>
      <h2>Today's Meal Plan</h2>
      <MealCard />
      <ProfileForm />
    </Content>
  )
}

export default Dashboard