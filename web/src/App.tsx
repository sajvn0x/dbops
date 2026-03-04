import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { ConnectionsPage } from './pages/connections';
import { QueryEditor } from './pages/query-editor';
import { Monitoring } from './pages/monitoring';
import { Settings } from './pages/settings';

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen bg-background">
				<Navbar />
				<Routes>
					<Route path="/" element={<ConnectionsPage />} />
					<Route path="/query" element={<QueryEditor />} />
					<Route path="/monitoring" element={<Monitoring />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;