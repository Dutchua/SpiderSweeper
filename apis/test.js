async function testHello() {
    return await fetch('http://localhost:8080/hello', options).then(res => {
        console.log("start rec")
        if (res.ok) {
            return res.json();
        }
        console.log("end rec")
    }).then(data => {
        console.log("handle data");
        console.log(data);
    });
}

let options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json', // Set the Content-Type header if needed
    }
};
let response = testHello();
console.log("value: "+response);
// var resp =
//     console.log(resp.then((promisedata) => {
//         console.log("Promise is resolved successfully", promisedata.json())
//     }))
