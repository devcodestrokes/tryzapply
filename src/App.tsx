import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import TestosteroneLongQuiz from "./pages/TestosteroneLongQuiz.tsx";
import TestosteroneShortQuiz from "./pages/TestosteroneShortQuiz.tsx";
import EnergyLongQuiz from "./pages/EnergyLongQuiz.tsx";
import EnergyShortQuiz from "./pages/EnergyShortQuiz.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz/testosterone-long" element={<TestosteroneLongQuiz />} />
          <Route path="/quiz/testosterone-short" element={<TestosteroneShortQuiz />} />
          <Route path="/quiz/energy-long" element={<EnergyLongQuiz />} />
          <Route path="/quiz/energy-short" element={<EnergyShortQuiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
