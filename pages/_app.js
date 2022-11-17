import React from "react";
import { ThemeProvider } from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/components/ColorMode";
import RegisterVideo from "../src/components/RegisterVideo";

const theme = {
  light: {
      backgroundBase: "#f9f9f9",
      backgroundLevel1: "#ffffff",
      backgroundLevel2: "#f0f0f0",
      borderBase: "#e5e5e5",
      textColorBase: "#222222",
  },
  dark: {
      backgroundBase: "#181818",
      backgroundLevel1: "#202020",
      backgroundLevel2: "#313131",
      borderBase: "#383838",
      textColorBase: "#FFFFFF",
  }
};


function ProviderWrapper(props){
  return (
    <ColorModeProvider initialMode={"dark"}>
      {props.children}
    </ColorModeProvider>
  )
}


// _app.js -- Definição global do nextjs
//ThemeProvider -- prover o tema para a app toda
//ColorModePorvider -- prove o state de light mode para toodo mundo
 function MyApp({ Component, pageProps }) {
  //console.log("")
  //const activeTheme = {
  //  backgroundLevel1: "red"
  //}
  //<ThemeProvider theme={activeTheme}>

const context = React.useContext(ColorModeContext)
  console.log(context.mode)
  return(
  //  <ColorModeProvider initialMode={"dark"}>
        <ThemeProvider theme={theme[context.mode]}>
         <CSSReset/>
         <Component {...pageProps} />
         <RegisterVideo/>
        </ThemeProvider>
  //  </ColorModeProvider>


  )
}

export default function _app(props) {
  return (
    <ProviderWrapper>
       <MyApp {...props} />
    </ProviderWrapper>
  )
}