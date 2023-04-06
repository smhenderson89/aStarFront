function nameDistanceCall (event) {
  event.preventDefault() // prevent form summition to new webpage
  let name = document.getElementById("inputName").value;
  let keyboard = document.getElementById("keyboard").value;

  // Check Enter Name information for issues
  // If Issues, then break function and ask user to input a validName
  validName = checkName(name)
  if (!validName) {
    console.log('not a valid name')
    return 
  }

  // Disable api button until results found 
  let apiButton = document.getElementById("apiCall")
  apiButton.disabled = true ;

  // Start Progress Spinner while API is being called
  let spinner = document.getElementById("showSpinner");
  spinner.style = "visibility: visible;"

  // console.log(`Calling API with Name: ${name}, keyboard: ${keyboard}`);
  axios.get(`https://namedistance.onrender.com/dist/${keyboard}&${name}`)
  .then(function (response) {
      let info = response.data.data
      apiButton.disabled = false; // Enable button once results found
      spinner.style = "visibility: hidden;"
      showResults(info, keyboard, name)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // console.log('function end')
    });
}

function showResults(info, keyboard, name) {
  // Remove Previous information
  const table = document.getElementById("table")
  table.innerHTML = " "
  const keyboardType = document.getElementById("keyboardType");
  keyboardType.innerHTML = "Keyboard Type: "
  const nameSearched = document.getElementById("nameSearch")
  nameSearched.innerHTML = "Name Searched: "

  // Update Keyboard and Name Search Info
  keyboardType.innerHTML += `${keyboard}`
  nameSearched.innerHTML += `${name}`

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

function checkName(name) {
  /*  If Name is Not Valid
  - No name entered (blank)
  - No valid alpha characters
      Prevent submit for form
  If Name has special characters/numbers
    Skip white space or dash for form
    Skip special characters if possible
  If All Valid characters (use Regex)
    Return name for Api call
  */

  return false
}