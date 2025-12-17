import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Start from './pages/Start';
import Main from './pages/Main';
import Algorithm from './pages/Algorithm';
import MainLayout from './pages/MainLayout';
import Statistics from './pages/Statistics';
import Focus from './pages/Focus';
import { usePlans } from './hooks/usePlans';




function App() {

  const {addPlan,deletePlan,plans,toggleTodo,loading} = usePlans()
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< MainLayout/>} >
          <Route index element={<Navigate to="dashboard" replace></Navigate>}/>
          <Route path='/statistics' element={<Statistics plansV={plans}/>}></Route>
          <Route path='/focus' element={<Focus/>}></Route>
          <Route path="/dashboard" element={<Main onAdd={addPlan} plansV={plans} onDelete={deletePlan} onToggle={toggleTodo} loading={loading}/>}/>
        </Route>
        <Route path="detail/:id" element={<Algorithm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;