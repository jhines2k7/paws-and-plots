import './affilliate-link.js';

const styles = new CSSStyleSheet();
styles.replaceSync(`
  :host {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 700px;
    background: #FFFFFF;
    display: flex;
  }

  img, #story {
    flex: 1;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: auto;
  }

  .desktop {
    display: block;
  }

  .mobile {
    display: none;
  }

  #story {
    padding: 40px;
    font-family: 'Playfair Display SC', serif;
  }

  #story h1, #story h2, #story h3 {
    text-align: center;
  }

  #story h1 {
    margin-bottom: 20px;
  }

  #story h2, #story h3 {
    font-size: 1em;
    margin-bottom: 30px;
    font-weight: normal;
  }

  .block {
    background: grey;
    opacity: .5;
    height: 5px;
    width: 200px;
  }

  #headline {
    flex-direction: row;
    display: flex;
    align-items: center;
  }

  #headline .block {
    margin-left: 30px;
  }

  #headline p {
    font-size: 1em;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .story-num {
    margin-left: auto;
    font-weight: bold;
  }

  .content {
    font-family: 'Playfair Display', serif;
    font-size: 10px;
    overflow: auto;
    height: 400px;
    padding: 0 5px;
  }

  .nav {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    right: 184.5px;
  }

  .nav a {
    margin: 0 10px;
    text-decoration: none;
    color: #000;
    font-size: 1em;
    font-family: 'Playfair Display SC', serif;
    width: 40px;
  }

  @media (max-width: 1067px) {
    :host {
      width: 95%;
      height: auto;
      display: contents;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 200px;
    }

    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }

    #story {
      flex: none;
      width: 90%;
      padding: 20px;
      margin: 0 auto;
      background: white;
    }

    .content {
      height: auto;
    }

    .nav {
      position: unset;
    }
  }
`);

export class Story extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    fetch(`stories/${this.slug}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        document.title = json.title;

        const prev = json.prev;
        const next = json.next;

        let prevButton = '';
        if (prev) {
          prevButton = `<a class="prev" href="/${prev}">PREV</a>`;
        }

        let nextButton = '';
        if (next) {
          nextButton = `<a class="next" href="/${next}">NEXT</a>`;
        }

        this.shadowRoot.innerHTML = `
          <img src=${json.image} class="desktop" alt="${json.imageAltText[1]}">
          <img src=${json.mobileImage} class="mobile" alt="${json.imageAltText[1]}">
          <div id="story">
            <div id="headline">        
              <p>Story</p>
              <div class="block"></div>
              <div class="story-num">${json.storyNum}</div>
            </div>
            <h1 class="title">${json.title}</h1>
            <h2 class="author">by ${json.author}</h2>
            <div class="content">${json.story}</div>
            <affiliate-link link="${json.affiliateLink}" productName="${this.toTitleCase(json.productName)}"></affiliate-link>
            <div class="nav">
              ${prevButton}
              ${nextButton}
            </div>          
          </div>
        `;

        if (window.innerWidth >= 1067) {
          const title = this.shadowRoot.querySelector('.title');
          const content = this.shadowRoot.querySelector('.content');
  
          // Get the height of the h1 element
          const titleHeight = title.offsetHeight;
  
          // Get the current height of the content div
          const contentHeight = content.offsetHeight;
  
          // Decrease the height of the content div by the height of the h1 element
          content.style.height = `${contentHeight - titleHeight}px`;
        }

        this.addNavigationHandlers(prev, next);

        this.moveAffiliateLink();
        window.addEventListener('resize', this.moveAffiliateLink.bind(this));
      })
      .catch(e => {
        console.log('There was a problem with the fetch operation: ' + e.message);
      });
  }

  moveAffiliateLink() {
    const story = this.shadowRoot.querySelector('#story');
    const affiliateLink = this.shadowRoot.querySelector('affiliate-link');

    if (window.innerWidth <= 1067) {
      this.shadowRoot.insertBefore(affiliateLink, story);
    } else {
      story.insertBefore(affiliateLink, story.querySelector('.nav'));
    }
  }

  addNavigationHandlers(prev, next) {
    const prevLink = this.shadowRoot.querySelector('.prev');
    const nextLink = this.shadowRoot.querySelector('.next');

    if (prevLink) {
      prevLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.router.navigate(`/${prev}`);
      });
    }

    if (nextLink) {
      nextLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.router.navigate(`/${next}`);
      });
    }
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}

customElements.define('the-story', Story);