import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Glide from 'react-glide';
import { Link } from 'react-router-dom';
import { ProductCategoriesSelector } from '../models/selectors/productCategories';
import { AllSliderImagesSelector } from '../models/selectors/sliderImages';
import Header from './Header';
import PrimaryFooter from '../components/footer/PrimaryFooter';
import SecondaryFooter from '../components/footer/SecondaryFooter';
import CategoryProductBox from '../components/CategoryProductBox';

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
              to={sliderImage.pageLink ? sliderImage.pageLink : '#'}
            >
              <img
                src={sliderImage.url}
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
                      <CategoryProductBox category={category} />
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
  categoriesWithProduct: ProductCategoriesSelector(state),
  sliderImages: AllSliderImagesSelector(state),
});

export default connect(mapStateToProps, null)(Home);
