// Transition
var switchMain = function ( target ) {
    current = $( "main>section.current" );
    current.fadeOut(300);
    target.fadeIn(200);
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

var switchHashDefault = function ( hash ) {
    y = $( "div." + hash ).offset().top;
    window.scrollTo( 0, y );
};

var switchHash = function ( hash ) {
    y = $( "div." + hash ).offset().top;
    $( "html, body" ).animate( { scrollTop: y }, 300 );
};

var changeHash = function ( hash ) {
    switchHash( hash );
    currentSection = $( "main section.current" ).attr("id");
    window.history.pushState( { hash: hash, section: currentSection }, '', "#" + hash );
};

var switchSection = function ( sectionName ) {
    switchMain( $( "#" + sectionName ) );
    switchNav( $( "nav>ul>li." + sectionName ) );
    window.scrollTo( 0, 0 );
};

var changeSection = function ( sectionName ) {
    switchMain( $( "#" + sectionName ) );
    switchNav( $( "nav>ul>li." + sectionName ) );
    window.scrollTo( 0, 0 );
    window.history.pushState( { section: sectionName }, '', sectionName + ".html" );
//    window.history.pushState( { section: sectionName }, '', "/Team:WHU-China/" + sectionName );
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

    if ( ! $( "#" + sectionName ).is( $( "main>section.current" ) ) ) {
	changeSection( sectionName );
    } else {
	$( "html, body" ).animate( { scrollTop: 0 }, 300 );
    }
    return false;
});

$( "a[href^=#]" ).click(function () {
    hash = $( this ).attr( "href" ).replace( /^#/, '' );
    changeHash( hash );
    return false;
});

window.onpopstate = function (event) {
  if ( event && event.state ) {
      currentSection = $( "main section.current" ).attr("id");
      if ( event.state.section && ( event.state.section != currentSection ) ) {
	  switchSection( event.state.section );
      }
      if ( event.state.hash ) {
	  setTimeout( function () {
	      switchHashDefault( event.state.hash, 0 );
	  }, 200);
      }
  }
};

window.history.pushState( { section: "home"}, '' );
