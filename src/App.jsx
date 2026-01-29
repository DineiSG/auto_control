  import './App.css'

  import ContainerPrincipal from "./components/container/ContainerPrincipal";
  import Body from './pages/body/Body';
  import './chartStyle.css';
  import 'bootstrap/dist/css/bootstrap.min.css'
  import useInitializeSession from './services/useInitilizeSession';


  function App() {
    useInitializeSession();
    return (
      <>
        <ContainerPrincipal>
          <Body />
        </ContainerPrincipal>
      </>
    )
  }

  export default App
