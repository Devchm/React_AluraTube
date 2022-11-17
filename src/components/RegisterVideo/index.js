import React from "react"
import { StyledRegisterVideo } from "./styles"
import { createClient } from "@supabase/supabase-js"


// get youtube video id



//custom hook
function useForm(propsForm) {

   
const [values, setValues] = React.useState(propsForm.initialValues)

return {
  values,
  handleChange:(Event)=> {
      const value = Event.target.value
      const name = Event.target.name
      console.log(value)
      setValues({
        ...values,
        [name]:value,
       } )
    },
    clearForm() {
      setValues ({})
    }
  }

}
const PROJECT_URL = 'https://bcoymndpimeywarestqa.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjb3ltbmRwaW1leXdhcmVzdHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1NTU0MTIsImV4cCI6MTk4NDEzMTQxMn0.CbjyFkb4pgUskFU1BILCVfThudPrM0_ggYApo3WdcpI'

const supabase = createClient(PROJECT_URL, PUBLIC_KEY)


function getThumbnail(url){
  return (
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcHV0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
  )
}



console.log()

export default function RegisterVideo() {
  const formRegister = useForm({ initialValues: { titulo:"Bloodborne", url:"https://youtu.be/2Crk_GpxGQE"}});
  const [visibleForm, setVisibleForm] = React.useState(false)
 // const [title, setTitle] = React.useState("")
 // const [url, setUrl ] = React.useState("")
//   const [values, setValues] = React.useState({titulo:"", url:""})
 // console.log(visibleForm)
   return (
    <StyledRegisterVideo> 
        <button className="add-video" onClick={() => setVisibleForm(true)}>
           🤓
        </button>
        { visibleForm && (
                  <form onSubmit={(Event) => {
                      Event.preventDefault()
                      console.log(formRegister.values)

                      //contrato entre front e back
                      supabase.from("video").insert({
                        title: formRegister.values.titulo,
                        url:formRegister.values.url,
                        thumb: getThumbnail(formRegister.url),
                        playlist:""
                  })
                  .then((oqv) => {
                    console.log(oqv)
                  })
                  .catch(()=>{
                    console.log(err)
                  })

                      setVisibleForm(false)
                      formRegister.clearForm()
                  }} >
                  <div>
                  <button 
                  type="button"
                  className="close-modal" 
                  onClick={()=> 
                  setVisibleForm(false)}>
                     X
                  </button>
                  <input 
                  placeholder="Título do vídeo" 
                  name="titulo"
                  value={formRegister.values.titule} 
                  onChange={formRegister.handleChange} />
                  <input 
                  placeholder="URL"
                  name="url" 
                  value={formRegister.values.url}
                  onChange={formRegister.handleChange}
                  />
                  <button type="submit">
                     Cadastrar
                  </button>
                  </div>
                </form>
        )}
    </StyledRegisterVideo>
   )
}

/*
(Event)=> {
                    const value = Event.target.value
                    setValues({
                      ...values,
                      url:value,
                    })
                  }
*/


/**
 * 
</button>
        { visibleForm ? (
                  <form>
                  <div>
                  <button className="close-modal">
                     X
                  </button>
                  <input placeholder="Título do vídeo"/>
                  <input placeholder="URL" />
                  <button type="submit">
                     Cadastrar
                  </button>
                  </div>
                </form>
        )
      : null
      }

 */