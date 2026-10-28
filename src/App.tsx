import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ListingsProvider } from "./context/ListingsContext";
import { AddListing } from "./pages/AddListing";
import { Browse } from "./pages/Browse";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <ListingsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<Browse />} />
          <Route path="/add" element={<AddListing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ListingsProvider>
  );
}
