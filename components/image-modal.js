const styles = new CSSStyleSheet();
styles.replaceSync(`
  .modal {
    display: none; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
  }

  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%; 
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  img {
    object-fit: cover;
    width: 100%;
  }
`);

class ImageModal extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [styles];

    // Create the image element
    this.image = document.createElement('img');
    this.image.setAttribute('src', this.getAttribute('thumb'));
    this.image.addEventListener('click', this.openModal.bind(this));

    // Create the modal element
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    // Create the modal content
    this.modalContent = document.createElement('div');
    this.modalContent.classList.add('modal-content');

    // Create the close button
    this.closeButton = document.createElement('span');
    this.closeButton.classList.add('close');
    this.closeButton.innerHTML = '×';
    this.closeButton.addEventListener('click', this.closeModal.bind(this));

    // Create the modal image
    this.modalImage = document.createElement('img');
    this.modalImage.setAttribute('src', this.getAttribute('full'));

    // Assemble the modal
    this.modalContent.appendChild(this.closeButton);
    this.modalContent.appendChild(this.modalImage);
    this.modal.appendChild(this.modalContent);

    // Attach elements to the shadow DOM
    this.shadowRoot.appendChild(this.image);
    this.shadowRoot.appendChild(this.modal);
  }

  openModal() {
    this.modal.style.display = 'block';
  }

  closeModal() {
    this.modal.style.display = 'none';
  }
}

// Define the custom element
customElements.define('image-modal', ImageModal);