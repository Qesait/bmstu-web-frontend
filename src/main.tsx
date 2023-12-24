import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./store";

// document.body.style.height = '100vh';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.body
)
