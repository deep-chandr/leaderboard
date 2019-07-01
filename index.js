import configs from './configs/config.js';
import main from './public/js/routes/leaderboard.js';
import login from './public/js/routes/login.js';
import './public/css/reset.scss';
import './public/css/leaderboard.scss';
import "./public/css/login/login.scss";



window.onload = function () {
   console.log('bundle file loaded:  ', configs.NODE_ENV);
   if (window.location.pathname !== '/login.html') {

      const token = window.localStorage.getItem('xxx-kon-dev-token');
      if (!token) {
         window.location.pathname = "/login.html";
      }
   }
   if (window.location.pathname === "/") {
      window.location.pathname = "/leaderboard.html";
   }
   main.handle_open_tab(null, 'today');

};

window.app = {
   main,
   login
}
