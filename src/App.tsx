import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { PlayerProvider } from './player/PlayerContext'
import { PersistentPlayer } from './player/PersistentPlayer'
import Home from './pages/Home'
import About from './pages/About'
import Performances from './pages/Performances'
import Originals from './pages/Originals'
import SongDetail from './pages/SongDetail'
import Gallery from './pages/Gallery'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="performances" element={<Performances />} />
            <Route path="originals" element={<Originals />} />
            <Route path="originals/:songId" element={<SongDetail />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        {/* Rendered outside <Layout>/<Outlet> so it survives route changes untouched. */}
        <PersistentPlayer />
      </PlayerProvider>
    </BrowserRouter>
  )
}

export default App
