import React from "react"
import config from "../config.json"
import styled  from "styled-components"

import Menu from "../src/components/Menu/Menu"
import { StyledTimeline } from "../src/components/Timeline"
import Search from "../src/components/Menu/components/Search"
import { createClient } from "@supabase/supabase-js"


const PROJECT_URL = 'https://bcoymndpimeywarestqa.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjb3ltbmRwaW1leXdhcmVzdHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1NTU0MTIsImV4cCI6MTk4NDEzMTQxMn0.CbjyFkb4pgUskFU1BILCVfThudPrM0_ggYApo3WdcpI'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)




function HomePage() {

  //console.log(config.playlists)
  const [filterValue, setFilterValue] = React.useState("");
  //const filterValue = "Bloodborne"
  
  
  
    // const playlists = {
    //   "games": [],
    //}
    
const [playlists, setPlayLists] = React.useState({ }) //congig.playlist


  React.useEffect(() => {
      console.log("useEffect")

      supabase.from("video")
          .select("*")
          .then((dados)=> {
            console.log(dados)
                  const newPlayLists = {...playlists}

            dados.data.forEach((video)=>{
              newPlayLists[video.playlist]?.push(video);
            })
            //setPlayLists({...playlists})
          });
  }, [])
console.log("playlist pronto", playlists)


  return (
 <>
    
    
     <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1}} >
      {/*prop drilling*/ }
      <Menu filterValue={filterValue} setFilterValue={setFilterValue}></Menu>
      <Header></Header>
      <Timeline valueSearch={filterValue} playlists={config.playlists}></Timeline>
      
     </div>
 </>
  )
}

//<Favorite></Favorite>

export default HomePage

//function Menu() {
//  return (
//    <div>Menu</div>
//  )
//}


const StyledHeader = styled.div `
  background-color: ${({ theme}) => theme.backgroundLevel1};

  img {
    width:80px;
    height:80px;
    border-radius:50%;
  }
  .user-info {
   // margin-top:50px;
    display: flex;
    align-items: center;
    width:100%;
    padding: 16px 32px;
    gap:16px;
  }
`;



const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    background-position:center;
    // background-image: url("")
    /* background-image: url(${config.bg}); */
    height: 230px;
`;

function Header(){
  return (
//<img src=""/>

    <StyledHeader>
         <StyledBanner bg={config.bg}/>

      <section className="user-info">
      <img src={`https://avatars.githubusercontent.com/u/101318327?v=4${config.github}.png`}/>
      <div>
      <h2>{config.name}</h2>
      <p>{config.job}</p>
      </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({valueSearch, ...props}) {
 // console.log("Dentro do componente", props.playlists)
  const playlistNames = Object.keys(props.playlists)
  return (
    <StyledTimeline>
      {playlistNames.map(function(playlistName){
      const videos = props.playlists[playlistName];
      //console.log(playlistName);
      //console.log(videos);
      return (
        <section key={playlistName}>
          <h2> {playlistName} </h2>
            <div>
              {videos.filter((video) =>{
                 const titleNormalized = video.title.  toLowerCase()
                    const valueSearchNormalized = valueSearch.toLowerCase()
                  //return video.title.includes(valueSearch)
                 return titleNormalized.includes(valueSearchNormalized)
              }).map((video) =>{
                return (
                  <a key={video.url} href={video.url}>  
                 <img src={video.thumb}/>
                 <span>
                 {video.title}
                 </span>
                 </a>
                )
              })}
            </div>
            
       
        </section>
      )

   //   return videos.map((video)=> {
   //     return (
   //       <a href={video.url}>  
   //       <img src={video.thumb}/>
   //       <span>
   //          {video.title}
   //       </span>
   //       </a>
       
    })}</StyledTimeline >
  )
}

