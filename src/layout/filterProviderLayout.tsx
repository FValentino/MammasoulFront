import { Outlet } from "react-router-dom";
import { FilterProvider } from "../context";

export default function FilterProviderLayout() {
  return (
    <FilterProvider>
      <Outlet />
    </FilterProvider>
  );
}