import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body{
        background: #9AC4F8;
        color: #fff;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font-family: "Roboto Slab", serif;
        font-size: 16px;
    }
    
    h1, h2, h3, h4, h5, strong{
        font-weight: 500;
    }

    button{
        cursor: pointer;
    }

`;
