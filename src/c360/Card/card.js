/**
 * This Class is built on top of Elix's "ReactiveElement"
 * base element. Think of this like React's Component class.
 *
 * Documentation on ReactiveElement can be found here:
 * https://component.kitchen/elix/ReactiveElement
 *
 * Also check out documentation on ReactiveMixin, to better
 * understand how component state is managed:
 * https://component.kitchen/elix/ReactiveMixin
 * (you can also see `src/sds/Button/button.js` for a state management example)
 */

import ReactiveElement from 'elix/src/core/ReactiveElement'
import { setState, template, state, render } from 'elix/src/base/internal'
// import { internal } from 'elix'
import { templateFrom } from 'elix/src/core/htmlLiterals.js'

import stylesheet from './card.css'

class C360Card extends ReactiveElement {

  // Button text:
  get buttontext() {
    return this[state].buttontext
  }

  set buttontext(buttontext) {
    this[setState]({
      buttontext
    })
  }

  // Headline text:
  get headline() {
    return this[state].headline
  }

  set headline(headline) {
    this[setState]({
      headline
    })
  }

  // Main body text:
  get text() {
    return this[state].text
  }

  set text(text) {
    this[setState]({
      text
    })
  }

  // (Optional) Image src:
  get src() {
    return this[state].src
  }

  set src(src) {
    this[setState]({
      src
    })
  }

  // (Optional) Image alt text:
  get imgalt() {
    return this[state].imgalt
  }

  set imgalt(imgalt) {
    this[setState]({
      imgalt
    })
  }

  get [template]() {

    return templateFrom.html`
      <style>
        ${stylesheet}
      </style>

      <div>
        <c360-headline 
          id="card-headline" 
          part="card-headline" 
          level="h2" 
          size="small"
        >
          Card Headline
        </c360-headline>
        <img class="hidden"
        />
        <p 
          part="card-text"
          id="card-text"
        >
          Card Text
        </p>
        <c360-button 
          part="card-button" 
          variant="brand"
        >
          Card Button
        </c360-button>
      </div>
    `
  }

  // Change detector / dispatcher
  [render](changed) {
    super[render](changed)

    // create API variables
    const { buttontext, headline, src, text, imgalt } = this[state];

    // grab references to DOM elements that changes with APIs
    const cardHeadlineDOM = this.shadowRoot.children[1].children[0];
    const cardImgDOM = this.shadowRoot.children[1].children[1];
    const cardTextDOM = this.shadowRoot.children[1].children[2];
    const cardButtonTextDOM = this.shadowRoot.children[1].children[3]

    // set APIs
    if(changed.headline) {
      cardHeadlineDOM.innerHTML = headline;
    }

    if(changed.buttontext) {
      cardButtonTextDOM.innerHTML = buttontext;
    }

    if(changed.text) {
      cardTextDOM.innerHTML = text;
    }

    if(changed.src) {
      if(src) {
        cardImgDOM.classList.remove('hidden');
        cardImgDOM.setAttribute('src', src);
        cardImgDOM.setAttribute('part', 'card-img');
      }
    }

    if(changed.imgalt) {
      if(imgalt) {
        cardImgDOM.setAttribute('alt', imgalt);
      } else {
        cardImgDOM.removeAttribute('alt')
      }
    }

  }
}

export default C360Card


/*
NOTES:
1. Create card component
  - Headline
  - Image (Optional)
    - alt text
    - fall back image css
  - Text Description
  - CTA button

  -HOW I WANT IT TO BE USED:
  <c360card
    headline=""
    src=""
    buttontext=""
    text="" 
  />

  - look into accessibiltiy for card component

2. Hard code things first and then start to refactor.

3. Think about accessibility, axe (in sb), voice over, keyboard interaction

4. Styles
  - Card component will expand 100%. Container (parent, card group will set width on the card)
  - theming? Pass in themes that can color the component properly

5. Testing?
  - snapshot
  - unit test
  - chromatic

*/