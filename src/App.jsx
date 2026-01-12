import { Toaster } from 'sonner'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'



function App() {
  return (
    <> 
      <Toaster richColors={true}
        position="top-right"
        toastOptions={{
          className: 'toast-style',
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage />}
          />
          <Route
            path="*" 
            element={<NotFoundPage />}
          />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
