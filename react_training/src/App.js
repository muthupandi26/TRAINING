import React from "react";
import { Routes, Route } from "react-router-dom";
import EmsLogin from "./pages/auth/EmsLogin";
import AddEmployee from "./pages/addEmployee/AddEmployee";
import ListEmployee from "./pages/listEmployee/ListEmployee";
import GitHomePage from "./pages/githubData/GitHomePage";

import { PAGE_ROUTES } from "./utils/constants";
import Weather from "./pages/weather/Weather";

function App() {
  return (
    <Routes>
      <Route path={PAGE_ROUTES.HOME} element={<EmsLogin />} />
      <Route path={PAGE_ROUTES.ADDEMPLOYEE} element={<AddEmployee />} />
      <Route path={PAGE_ROUTES.LISTEMPLOYEE} element={<ListEmployee />} />

      <Route path={PAGE_ROUTES.GITHOME} element={<GitHomePage />} />
      <Route path={PAGE_ROUTES.WEATHER} element={<Weather />} />
    </Routes>
  );
}
export default App;
