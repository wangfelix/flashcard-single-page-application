// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {

    const title = document.querySelector('.title-text')
    const header = document.querySelector('.header');

    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        title.style.animation = 'moveTitle 0.4s ease forwards'
        header.style.animation = 'shrinkHeaderBar 0.6s ease forwards'

    } else {

        /* The if-block prevents bug, that plays this animation during first scroll after loading the page,
            even though its downwards scrolling
         */
        if (title.style.animation !== '') {
            title.style.animation = 'moveBackTitle 0.4s ease forwards'
            header.style.animation = 'enlargeHeaderBar 0.6s ease forwards'
        }

    }
}