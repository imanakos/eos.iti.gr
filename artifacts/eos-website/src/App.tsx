import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { AppLayout } from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import News from "./pages/News";
import OurWork from "./pages/OurWork";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Publications from "./pages/Publications";
import SpecialIssues from "./pages/SpecialIssues";
import Workshops from "./pages/Workshops";
import Cooperations from "./pages/Cooperations";
import UAV from "./pages/UAV";
import ELearning from "./pages/ELearning";
import ZenodoPage from "./pages/ZenodoPage";
import VegetationIndices from "./pages/VegetationIndices";
import InundationMaps from "./pages/InundationMaps";
import LandCoverMaps from "./pages/LandCoverMaps";

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/news" component={News} />
        <Route path="/our-work" component={OurWork} />
        <Route path="/our-work/projects" component={Projects} />
        <Route path="/our-work/cooperations" component={Cooperations} />
        <Route path="/our-work/publications" component={Publications} />
        <Route path="/our-work/special-issues" component={SpecialIssues} />
        <Route path="/our-work/workshops" component={Workshops} />
        <Route path="/about" component={About} />
        <Route path="/about/team" component={Team} />
        <Route path="/services/uav" component={UAV} />
        <Route path="/services/zenodo" component={ZenodoPage} />
        <Route path="/services/vegetation-indices" component={VegetationIndices} />
        <Route path="/services/inundation-maps" component={InundationMaps} />
        <Route path="/services/land-cover-maps" component={LandCoverMaps} />
        <Route path="/e-learning" component={ELearning} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
