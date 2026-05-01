import AppRoutes from './router/Routes.jsx'
import './App.css'
import Navigation from './components/Navigation.jsx'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <AppRoutes />
    </div>
  )
}

export default App
