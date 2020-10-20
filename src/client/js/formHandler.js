import { isValidInput } from "./inputValidator";

function generateSentimentHtml(result) {
    const confidenceText = result.confidence;
    const agreeText = result.isAgreeing ? " agreeing " : "not agreeing ";
    const objectiveText = result.isObjective ? "quite objective, " : "not really objective, ";
    const ironicText = result.isIronic ? "trying to be ironic." : "not trying to be ironic. ";
    const totalSentencesText = result.totalSentences != 1 ? `${result.totalSentences} sentences` : '1 sentence';
    
    const resultingHtml = `
    Well well, I'm <span class="confidence">${confidenceText}%</span> sure that the article has <span class="sentiment">${result.sentiment} mood</span>, while it's 
    <span class="agreement">${agreeText}</span> with the topic. It's <span class="objectivness">${objectiveText}</span> while <span class="irony">${ironicText}</span>
    In total I was able to find <span class="totalSentences">${totalSentencesText}</span> that I was able to work with.`
    return resultingHtml
}

function parseApi(response) {
    //1. Parse the response according to the documentation
    let parsed = {}
    // at https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/response
    parsed.sentiment = response.score_tag == "NONE" ? "no" :
                        response.score_tag == "NEU" ? "neutral" :
                        response.score_tag == "P" || response.score_tag == "P+" ? "positive" :
                        response.score_tag == "N" || response.score_tag == "N+" ? "negative" :
                        "unknown"

    parsed.isAgreeing = response.agreement == "AGREEMENT" ? true : false;
    parsed.isObjective = response.subjectivity == "OBJECTIVE" ? true : false;
    parsed.isIronic = response.irony == "IRONIC" ? true : false;
    parsed.confidence = parseInt(response.confidence);
    parsed.totalSentences = response.sentence_list.length;
    return parsed;
}

function handleSubmit(event) {
    event.preventDefault();
    let formText = document.getElementById('textToCheck').value.trim();
    document.getElementById('person').classList.add('hide-opacity');
    document.getElementById('results').classList.remove('show-opacity');
    document.getElementById('results').classList.add('hide-opacity');
    if (!isValidInput(formText)) {
        document.getElementById('results').innerHTML = `<span class="error">Hey hey, your text is failing our sophisticated tests, maybe it's too long or empty? Sorry :)</span>`;
        document.getElementById('results').classList.add('show-opacity');
        return;
    }

    document.getElementById('loader').classList.remove('hide');
    fetch('http://localhost:8081/parse',  {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({"q":formText}),      
        })
        .then(res => {
            return res.json()
        })
        .then(function(data) {
            document.getElementById('loader').classList.add('hide');
            if (!data.status || data.status.code != "0" || data.status.msg != "OK") {
                throw (data.status.msg ? data.status.msg : "Weird API error :o")
            }

            document.getElementById('results').innerHTML = generateSentimentHtml(parseApi(data));
            document.getElementById('results').classList.add('show-opacity');
        }).catch((error) => {
            console.error('Error:', error);
            document.getElementById('loader').classList.add('hide');
            document.getElementById('results').innerHTML = `<span class="error">:o Ooops our server hamsters are not working well today!</span>`
            document.getElementById('results').classList.add('show-opacity');
        });
}

export { handleSubmit, parseApi }