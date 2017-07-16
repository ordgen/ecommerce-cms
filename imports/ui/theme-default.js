import { lime700, lime500, lime400, lime200, grey900, brown900, darkBlack, white } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const themeDefault = getMuiTheme({
  palette: {
    primary1Color: lime500,
    primary2Color: lime700,
    primary3Color: lime400,
    accent1Color: lime200,
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
