import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Old from './pages/Old.jsx'
import { Layout } from './components/Layout.jsx'
import EditorDnd from './pages/EditorDnd.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/old" element={<Old />} />
          <Route path="/dndtest" element={<EditorDnd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>,
)
