import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth';
import Header from './DashboardHeader';
import LeftDrawer from './LeftDrawer';
import { DashboardMenus } from '../../site-config';
import DashboardHome from '../../components/pages/dashboard/DashboardHome';
import ProductsList from '../../components/pages/ProductsList';
import NewProductCategory from '../product-categories/NewProductCategory';
import ProductCategories from '../product-categories/ProductCategories';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true,
    };
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
  }

  componentDidMount() {
    this.props.changePage(`${this.props.match.url}/home`);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  }

  render() {
    const { navDrawerOpen } = this.state;
    const { match } = this.props;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0,
      },
    };

    return (
      <div>
        <Header
          styles={styles.header}
          handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
          changePage={this.props.changePage}
        />
        <LeftDrawer
          navDrawerOpen={navDrawerOpen}
          menus={DashboardMenus}
          username="User Admin"
        />
        <div style={styles.container}>
          <Route
            path={`${match.url}/home`}
            component={DashboardHome}
          />
          <Route
            path={`${match.url}/products`}
            component={ProductsList}
          />
          <Route
            exact
            path={`${match.url}/product-categories/new`}
            component={NewProductCategory}
          />
          <Route
            exact
            path={`${match.url}/product-categories`}
            component={ProductCategories}
          />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  width: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);

const DashboardWithWidth = withWidth()(Dashboard);
export default connect(null, mapDispatchToProps)(DashboardWithWidth);
