import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { makeStyles } from "@mui/styles";
import 'react-alice-carousel/lib/alice-carousel.css';

const useStyle = makeStyles({
  app: {
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh"
  },
});

function App() {
  const classes = useStyle();
  return (
    <div className={classes.app}>
      <Header />
      <Outlet/>
    </div>
  );
}

export default App;
