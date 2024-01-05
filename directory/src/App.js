import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";

export default function App() {
  const router = createBrowserRouter([
    { path:'/', element:<Home />},
    { path: '/user/:id' , element:<UserDetails />}
  ])

  return (
    <>    
    <RouterProvider router={router} />
    </> 
  )
}