import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { ProductCategoriesWithProductSelector } from '../../models/selectors/productCategories';
import Header from '../shared/Header';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';
import './Home.css';

const Home = function Home({ categoriesWithProduct }) {
  return (
    <div className="ecommerce-cms-wrapper">
      <Header />
      <div className="ecommerce-cms-main-content clearfix">
        <article className="ecommerce-cms-article">
          <article className="ecommerce-cms-article-inner">
            <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
              <div className="container">
                <div className="row">
                  {categoriesWithProduct.map(category => (
                    <div
                      className="col-md-4 col-lg-4 col-xs-12 col-sm-6"
                      key={category.id}
                    >
                      <Card
                        style={{ marginBottom: 30 }}
                      >
                        <CardMedia>
                          <img src={category.product.pictures[0]} alt="" />
                        </CardMedia>
                        <CardTitle title={category.name} subtitle={category.product.name} />
                        <CardText>
                          {category.description}
                        </CardText>
                        <CardActions>
                          <FlatButton label="View" />
                        </CardActions>
                      </Card>
                    </div>
                  ))
                  }
                </div>
              </div>
            </section>
          </article>
        </article>
      </div>
      <PrimaryFooter />
      <SecondaryFooter />
    </div>
  );
};

Home.propTypes = {
  categoriesWithProduct: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  categoriesWithProduct: ProductCategoriesWithProductSelector(state),
});

export default connect(mapStateToProps, null)(Home);
