var data = [];
let travelUrl = "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97";

// Promise reference :https://github.com/mdn/js-examples/blob/master/promises-test/index.html
function loadData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(console.error("The data didn't load successfully."));
            }
        };
        xhr.onerror = function () {
            // xhr fails to begin with
            reject(console.error('There was a network error.'));
        };
        xhr.send();
    });
}
// set initial page

// Call the function with the URL we want to load
loadData(travelUrl).then(function (response) {
    let dataJson = response;
    //console.log(dataJson);
    tmpData = JSON.parse(dataJson);
    //console.log("tmp:", tmpData.result.records);
    // Information
    data  = tmpData.result.records;
    let regionList = [];
    console.log(typeof(data));
    console.log(data.length);
    for (var i = 0; i < data.length; i++){
        console.log(data[i].Zone);
        break;
    }

}, function (error) {
    console.log(Error);
});


