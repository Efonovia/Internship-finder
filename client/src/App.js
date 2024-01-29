import Navbar from "./components/Navbar.components";
// import Login from "./pages/Login.page";
// import Signup from "./pages/Signup.page";
// import MyApplications from "./pages/MyApplications.page";
// import CompaniesByState from "./pages/CompaniesByState.page";
// import CompaniesByCategory from "./pages/CompaniesByCategory.page";
// import CompaniesBySearch from "./pages/CompaniesBySearch.page";
import CompanyDetailsPage from "./pages/CompanyDetails.page";
// import SliderArea from "./components/SliderArea.components";
// import FeaturedCategories from "./components/FeaturedCategories.components";
// import CompaniesContainer from "./components/CompaniesContainer.components";

function App() {
  return (
    <>
      <Navbar />
      {/* <Login /> */}
      {/* <Signup /> */}
      <CompanyDetailsPage />
      {/* <MyApplications /> */}
      {/* <CompaniesBySearch /> */}
      {/* <CompaniesByState /> */}
      {/* <CompaniesByCategory /> */}
      {/* <main>
        <SliderArea />
        <FeaturedCategories />
        <CompaniesContainer />
      </main> */}
    </>
  )
}

export default App;
