//Hamburger menu toggle function
$('.hamburger-toggle').click(function () {
    $('ul').toggleClass('opening');
    $(this).toggleClass('open');
});

//Create sticky nav bar
window.onscroll = function() {makeNavStick()};

let navBar = document.getElementById("site-nav");
let sticky = navBar.offsetTop;

function makeNavStick() {
    if (window.pageYOffset >= sticky) {
        navBar.classList.add("sticky")
    } else {
        navBar.classList.remove("sticky");
    }
}

//Create array of portfolio objects
let id = '1_ZuE250yX7bWNFs82cpKnCjxh0b6CUx40Kf40geVfdY';
let source = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`;

fetch(source)
    .then(response => response.json())
    .then(data => {
        console.log('data', data);
        let projects = data.feed.entry.map(project => {
            // console.log('project', project.gsx$title.$t)
            return {
                title: project.gsx$title.$t,
                image: project.gsx$image.$t,
                description: project.gsx$description.$t,
                url: project.gsx$url.$t
            }
        });
        app(projects)
    });

function app(projects) {
    console.log('app - projects', projects)
    //rest of functionality goes here
}
