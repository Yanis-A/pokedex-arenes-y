import AppRoutes from './router/Routes.jsx'
import './App.css'
import Navigation from './components/Navigation.jsx'
import TeamToast from './components/TeamToast.jsx'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <AppRoutes />
      <TeamToast />
    </div>
  )
}

export default App
