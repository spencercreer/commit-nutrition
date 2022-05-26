// React
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Components
import RecipeForm from './components/RecipeForm'
// Antd
import { Layout, Menu, Select } from 'antd'
// Utils
import { getFoods } from '../../utils/API'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu
const { Option } = Select

const RecipePage = () => {
    const [foods, setFoods] = useState()

    useEffect(() => {
        let mounted = true;
        getFoods()
            .then(items => {
                console.log(items)
                if (mounted) {
                    setFoods(items)
                }
            })
        return () => mounted = false;
    }, [])

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
                    <SubMenu key='sub1' title='Recipes'>
                        <Item key='1'><Link to={'/vegtables'} >Vegtables</Link></Item>
                        <Item key='2'><Link to={'/fruits'} >Fruits</Link></Item>
                        <Item key='3'><Link to={'/grains'} >Grains</Link></Item>
                        <Item key='4'><Link to={'/meats'} >Meats</Link></Item>
                        <Item key='5'><Link to={'/dairy'} >Dairy</Link></Item>
                        <Item key='6'><Link to={'/oils_fats'} >Oils & Fats</Link></Item>
                        <Item key='7'><Link to={'/seasonings'} >Seasonings</Link></Item>
                        <Item key='8'><Link to={'/other-foods'} >Other</Link></Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content>
                <RecipeForm />
            </Content>
        </>
    )
}

export default RecipePage