import { Link } from "wouter";
import { ArrowLeft, Satellite } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Satellite className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-6xl font-display font-extrabold text-primary mb-3">404</h1>
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has moved. Try navigating back to the home
          page.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
