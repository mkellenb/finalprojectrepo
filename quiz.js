
var prompts = [
    {
        prompt:'I like designing and styling web pages',
        weight: -1,
        class: 'group0'
    },
    {
        prompt: 'I prefer to work with servers rather than with creative design',
        weight: -1,
        class: 'group1'
    },
    {
        prompt: 'I prefer Java and PHP to JavaScript and CSS and HTML',
        weight: -1,
        class: 'group2'
    },
    {
        prompt: 'I consider myself creative',
        weight: -1,
        class: 'group3'
    },
    {
        prompt: 'I consider myself more structurally oriented',
        weight: -1,
        class: 'group4'
    },
    {
        prompt: 'I enjoy contributing to positive user experiences',
        weight: -1,
        class: 'group5'
    },
    {
        prompt: 'I do not consider myself to be design oriented and I do not like it',
        weight: 1,
        class: 'group6'
    },
    {
        prompt: 'I love contributing to the features that make websites really pop',
        weight: 1,
        class: 'group7'
    },
    {
        prompt: 'Organization and details with tasks is very important to me',
        weight: 1,
        class: 'group8'
    },
    {
        prompt: 'I like to work on collaborative teams',
        weight: 1,
        class: 'group9'
    },
    {
        prompt: 'I often tend to be over focused on my work and pay attention to the details of the full picture',
        weight: 1,
        class: 'group10'
    },
    {
        prompt: 'I would rather improvise in my work instead of spending time coming up with a detailed plan',
        weight: 1,
        class: 'group11'
    }
    
    ]
    
    var prompt_values = [
    {
        value: 'Strongly Agree', 
        class: 'btn-default btn-strongly-agree',
        weight: 5
    },
    {
        value: 'Agree',
        class: 'btn-default btn-agree',
        weight: 3,
    }, 
    {
        value: 'Neutral', 
        class: 'btn-default',
        weight: 0
    },
    {
        value: 'Disagree',
        class: 'btn-default btn-disagree',
        weight: -3
    },
    { 
        value: 'Strongly Disagree',
        class: 'btn-default btn-strongly-disagree',
        weight: -5
    }
    ]
    
    function createPromptItems() {
    
        for (var i = 0; i < prompts.length; i++) {
            var prompt_li = document.createElement('li');
            var prompt_p = document.createElement('p');
            var prompt_text = document.createTextNode(prompts[i].prompt);
    
            prompt_li.setAttribute('class', 'list-group-item prompt');
            prompt_p.appendChild(prompt_text);
            prompt_li.appendChild(prompt_p);
    
            document.getElementById('quiz').appendChild(prompt_li);
        }
    }
    
    // }
    function createValueButtons() {
        for (var li_index = 0; li_index < prompts.length; li_index++) {
            var group = document.createElement('div');
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
    alert("test");
    createPromptItems();
    createValueButtons();
    
    var total = 0;
    
    function findPromptWeight(prompts, group) {
        var weight = 0;
    
        for (var i = 0; i < prompts.length; i++) {
            if (prompts[i].class === group) {
                weight = prompts[i].weight;
            }
        }
    
        return weight;
    }
    
 
    function findValueWeight(values, value) {
        var weight = 0;
    
        for (var i = 0; i < values.length; i++) {
            if (values[i].value === value) {
                weight = values[i].weight;
            }
        }
    
        return weight;
    }
    
  
    $('.value-btn').mousedown(function () {
        var classList = $(this).attr('class');
        var classArr = classList.split(" ");
        var this_group = classArr[0];
       
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
        } else {
            total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
            $('.'+this_group).removeClass('active');
            $(this).addClass('active');
            total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
        }
    
        console.log(total);
    })
    
    
    
    $('#submit-btn').click(function () {
        $('.results').removeClass('hide');
        $('.results').addClass('show');
        
        if(total < 3) {
            document.getElementById('results').innerHTML = '<b> You are a back end developer</b><br><br>\
           Backend developers tend to be detail oriented and value organization rather than the creative design aspects of front end develope</b><br><br>\\
            ';
        } else if(total > 6) {
            document.getElementById('results').innerHTML = '<b>You are a front end developer! Front end developers usually enjoy making things pretty and enjoy the creative part of employing a satisfying user experience by combining JS, CSS and HTML to make a page sparkle!</b>
        } else if (total > 7)
            document.getElementById('results').innerHTML = '<b>You are a full stack developer! Full stack developers enjoy both sides of development and want to be a part of the whole process!/b><br><br>\
           
        }
    
        $('#quiz').addClass('hide');
        $('#submit-btn').addClass('hide');
        $('#retake-btn').removeClass('hide');
    })
    
    $('#retake-btn').click(function () {
        $('#quiz').removeClass('hide');
        $('#submit-btn').removeClass('hide');
        $('#retake-btn').addClass('hide');
    
        $('.results').addClass('hide');
        $('.results').removeClass('show');
    })

