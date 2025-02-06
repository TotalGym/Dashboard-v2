import { createGlobalStyle } from "styled-components";

export const ResetStyles = createGlobalStyle`
    *, *::before, *::after{
        box-sizing: border-box; 
        margin: 0; 
        padding: 0; 
    }

    ul,
    ol,
    li{
        list-style: none;
     }
  
  
    a{
        color: inherit;
        text-decoration: none;
    }
  
    img{
        max-width: 100%;
        height: auto;
    }
  
    input, button, textarea, select{
        font: inherit; 
    }

    button{
        border: none;
        cursor: pointer;
        user-select: none;
    }
  
    input{
        outline: none;
    }

    input:focus-visible {
        outline: none;
    }
  
    body, html{
        min-height: 100%; 
        scroll-behavior: smooth; 
    }

    @media (prefers-reduced-motion: reduce) {
        body, html {
        scroll-behavior: auto;
        }
    }
  `;
