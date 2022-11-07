import "./index.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./User/Auth/Auth";
import HomeLayout from "./Layouts/HomeLayout";
import { Toaster } from "react-hot-toast";
import PostDetails from "./Posts/Post/PostDetails";
import UserProfile from "./User/Profile/UserProfile";

function App() {
  return (
    <div className="flex flex-col">
      <Toaster />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/category/:id" element={<HomeLayout category />} />
        <Route path="/posts/:id/search" element={<HomeLayout search />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
