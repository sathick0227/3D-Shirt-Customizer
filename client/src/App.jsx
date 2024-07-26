import Canvas from "./canvas";
import FabricCanvas from "./FabricCanvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import TestCustomizer from "./pages/TextCustomizer";
import { Grid, Button } from "@mui/material";
import state from "./store";

const App = () => {
  return (
    <main className="app transition-all ease-in ">
      <Home />

      <Grid container>
        <Grid item xs={12} md={6} height="100vh" overflow={"scroll"}>
          {/* <Customizer /> */}
          <TestCustomizer />
        </Grid>
        <Grid item xs={12} md={6} height="100vh">
          <Canvas />
        </Grid>
      </Grid>
      {/* <FabricCanvas /> */}
    </main>
  );
};

export default App;
