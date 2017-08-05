import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import Glide from 'react-glide';
import { Link } from 'react-router-dom';
import { ProductCategoriesWithProductSelector } from '../../models/selectors/productCategories';
import { AllSliderImagesSelector } from '../../models/selectors/sliderImages';
import Header from '../shared/Header';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';
import './Home.css';

const Home = function Home({ categoriesWithProduct, sliderImages }) {
  return (
    <div className="ecommerce-cms-wrapper">
      <Header />
      {(sliderImages && sliderImages.length > 0) &&
        <Glide
          autoPlay
          autoPlaySpeed={5000}
        >
          {sliderImages.map(sliderImage => (
            <Link
              key={sliderImage.id}
              to={sliderImage.link ? sliderImage.link : '#'}
            >
              <img
                src={sliderImage.image}
                alt=""
                className="img-fluid"
              />
            </Link>
          ))}
        </Glide>
      }
      <div className="ecommerce-cms-main-content clearfix">
        <article className="ecommerce-cms-article">
          <article className="ecommerce-cms-article-inner">
            <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
              <div className="container">
                <div className="row">
                  {categoriesWithProduct.map(category => (
                    <div
                      className="col-md-4 col-lg-4 col-xs-12 col-sm-6 product-card"
                      key={category.id}
                    >
                      <Link
                        to={`/category/${category.id}/products`}
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
                        </Card>
                      </Link>
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
  sliderImages: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  categoriesWithProduct: ProductCategoriesWithProductSelector(state),
  sliderImages: AllSliderImagesSelector(state),
});

export default connect(mapStateToProps, null)(Home);
