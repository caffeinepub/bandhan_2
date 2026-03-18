import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BrowsePage from "./pages/BrowsePage";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyProfilePage from "./pages/MyProfilePage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import RegisterPage from "./pages/RegisterPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const completeProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/complete-profile",
  component: CompleteProfilePage,
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browse",
  component: BrowsePage,
});

const profileDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile/$id",
  component: ProfileDetailPage,
});

const myProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-profile",
  component: MyProfilePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  completeProfileRoute,
  browseRoute,
  profileDetailRoute,
  myProfileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
