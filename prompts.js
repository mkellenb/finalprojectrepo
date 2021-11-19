var { prompts, promp_values } = newFunction();
function promptsFunction() {
    let prompts = [
        {
            prompt: 'I tend to spend time alone',
            class: 'question0'
        },
        {
            prompt: 'I prefer the more artistic side of a project',
            weight: -1,
            class: 'question1'
        },
        {
            prompt: 'I prefer jobs where I am allowed to express myself',
            class: 'question2'
        },
        {
            prompt: 'I am more creative in my thinking than analytical',
            weight: -1,
            class: 'question3'
        },
        {
            prompt: 'I prefer to I am an intuitive person',
            weight: -1,
            class: 'question4'
        },
        {
            prompt: 'I thrive in unstrunctured and non-restrictive enviorments ',
            weight: -1,
            class: 'question5'
        },
        {
            prompt: 'I am usually highly motivated and energetic',
            weight: 1,
            class: 'question6'
        },
        {
            prompt: 'I find it easy to walk up to a group of people and join in conversation',
            weight: 1,
            class: 'question7'
        },
        {
            prompt: 'Being adaptable is more important than being organized',
            weight: 1,
            class: 'question8'
        },
        {
            prompt: 'I would rather draw than solve a math problem',
            weight: 1,
            class: 'question9'
        },
        {
            prompt: 'I often do not feel I have to justify myself to people',
            weight: 1,
            class: 'question10'
        },
        {
            prompt: 'I would rather improvise than spend time coming up with a detailed plan',
            weight: 1,
            class: 'question11'
        }
    ];

    // This array stores all of the possible values and the weight associated with the value. 
    // The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
    let promptvalues = [
        {
            value: 'Strongly Agree',
            weight: 5
        },
        {
            value: 'Agree',
            weight: 3,
        },
        {
            value: 'Neutral',
            weight: 0
        },
        {
            value: 'Disagree',
            weight: -3
        },
        {
            value: 'Strongly Disagree', 
            weight: -5
        }
    ];
    return newFunction(prompts, prompt_values);
}
function newFunction(prompts, prompt_values) {
    return { prompts, prompt_values };
}
// For each prompt, create a list item to be inserted in the list group
function createPromptItems() {

    for (let i = 0; i < prompts.length; i++) {
        let promptli = document.createElement('li');
        let promptp = document.createElement('p');
        let prompttext = document.createTextNode(prompts[i].prompt);

        prompt_li.setAttribute('class', 'list-group-item prompt');
        prompt_p.appendChild(prompt_text);
        prompt_li.appendChild(prompt_p);

        document.getElementById('quiz').appendChild(prompt_li);
    }
}
//For each possible value, create a button for each to be inserted into each li of the quiz
 function createValueButtons() {
for (var listindex = 0; listindex < prompts.length; listindex++) {
for (var i = 0; i < prompt_values.length; i++) {
var val_button = document.createElement('button');
var val_text = document.createTextNode(prompt_values[i].value);
val_button.setAttribute('class', 'valuebtn btn ' + prompt_values[i].class);
val_button.appendChild(val_text);
document.getElementsByClassName('prompt')[li_index].appendChild(val_button);
		}
 	}
 }
