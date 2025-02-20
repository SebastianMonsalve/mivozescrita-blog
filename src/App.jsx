import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import MyState from "./context/data/myState";
import CreateBlog from "./pages/admin/createBlog/createBlog";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/createblog"
            element={
              <ProtectedRouteForAdmin>
                <CreateBlog />
              </ProtectedRouteForAdmin>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
}

export default App;

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  if (admin?.user?.email === import.meta.env.VITE_ADMIN_EMAIL) {
    return children;
  } else {
    console.log(admin, import.meta.env.VITE_ADMIN_EMAIL);
    return <Navigate to={"/adminlogin"} />;
  }
};
