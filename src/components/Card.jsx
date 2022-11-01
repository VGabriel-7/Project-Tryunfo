import React from 'react';
import propTypes from 'prop-types';
import './tryunfo.css';
import trash from '../images/trash-2.svg';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      buttonEnable,
      deletCard,
      cardIndex,
    } = this.props;
    return (
      <section className="Card">
        <div className="NameImage">
          <h2 data-testid="name-card">{ cardName }</h2>
          <img
            className="cardImage"
            src={ cardImage }
            alt={ cardName }
            data-testid="image-card"
          />
        </div>
        <div className="Description">
          <p data-testid="description-card">
            { cardDescription }
          </p>
        </div>
        <div className="Attr">
          <h3 data-testid="attr1-card">
            Speed..................
            {' '}
            { cardAttr1 }
          </h3>
          <h3 data-testid="attr2-card">
            Power..................
            {' '}
            { cardAttr2 }
          </h3>
          <h3 data-testid="attr3-card">
            Life.....................
            {' '}
            { cardAttr3 }
          </h3>
        </div>
        <div className="Raridade">
          <h3 data-testid="rare-card">
            { cardRare }
          </h3>
        </div>
        <div className="SuperTrunfo">
          {cardTrunfo
            ? <h3 data-testid="trunfo-card">Super Trunfo</h3>
            : undefined}
        </div>
        {buttonEnable
              && (
                <button
                  data-testid="delete-button"
                  type="button"
                  onClick={ () => deletCard(cardIndex) }
                  className="btn-trash"
                >
                  <img src={ trash } alt="lixeira" />
                </button>)}
      </section>
    );
  }
}

Card.propTypes = {
  cardName: propTypes.string,
  cardDescription: propTypes.string,
  cadAttr1: propTypes.string,
  cadAttr2: propTypes.string,
  cadAttr3: propTypes.string,
  cardImage: propTypes.string,
  cardRare: propTypes.string,
  cardTrunfo: propTypes.bool,
}.isRequired;

export default Card;
