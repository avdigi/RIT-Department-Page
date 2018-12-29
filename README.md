## Rochester Institue of Technology API Re-Creation
This rendition was created as a part of a project from ISTE-340 in Rochester Institute of Technology.
This site consumes data from RIT's API server and parses them using javascript in conjuction with bootstrap framework

This site uses a bootstrap framework, specifically the Regna theme from https://bootstrapmade.com/regna-bootstrap-onepage-template/
I also used the font-awesome plugins to add relevant icons such as dropdown chevron & social media icons
I relied on the easing.js framework to ensure the page will scroll smoothly when somebody clicks section links
The theme came with the superfish plugin builtin (which is unnecessary but helpful for making it work (somewhat) on mobile UI.
I also used waypoints.js to ensure functions will execute when I scroll to a section.
I heavily relied on wow.js to give the page an amazing effect (elements popping in) when the user scrolls to a section

For this project, All of the ajax code is in the /js/consume.js
I tried my best to ensure the site's styling is as close as possible to the original (minus the cards) (Even right down to the RIT orange color)

For the google map API, I tried to reference directly to the ist.rit.edu/api/map and make it
scale to the section, however browser security rules prevented me from editing the iframe style
directly, so I ripped the complete webpage from the map page and made it to fit the section.
Yes, it throws a lot of errors in the console log but they have no effect on the feature.
Yes, I know it was a terrible hack, but hey it works!

NOTICE: Pop up modal window doesnt work on Mac Safari.

jQuery Plugins utilized:
wow.js
easing.js
bootstrap.js
