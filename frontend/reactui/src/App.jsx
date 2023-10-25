import './App.css'
import { createBrowserRouter ,
  createRoutesFromElements ,
  Route, 
  RouterProvider,} from "react-router-dom" 
import Landing, { loader as landingLoader } from './pages.jsx/landing'
import { NextUIProvider } from '@nextui-org/react'
import DataCategories , { loader as DataCategoriesLoader} from './pages.jsx/dataCategories'
import SystemInfo , {systemInfoLoader} from './pages.jsx/systemInfo'
import ProcessesInfo , {processInfoLoader} from './pages.jsx/processesInfo'

const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/'
             element={<Landing/>}
             loader={landingLoader}>
             <Route path=':systemName'
                    element={<DataCategories/>}
                    loader={DataCategoriesLoader}>
                    <Route  index
                            path='systeminfo'
                            element={<SystemInfo/>}
                            loader={systemInfoLoader}/>
                    <Route  path='processinfo'
                            element={<ProcessesInfo/>}
                            loader={processInfoLoader}/>      
             </Route>
      </Route>
    </>
  ))
  function App() {
    return (
      <>
        <NextUIProvider>
            <RouterProvider router={router} />
        </NextUIProvider>
      </>
    )
  }
  export default App
