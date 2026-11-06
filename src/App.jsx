import "./App.css";
import { Route } from "./Routes/Route";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import PageLoading from "./component/PageLoading";

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <RouterProvider router={Route} />
    </Suspense>
  );
}

export default App;
