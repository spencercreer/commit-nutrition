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
                console.log(data)
                setMealData(data)
                setLoading(false)
            })
    }, [sort, filter])

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
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
                    defaultSelectedKeys={[filter]}
                    defaultOpenKeys={['sub1']}
                >
                    <SubMenu key='sub1' title='Meal Plans'>
                        <Item
                            key='week'
                            onClick={(event) => setFilter(event.key)}
                        >
                            This Week
                        </Item>
                        <Item
                            key='starred'
                            onClick={(event) => setFilter(event.key)}
                        >
                            Starred
                        </Item>
                        <Item
                            key='archived'
                            onClick={(event) => setFilter(event.key)}
                        >
                            Archived
                        </Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content style={{ margin: '15px' }}>
                <Row>
                    <Col xs={24} sm={6} md={4} >
                        <Button
                            style={{ width: '100%', marginBottom: '10px' }}
                            type='primary'
                            onClick={() => setModalVisible(true)}
                        >
                            Add Meal Plan
                        </Button>
                    </Col>
                    <Col xs={24} md={12} >
                        <Select
                            style={{ width: '100%', marginBottom: '10px' }}
                            defaultValue={'desc'}
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
                        <Select
                            style={{ width: '100%', marginBottom: '10px' }}
                            placeholder='Filter Meal Plans'
                            onChange={(event) => setFilter(event)}
                        >
                            <Option
                                key='select_week'
                                value='week'
                            >
                                This Week
                            </Option>
                            <Option
                                key='select_starred'
                                value='starred'
                            >
                                Starred
                            </Option>
                            <Option
                                key='select_archived'
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