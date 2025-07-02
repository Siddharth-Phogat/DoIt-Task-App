import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import HomePage from "./Components/HomePage";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
  ]);
  
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
