import FoodForm from './components/FoodForm';
import { Container } from 'react-bootstrap'
import './App.css';

function App() {
  return (
    <div className="App">
      <Container>
        <div>COMMIT Nutrition</div>
        <FoodForm />
      </Container>
    </div>
  );
}

export default App;
