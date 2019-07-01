import configs from './configs/config.js';
import main from './public/js/routes/index_page.js';
import login from './public/js/routes/login.js';
import './public/css/reset.scss';
import './public/css/index_page.scss';
import "./public/css/login/login.scss";



window.onload = function () {
   console.log('bundle file loaded:  ', configs.NODE_ENV);
   if (window.location.pathname === '/') {
      
      const token = window.localStorage.getItem('xxx-kon-dev-token');
      if (!token) {
         window.location.pathname = "/login.html";
      }
      main.handle_open_tab(null, 'today');
   }
   
};

window.app = {
   main,
   login
}
