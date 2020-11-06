import App from "./App";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// CONSTANTS
const ERROR_MESSAGE = "Error message";

test("renders App component", () => {
  const component = shallow(<App />);
  expect(component).toBeTruthy();
});

test("renders error if error message set in the state", () => {
  const component = shallow(<App />);
  component.setState({
    error: ERROR_MESSAGE,
  });
  expect(component.find(".error").at(0).text()).toEqual(ERROR_MESSAGE);
});
