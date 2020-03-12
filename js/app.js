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
        console.log('data', data);
        let projects = data.feed.entry.map(project => {
            return {
                title: project.gsx$title.$t,
                image: project.gsx$image.$t,
                description: project.gsx$description.$t,
                url: project.gsx$url.$t
            }
        });
        app(projects)
    });

const $gallery = $('#gallery');

//Loop over portfolio project array to populate gallery
function app(projects) {
    console.log('app - projects', projects);
    for(let i=0; i < projects.length; i++) {
        let $div = $('<div>').attr('class', 'project-tile');
        let $a = $("<a>");
        $a.attr('href', projects[i].url).attr('target', '_blank');
        $gallery.append($div);
        let $img = $("<img>");
        $img.attr('src', projects[i].image);
        $a.append($img);
        $div.append($a);
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

//Smooth scroll
