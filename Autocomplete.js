function partySearch() {
    console.log("searching...")
    let searchTerm = document.getElementById("partySearchBar").value;
     let results = []
     let foundResults = 0;
     for (let i = 0; i < data.length; i++) {
         if (data[i].name.includes(searchTerm)) {
             results.push(data[i]);
             foundResults++;
             if (foundResults > 5) {
                 break;
             }
         }
     }
     console.log(results)
    const searchResults = document.getElementById("resultsContainer");
     searchResults.innerHTML = "";
    if(foundResults > 0)
    {

        for (let i = 0 ; i < results.length; i++) {
            const li = document.createElement("li");
            console.log(results[i])
            li.innerHTML = results[i].name;
            li.setAttribute("class", "partyResult");
            searchResults.appendChild(li);
            li.addEventListener("click", function() {
                addCandidateToBallot(results[i].name, results[i].emblem)
            })
        }
    }
}
document.getElementById("partySearchBar").addEventListener("input", partySearch)