import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import PlannerPage from "./pages/PlannerPage";
import MealsPage from "./pages/MealsPage";
import IngredientsPage from "./pages/IngredientsPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import TemplatePage from "./pages/TemplatePage";
import Shell from "./Shell";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Shell title="Planner">
                <PlannerPage />
              </Shell>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <Shell title="Dashboard">
                <DashboardPage />
              </Shell>
            }
          />
          <Route
            path="/planner"
            element={
              <Shell title="Planner">
                <PlannerPage />
              </Shell>
            }
          />
          <Route
            path="/meals"
            element={
              <Shell title="Meals">
                <MealsPage />
              </Shell>
            }
          />
          <Route
            path="/ingredients"
            element={
              <Shell title="Ingredients">
                <IngredientsPage />
              </Shell>
            }
          />
          <Route
            path="/shopping-list"
            element={
              <Shell title="Shopping List">
                <ShoppingListPage />
              </Shell>
            }
          />
          <Route
            path="/template"
            element={
              <Shell title="Template">
                <TemplatePage />
              </Shell>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
