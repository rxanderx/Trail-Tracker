// verse elements that need lists to append to them:     verse1 verse2 verse3 verse4
// button ID:    createButton
// changeable filter ID:      sortBy1         
// ^ its values:              standard triplet alternating
// changeable filter 2 ID:    sortBy2
// ^ its values:              end  beginningAndEnd



// initialize the list that will hold the rhymes
let list_of_rhymes
let verse1
let verse2
let verse3
let verse4


// this function helps choose random rhyme pairs to implement, returning an integer \
// within the range (min,max)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRhyme(){
    // retrieve the length of all rhyme types to pick one at random

    console.log("29: " + Object.keys(list_of_rhymes.rhymes).length)
    max = Object.keys(list_of_rhymes.rhymes).length - 1
    num = getRandomInt(0,max) 

    // retrieve the length of all rhymes of that type to pick two at random

    console.log("35: " + list_of_rhymes.rhymes[Object.keys(list_of_rhymes.rhymes)[num]].length)
    max = list_of_rhymes.rhymes[Object.keys(list_of_rhymes.rhymes)[num]].length - 1
    num1 = getRandomInt(0,max)
    num2 = getRandomInt(0,max)

    // this while loop guarantees that we get 2 different items from the list
    while (num2 == num1){
        num2 = getRandomInt(0,max)
    }

    // now we just add the 2 items to a return_list and send them back to whomever called us
    return_list = []
    // list_of_rhymes.rhymes[Object.keys(list_of_rhymes.rhymes)[2]][1] TKKKK
    return_list.push(list_of_rhymes.rhymes[Object.keys(list_of_rhymes.rhymes)[num]][num1])
    return_list.push(list_of_rhymes.rhymes[Object.keys(list_of_rhymes.rhymes)[num]][num2])

    return return_list
}

function generateTriplet(){
    max = Object.keys(list_of_rhymes.triplets).length - 1
    num = getRandomInt(0,max)
    

    // now we just add the 2 items to a return_list and send them back to whomever called us
    return_list = []
    return_list.push(Object.keys(list_of_rhymes.triplets)[num])
    return_list.push(list_of_rhymes.triplets[Object.keys(list_of_rhymes.triplets)[num]])

    return return_list
}

function rhymePattern(){
    // checking the conditionals to see what rhyme pattern is selected

    if(document.getElementById("sortBy1").value == "standard"){
        return generateRhyme()
    }
    else if(document.getElementById("sortBy1").value == "triplet"){
        return generateTriplet()
    }
    else {
        console.log("Issue with checking the formatting controls value 1")
    }
}

function rhymeScheme(){
    // checking the conditionals to see what rhyme scheme is selected

    if(document.getElementById("sortBy2").value == "end"){
        // the rhymes only happen once, at the end of each stanza
        // this means we only need 2 sets of rhymes, and we can put one at the end of each
        list1 = rhymePattern()
        list2 = rhymePattern()
        verse1 = list1[0]
        verse2 = list1[1]
        verse3 = list2[0]
        verse4 = list2[1]

    }
    else if(document.getElementById("sortBy2").value == "beginningAndEnd"){
        // the rhymes happen at the beginning and end of each stanza
        // this means we need 4 sets of rhymes and can put one on each stanza
        list1 = rhymePattern()
        list2 = rhymePattern()
        list3 = rhymePattern()
        list4 = rhymePattern()
        verse1 = list1[0] + " " + list2[0]
        verse2 = list1[1] + " " + list2[1]
        verse3 = list3[0] + " " + list4[0]
        verse4 = list3[1] + " " + list4[1]

        return
    }
    else {
        console.log("Issue with checking the formatting controls value 2")
    }
}

// This function gets the json file from the mock api call on mocky.io
async function runAll(){
    const response = await fetch('https://run.mocky.io/v3/982748ea-5e01-4c27-9f4b-545d01f80dea');
    const data = await response.json();
    list_of_rhymes = data
    
    reset()

    rhymeScheme()
    
    document.getElementById("verse1").innerHTML = verse1
    document.getElementById("verse2").innerHTML = verse2
    document.getElementById("verse3").innerHTML = verse3
    document.getElementById("verse4").innerHTML = verse4



    
    //document.getElementById("verse1").innerHTML = ""
    //document.getElementById("verse2").innerHTML = ""
    //document.getElementById("verse3").innerHTML = 
    //document.getElementById("verse4").innerHTML = 
}

function rerun(){
    reset()
    rhymeScheme()
    document.getElementById("verse1").innerHTML = verse1
    document.getElementById("verse2").innerHTML = verse2
    document.getElementById("verse3").innerHTML = verse3
    document.getElementById("verse4").innerHTML = verse4
}
// This function will clear the verse ID articles so that they are ready to be repopulated by freshly generated words

function reset(){
    document.getElementById("verse1").innerHTML = ""
    document.getElementById("verse2").innerHTML = ""
    document.getElementById("verse3").innerHTML = ""
    document.getElementById("verse4").innerHTML = ""
}


// This eventlistener will call the processes when the user clicks the button
document.getElementById("button1").addEventListener("click", runAll);


