import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Layout} from './pages/Layout';
import {Dashboard} from './pages/Dashboard';
import {Assets} from './pages/Assets';
import { Production } from './pages/Production';
import { Compliance } from './pages/Compliance';
import {Analytics} from './pages/Analytics';
import { Maintanance } from './pages/Maintanance';
import { StatusView } from './components/maintenance components/StatusView';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Everything inside this Route will use the Layout component */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="assets" element={<Assets />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="production" element={<Production />} />
          <Route path="maintanance" element={<Maintanance />} />
          <Route path="/maintenance/status" element={<StatusView />} />
          <Route path="compliance" element={<Compliance />} />
          {/* <Route path="analytics" element={<Analytics />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;