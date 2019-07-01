import { serverUrl, _get_request } from "../api.js";
import { remove } from '../ls-service';


function parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content.cloneNode(true);
}

function sortNumsDesc(arr, by) { return arr.sort((a, b) => b[by] - a[by]); }
function sortNumsAsc(arr, by) { return arr.sort((a, b) => a[by] - b[by]); }

const handle_open_tab = (e, type) => {

    if (e && e.target.attributes) {
        type = e.target.attributes.custom_type.value;
    }

    const loader = document.querySelector("body .common-container .hero-wrapper .leaderBoard .outer-board .loader-wrapper");
    loader.style.display = "block";


    const myUrl = serverUrl('/leaderboard1');

    _get_request(myUrl, handleResponseData);

    function handleResponseData(res) {
        loader.style.display = "none";
        const tasks = res['leaderboard'];
        const user_rank = res['userData']['currentRank'];
        let type_key = "rank";
        // switch (type) {
        //     case "today": { type_key = "todaysCompletedTasks"; } break;
        //     case "last_week": { type_key = "weeksCompletedTasks"; } break;
        //     case "all_time": { type_key = "allTimeCompetedTasks"; } break;
        // }

        const sorted = sortNumsAsc(tasks, type_key);

        const top_50 = sorted.slice(0, 50);
        const top_50_html = handleSortedData(top_50, user_rank);


        const ul_elem = document.querySelector('.leaderBoard .inner-board .ulClass');
        ul_elem.innerHTML = top_50_html.join(' ');
        // console.log('html---', ul_elem.innerHTML)

        // const headertab = document.querySelectorAll('.outer-board > ul > li');
        // for (let i = 0; i < headertab.length; i++) {
        //     if (headertab[i].attributes.custom_type.value === type) {
        //         headertab[i].classList.add('selected');
        //     } else {
        //         headertab[i].classList.remove('selected');
        //     }
        // }
    }

    const handleSortedData = (data, user_rank) => {

        return data.map((item, i) => {
            let current_class = "";
            let main_desc = "main_desc not_show";
            if (Number(i + 1) === Number(user_rank)) {
                current_class = "current-user";
                main_desc = "main_desc show";
            }
            return `<li class=${current_class}>
            <div class="main">
                <div class="user-rank">${item['rank']}</div>
                <div class="user-name">
                <div class="user-image"><img src="./public/images/avatar.png"></div>
                <div class="user-image-name">${item['name']}</div>
                <!-- <div class="task-status"></div> -->
                </div>
                <div class="user-score">${item['score']}</div>
                <div class="user-score">${ item["totalTasksDone"]}</div>
            </div>

            <div class ="${main_desc}">
                <ul>
                    <li>Previous score</li>
                    <li>&#9650; data</li>
                    <li>&#9650; data</li>
                </ul>
            </div>
         </li> `;
        })
    }
}

const handle_logout = () => {
    remove('xxx-kon-dev-token');
    window.location.href = window.location.href;
}

export default {
    handle_logout,
    handle_open_tab
}