
console.log(document.querySelector('.slider div'))

const folders_container = document.querySelector('.folders-container')
const songs_container = document.querySelector('.songs-container')
const play_button = document.querySelector('.play-controls div + div')
const time = document.querySelector('.time')
const Slider_point = document.querySelector('.slider div')
const Slider = document.querySelector('.slider')
const volume_slider = document.querySelector('.volume-slider')
const volume_slider_point = document.querySelector('.volume-slider div')

const forward_button = document.querySelector('.forward')
const backward_button = document.querySelector('.backward')

var current_folder = 'love songs'

var rtrn 

var current_song_element

let songs_list
let allSongsDivs

console.log('hey satishssssssssssssssssssssssssssssssssssssssss d')

var current_song = new Audio()
current_song.src = 'http://127.0.0.1:5500/Projects/MUSIC%20APP/songs/love%20songs/Heeriye-Heeriye-Aa(PaglaSongs).mp3'

let current_duration = ''

if (volume_slider_point.style.left !== 0){
    document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-high" ></i>'
    // current_song.volume=0
}
if (volume_slider_point.style.left == 0){
    document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-xmark"></i>'
    // current_song.volume=0
}
async function getToSongsFolder() {
    console.log('hey satishssssssssssssssssssssssssssssssssssssssss d')
    
    const response = await fetch('http://127.0.0.1:5500/Projects/MUSIC%20APP/songs/')
    debugger;
    console.log('hey satishssssssssssssssssssssssssssssssssssssssss d')
    let r =await response.text()
    let div= document.createElement('div')
    div.innerHTML=r
    
    console.log(div)
    // folders array
    let folders = []
    const as= div.getElementsByTagName('a')
    
    Array.from(as).forEach(e=>{
        if( e.href.endsWith('%20songs')) {
            folders.push(e.href.split('/')[e.href.split('/').length-1].replace('%20',' '))
        }
    })
    console.log('hey satishssssssssssssssssssssssssssssssssssssssss d')
    console.log(folders)
    // folders design
    folders.forEach(el=>{
    
        folders_container.innerHTML= folders_container.innerHTML + ` <div class="folder">
        <img src="songs/${el}/cover.jpg" >
        <p class="song-type">${el}</p>

        <div class="folder-play">
            <i class="fa-solid fa-play"></i>
        </div>
        </div>  `
    })
    
    var allFolders = document.querySelectorAll('.folder')

    var current_folder_element =  allFolders[0]

    current_folder_element.style.backgroundColor = "#1b1b1b";
    current_folder_element.querySelector('.folder-play').style.display = 'flex'
    
    
    allFolders.forEach(el=>{
        console.log('folders : ',el)
        el.addEventListener('click',async (e)=>{

            Slider_point.style.left= 0
            
            play_button.innerHTML='<i class="fa-solid fa-play"></i>'

            if (volume_slider_point.style.left !== 0){
                document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-high" ></i>'
                // current_song.volume=0
            }
            if (volume_slider_point.style.left == 0){
                document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-xmark"></i>'
                // current_song.volume=0
            }
   
            folder_Change(e.currentTarget)
            
            
            current_folder = e.currentTarget.querySelector('.song-type').innerText
            console.log('current_folder : ',current_folder)
            songs_container.innerHTML=''

            document.querySelector('.playlist-name').innerText = current_folder

            rtrn = await getSongs(current_folder)

            
        })
    })

    allFolders.forEach(elm=>{

        console.log('here : ',elm)
        elm.addEventListener('mouseenter',()=>{
            console.log('current_folder_elment',current_folder_element)
            elm.style.backgroundColor = "#1b1b1b";
            elm.querySelector('.folder-play').style.display = 'flex'
        })
        elm.addEventListener('mouseleave',()=>{
            
            elm.style.backgroundColor = "#2b2b2b4e";
            elm.querySelector('.folder-play').style.display = 'none'
            
            
            current_folder_element.style.backgroundColor = "#1b1b1b";
            current_folder_element.querySelector('.folder-play').style.display = 'flex'
    
        })

    })
    
    function folder_Change(next_folder) {
        current_folder_element.style.backgroundColor = "#2b2b2b4e";
        current_folder_element.querySelector('.folder-play').style.display = 'none'
        
        console.log('current_folder_elment',current_folder_element)
        
        current_folder_element = next_folder
        
        console.log('current_folder_elment',current_folder_element)
        current_folder_element.style.backgroundColor = "#1b1b1b";
        current_folder_element.querySelector('.folder-play').style.display = 'flex'
    
    }
    return current_folder
}
getToSongsFolder()


