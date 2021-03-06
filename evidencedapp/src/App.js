import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import initBlockchain from "./utils/initBlockchain";
import getEvidenceCount from "./utils/getEvidenceCount";

import { HashRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Provider } from "react-redux";

import MyEvidenceHoldings from "./pages/MyEvidenceHoldings";
import AuthorizeOthers from "./pages/AuthorizeOthers";
import LogNewEvidence from "./pages/LogNewEvidence"
import AllEvidence from "./pages/AllEvidence";
import TopBar from "./components/TopBar";
import Greeting from "./pages/Greeting";
import Team from "./pages/Team"

import store from "./redux/store";

//
//  This is the main application page; routing is handled to render other pages in the application

class App extends Component {
  // define a state variable for important connectivity data to the blockchain
  // this will then be put into the REDUX store for retrieval by other pages


  // **************************************************************************
  //
  // React will call this routine only once when App page loads; do initialization here
  //
  // **************************************************************************

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3(); // from utils directory;  connect to metamask
      const data = await initBlockchain(web3);  // get contract instance and user address
      await getEvidenceCount(data.CoC, data.userAddress);  // get user count and total count of zombies
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );

      console.log(error);
    }
  };

  // **************************************************************************
  //
  // main render routine for App component;
  //      contains route info to navigate between pages
  //
  // **************************************************************************

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Container>
            <TopBar state={this.state} />
            <div>
              <Route exact path="/" component={Greeting} />
              <Route exact path="/Team" component={Team} />
              <Route exact path="/LogNewEvidence" component={LogNewEvidence} />
              <Route exact path="/myEvidenceHoldings" component={MyEvidenceHoldings} />
              <Route exact path="/AllEvidence" component={AllEvidence} />
              <Route exact path="/AuthorizeOthers" component={AuthorizeOthers} />
              {/* routes used in zombie action modal */}
            </div>
          </Container>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
