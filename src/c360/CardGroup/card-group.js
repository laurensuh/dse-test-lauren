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
import { templateFrom } from 'elix/src/core/htmlLiterals.js'

import stylesheet from './card-group.css'

// Fake card data coming in:
// const cardItems = {[
//   {
//     headline: 'Card One',
//     buttontext: 'Click here',
//     text: "Card One Text goes here",
//     src: 'src',
//     imgalt: 'image one alt text'
//   },
//   {
//     headline: 'Card Two',
//     buttontext: 'Click here',
//     text: "Card Two Text goes here",
//     src: 'src',
//     imgalt: 'image two alt text'
//   },
//   {
//     headline: 'Card Three',
//     buttontext: 'Click here',
//     text: "Card Three Text goes here",
//     src: 'src',
//     imgalt: 'image three alt text'
//   }
// ]}

class C360CardGroup extends ReactiveElement {

  // Button text:
  get cardgroupheading() {
    return this[state].cardgroupheading
  }

  set cardgroupheading(cardgroupheading) {
    this[setState]({
      cardgroupheading
    })
  }

  get [template]() {

    return templateFrom.html`
      <style>
        ${stylesheet}
      </style>

      <div>
        <c360-headline part="card-grp-headline" level="h1" size="x-large" class="hidden">
        </c360-headline>
        <div class="card-group">
          <div>
            <c360-card 
              src="src"
              imgalt="mountain"
              headline="Card One" 
              text="Card one text" 
            />
          </div>
          <div>
            <c360-card 
              headline="Card Two"  
              src="src"
              imgalt="river"
              text="Card two text" 
            />
          </div>
          <div>
            <c360-card 
              headline="Card Three" 
              src="src"
              imgalt="beach"
              text="Card three text" 
            />
          </div>
        </div>
      </div>
    `
  }

  // Change detector / dispatcher
  [render](changed) {
    super[render](changed);

    // To Do: create 360-card depending on the data passed in:
    const div = document.createElement('div');
    console.log('div', div)


    // grab references to DOM elements that changes with APIs
    const cardGroupHeadlineDOM = this.shadowRoot.children[1].children[0];

    // Detects for changes to Variant state
    if (changed.cardgroupheading) {
      const { cardgroupheading } = this[state];

      if(cardgroupheading) {
        cardGroupHeadlineDOM.classList.remove('hidden');
        cardGroupHeadlineDOM.innerHTML = cardgroupheading;
      }
    }
  }
}

export default C360CardGroup

/*
NOTES:
// usage:
Make it as easy as possible for Devs to consume component.
If they feed in data, internally component should loop over data 
and create child component (cards) automatically

Ex:
<c360cardgroup 
  for="cardData.cards"
  title="cardData.headline"
>
</c360cardgroup>

// internally it would look like this
<c360cardgroup 
  data="card"
>
  map -> return c360card component:
  <c360card 
    headline="card.headline"
    image="card.img"
    buttontext="card.buttontext"
    text="card.text"
  />
  <c360card 
    headline="card.headline"
    image="card.img"
    buttontext="card.buttontext"
    text="card.text"
  />
</c360cardgroup>

Step by Step: 
1. Bring over card  component
2. Hard code things first and then start to refactor.
3. Think about mobile, tablet and desktop 
4. (Not finished) Bring over data and create card components based on data
5. Accessibility
  - voice over
  - keyboard interaction - tabs
  - proper use of html and attributes 
6. Styling
  - theming?
Questions:
  - can users set number of cards per row? grid spacing? Should there be a type API that determines the number of cards per row?
  - is the whole card clickable? focus? keyboard interaction

*/