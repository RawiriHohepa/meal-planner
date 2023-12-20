import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Shell from "./Shell";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Shell title="Dashboard">
                <DashboardPage />
              </Shell>
            }
          />
          <Route
            path="/meal-planner"
            element={
              <Shell title="Meal Planner">
                <DashboardPage />
              </Shell>
            }
          />
          <Route
            path="/meal-builder"
            element={
              <Shell title="Meal Builder">
                <DashboardPage />
              </Shell>
            }
          />
          <Route
            path="/shopping-list"
            element={
              <Shell title="Shopping List">
                <DashboardPage />
              </Shell>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
