import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './index.css';
import './components/tryunfo.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchByrarity: '',
      searchByName: '',
      cardName: 'Galo Cego',
      cardDescription: 'Vida para o resto da sua vida',
      cardAttr1: '99',
      cardAttr2: '99',
      cardAttr3: '99',
      cardImage: 'https://scontent.fssa14-1.fna.fbcdn.net/v/t1.18169-9/11703056_106128956398161_3035295867555569678_n.png?_nc_cat=108&ccb=1-7&_nc_sid=e3f864&_nc_ohc=Mhfn4wng1nUAX9Vvzgx&_nc_ht=scontent.fssa14-1.fna&oh=00_AT8veKkxIqoIreas7TdMWZHBTp3pD9-1Gfl4DNe2TbvHEA&oe=62E2D55E',
      cardRare: 'Íper raro',
      cardTrunfo: true,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      arrayCards: [],
    };
  }

  validatingInformation = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;
    const duzentos = 210;
    const noventa = 90;
    const attrSum = (Number(cardAttr1)
      + Number(cardAttr2) + Number(cardAttr3)) <= duzentos;
    if (
      (+cardAttr1) > noventa
      || (+cardAttr2) > noventa
      || (+cardAttr3) > noventa
      || (+cardAttr1) < 0
      || (+cardAttr2) < 0
      || (+cardAttr3) < 0) return true;
    return !(cardName
    && cardImage
    && cardRare
    && cardDescription
    && attrSum
    );
  };

  hasTrunfo = () => {
    const { arrayCards } = this.state;
    const trunfo = arrayCards.find(({ cardTrunfo }) => cardTrunfo);
    if (trunfo) {
      this.setState({ hasTrunfo: true });
    } else {
      this.setState({ hasTrunfo: false });
    }
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.setState({ isSaveButtonDisabled: this.validatingInformation() }));
  };

  onSaveButtonClick = (infCard) => {
    infCard.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;
    const objectCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    this.setState(({ arrayCards }) => ({
      arrayCards: [...arrayCards, objectCard],
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardRare: 'normal',
      cardImage: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }), () => this.hasTrunfo());
  };

  deletCard = (cardIndex) => {
    const { arrayCards } = this.state;
    this.setState({
      arrayCards: arrayCards.filter((_, index) => cardIndex !== index),
    }, () => this.hasTrunfo());
  }

  searchByName = ({ target }) => {
    this.setState({ searchByName: target.value });
  }

  searchByrarity = ({ target }) => {
    this.setState({ searchByrarity: target.value === 'todas' ? '' : target.value });
  }

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
      isSaveButtonDisabled,
      arrayCards,
      hasTrunfo,
      searchByName,
      searchByrarity,
    } = this.state;
    return (
      <div className="dadApp">
        <h1>Tryunfo</h1>
        <section className="App">
          <div className="DivForm">
            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              onInputChange={ this.onInputChange }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onSaveButtonClick={ this.onSaveButtonClick }
              hasTrunfo={ hasTrunfo }
            />
          </div>
          <div className="DivCard">
            <h2 className="TitleCard">Pré-visualização</h2>
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </div>
        </section>
        <section className="arrayCards">
          <div className="filterCards">
            <input
              type="text"
              data-testid="name-filter"
              placeholder="Galo Cego"
              onChange={ this.searchByName }
            />
            <select
              defaultValue="todas"
              onChange={ this.searchByrarity }
              data-testid="rare-filter"
            >
              <option value="todas">todas</option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito">muito raro</option>
            </select>
          </div>
          <div className="div-cards">
            {arrayCards.filter(({ cardRare: searchRare }) => searchRare.split(' ')[0]
              .includes(searchByrarity))
              .filter(({ cardName: searchName }) => searchName
                .includes(searchByName))
              .map(({
                cardName: name,
                cardDescription: description,
                cardAttr1: power,
                cardAttr2: speed,
                cardAttr3: life,
                cardImage: image,
                cardTrunfo: funcCardTrunfo,
                cardRare: rarity,
              }, index) => (
                <Card
                  key={ index }
                  cardName={ name }
                  cardDescription={ description }
                  cardAttr1={ power }
                  cardAttr2={ speed }
                  cardAttr3={ life }
                  cardImage={ image }
                  cardRare={ rarity }
                  cardTrunfo={ funcCardTrunfo }
                  deletCard={ this.deletCard }
                  buttonEnable
                  cardIndex={ index }
                />))}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
