import React from "react";
import { Route } from "react-router-dom";
import routes from "../../routes";
import Menu from "./menu"

const App = ( ) => (
    <div>
        <header>
          <Menu />
        </header>

        { routes.map( route => (
            <Route key={ route.path } { ...route } />
        ) ) }

        <footer>
            I`m the footer, I am on every page.
        </footer>
    </div>
);

export default App;
