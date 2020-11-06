import React, { lazy, Suspense } from "react";

const GenericTable = lazy(() => import("./component/GenericTable"));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      error: null,
    };
  }

  componentDidMount() {
    fetch(
      "https://randomapi.com/api/adla57ou?key=WIPD-A8NX-RODL-V6LC&results=20"
    )
      .then((res) => res.json())
      .then(
        (response) => {
          this.setState({
            results: response.results,
            error: response.error,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  render() {
    return (
      <div id="app">
        {this.state.error && <div className="error">{this.state.error}</div>}
        {this.state.results && (
          <Suspense fallback={<div className="loading">Loading table...</div>}>
            <GenericTable data={this.state.results} sortable resizable count />
          </Suspense>
        )}
        <div className="credits">
          Icons made by <b>Smartline</b> and <b>Catalin Fertu</b> from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    );
  }
}
