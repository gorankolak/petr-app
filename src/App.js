import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Config from './styles/ConfigStyle';
import GlobalStyle from './styles/GlobalStyle';
import AppWrapper from './styles/AppStyle';

import Header from './layout/Header';
import Main from './layout/Main';

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
