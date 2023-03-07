function nameDistanceCall () {
  event.preventDefault()
  let name = document.getElementById("inputName").value;
  let keyboard = document.getElementById("keyboard").value;
  console.log(`Calling API with Name: ${name}, keyboard: ${keyboard}`);
  axios.get(`http://localhost:4000/dist/${keyboard}&${name}`)
  .then(function (response) {
      console.log('API success')
      let info = response.data.data
      console.log(info);
      showResults(info)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      console.log('function end')
    });
}

function showResults(info) {
  // Destroy previous box
  const table = document.getElementById("table")
  table.innerHTML = " "
  
  // Create Box Headers

  let thead = table.createTHead()
  let tr = thead.insertRow()
  headers = ['Start Letter', "End Letter", "Keyboard Path", "Distance"]
  for (let i = 0; i < headers.length; i++) {
    let col = document.createElement("th")
    col.scope = "col"
    col.innerHTML = headers[i]
    tr.appendChild(col)
  }

  // Show API Call Data
  let tbody = document.createElement("tbody")
  table.append(tbody)
  for (let j = 1; j < ((info.length) - 1); j++) {
    // Row
    tbody.insertRow()

    // Start
    let th = document.createElement("th")
    th.scope = "row"
    th.innerHTML = `${info[j].start}`
    tbody.appendChild(th)

    // End Letter
    let td1 = document.createElement("td")
    td1.innerHTML = `${info[j].end}`
    tbody.appendChild(td1)

    // Keyboard Path
    let td2 = document.createElement("td")

    // Add Arrows to the Path
    let jsonPath = info[j].path

    // If same letter, replace
    let arrowPath = "";
    for (let k = 0; k < jsonPath.length; k++) {
      if (k < (jsonPath.length) -1) {
        arrowPath += jsonPath[k]
        arrowPath += "→"
      } else {
        arrowPath += jsonPath[k]
      }
    }

    td2.innerHTML = arrowPath;
    tbody.appendChild(td2)

    // Distance for Letter
    let td3 = document.createElement("td")
    td3.innerHTML = `${info[j].distance}`
    tbody.appendChild(td3)
  }

  // Total Distance Summation
  let row = document.createElement("tr")
  tbody.append(row)
  let col = document.createElement("th")
  col.scope = "col";
  let totalDistance = (info[(info.length -1)]).totalDistance // Grab the last element of the array
  col.innerHTML = `Total: ${totalDistance}`
  row.append(col)
}

  // for (let j = 1; j < ((info.length) - 1); j++) {
  //   box.appendChild(row)
  //   col.innerHTML = info[j].start
  //   box.appendChild(col)
  //   col.innerHTML = info[j].end
  //   box.appendChild(col)
  //   col.innerHTML = info[j].distance 
  //   box.appendChild(col)
  //   col.innerHTML = info[j].path
  //   box.appendChild(col)
  // }