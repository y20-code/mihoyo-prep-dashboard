import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import { Suspense } from 'react';
import Start from './pages/Start';
import Main from './pages/Main';
import Algorithm from './pages/Algorithm';
import MainLayout from './pages/MainLayout';
import Statistics from './pages/Statistics';
import Login from './pages/Login';
import Focus from './pages/Focus';
import PList from './components/PList';
import { usePlans } from './hooks/usePlans';

import { practiceRoutes } from './router/practiceRoutes';

import {AuthProvider} from './context/AuthContext';
import { RequireAuth } from './components/RequireAuth';


function App() {

  const {addPlan,deletePlan,plans,toggleTodo,loading} = usePlans()
  
  return (
    <AuthProvider>
      <BrowserRouter>
      <Suspense fallback={
        <div style={{padding:'20px',textAlign:'center'}}>资源加载中...</div>
      }>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path="/" element={<RequireAuth>< MainLayout/></RequireAuth>} >
            <Route index element={<Navigate to="dashboard" replace></Navigate>}/>
            <Route path='/statistics' element={<Statistics plansV={plans}/>}></Route>
            <Route path='/focus' element={<Focus/>}></Route>
            <Route path="/dashboard" element={<Main onAdd={addPlan} plansV={plans} onDelete={deletePlan} onToggle={toggleTodo} loading={loading}/>}/>
            <Route path='practice' element={<PList/>}></Route>
          </Route>
          <Route path="detail/:id" element={<Algorithm/>}/>
          {
            practiceRoutes.map(route => (
              <Route
                key={route.path}
                path={`/practice/${route.path}`}
                element={route.element}
              />
            ))
          }
          
          <Route path="/practice/*" element={<div>练习不存在</div>} />
        </Routes>
      </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;