function createValueButtons() {
    for (let li_index = 0; li_index < prompts.length; li_index++) {
        let group = document.createElement('div');
        group.className = 'btn-group btn-group-justified';

        for (var i = 0; i < prompt_values.length; i++) {
            var btn_group = document.createElement('div');
            btn_group.className = 'btn-group';

            var button = document.createElement('button');
            var button_text = document.createTextNode(prompt_values[i].value);
            button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
            button.appendChild(button_text);

            btn_group.appendChild(button);
            group.appendChild(btn_group);

            document.getElementsByClassName('prompt')[li_index].appendChild(group);
        }
    }
}
createPromptItems();
createValueButtons();
// Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
// Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
var total = 0;
// Get the weight associated to group number
function findPromptWeight(prompts, group) {
    let weight = 0;

    for (let i = 0; i < prompts.length; i++) {
        if (prompts[i].class === group) {
            weight = prompts[i].weight;
        }
    }

    return weight;
}
// Get the weight associated to the value
function findValueWeight(values, value) {
    var weight = 0;

    for (var i = 0; i < values.length; i++) {
        if (values[i].value === value) {
            weight = values[i].weight;
        }
    }

    return weight;
}
// When user clicks a value to agree/disagree with the prompt, display to the user what they selected
$('.value-btn').mousedown(function () {
    var classList = $(this).attr('class');
    // console.log(classList);
    var classArr = classList.split(" ");
    // console.log(classArr);
    var this_group = classArr[0];
    // console.log(this_group);
    // If button is already selected, de-select it when clicked and subtract any previously added values to the total
    // Otherwise, de-select any selected buttons in group and select the one just clicked
    // And subtract deselected weighted value and add the newly selected weighted value to the total
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
    } else {
        // $('[class='thisgroup).prop('checked', false);
        total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.' + this_group + '.active').text()));
        // console.log($('.'+this_group+'.active').text());
        $('.' + this_group).removeClass('active');

        // console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
        // $(this).prop('checked', true);
        $(this).addClass('active');
        total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
    }

    console.log(total);
});
$('#submit-btn').click(function () {
    // After clicking submit, add up the totals from answers
    // For each group, find the value that is active
    $('.results').removeClass('hide');
    $('.results').addClass('show');

    if (total < 0) {
        document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
         console.log(document.getElementById('intro-bar').style.width);
        document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
        document.getElementById('results').innerHTML = '<b>You are introverted!</b><br><br>\
            Introverts are tricky to understand, since it’s so easy for us to assume that introversion is the same as being shy, when, in fact, introverts are simply people who find it tiring to be around other people.\n\
    <br><br>\
    I love this explanation of an introvert’s need to be alone:\n\
    <br><br>\
    For introverts, to be alone with our thoughts is as restorative as sleeping, as nourishing as eating.\n\n\
    <br><br>\
    Introverted people are known for thinking things through before they speak, enjoying small, close groups of friends and one-on-one time, needing time alone to recharge, and being upset by unexpected changes or last-minute surprises. Introverts are not necessarily shy and may not even avoid social situations, but they will definitely need some time alone or just with close friends or family after spending time in a big crowd.\
            ';
    } else if (total > 0) {
        document.getElementById('results').innerHTML = '<b>You are extroverted!</b><br><br>\
            On the opposite side of the coin, people who are extroverted are energized by people. They usually enjoy spending time with others, as this is how they recharge from time spent alone focusing or working hard.\
    <br><br>\
    I like how this extrovert explains the way he/she gains energy from being around other people:\
    <br><br>\
    When I am among people, I make eye contact, smile, maybe chat if there’s an opportunity (like being stuck in a long grocery store line). As an extrovert, that’s a small ‘ping’ of energy, a little positive moment in the day.';
    } else {
        document.getElementById('results').innerHTML = "<b>You are ambiverted!</b><br><br>            Since introverts and extroverts are the extremes of the scale, the rest of us fall somewhere in the middle. Many of us lean one way or the other, but there are some who are quite balanced between the two tendencies. These people are called ambiverts.    <br><br>    So let’s look at how an ambivert compares.    <br><br>";
        Ambiverts; exhibit; both; extroverted; and; introverted; tendencies.This; means; that; they; generally; enjoy; being; around; people, but; after; a; long; time; this; will; start; to; drain; them.Similarly, they; enjoy; solitude; and; quiet, but; not; for (too; long.Ambiverts; recharge)
            their; energy; levels; with (a)
        mixture; of; social; interaction; and; alone; time; "";
    }

    // Hide the quiz after they submit their results
    $('#quiz').addClass('hide');
    $('#submit-btn').addClass('hide');
    $('#retake-btn').removeClass('hide');
});
// Refresh the screen to show a new quiz if they click the retake quiz button
$('#retake-btn').click(function () {
    $('#quiz').removeClass('hide');
    $('#submit-btn').removeClass('hide');
    $('#retake-btn').addClass('hide');

    $('.results').addClass('hide');
    $('.results').removeClass('show');
});