import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import withWidth, { LARGE, SMALL } from 'material-ui/utils/withWidth';
import MapsLocalMall from 'material-ui/svg-icons/maps/local-mall';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { pink600, teal900 } from 'material-ui/styles/colors';
import { DashboardMenus } from '../../site-config';
import Products from '../products/Products';
import NewProduct from '../products/NewProduct';
import EditProduct from '../products/EditProduct';
import ProductCategories from '../product-categories/ProductCategories';
import NewProductCategory from '../product-categories/NewProductCategory';
import EditProductCategory from '../product-categories/EditProductCategory';
import SliderImages from '../slider-images/SliderImages';
import NewSliderImage from '../slider-images/NewSliderImage';
import EditSliderImage from '../slider-images/EditSliderImage';
import Orders from '../orders/Orders';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import OrderView from '../orders/OrderView';
import InfoBox from '../../components/InfoBox';
import SiteConfig from '../site-config/SiteConfig';
import Header from './DashboardHeader';
import LeftDrawer from './LeftDrawer';

const getInfoBoxStats = () =>
  new Promise((resolve, reject) =>
    Meteor.call('Products.methods.getInfoBoxStats',
      {},
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      },
    ),
  );

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true,
      infoboxStats: null,
    };
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
  }

  componentDidMount() {
    getInfoBoxStats().then(
      (infoboxStats) => {
        this.setState({
          infoboxStats,
        });
      },
    );
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
    const { navDrawerOpen, infoboxStats } = this.state;
    const { match, location: { pathname } } = this.props; // eslint-disable-line react/prop-types
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
        {infoboxStats &&
          <div style={styles.container}>
            {(pathname === '/dashboard') &&
              <div>
                <BreadCrumbs match={match} pageTitle="Dashboard" />
                <div
                  className="container"
                  style={{ marginTop: 20 }}
                >
                  <div className="row">
                    <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                      <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 infobox">
                          <Link to="/dashboard/products">
                            <InfoBox
                              Icon={MapsLocalMall}
                              color={pink600}
                              title="Products"
                              value={infoboxStats.totalProducts}
                            />
                          </Link>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 infobox">
                          <Link to="/dashboard/orders">
                            <InfoBox
                              Icon={ActionShoppingCart}
                              color={teal900}
                              title="Orders"
                              value={infoboxStats.totalOrders}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            <Route
              exact
              path={`${match.url}/products`}
              component={Products}
            />
            <Route
              exact
              path={`${match.url}/products/new`}
              component={NewProduct}
            />
            <Route
              exact
              path={`${match.url}/products/edit/:productId`}
              component={EditProduct}
            />
            <Route
              exact
              path={`${match.url}/product-categories`}
              component={ProductCategories}
            />
            <Route
              exact
              path={`${match.url}/product-categories/new`}
              component={NewProductCategory}
            />
            <Route
              exact
              path={`${match.url}/product-categories/edit/:categoryId`}
              component={EditProductCategory}
            />
            <Route
              exact
              path={`${match.url}/slider-images`}
              component={SliderImages}
            />
            <Route
              exact
              path={`${match.url}/slider-images/new`}
              component={NewSliderImage}
            />
            <Route
              exact
              path={`${match.url}/slider-images/edit/:imageId`}
              component={EditSliderImage}
            />
            <Route
              exact
              path={`${match.url}/orders`}
              component={Orders}
            />
            <Route
              exact
              path={`${match.url}/orders/:orderId`}
              component={OrderView}
            />
            <Route
              exact
              path={`${match.url}/site-information`}
              component={SiteConfig}
            />
          </div>
        }
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
