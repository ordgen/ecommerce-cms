import { lime600, lime700, pinkA400, grey900, darkBlack, white } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const themeDefault = getMuiTheme({
  palette: {
    primary1Color: lime600,
    primary2Color: lime700,
    accent1Color: pinkA400,
  },
  textColor: darkBlack,
  alternateTextColor: white,
  appBar: {
    height: 57,
  },
  drawer: {
    width: 230,
    color: grey900,
  },
});


export default themeDefault;