async function getSongs(current_folder) {

    
    const response = await fetch(`http://127.0.0.1:5500/Projects/MUSIC%20APP/songs/${current_folder}/`)
    let r = await response.text()
    let div= document.createElement('div')
    div.innerHTML=r
    const as= div.getElementsByTagName('a')

    var songs_list= []

    
    console.log(as.length)
    
    for(let i=0 ; i<as.length ; i++){
        if( as[i].href.endsWith('.mp3')) {
            songs_list.push(as[i].href)
        }   
    } 
    current_song.src=songs_list[0]
   


    document.querySelector('.play-bar-song-name').innerHTML= songs_list[0].split('/')[songs_list[0].split('/').length-1].replaceAll("-"," ").replaceAll("(PaglaSongs)","").replaceAll("(PagalWorld)","")

    Array.from(songs_list).forEach(el=>{
        console.log(el)
        el=el.split('/')[el.split('/').length-1].replaceAll("-"," ").replaceAll("(PaglaSongs)","").replaceAll("(PagalWorld)","")
        songs_container.innerHTML= songs_container.innerHTML + ` <div class="song">
            <div class="song-info-container">
                <i class="fa-solid fa-music" style=" font-size: 2rem;" ></i>
                <div>
                    <p>${el}</p>
                    <p>satish</p>
                    </div>
                    </div>
                    <div class="song-play-icon">
                    <i class="fa-solid fa-play"></i>
                    </div>
                    </div> `
    })
    console.log(songs_list)
                
    //  play song function

    let allSongsDivs=document.querySelectorAll('.song')
    function playSong(){
        let allSongsDivs=document.querySelectorAll('.song')

        current_song_element =allSongsDivs[0]
        current_song_element.style.backgroundColor = "#242424";
        current_song_element.style.boxShadow = "0 0 1.2rem 0 rgb(222, 222, 222,.5)";
    
        current_song_element.querySelector('.song-play-icon').style.height= '2.2rem';
        current_song_element.querySelector('.song-play-icon').style.width= '2.2rem';
        
        
        allSongsDivs.forEach(el=>{
            el.addEventListener('click', (e)=>{
                allSongsDivs.forEach(elmt=>{
                    elmt.style.backgroundColor = "#2b2b2b33";
                    elmt.style.boxShadow = "none";
                    elmt.style.height='11%';
                    elmt.style.width= '95%';
                    elmt.querySelector('.song-play-icon').style.height='2rem';
                    elmt.querySelector('.song-play-icon').style.width= '2rem'; 
                })

                e.currentTarget.style.transition = ".3s ease";
                volume_slider_point.style.left = "100%"

                if (volume_slider_point.style.left !== 0){
                    document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-high" ></i>'
                    // current_song.volume=0
                }
                if (volume_slider_point.style.left == 0){
                    document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-xmark"></i>'
                    // current_song.volume=0
                }
                
                song_Change(e.currentTarget)
                
                songs_list.forEach(link=>{
                    if (link.includes(e.currentTarget.querySelector('.song-info-container div p').innerText.replaceAll(' ','-').split('.')[0])){
    
                        current_song.src=link
                        current_song.play()
    
                        if (!current_song.paused) {
                            play_button.innerHTML='<i class="fa-solid fa-pause"></i>'
                        }

                        document.querySelector('.play-bar-song-name').innerHTML=`${e.currentTarget.querySelector('.song-info-container div>p').innerText}`

                        if (volume_slider_point.style.left == 0){
                            document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-xmark"></i>'
                            current_song.volume=0
                        }
                        
                    }
                })
            })
        }) 
        
        allSongsDivs.forEach(elm=>{

            console.log('here : ',elm)
            elm.addEventListener('mouseenter',()=>{
                console.log('here : ',elm)
                elm.style.backgroundColor = "#242424";
            })
            elm.addEventListener('mouseleave',()=>{
                
                elm.style.backgroundColor = "#2b2b2b33";  
                current_song_element.style.backgroundColor = "#242424";
                
                if (current_song_element.style.boxShadow === "none"){
                    current_song_element.style.backgroundColor = "#2b2b2b33";
                }
        
            })
    
        })
        
        function song_Change(next_song) {
            current_song_element.style.backgroundColor = "#2b2b2b33";
            current_song_element.style.boxShadow = "none";
            current_song_element.style.height='11%';
            current_song_element.style.width= '95%';
            current_song_element.querySelector('.song-play-icon').style.height='2rem';
            current_song_element.querySelector('.song-play-icon').style.width= '2rem';
            
            console.log('current_song_elment',current_song_element)
            
            current_song_element = next_song
            
            console.log('helo current_song_elment',current_song_element)
            current_song_element.style.backgroundColor = "#242424";
            current_song_element.style.boxShadow = "0 0 1.2rem 0 rgb(222, 222, 222,.5)";
            current_song_element.style.height= '11.2%';
            current_song_element.style.width= '95.2%';
            current_song_element.querySelector('.song-play-icon').style.height= '2.2rem';
            current_song_element.querySelector('.song-play-icon').style.width= '2.2rem';
        
        }


    }
    playSong() 
    
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',songs_list)
    console.log('csfshagdvshhhhhhhhhhhhhhhhhhh',current_song)
    console.log('csfshagdvshhhhhhhhhhhhhhhhhhh',current_song.src)
    
 
    return [songs_list,allSongsDivs,current_song_element]
}
// getSongs(current_folder)

