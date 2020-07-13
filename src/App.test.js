import React from 'react';
// import { render } from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import App from './App';
import ReactDOM from 'react-dom';
import {render, unmountComponentAtNode} from 'react-dom';
import Restaurants from './components/Home/Restaurants';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without crashing", () => {
  container = document.createElement('div');
  ReactDOM.render(<App />, container)
});

it("renders restaurant data", async () => {
  const fakeData =  {
    "Restaurant ID": 1234567,
   "Restaurant Name": "Test",
   "Cuisines": "French, Japanese",
   "Average Cost for two": 1100,
   "Currency": "Botswana Pula(P)",
   "Has Table booking": "Yes",
   "Has Online delivery": "No",
   "Aggregate rating": 4.8,
   "Rating color": "Dark Green",
   "Rating text": "Excellent",
   "Votes": 200
  };

  act(() => {
    render(<Restaurants />, container);
  });
})

it("changes value as selected", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Restaurants onChange={onChange} />, container);
  });
})