import Header from './components/Header'
import FoodForm from './components/FoodForm';
import { Container } from 'react-bootstrap'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Container className="my-3">
        <FoodForm />
      </Container>
    </div>
  );
}

export default App;