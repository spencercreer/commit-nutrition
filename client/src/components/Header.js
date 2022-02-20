import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

const { Brand, Toggle, Collapse } = Navbar
const { Link } = Nav
const { Item } = NavDropdown

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Brand href="#home">COMMIT Nutrition</Brand>
        <Toggle />
        <Collapse>
          <Nav className="me-auto">
            <Link href="#foods">Foods</Link>
            <Link href="#meals">Meals</Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <Item href="#action/3.1">Action</Item>
              <Item href="#action/3.2">Another action</Item>
              <Item href="#action/3.3">Something</Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Link href="">My Profile</Link>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

export default Header