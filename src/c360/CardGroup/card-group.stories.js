import { fragmentFrom } from 'elix/src/core/htmlLiterals'
import docs from './docs.mdx'

export default {
  title: 'C360 Components/Card Group',
  parameters: {
    docs: {
      page: docs
    }
  }
}

export const RFC = () => {
  return fragmentFrom.html`
    <h1>Card Group</h1>
    <p>
      You need to build this Card Group component from the specs
      outlined in the project's README file. Add one or more
      additional "Stories" (this function is a story) that
      showcase your component, and use Storybook's addons, such as
      the responsive viewport, or the AXE accessibility validator,
      to ensure that your component code is bulletproof.
    </p>
    <p>
      We have scaffolded out two components to assist with your
      development - this one, which is intended to contain the entire
      component structure, as well as a 'Card' component to represent
      an individual card.
    </p>
  `
}

export const Base = () => {
  return fragmentFrom.html`
    <c360-card-group />
  `
}

export const WithTitle = () => {
  return fragmentFrom.html`
    <c360-card-group 
      cardgroupheading="Want to learn more about Salesforce?"
    />
  `
}
