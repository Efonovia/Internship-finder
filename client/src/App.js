import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login.page";
import Signup from "./pages/Signup.page";
import Navbar from "./components/Navbar.components";
import SavedCompanies from './pages/SavedCompanies.page';
import MyApplications from "./pages/MyApplications.page";
import SliderArea from "./components/SliderArea.components";
import CompaniesByState from "./pages/CompaniesByState.page";
import CompanyDetailsPage from "./pages/CompanyDetails.page";
import CompaniesBySearch from "./pages/CompaniesBySearch.page";
import CompaniesByCategory from "./pages/CompaniesByCategory.page";
import ProtectedRoute from './components/ProtectedRoute.components';
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
        <Route element={<ProtectedRoute />}>
            <Route path="applications" element={<MyApplications />}/>
            <Route path="saves" element={<SavedCompanies />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
