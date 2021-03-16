import Sidebar from './components/Sidebar'
import Circle from './components/Circle';
import SVG from './components/SVG';

const App = () => {
  return(
    <div className="container" >
      <Sidebar />
      <Circle />
      {/* <SVG /> */}
    </div >
  )
}

export default App;