// Parameters
let BMIList = [];
let BMIrecord = {
    "bmi": "",
    "weight": "",
    "height": "",
    "result": "",
    "date": "",
    "time": "",
};
document.querySelector(".wrap").style.width = window.innerWidth + "px";
let storeList = localStorage.getItem("BMIRecord") || undefined;
// Add format to Date
// Resource : https://www.cnblogs.com/tugenhua0707/p/3776808.html
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
function updatePageView(headerWidth, mainWidth, footerWidth){
    document.querySelector(".header").style.padding = "0 " + (window.innerWidth - headerWidth) / 2 + "px";
    document.querySelector(".main").style.padding = "0 " + (window.innerWidth - mainWidth) / 2 + "px";
    document.querySelector(".footer").style.padding = "0 " + (window.innerWidth - footerWidth) / 2 + "px";
}
// Display a card of record
function displayOfRecord(record) {
    let liNode = document.createElement("LI"); // create a LI
    let labelNode = document.createElement("DIV"); // create a DIV
    labelNode.setAttribute("class", "label" + " " + record.result[0]);
    liNode.appendChild(labelNode);
    let resultNode = document.createElement("H2");
    resultNode.textContent = record.result[1];
    liNode.appendChild(resultNode);
    for (var j = 0; j < 3; j++) {
        //console.log("record:", Object.keys(record)[j], Object.values(record)[j]);
        let itemNode = document.createElement("H3");
        itemNode.textContent = Object.keys(record)[j];
        let dataNode = document.createElement("H4");
        dataNode.textContent = Object.values(record)[j][0] + Object.values(record)[j][1];
        liNode.appendChild(itemNode);
        liNode.appendChild(dataNode);
    }
    let timeNode = document.createElement("P");
    timeNode.textContent = record.date + "\n" + record.time;
    liNode.appendChild(timeNode);
    return liNode;
    //console.log("node:", liNode);
}
// Display a list of records
function displayOfList(BMIList) {
    let ulList = document.querySelector(".bmilist");
    while (ulList.firstChild) {
        ulList.removeChild(ulList.firstChild);
    }
    for (var i = 0; i < BMIList.length; i++) {
        //console.log("here:", i);
        ulList.appendChild(displayOfRecord(BMIList[i]));
    }
}

function displayOfResult(data) {
    // create element of result
    let viewNode = document.createElement("DIV");
    viewNode.setAttribute("class", "resetbutton" + " " + data.result[0]);
    let bmiNode = document.createElement("H1");
    bmiNode.textContent = data.bmi[0];
    let bmiTagNode = document.createElement("H2");
    bmiTagNode.textContent = "BMI";
    let setButtonNode = document.createElement("BUTTON");
    setButtonNode.setAttribute("id", "set");
    let bmiResultNode = document.createElement("DIV");
    bmiResultNode.setAttribute("class", "reset" + " " + data.result[0]);
    bmiResultNode.textContent = data.result[1];
    // chain
    viewNode.appendChild(bmiNode);
    viewNode.appendChild(bmiTagNode);
    viewNode.appendChild(setButtonNode);
    // clear nodes of change class
    let fatherNode = document.querySelector(".change");
    while (fatherNode.firstChild) {
        fatherNode.removeChild(fatherNode.firstChild);
    }
    // add view to father node
    fatherNode.appendChild(viewNode);
    fatherNode.appendChild(bmiResultNode);
    updateReset();
}
// Event
function updateBMIList() {
    let resultButton = document.querySelector(".resultbutton");
    resultButton.addEventListener("click", function () {
        // Add data and calculate
        let usrHeight = document.getElementById("height").value;
        let usrWeight = document.getElementById("weight").value;
        let bmi = (usrWeight / Math.pow(usrHeight / 100, 2)).toFixed(2);
        let usrResult = "";
        if (bmi <= 15) {
            usrResult = ["severeThinness", "重度過輕"];   // 1重度過輕
        } else if (bmi > 15 && bmi <= 16) {
            usrResult = ["moderateThinness", "中度過輕"]; // 2中度過輕
        } else if (bmi > 16 && bmi <= 18.5) {
            usrResult = ["mildThinness", "過輕"];     // 3過輕
        } else if (bmi > 18.5 && bmi <= 25) {
            usrResult = ["normal", "理想"];           // 4理想
        } else if (bmi > 25 && bmi <= 30) {
            usrResult = ["overWeight", "過重"];       // 過重
        } else if (bmi > 30 && bmi <= 35) {
            usrResult = ["obeseClass1", "中度過重"];      // 中度過重
        } else if (bmi > 35 && bmi <= 40) {
            usrResult = ["obeseClass2", "重度過重"];      // 重度過重
        } else if (bmi > 40) {
            usrResult = ["obeseClass3", "極度過重"];      // 極度過重
        }
        let currentTime = new Date();
        let usrDate = currentTime.format("MM-dd-yyyy");
        let usrTime = currentTime.format("hh:mm:ss");
        BMIrecord = {
            "bmi": [bmi, ""],
            "weight": [usrWeight, "kg"],
            "height": [usrHeight, "cm"],
            "result": usrResult,
            "date": usrDate,
            "time": usrTime,
        };
        // update array
        BMIList.push(BMIrecord);
        // change display of button
        displayOfResult(BMIrecord);
        // update view of BMI record
        displayOfList(BMIList);
        // store data to local storage
        updateLocalStorage(BMIList);

    }, false);
}
function updateReset(){
    let setButton = document.getElementById("set");
    // set reset event listener
    setButton.addEventListener("click", function () {
        let fatherNode = document.querySelector(".change");
        while (fatherNode.firstChild) {
            fatherNode.removeChild(fatherNode.firstChild);
        }
        let resultButton = document.createElement("BUTTON");
        resultButton.textContent = "看結果";
        resultButton.setAttribute("class", "resultbutton");
        fatherNode.appendChild(resultButton);

        updateBMIList();
    }, false);
}
// Save data to local storage
function updateLocalStorage(storeList){
    localStorage.clear();
    let updateList = JSON.stringify(storeList);
    localStorage.setItem("BMIRecord", updateList);
}

// set initial page
updatePageView(750, 700, 55);
window.onresize = function () {
    if (window.innerWidth > 800) {
        document.querySelector(".wrap").style.width = window.innerWidth + "px";
    } else {
        document.querySelector(".wrap").style.width = "800px";
    }
    this.updatePageView(750, 700, 55);
};
if(storeList){
    let loadList = JSON.parse(storeList);
    BMIList = loadList;
    displayOfList(BMIList);
    updateBMIList();
}else{
    updateBMIList();
}

