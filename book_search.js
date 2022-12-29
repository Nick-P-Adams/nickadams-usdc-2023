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
	/* ensuring our search term is always of string data type */
	searchTerm = searchTerm.toString();
	
	var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };
	/** Number of book objects in the scannedTextObj argument */
	var bookCount = scannedTextObj.length;
	
	if(bookCount != 0 && Object.keys(scannedTextObj[0]).length !== 0) {
		for(var i=0; i < bookCount; i++) {
			/** Storing the relevant book level information as we iterate over each book object. i.e. isbn and content entry count */
			var currentBook = scannedTextObj[i];
			var isbn = currentBook["ISBN"];
			
			var bookContent = currentBook["Content"];
			var contentCount = bookContent.length;
			
			if(contentCount != 0 && Object.keys(bookContent[0]).length !== 0) {
				//console.log("In Content");
				for(var k=0; k < contentCount; k++) {
					/** Storing the current line of text for the content as well as the last char to check for hyphenated word breaks */
					var currentText = bookContent[k]["Text"];
					var lastChar = currentText[currentText.length - 1];
					/** Storing the relevant book content information as we iterate over each piece of content */
					var page = bookContent[k]["Page"];
					var line = bookContent[k]["Line"];
					
					if(currentText.includes(searchTerm) || searchTerm.includes(currentText)) {
						pushResults(result["Results"], formatResults(isbn, page, line)); 
					}
					else if(lastChar === "-" && k < (contentCount - 1)) {
						/**
						* Since a hyphenated word break was detected I will grab the end of the word from the next line.
						* Next the end of the word will be concatenated right before the hyphen to make the word whole again. 
						* Then we can check to see if the searchTerm is indeed in the text.
						* If it is we then add both lines to the result.
						*/
						var wordEnd = scannedTextObj[i]["Content"][k+1]["Text"].split(" ")[0];
						var updatedText = currentText.substr(0, currentText.length - 1) + wordEnd;
						var nextPage = bookContent[k+1]["Page"];
						var nextLine = bookContent[k+1]["Line"];
						
						if(updatedText.includes(searchTerm) || searchTerm.includes(updatedText)) {
							pushResults(result["Results"], formatResults(isbn, page, line));
							pushResults(result["Results"], formatResults(isbn, nextPage, nextLine));
						}
					}
				}
			}
		}
	}
	
	//console.log(result);
    return result; 
}

/** 
* Below is where I plan to put helper functions to make the code more readable. 
*/

/** This function is for formatting the results into a javaScript Object */
function formatResults(isbn, page, line) {
	return {"ISBN": isbn, 
			"Page": page, 
			"Line": line};
}

/** This function checks if the object exists in the resultArray first. If it does not then the object is appended to the array. */
function pushResults(resultArray, object) {
	if(!(JSON.stringify(resultArray).includes(JSON.stringify(object)))) {
		resultArray.push(object);
	}
}

/** TESTING OBJECTS BELOW */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IN OBJECTS

/** Example input object. */
const zeroBooksIn = []
const zeroBooksEmptyObjectIn = [{}]
const twentyLeaguesZeroContentIn =  [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [] 
    }
]

const twentyLeaguesContentWrongDataTypeIn =  [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [9, 10, 11] 
    }
]

const twentyLeaguesContentEmptyObjectIn =  [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [{}] 
    }
]

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
                "Text": "ness was then profound; and however good the Canadian\'s "
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

const twentyLeaguesWrongDataTypeIn = [
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
                "Text": "ness was then profound; and however good the Canadian\'s 9"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "127.0 eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

const multiBookIn = [
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
                "Text": "ness was then profound; and however good the Canadian\'s "
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
	{
        "Title": "The Ship Who Sang",
        "ISBN": "9780345334312",
        "Content": [
            {
                "Page": 1,
                "Line": 6,
                "Text": "The electro-encephalogram was entirely favorable, unexpectedly so, and the"
            },
            {
                "Page": 1,
                "Line": 7,
                "Text": "news was brought to the waiting, grieving parents. There was the final, harsh"
            },
            {
                "Page": 1,
                "Line": 8,
                "Text": "decision: to give their child euthanasia or permit it to become an encapsulated"
            },
			{
                "Page": 1,
                "Line": 9,
                "Text": "‘brain,’ a guiding mechanism in any one of a number of curious professions. As"
            } 
        ] 
    },
	{
        "Title": "Do Androids Dream of Electric Sheep",
        "ISBN": "9780752864303",
        "Content": [
            {
                "Page": 9,
                "Line": 6,
                "Text": "The visual image congealed; he saw at once a famous landscape, the old, brown, barren"
            },
            {
                "Page": 9,
                "Line": 7,
                "Text": "ascent, with tufts of dried-out bonelike weeds poking slantedly into a dim and sunless sky."
            },
            {
                "Page": 9,
                "Line": 8,
                "Text": "One single figure, more or less human in form, toiled its way up the hillside: an elderly man"
            }
        ] 
    }
]
   
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OUT OBJECTS
   
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

const twentyLeaguesAlternateOut = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

const multiBookOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
		{
            "ISBN": "9780345334312",
            "Page": 1,
            "Line": 6
        },
		{
            "ISBN": "9780345334312",
            "Page": 1,
            "Line": 7
        },
		{
            "ISBN": "9780345334312",
            "Page": 1,
            "Line": 8
        },
		{
            "ISBN": "9780752864303",
            "Page": 9,
            "Line": 6
        },
		{
            "ISBN": "9780752864303",
            "Page": 9,
            "Line": 8
        }
    ]
}

