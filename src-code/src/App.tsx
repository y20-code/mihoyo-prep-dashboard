import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Start from './pages/Start';
import Main from './pages/Main'
import { usePlans } from './hooks/usePlans';


function App() {

  const {addPlan,deletePlan,plans,toggleTodo} = usePlans()
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/main" element={<Main onAdd={addPlan} plansV={plans} onDelete={deletePlan} onToggle={toggleTodo}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;