async function rtrn_value(){
    rtrn = await getSongs(current_folder)
    
    forward_button.addEventListener('click',()=>{
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',rtrn) 
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',current_song.src) 
        let songs_list = rtrn[0]
        let allSongsDivs = rtrn[1]
        let current_song_element = rtrn[2]
        console.log('ssssssssssssssssssssssssss',songs_list) 
        console.log('ddddddddddddddddd',allSongsDivs) 
        console.log('ddddddddddddddddd sel',current_song_element) 

        let index = songs_list.indexOf(current_song.src) + 1
        if (index>=songs_list.length) {index=0} ;
        current_song.src= songs_list[index]
        console.log(index)

        
        allSongsDivs.forEach(div=>{
            if (div.querySelector('.song-info-container div p').innerText == current_song.src.split('/')[current_song.src.split('/').length-1].replaceAll("-"," ").replaceAll("(PaglaSongs)","").replaceAll("(PagalWorld)","")){
                
                current_song_element = div
                current_song_element.style.backgroundColor = "#242424";
                current_song_element.style.boxShadow = "0 0 1.2rem 0 rgb(222, 222, 222,.5)";
                current_song_element.style.height= '11.2%';
                current_song_element.style.width= '95.2%';
                current_song_element.querySelector('.song-play-icon').style.height= '2.2rem';
                current_song_element.querySelector('.song-play-icon').style.width= '2.2rem';
                


                document.querySelector('.play-bar-song-name').innerHTML=`${div.querySelector('.song-info-container div>p').innerText}`
                console.log(div.querySelector('.song-info-container div p').innerText)
                volume_slider_point.style.left = "100%"
                if (volume_slider_point.style.left !== 0){
                    document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-high" ></i>'
                    
                }
                if (volume_slider_point.style.left == 0){
                    document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-xmark"></i>'
                    
                }
                
                current_song.play()
                play_button.innerHTML='<i class="fa-solid fa-pause"></i>'
                
                
            }
            if (div.querySelector('.song-info-container div p').innerText != current_song.src.split('/')[current_song.src.split('/').length-1].replaceAll("-"," ").replaceAll("(PaglaSongs)","").replaceAll("(PagalWorld)","")){
                div.style.backgroundColor = "#2b2b2b33";
                div.style.boxShadow = "none";
                div.style.height='11%';
                div.style.width= '95%';
                div.querySelector('.song-play-icon').style.height='2rem';
                div.querySelector('.song-play-icon').style.width= '2rem';    
            }
        })
    })

    backward_button.addEventListener('click',()=>{
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',rtrn) 
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',current_song.src) 
        let songs_list = rtrn[0]
        let allSongsDivs = rtrn[1]
        let current_song_element = rtrn[2]
        console.log('ssssssssssssssssssssssssss',songs_list) 
        console.log('ddddddddddddddddd',allSongsDivs) 

        let index = songs_list.indexOf(current_song.src) - 1
        if (index<0) {index= songs_list.length-1} ;
        current_song.src= songs_list[index]
        console.log(index)

        
        allSongsDivs.forEach(div=>{
            if (div.querySelector('.song-info-container div p').innerText == current_song.src.split('/')[current_song.src.split('/').length-1].replaceAll("-"," ").replaceAll("(PaglaSongs)","").replaceAll("(PagalWorld)","")){
                
    
                div.style.backgroundColor = "#242424";
                div.style.boxShadow = "0 0 1.2rem 0 rgb(222, 222, 222,.5)";
                div.style.height= '11.2%';
                div.style.width= '95.2%';
                div.querySelector('.song-play-icon').style.height= '2.2rem';
                div.querySelector('.song-play-icon').style.width= '2.2rem';
                


                document.querySelector('.play-bar-song-name').innerHTML=`${div.querySelector('.song-info-container div>p').innerText}`
                console.log(div.querySelector('.song-info-container div p').innerText)
                volume_slider_point.style.left = "100%"
                if (volume_slider_point.style.left !== 0){
                    document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-high" ></i>'
                    
                }
                if (volume_slider_point.style.left == 0){
                    document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-xmark"></i>'
                    
                }
                
                current_song.play()
                play_button.innerHTML='<i class="fa-solid fa-pause"></i>'
                
                
            }
            if (div.querySelector('.song-info-container div p').innerText != current_song.src.split('/')[current_song.src.split('/').length-1].replaceAll("-"," ").replaceAll("(PaglaSongs)","").replaceAll("(PagalWorld)","")){
                div.style.backgroundColor = "#2b2b2b33";
                div.style.boxShadow = "none";
                div.style.height='11%';
                div.style.width= '95%';
                div.querySelector('.song-play-icon').style.height='2rem';
                div.querySelector('.song-play-icon').style.width= '2rem';    
            }
        })
    })

}
rtrn_value()


