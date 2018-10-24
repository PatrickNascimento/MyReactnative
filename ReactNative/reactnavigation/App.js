import { StackNavigator } from 'react-navigation';

import home from './pages/home/home';
import visualizarOS from './pages/visualizarOS';
import index from './pages/index/App';

const App = StackNavigator({
  home: {screen: home},
  visualizarOS: {screen: visualizarOS}  ,
  index: {screen: index}
});

export default App;

