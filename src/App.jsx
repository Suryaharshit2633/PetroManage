import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Layout} from './components/Layout';
import {Dashboard} from './components/Dashboard';
import {Assets} from './components/Assets';
import { Production } from './components/Production';
import { Compliance } from './components/Compliance';
import {Analytics} from './components/Analytics';
import { Maintanance } from './components/Maintanance';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Everything inside this Route will use the Layout component */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="production" element={<Production />} />
          <Route path="maintanance" element={<Maintanance />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;