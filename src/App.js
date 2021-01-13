import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Config from './ConfigStyle';
import GlobalStyle from './GlobalStyle';
import AppWrapper from './AppStyle';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {
  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={Config}>
          <GlobalStyle />
          <AppWrapper>
            <Header />
            <Main />
          </AppWrapper>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