play_button.addEventListener('click',()=>{

    volume_slider_point.style.left= '100%'
    current_song.volume=1
    volume_icon.innerHTML='<i class="fa-solid fa-volume-high"></i>'
    
    if (current_song.paused) {
        current_song.play()
        play_button.innerHTML='<i class="fa-solid fa-pause"></i>'
    }   
    
    else if (!current_song.paused){
        current_song.pause()
        play_button.innerHTML='<i class="fa-solid fa-play"></i>'
    }   
})

function moveSlider(){
    Slider_point.style.left = current_song.currentTime/current_song.duration*100-1 +'%';
    
}

current_song.addEventListener('timeupdate',()=>{
    setTimeout(()=>{
        time.innerHTML = `${Math.floor(current_song.currentTime/60) }:${ Math.floor(current_song.currentTime%60)} / ${Math.floor(current_song.duration/60) }:${ Math.floor(current_song.duration%60)}` 
    },100)

    moveSlider()
    
    if (current_song.currentTime===current_song.duration){
        play_button.innerHTML='<i class="fa-solid fa-play"></i>'
        // Slider_point.style.left = '0%';
    }
})

Slider.addEventListener('click',e=>{
    Slider_point.style.left = e.clientX - Slider.getBoundingClientRect().left  + 'px';
    Slider_point.style.transition = '.2s ease';
    current_song.currentTime = (e.clientX - Slider.getBoundingClientRect().left)/(Slider.getBoundingClientRect().width) * current_song.duration
    
})

volume_slider.addEventListener('click',e=>{
    console.log(volume_slider.getBoundingClientRect().width )
    volume_slider_point.style.left = e.clientX - volume_slider.getBoundingClientRect().left + 'px';
    console.log(parseFloat(volume_slider_point.style.left.replace('px','')) )
    if (parseFloat(volume_slider_point.style.left.replace('px','')) >  volume_slider.getBoundingClientRect().width ){
        console.log('kya hua')
        volume_slider_point.style.left = '98.5%';
    }
    volume_slider_point.style.transition = '.1s ease';
    
    current_song.volume = (e.clientX - volume_slider.getBoundingClientRect().left)/(volume_slider.getBoundingClientRect().width) * 1

    if (volume_slider_point.style.left !== 0){
        document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-high" ></i>'
        // current_song.volume=0
    }
    if (volume_slider_point.style.left == 0){
        document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-xmark"></i>'
        // current_song.volume=0
    }
    
})

let volume_icon=document.querySelector('.volume div+div div')

volume_icon.addEventListener('click',()=>{

    console.log('hi')
    console.log(volume_icon.innerHTML.trim())
    if(volume_icon.innerHTML.trim()==='<i class="fa-solid fa-volume-high"></i>'){
        current_song.volume=0
        volume_icon.innerHTML='<i class="fa-solid fa-volume-xmark"></i>'
        volume_slider_point.style.left = 0;
    }
    else if(volume_icon.innerHTML.trim()==='<i class="fa-solid fa-volume-xmark"></i>'){
        current_song.volume=1
        document.querySelector('.volume div+div div').innerHTML='<i class="fa-solid fa-volume-high" ></i>'
        volume_slider_point.style.left = '98.5%';
    }
})
