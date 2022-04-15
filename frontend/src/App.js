import './App.css';
import "@fontsource/roboto/300.css";

import SidebarNav from './Common/SidebarNav';
import Body from './Body';

function App() {
  return (
    <div style={{ fontFamily: "roboto" }}>
      <SidebarNav />
      <Body />
    </div>
  );
}

export default App;
