import "./App.css";
import { Route } from "./Routes/Route";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={Route} />
    </>
  );
}

export default App;
