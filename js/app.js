//Hamburger menu toggle function
$('.hamburger-toggle').click(function () {
    $('ul').toggleClass('opening');
    $(this).toggleClass('open');
});

//Dropdown menu toggle function
$('.menu-toggle').click(function () {
    $('ul').toggleClass('opening');
    $('.hamburger-toggle').toggleClass('open');
});

//Create array of portfolio objects
let id = '1_ZuE250yX7bWNFs82cpKnCjxh0b6CUx40Kf40geVfdY';
let source = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`;

fetch(source)
    .then(response => response.json())
    .then(data => {
        let projects = data.feed.entry.map(project => {
            return {
                title: project.gsx$title.$t,
                image: project.gsx$image.$t,
                description: project.gsx$description.$t,
                url: project.gsx$url.$t,
                technologies: project.gsx$technologies.$t
            }
        });
        app(projects)
    });

const $gallery = $('#gallery');

//Loop over portfolio project array to populate gallery
function app(projects) {
    for(let i=0; i < projects.length; i++) {
        let $div = $('<div>')
            .attr('class', 'project-tile animation-element')
            .css("background-image", `url('${projects[i].image}')`)
            .css('background-size', 'cover')
            .css('background-position', 'center center');
        let $a = $("<a>");
        $a.attr('href', projects[i].url).attr('target', '_blank');
        let $hoverDiv = $('<div>').addClass('project-hover');
        let $projectTitle = $('<div>')
            .text(projects[i].title)
            .addClass('project-title');
        let $projectTechnologies = $('<div>')
            .text(projects[i].technologies)
            .addClass('project-technologies');
        let $projectDescription = $('<div>')
            .text(projects[i].description)
            .addClass('project-description');
        let $button = $('<input>')
            .attr('type', 'button')
            .attr('onClick', `parent.open('${projects[i].url}')`)
            .attr('id', 'project-button')
            .attr('value', 'View Project');
        $hoverDiv.append($projectTitle, $projectTechnologies, $projectDescription, $button);
        $gallery.append($div);
        $div.append($a, $hoverDiv);
    }
}

//Formspree form submission
window.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("my-form");
    const button = document.getElementById("contact-button");
    const status = document.getElementById("my-form-status");

    function success() {
        form.reset();
        button.style = "display: none ";
        status.innerHTML = "Your message has been sent. Thanks!";
    }
    function error() {
        status.innerHTML = "Oops! There was a problem.";
    }
    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        let data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

function ajax(method, url, data, success, error) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}

//Highlight nav link based on section
let $sections = $('section');
const $nav = $('#site-nav');

$(window).on('scroll', function () {
    let $currentPosition = $(this).scrollTop() + 100;
    $sections.each(function () {
        let $top = $(this).offset().top;
        let $bottom = $top + $(this).outerHeight();
        if ($currentPosition >= $top && $currentPosition <= $bottom) {
            $nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
        } else {
            $nav.find('a[href="#'+$(this).attr('id')+'"]').removeClass('active');
        }
    })
});

//Scroll based dynamic transitions
let $animation_elements = $('.animation-element');
let $window = $(window);

$window.on('scroll resize', checkIfElementInView);
$window.trigger('scroll');

function checkIfElementInView() {
    let window_height = $window.height();
    let window_top_position = $window.scrollTop();
    let window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
        let $element = $(this);
        let element_height = $element.outerHeight();
        let element_top_position = $element.offset().top;
        let element_bottom_position = (element_top_position + element_height);

        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
            $element.addClass('in-view');
            $element.removeClass('animation-element')
        }
    });
}
