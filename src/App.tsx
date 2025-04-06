
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddVehicle from "./pages/AddVehicle";
import EditVehicle from "./pages/EditVehicle";
import ViewVehicle from "./pages/ViewVehicle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddVehicle />} />
              <Route path="/edit/:id" element={<EditVehicle />} />
              <Route path="/view/:id" element={<ViewVehicle />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
