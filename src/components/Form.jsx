import React from 'react';
import propTypes from 'prop-types';
import './tryunfo.css';

class Form extends React.Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <>
        <h2 className="TitleForm">Adicionar nova carta</h2>
        <form className="Form">
          <label htmlFor="cardName">
            <p>Nome</p>
            <input
              maxLength="12"
              type="text"
              data-testid="name-input"
              name="cardName"
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardDescription">
            <p>Descrição</p>
            <textarea
              className="textArea"
              name="cardDescription"
              cols="30"
              rows="10"
              maxLength="183"
              data-testid="description-input"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardAttr1">
            <p>Attr1</p>
            <input
              maxLength="2"
              type="number"
              data-testid="attr1-input"
              name="cardAttr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardAttr2">
            <p>Attr2</p>
            <input
              maxLength="2"
              type="number"
              data-testid="attr2-input"
              name="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardAttr3">
            <p>Attr3</p>
            <input
              maxLength="2"
              type="number"
              data-testid="attr3-input"
              name="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="imageInput">
            <p>Imagem</p>
            <input
              type="text"
              data-testid="image-input"
              name="cardImage"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardRare">
            <p>Raridade</p>
            <select
              name="cardRare"
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option value="normal">
                normal
              </option>
              <option value="raro">
                raro
              </option>
              <option value="muito raro">
                muito raro
              </option>
            </select>
          </label>
          {hasTrunfo
            ? <p>Você já tem um Super Trunfo em seu baralho</p>
            : (
              <label htmlFor="cardTrunfo">
                <input
                  className="checkbox"
                  type="checkbox"
                  data-testid="trunfo-input"
                  name="cardTrunfo"
                  checked={ cardTrunfo }
                  onChange={ onInputChange }
                />
                <p>Super Trybe Trunfo</p>
              </label>
            )}
          <button
            type="submit"
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  cardName: propTypes.string,
  cardDescription: propTypes.string,
  cardAttr1: propTypes.string,
  cardAttr2: propTypes.string,
  cardAttr3: propTypes.string,
  cardImage: propTypes.string,
  cardRare: propTypes.string,
  cardTrunfo: propTypes.bool,
  hasTrunf: propTypes.bool,
  isSaveButtonDisabled: propTypes.bool,
  onInputChange: propTypes.func,
  onSaveButtonClick: propTypes.func,
}.isRequired;

export default Form;
