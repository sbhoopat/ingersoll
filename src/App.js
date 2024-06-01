import './App.css';
import GeneratePDF from './pdf/GeneratePDF';
import Logo from './images/logo.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className='logo-img' src={Logo} alt=''/>
      </header>
      <body>
      <GeneratePDF />
      </body>
    </div>
  );
}

export default App;
