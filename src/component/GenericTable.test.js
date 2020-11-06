import GenericTable from "./GenericTable";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import getResultsMock from "../mocks/results";

configure({ adapter: new Adapter() });

// GLOBALS
let component;

// SELECTORS
const getHeaderCols = (component) => component.find("table thead th");
const getBodyRows = (component) => component.find("table tbody tr");
const getBodyCell = (component, rowIndex, colIndex) =>
  getBodyRows(component).at(rowIndex).find("td").at(colIndex);

beforeEach(() => {
  component = shallow(<GenericTable data={getResultsMock()} />);
});

test("renders table with no data", () => {
  component = shallow(<GenericTable data={[]} />);
  // should display no header columns and no data rows
  expect(getHeaderCols(component).length).toEqual(0);
  expect(getBodyRows(component).length).toEqual(0);
});

test("renders table with data prop only", () => {
  // should render all 6 header columns
  const headerCols = getHeaderCols(component);
  expect(headerCols.length).toEqual(6);
  expect(headerCols.at(0).text()).toEqual("First Name");
  expect(headerCols.at(1).text()).toEqual("Last Name");
  expect(headerCols.at(2).text()).toEqual("Email");
  expect(headerCols.at(3).text()).toEqual("Phone");
  expect(headerCols.at(4).text()).toEqual("Country");
  expect(headerCols.at(5).text()).toEqual("Creation Date");

  // should render all 3 data rows
  const bodyRows = getBodyRows(component);
  expect(bodyRows.length).toEqual(3);
  expect(bodyRows.at(0).text()).toEqual(
    "JackDoejack.doe@gmail.com1-777-511-8697USA2020-04-11T09:49:14.549Z"
  );
  expect(bodyRows.at(1).text()).toEqual(
    "AdamZahirzadam@hotmail.com212-555-511-0303Morocco2020-10-11T06:15:14.549Z"
  );
  expect(bodyRows.at(2).text()).toEqual(
    "JeanBonbonjean@gmail.com33-123-511-1380France2019-07-11T12:49:14.549Z"
  );
});

test("renders table with known columns", () => {
  component = shallow(
    <GenericTable cols={["email", "country"]} data={getResultsMock()} />
  );

  // should render only 2 header columns
  const headerCols = getHeaderCols(component);
  expect(headerCols.length).toEqual(2);
  expect(headerCols.at(0).text()).toEqual("Email");
  expect(headerCols.at(1).text()).toEqual("Country");

  // should render 3 data rows
  const bodyRows = getBodyRows(component);
  expect(bodyRows.length).toEqual(3);
  expect(bodyRows.at(0).text()).toEqual("jack.doe@gmail.comUSA");
  expect(bodyRows.at(1).text()).toEqual("zadam@hotmail.comMorocco");
  expect(bodyRows.at(2).text()).toEqual("bonjean@gmail.comFrance");
});

test("renders sortable table", () => {
  // should not display sorting button in header column
  expect(getHeaderCols(component).find("button").length).toEqual(0);
  // pass sortable prop to component
  component = shallow(<GenericTable data={getResultsMock()} sortable />);
  // should now display sorting buttons
  expect(getHeaderCols(component).find("button").length).toEqual(6);

  // should render the correct initial firstName values
  expect(getBodyCell(component, 0, 0).text()).toEqual("Jack");
  expect(getBodyCell(component, 1, 0).text()).toEqual("Adam");
  expect(getBodyCell(component, 2, 0).text()).toEqual("Jean");

  // should sort them correctly in ascending order
  getHeaderCols(component).at(0).find("button img").simulate("click");
  expect(getBodyCell(component, 0, 0).text()).toEqual("Adam");
  expect(getBodyCell(component, 1, 0).text()).toEqual("Jack");
  expect(getBodyCell(component, 2, 0).text()).toEqual("Jean");
  // should sort them correctly in descending order
  getHeaderCols(component).at(0).find("button img").simulate("click");
  expect(getBodyCell(component, 0, 0).text()).toEqual("Jean");
  expect(getBodyCell(component, 1, 0).text()).toEqual("Jack");
  expect(getBodyCell(component, 2, 0).text()).toEqual("Adam");
  // should sort them back correctly to initial order
  getHeaderCols(component).at(0).find("button img").simulate("click");
  expect(getBodyCell(component, 0, 0).text()).toEqual("Jack");
  expect(getBodyCell(component, 1, 0).text()).toEqual("Adam");
  expect(getBodyCell(component, 2, 0).text()).toEqual("Jean");
});

test("renders resizable table", () => {
  // cells should not be resizable
  expect(getHeaderCols(component).find(".resizable").length).toEqual(0);
  expect(getBodyRows(component).find(".resizable").length).toEqual(0);
  // pass resizable prop to component
  component = shallow(<GenericTable data={getResultsMock()} resizable />);
  // cells should now be resizable
  expect(getHeaderCols(component).find(".resizable").length).toEqual(6);
  expect(getBodyRows(component).find(".resizable").length).toEqual(18);
});

test("renders table with counter column", () => {
  // should render all 6 header columns
  expect(getHeaderCols(component).length).toEqual(6);
  // pass count prop to component
  component = shallow(<GenericTable data={getResultsMock()} count />);
  // should now render 1 extra counting col
  expect(getHeaderCols(component).length).toEqual(7);

  // first row cells should be counter values
  expect(getBodyCell(component, 0, 0).text()).toEqual("1");
  expect(getBodyCell(component, 1, 0).text()).toEqual("2");
  expect(getBodyCell(component, 2, 0).text()).toEqual("3");
});
