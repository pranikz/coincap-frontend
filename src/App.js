import "./App.css";
import Cryptotable from "./Components/cryptoTable";
import Herobar from "./Components/Herobar";
import Navvbar from "./Components/Navvbar";

function App() {
  return (
    <div className="bg-gray-100">
      <Navvbar/>
      <Herobar />
      <Cryptotable />
    </div>
  );
}

export default App;
