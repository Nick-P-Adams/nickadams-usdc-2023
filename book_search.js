/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
	var result = {
        "SearchTerm": "",
        "Results": []
    };
	
	/** Number of book objects in the scannedTextObj argument */
	var bookCount = scannedTextObj.length;
	
	/** 
	* searchTerm will be the same regardless of whether or not there is a hyphenated word break.
	* Therefore, I will add it to results here before the remaining logic. 
	*/
	result["SearchTerm"] = searchTerm;
	
	/** 
	* First iteration of this procedure did not account for hyphenated word breaks.
	* Below I have added some code to account for the hyphenated word breaks.
	* If a seperate line contains a portion of the searchTerm then I will return both lines 
	* as seperate entries to the Results array in output.
	*/
	
	for(var i=0; i < bookCount; i++) {
		/** Storing the relevant book level information as we iterate over each book object. i.e. isbn and content entry count */
		var isbn = scannedTextObj[i]["ISBN"]
		var contentCount = scannedTextObj[i]["Content"].length
		
		for(var k=0; k < contentCount; k++) {
			/** Storing the current line of text for the content as well as the last char to check for hyphenated word breaks */
			var currentText = scannedTextObj[i]["Content"][k]["Text"]
			var lastChar = currentText[currentText.length - 1]
			
			/** Storing the relevant book content information as we iterate over each piece of content */
			var page = scannedTextObj[i]["Content"][k]["Page"]
			var line = scannedTextObj[i]["Content"][k]["Line"]
			
			if(currentText.includes(searchTerm)) {
				result["Results"].push(formatResults(isbn, page, line)); 
			}
			else if(lastChar === "-") {
				/**
				* Since a hyphenated word break was detected I will grab the end of the word from the next line.
				* Next the end of the word will be concatenated right before the hyphen to make the word whole again. 
				* Then we can check to see if the searchTerm is indeed in the text.
				* If it is we then add both lines to the result.
				*/
				var wordEnd = scannedTextObj[i]["Content"][k+1]["Text"].split(" ")[0];
				var currentText = currentText.substr(0, currentText.length - 1) + wordEnd;
				
				/** Storing relevant information just incase the hyphenated word was or was a part of the searchTerm */
				var nextPage = scannedTextObj[i]["Content"][k+1]["Page"];
				var nextLine = scannedTextObj[i]["Content"][k+1]["Line"];
				
				if(currentText.includes(searchTerm)) {
					result["Results"].push(formatResults(isbn, page, line));
					result["Results"].push(formatResults(isbn, nextPage, nextLine))
				}
			}
		}
	}
	
	console.log(result);
    return result; 
}

/** 
* After the first two iterations I got the functionality I wanted out of the code.
* However, the code is not very readable and there is lots of duplicate code. 
* Below you will find helper functions which I refactored the code into to make the whole thing more readable. 
*/

function formatResults(isbn, page, line) {
	return {"ISBN": isbn, 
			"Page": page, 
			"Line": line};
}

/** TESTING OBJECTS BELOW */

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum. The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Example output object */
const hyphenatedTwentyLeaguesOut = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
		{
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */
 
/** POSITIVE UNIT TESTS */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Unit test for verifying the handling of hyphenated word breaks */
const test3result = findSearchTermInBooks("darkness", twentyLeaguesIn); 
if (JSON.stringify(hyphenatedTwentyLeaguesOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", hyphenatedTwentyLeaguesOut);
    console.log("Received:", test3result);
}

/** NEGATIVE UNIT TESTS */

/** CASE-SENSITIVE UNIT TESTS */
