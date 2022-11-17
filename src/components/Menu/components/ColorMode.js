import React from "react";

export const ColorModeContext = React.createContext(
 { mode:"",
 setMode: () => { alert("I need config")}
 //setMode: () => { alert("I need config")} 
}
)

 //function toggleMode(){
 // if(mode === "dark") contexto.setMode("light")
 // if(mode === "light") contexto.setMode("dark")
 //}


export default function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode)
    return (
     // <ColorModeContext.Provider value={{ mode: props.initialMode}}>
     <ColorModeContext.Provider value={{ mode: mode, setMode: setMode }}>
        {props.children}
      </ColorModeContext.Provider>
    )
}