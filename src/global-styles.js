import { createGlobalStyle } from 'styled-components';

/*
Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app.
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
*/
const GlobalStyles = createGlobalStyle`
html, body,
#root {
    height:100%;
    width: 100%;
    background-color:#000;
    font-family: Tw Cen MT, Avenir, Helvetica, Arial, sans-serif;
    text-rendering: optimizeLegibility;
    overflow:hidden;
    color:white;
}

#root {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
}

#root.dragging {
    cursor:dragging;
}

.align-items-center {
    align-items: center;
}

/* 960x x 540px for TV */
@media screen and (max-width: 970px) {
    html {
        font-size:8px;
    }
}
`;
export default GlobalStyles;
