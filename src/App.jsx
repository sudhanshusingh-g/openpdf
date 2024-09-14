import { Route, Routes } from "react-router-dom";
import DocumentList from "./pages/DocumentList";
import DocumentViewer from "./pages/DocumentViewer";


function App() {
  return (
    <Routes>
      <Route path="/" element={<DocumentList/>}/>
      <Route path="/document/:id" element={<DocumentViewer/>}/>
    </Routes>
  );
}

export default App;
