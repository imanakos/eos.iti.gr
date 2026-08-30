import { lazy, Suspense } from "react";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { AppLayout } from "./components/layout/AppLayout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Research = lazy(() => import("./pages/Research"));
const ProjectCaseStudy = lazy(() => import("./pages/ProjectCaseStudy"));
const Tools = lazy(() => import("./pages/Tools"));
const News = lazy(() => import("./pages/News"));
const NewsArticle = lazy(() => import("./pages/NewsArticle"));
const EOInsights = lazy(() => import("./pages/EOInsights"));
const EOInsightArticle = lazy(() => import("./pages/EOInsightArticle"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/not-found"));

function PageLoadingFallback() {
  return (
    <div
      className="flex min-h-[65vh] items-center justify-center px-4 pt-24 text-sm text-muted-foreground"
      role="status"
    >
      Loading page...
    </div>
  );
}

function Router() {
  return (
    <AppLayout>
      <Suspense fallback={<PageLoadingFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/research/projects/:slug" component={ProjectCaseStudy} />
          <Route path="/research/:section" component={Research} />
          <Route path="/research" component={Research} />
          <Route path="/tools/:section" component={Tools} />
          <Route path="/tools" component={Tools} />
          <Route path="/news/:slug" component={NewsArticle} />
          <Route path="/news" component={News} />
          <Route path="/eo-insights/:slug" component={EOInsightArticle} />
          <Route path="/eo-insights" component={EOInsights} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AppLayout>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
