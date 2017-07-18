import React, { Component } from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Header from './Header';
import { Products } from '../../site-config';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="ecommerce-cms-wrapper">
        <Header />
        <div className="ecommerce-cms-main-content clearfix">
          <article className="ecommerce-cms-article">
            <article className="ecommerce-cms-article-inner">
              <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
                <div className="container">
                  <div className="row">
                    {Products.map(product => (
                      <div
                        className="col-md-4 col-lg-4 col-xs-12 col-sm-6"
                        key={product.id}
                      >
                        <Card
                          style={{ marginBottom: 30 }}
                        >
                          <CardMedia>
                            <img src={product.image} alt="" />
                          </CardMedia>
                          <CardTitle title={product.category} subtitle={product.name} />
                          <CardText>
                            {product.description}
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
  }
}

export default Home;
