Template.MasterLayout.helpers({
});

Template.MasterLayout.events({
});

Template.MasterLayout.onCreated(function() {
    //pageTransitions();
});

Template.MasterLayout.onRendered(function(){
    pageTransitions();
});
function pageTransitions() {
    var pageWrap = document.getElementById('pagewrap'),
        //pages = [].slice.call( pageWrap.querySelectorAll( 'div.test-container' ) ),
        //currentPage = 0,
        triggerLoading = [].slice.call( pageWrap.querySelectorAll( '.pageload-link' ) ),
        loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 400, easingIn : mina.easeinout } );

    function init() {
        console.log("THIS IS RUNNING");
        triggerLoading.forEach( function( trigger ) {
            trigger.addEventListener( 'click', function( ev ) {
                classie.removeClass(document.getElementsByClassName("test-container")[0], "show");
                loader.show();
                // after some time hide loader
                classie.addClass(document.getElementsByClassName("test-container")[0], "show");
                setTimeout( function() {
                    loader.hide();
                    //classie.removeClass(document.getElementsByClassName("test-container")[0], "show");
                    //classie.removeClass( pages[ currentPage ], 'show' );
                    // update..
                    //currentPage = currentPage ? 0 : 1;
                    //classie.addClass( pages[ currentPage ], 'show' );


                }, 3000 );
            } );
        } );
    }
    init();
}

//pageWrap = document.getElementById('pagewrap')
//pageWrap.querySelectorAll( 'a.pageload-link' )