const twentyLeaguesDarknessOut = {
    "SearchTerm": "Darkness",
    "Results": []
}

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

const multilineTwentyLeaguesOut = {
    "SearchTerm": "now simply went on by her own momentum. The darkness was then profound; and however good the Canadian's eyes were, I asked myself how he had managed to see, and",
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
        },
		{
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
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
/////////////////////////////////////////////////////////////////////////////////////////////////////
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

/** Unit test to verify correct results across multiple books */
const test3result = findSearchTermInBooks("the", multiBookIn);
if (JSON.stringify(multiBookOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", multiBookOut);
    console.log("Received:", test3result);
}

/** Unit test for verifying the handling of hyphenated word breaks */
const test4result = findSearchTermInBooks("darkness", twentyLeaguesIn); 
if (JSON.stringify(hyphenatedTwentyLeaguesOut) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", hyphenatedTwentyLeaguesOut);
    console.log("Received:", test4result);
}

/** Unit test to verify correct results if given all the text in the twenty leagues book object. */
const test5result = findSearchTermInBooks("now simply went on by her own momentum. The darkness was then profound; and however good the Canadian's eyes were, I asked myself how he had managed to see, and", twentyLeaguesIn); 
if (JSON.stringify(multilineTwentyLeaguesOut) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", multilineTwentyLeaguesOut);
    console.log("Received:", test5result);
}

/** Unit test to verify correct results should we have 0 books in the input JSON */
const test6result = findSearchTermInBooks("the", zeroBooksIn); 
if (test6result.Results.length == 0) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", 0);
    console.log("Received:", test6result.Results.length);
}

/** Unit test to verify correct results if there are books but no content in the input JSON */
const test7result = findSearchTermInBooks("the", twentyLeaguesZeroContentIn); 
if (test7result.Results.length == 0) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", 0);
    console.log("Received:", test7result.Results.length);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/** NEGATIVE UNIT TESTS */

/** Unit test to verify correct results should we have 0 books as well as an empty object for input JSON */
const test8result = findSearchTermInBooks("the", zeroBooksEmptyObjectIn); 
if (test8result.Results.length == 0) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", 0);
    console.log("Received:", test8result.Results.length);
}

/** Unit test to verify correct results should we have a book but only and empty object in content. */
const test9result = findSearchTermInBooks("the", twentyLeaguesContentEmptyObjectIn); 
if (test9result.Results.length == 0) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", 0);
    console.log("Received:", test9result.Results.length);
}

/** Unit test to verify correct results when given a int and the number does not exist in the content. */
const test10result = findSearchTermInBooks(9, twentyLeaguesIn); 
if (test10result.Results.length == 0) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", 0);
    console.log("Received:", test10result.Results.length);
}

/** Unit test to verify correct results when given a float and the number does not exist in the content. */
const test11result = findSearchTermInBooks(127.0, twentyLeaguesIn); 
if (test11result.Results.length == 0) {
    console.log("PASS: Test 11");
} else {
    console.log("FAIL: Test 11");
    console.log("Expected:", 0);
    console.log("Received:", test11result.Results.length);
}

/** Unit test to verify correct results when given a int and the number does exist in the content. */
const test12result = findSearchTermInBooks(9, twentyLeaguesWrongDataTypeIn); 
if (test12result.Results.length == 1) {
    console.log("PASS: Test 12");
} else {
    console.log("FAIL: Test 12");
    console.log("Expected:", 1);
    console.log("Received:", test12result.Results.length);
}

/** Unit test to verify correct results when a books Content array contains the wrong datatype */
const test13result = findSearchTermInBooks("the", twentyLeaguesContentWrongDataTypeIn); 
if (test13result.Results.length == 0) {
    console.log("PASS: Test 13");
} else {
    console.log("FAIL: Test 13");
    console.log("Expected:", 0);
    console.log("Received:", test13result.Results.length);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/** CASE-SENSITIVE UNIT TESTS */

/** Unit test to make sure the correct results are returned when searchTerm is capitolized. */
const test14result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesAlternateOut) === JSON.stringify(test14result)) {
    console.log("PASS: Test 14");
} else {
    console.log("FAIL: Test 14");
    console.log("Expected:", twentyLeaguesAlternateOut);
    console.log("Received:", test14result);
}

/** Unit test to verify correct results for capitolized searchTerm when only the lower case version exists in the content. */
const test15result = findSearchTermInBooks("Darkness", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesDarknessOut) === JSON.stringify(test15result)) {
    console.log("PASS: Test 15");
} else {
    console.log("FAIL: Test 15");
    console.log("Expected:", twentyLeaguesDarknessOut);
    console.log("Received:", test15result);
}