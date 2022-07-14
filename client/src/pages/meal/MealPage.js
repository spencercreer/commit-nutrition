// React
import { useState } from 'react'
import AddMealPlanModal from './components/AddMealPlanModal'
import NutrientsRow from '../../components/NutrientsRow'
import MealCard from '../../components/MealCard'
import LoadingCards from '../../components/LoadingCards'
import { Link } from 'react-router-dom'
// Antd
import { Layout, Menu, Row, Card, Button } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
// Utils
import { useGet } from '../../utils/API'
import moment from 'moment'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu

const MealPage = () => {
    const [modalVisible, setModalVisible] = useState(false)

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const { data: mealData, loading } = useGet('/api/meal')
    // mealData.forEach(element => {
    //     console.log(moment(element?.date).format('L'), moment(Date.now()).format('L'))
    // });

    return (
        <>
            <Sider
                width={200}
                className='site-layout-background'
                breakpoint='md'
                collapsedWidth='0'
            >
                <Menu
                    mode='inline'
                    style={{ height: '100%', borderRight: 0 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                >
                    <SubMenu key='sub1' title='COMMIT Nutrition'>
                        <Item key='1'><Link to={'/foods'} >Foods</Link></Item>
                        <Item key='2'><Link to={'/recipes'} >Recipes</Link></Item>
                        <Item key='3'><Link to={'/meals'} >Meals</Link></Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content style={{ margin: '15px' }}>
                <Button
                    style={{ marginBottom: '10px' }}
                    type='primary'
                    onClick={() => setModalVisible(true)}
                >
                    Add Meal Plan
                </Button>
                {/* <MealForm /> */}
                {/* Below will be moved to meal list */}
                {
                    loading ?
                        <LoadingCards number={12} />
                        :
                        mealData
                        // ?.filter(({ date }) => moment(date).isSame(moment(), 'week'))
                        .map((meal, i) => (
                            <MealCard key={i} meal={meal} />
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