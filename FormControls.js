    "use strict";
    class Candidate {
    constructor(name, party, emblemId) {
    this.name = name;
    this.party = party;
    this.emblemId = emblemId
}
}

    var listOfCandidates = [];

    function addParty()
{
    const partyInputs = document.getElementsByName('partyInput');
    let selectedParty = null;
    let partyEmblemId = null;
    for (let i = 0; i < partyInputs.length; i++)
    {
        if (partyInputs[i].checked)
        {
            selectedParty = partyInputs[i].value;
            partyEmblemId = partyInputs[i].id;
            console.log(partyInputs[i])
            break;
        }
    }
    if (selectedParty != null)
    {
        console.log(selectedParty, partyEmblemId);
        hidePartyModal()
        addCandidateToBallot(selectedParty, partyEmblemId)
    }
    // todo error code to go here if selectedparty is null


}
function addCandidateToBallot(partyName, partyId=null)
{
    let newCandidateName = document.getElementById("newCandidateName").value;
    listOfCandidates.push(new Candidate(newCandidateName, partyName, partyId));
    const newCandidateDiv = document.createElement('div');
    newCandidateDiv.innerHTML = '<div class="candidateContainer"><img id=' + partyId + ' class="emblem" src=./Images/' + partyId + ' ><div><div class="candidateName">' + newCandidateName + '</div>' +
        '<div class="candidateParty"></div>' +
        partyName + '</div></div>';
    document.getElementById("candidate-list-container").appendChild(newCandidateDiv);
    hidePartyModal();
}

function addNewCandidateInput()
{
    const candidateDiv = document.createElement('div');
    document.getElementById("candidate-add-container").appendChild(candidateDiv);
}

function showPartyModal()
{
    const modalContainer = document.getElementById("party-modal");
    modalContainer.style.display = "block";
}

function hidePartyModal()
    {
        const modalContainer = document.getElementById("party-modal");
        modalContainer.style.display = "none";
    }

function addCandidate () {

let newCandidateName = document.getElementById("newCandidateName").value;
    if (!newCandidateName !== '') {
        showPartyModal();
    }
}

    function printSamplingSheet()
    {
        if (listOfCandidates.length === 0)
    {
        //there are no candidates
        //todo handle this
    }
        document.getElementById("main-container").innerHTML = '<page id="print-page" size="A4"></page>';
        let main = document.getElementById("print-page");
        listOfCandidates.forEach(candidate => {
            const newCandidateDiv = document.createElement('div');
            newCandidateDiv.innerHTML = '<div class="candidateContainer"><div class="candidateName">' + candidate.name + '</div>' +
            '<div class="candidateParty">' +
            candidate.party + '</div></div>';
            main.appendChild(newCandidateDiv);
    })

    }
    var doc = new jsPDF();

    // Empty square
    let leftMargin = 75;
    let topMargin = 40;
    let imprint = "";
    if (document.getElementById("imprint").value !== "") {
        imprint = document.getElementById("imprint").value;
    }


    function drawPartyEmblem(emblemId, x, y, width, height)
    {
        console.log("here we are");
        let uri = new URL("./Images/" + emblemId, location).href;
        console.log(encodeURI(uri));
        let imageData = doc.extractInfoFromBase64DataURI(btoa(uri));
        console.log(imageData);
        let el = document.getElementById(emblemId);
        doc.addImage(el, x, y, width, height, 'NONE')
    }

    function drawHeader()
    {
        doc.setFontSize(10)
        doc.text("Number of address of ballot box", 20, 15);
        doc.rect(75, 10, 40, 10);

        doc.text("Number of votes in ballot box", 20, 27);
        doc.rect(75, 22, 40, 10);

        doc.text("Your intials", 150, 27);
        doc.rect(175, 22, 20, 10);
    }

    function drawFooter()
    {
        doc.text(imprint, 10, 280);
    }

    function drawAllCandidates()
    {
        let rowPadding = 20;
        let leftMargin = 75;
        let emblemPadding = 5;

        for(let i = 0; i < listOfCandidates.length; i++)
        {
            console.log(listOfCandidates[i]);
            let y = topMargin + ((rowPadding + (i * rowPadding)))
            if (listOfCandidates[i].emblemId != null)
            {
                drawPartyEmblem(listOfCandidates[i].emblemId, emblemPadding, y - 10, 15, 15);
            }
            drawCandidateName(listOfCandidates[i].name, y);
            drawBoxes(y-10)
        }
    }

    function drawBoxes(topPadding)
    {

        let boxesPerRow = 25;
        let numRows = 3;
        let boxWidth = 5;

        doc.setFontSize(9)

        let x;
        let y;
        for (let iRow = 0; iRow < numRows; iRow++ )
        {
            for(let iBox = 0; iBox < boxesPerRow; iBox++)
            {
                x = leftMargin + (boxWidth + (iBox * boxWidth));
                y = topPadding + (iRow * boxWidth);
                doc.rect(x, y, boxWidth, boxWidth);
                let num = (((iRow * boxesPerRow) + iBox) + 1);

                doc.text(num.toString(), x + 1 ,y+4)
            }
        }
    }

    function drawCandidateName(candidateName, topPadding)
    {
        let left = 25;
        doc.setFontSize(14);
        doc.text(candidateName, left, topPadding);
    }

    function drawSampleSheet()
    {
        drawHeader()
        drawAllCandidates()
        drawFooter()
        doc.save("SamplingSheet.pdf");
    }













    document.getElementById("add-candidate-btn").addEventListener("click", addNewCandidateInput);
    document.getElementById("print-button").addEventListener("click", drawSampleSheet);
    document.getElementById("add-party-button").addEventListener("click", addParty);



