// Antd
import { Layout, Menu } from 'antd'

const { Sider } = Layout
const { SubMenu, Item } = Menu

const PageSider = ({ title, filter, handleFilterChange, categories }) => {
  return (
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
        <SubMenu key='sub1' title={title}>
          {
            categories.map(({ label, value }) => (
              <Item
                key={value}
                onClick={(event) => handleFilterChange(event.key)}
              >
                {label}
              </Item>
            ))
          }
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default PageSider
