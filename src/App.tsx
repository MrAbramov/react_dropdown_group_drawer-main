import './App.css';
import {WallConfigurationDrawer} from "./components/WallConfigurationDrawer";

function App() {
    const onWallConfigurationDrawerSave = (output: Record<string, string | number>[]) => {
        console.log('onWallConfigurationDrawerSave', output);
    }

    return <WallConfigurationDrawer onSave={onWallConfigurationDrawerSave}/>
}

export default App;
