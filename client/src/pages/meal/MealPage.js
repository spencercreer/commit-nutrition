// React
import { useState, useEffect } from 'react'
// Components
import AddMealPlanModal from './components/AddMealPlanModal'
import MealCard from '../../components/MealCard'
import LoadingCards from '../../components/LoadingCards'
// Antd
import { Layout, Row, Col, Menu, Button, Select } from 'antd'
// Utils
import { usePost } from '../../utils/API'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu
const { Option } = Select

const MealPage = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [mealData, setMealData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [filterMeals] = usePost('/api/meal/filter')
    //pull out asc, desc from filter and make it its on select

    useEffect(() => {
        setLoading(true)
        filterMeals()
            .then(data => {
                console.log(data)
                setMealData(data)
                setLoading(false)
            })
    }, [])

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const handleFilterChange = (value) => {
        console.log(value)
        setLoading(true)
        filterMeals({
            filter: value
        })
            .then(data => {
                console.log(data)
                setMealData(data)
                setLoading(false)
            })
    }

    // mealData.forEach(element => {
    //     console.log(moment(element?.date).format('L'), moment(Date.now()).format('L'))
    // });

    return (
        <>
            <Sider
                width={200}
                breakpoint='md'
                collapsedWidth='0'
                trigger={null}
            >
                <Menu
                    mode='inline'
                    style={{ height: '100%', borderRight: 0 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                >
                    <SubMenu key='sub1' title='Meal Plans'>
                        <Item
                            key='week'
                            onClick={(event) => handleFilterChange(event.key)}
                        >
                            This Week
                        </Item>
                        <Item
                            key='desc'
                            onClick={(event) => handleFilterChange(event.key)}
                        >
                            Newest to Oldest
                        </Item>
                        <Item
                            key='asc'
                            onClick={(event) => handleFilterChange(event.key)}
                        >
                            Oldest to Newest
                        </Item>
                        <Item
                            key='starred'
                            onClick={(event) => handleFilterChange(event.key)}
                        >
                            Starred
                        </Item>
                        <Item
                            key='archived'
                            onClick={(event) => handleFilterChange(event.key)}
                        >
                            Archived
                        </Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content style={{ margin: '15px' }}>
                <Row>
                    <Col xs={24} md={4} >
                        <Button
                            style={{ width: '100%', marginBottom: '10px' }}
                            type='primary'
                            onClick={() => setModalVisible(true)}
                        >
                            Add Meal Plan
                        </Button>
                    </Col>
                    <Col xs={24} md={0} >
                        <Select
                            style={{ width: '100%', marginBottom: '10px' }}
                            placeholder='Filter Meal Plans'
                            onChange={(event) => handleFilterChange(event)}
                        >
                            <Option
                                key='0'
                                value='week'
                            >
                                This Week
                            </Option>
                            <Option
                                key='1'
                                value='desc'
                            >
                                Newest to Oldest
                            </Option>
                            <Option
                                key='2'
                                value='asc'
                            >
                                Oldest to Newest
                            </Option>
                            <Option
                                key='3'
                                value='starred'
                            >
                                Starred
                            </Option>
                            <Option
                                key='4'
                                value='archived'
                            >
                                Archived
                            </Option>
                        </Select>
                    </Col>
                </Row>
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