const styles = new CSSStyleSheet();
styles.replaceSync(`
  :host {
    position: relative;
    top: 10px;
  }
  p {
    margin: 0;
    font-size: 8px;
    text-align: center;
    font-family: 'Playfair Display SC', serif;
  }
  .custom-btn {
    padding: 10px 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
    outline: none;
    border-radius: 5px;
    font-family: 'Playfair Display SC', serif;
    font-weight: bolder;
  }

  .btn-11 {
    border: none;
    background-image: linear-gradient(
      315deg,
      #ffc4ec -10%,
      #efdbfd 50%,
      #ffedd6 110%
    );
    color: black;
    overflow: hidden;
  }
  .btn-11:hover {
      text-decoration: none;
      color: #fff;
  }
  .btn-11:before {
    position: absolute;
    content: '';
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: shiny-btn1 3s ease-in-out infinite;
  }
  .btn-11:hover{
    opacity: .7;
  }
  .btn-11:active{
    box-shadow:  4px 4px 6px 0 rgba(255,255,255,.3),
                -4px -4px 6px 0 rgba(116, 125, 136, .2), 
      inset -4px -4px 6px 0 rgba(255,255,255,.2),
      inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
  }

  @-webkit-keyframes shiny-btn1 {
    0% { -webkit-transform: scale(0) rotate(45deg); opacity: 0; }
    80% { -webkit-transform: scale(0) rotate(45deg); opacity: 0.5; }
    81% { -webkit-transform: scale(4) rotate(45deg); opacity: 1; }
    100% { -webkit-transform: scale(50) rotate(45deg); opacity: 0; }
  }
`);

export class AffiliateLink extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <p>Sponsored Link</p>
      <button class="custom-btn btn-11">${this.getAttribute('productName')}</div></button>
    `;

    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', () => {
      window.open(this.getAttribute('link'));
    });
  }
}

customElements.define('affiliate-link', AffiliateLink);
