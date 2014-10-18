// Transition
var switchMain = function ( target ) {
    current = $( "main>section.current" );
    current.slideUp();
    target.slideDown();
    current.removeClass( "current" );
    target.addClass( "current" );
};

var switchNav = function ( target ) {
    current = $( "nav>ul>li.current" );
    current.next().slideUp();
    target.next().slideDown();
    current.removeClass( "current" );
    target.addClass( "current" );
};

var switchSection = function ( sectionName ) {
    if ( $( "#" + sectionName ).is( $( "main>section.current" ) ) ) { return; }
    switchMain( $( "#" + sectionName ) );
    switchNav( $( "nav>ul>li." + sectionName ) );
};

var changeSection = function ( sectionName ) {
    if ( $( "#" + sectionName ).is( $( "main>section.current" ) ) ) { return; }
    switchMain( $( "#" + sectionName ) );
    switchNav( $( "nav>ul>li." + sectionName ) );
    window.history.pushState( { section: sectionName }, '', sectionName + ".html" );
};

$( "nav>ul>li" ).click(function () {
    sectionName = '';
    Names = [
	"home", "project", "results", "modeling", "achieve",
	"practice", "team", "safety", "notebook"
    ];
    for (i in Names) {
	if ( $( this ).hasClass( Names[i] ) ) {
	    sectionName = Names[i];
	}
    }

    changeSection( sectionName );
    return false;
});

window.onpopstate = function (event) {
  if (event && event.state) {
      switchSection( event.state.section );
  }
};

window.history.pushState( { section: "home"}, '' );
