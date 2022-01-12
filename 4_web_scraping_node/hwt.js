// highest wicket taker of winning team

const url =
    "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");

console.log("highest wicket taker name");
request(url, cb);

function cb(error, response, html) {
    if (error) {
        console.error("error:", error);
    } else {
        extractHtml(html);
    }
}

function extractHtml(html) {
    let $ = cheerio.load(html);
    let teamsArr = $(".match-info.match-info-MATCH .team");

    // win Team Name
    let winTeamName;
    for (let i = 0;i < teamsArr.length;i++) {
        let hasClass = $(teamsArr[i]).hasClass("team-gray");
        if (!hasClass) {
            let teamName = $(teamsArr[i]).find(".name");
            winTeamName = teamName.text().trim();
        }
    }
    // console.log(winTeamName);

    let innigsArr = $(".card.content-block.match-scorecard-table>.Collapsible");

    let hwtName = "";
    let hwtTaken = 0;

    // highest Wicket taker name
    for (let i = 0;i < innigsArr.length;i++) {
        // tempHtml += $(dataTable[i]).html();

        let teamNameEle = $(innigsArr[i]).find(".header-title.label");
        let teamName = teamNameEle.text();
        teamName = teamName.split("INNINGS")[0].trim();

        // winning team
        if (winTeamName == teamName) {
            let tableData = $(innigsArr[i]).find(".table.bowler");
            let bowlerDataArr = $(tableData).find("tr");

            // highest wicket taker player name
            for (let j = 0;j < bowlerDataArr.length;j++) {
                let bowlerData = $(bowlerDataArr[j]).find("td");
                let playerName = $(bowlerData[0]).text();
                let wicketTaken = $(bowlerData[4]).text();

                if (hwtTaken <= wicketTaken) {
                    hwtName = playerName;
                }
            }
        }
    }
    console.log(`Winning Team ${winTeamName}, highest wicket Taker ${hwtName}, wickets taken: ${hwtTaken}`);
}
