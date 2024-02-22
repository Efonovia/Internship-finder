import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.components";
import Login from "./pages/Login.page";
import Signup from "./pages/Signup.page";
import MyApplications from "./pages/MyApplications.page";
import CompaniesByState from "./pages/CompaniesByState.page";
import CompaniesByCategory from "./pages/CompaniesByCategory.page";
import CompaniesBySearch from "./pages/CompaniesBySearch.page";
import CompanyDetailsPage from "./pages/CompanyDetails.page";
import SliderArea from "./components/SliderArea.components";
import FeaturedCategories from "./components/FeaturedCategories.components";
import CompaniesContainer from "./components/CompaniesContainer.components";

const Home = () => <main><SliderArea /><FeaturedCategories /><CompaniesContainer /></main>
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />}/>
        <Route path="auth/login" element={<Login />}/>
        <Route path="auth/signup" element={<Signup />}/>
        <Route path="companies/search" element={<CompaniesBySearch />}/>
        <Route path="companies/state" element={<CompaniesByState />}/>
        <Route path="companies/categories" element={<CompaniesByCategory />}/>
        <Route path="companies/details/:companyId" element={<CompanyDetailsPage />}/>
        <Route path="profile" element={<MyApplications />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
