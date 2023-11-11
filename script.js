console.log("Welcome to spotify");
let songIndex=1;
let audio=new Audio("songs/1.mp3");
let gif=document.getElementById('gifs');
let myProgressBar=document.getElementById('myProgressBar');
// audio.play();
let songnameinfo=document.getElementById('songnameinfo');
let songItem=Array.from(document.getElementsByClassName('song-item'));

let songs=[
    {songName: "Legion" , filePath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songName: "Trap" , filePath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songName: "They Mad" , filePath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songName: "Rich the Kid" , filePath: "songs/4.mp3", coverpath: "covers/4.jpg"},
    {songName: "Name Artist" , filePath: "songs/5.mp3", coverpath: "covers/5.jpg"},
    {songName: "Safety Dance" , filePath: "songs/6.mp3", coverpath: "covers/6.jpg"},
    {songName: "Back it up" , filePath: "songs/7.mp3", coverpath: "covers/7.jpg"},
    {songName: "Alone" , filePath: "songs/8.mp3", coverpath: "covers/8.jpg"},
    {songName: "Peace" , filePath: "songs/9.mp3", coverpath: "covers/9.jpg"},
    {songName: "True love" , filePath: "songs/10.mp3", coverpath: "covers/10.jpg"}
] 

songItem.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src=songs[i].coverpath;
    element.getElementsByTagName('span')[0].innerText=songs[i].songName;
    // document.querySelector(".gif-info span").innerText=songs[i].songName;
})

let masterPlay=document.getElementById("masterPlay");
masterPlay.addEventListener('click', ()=>{
    if(audio.paused || audio.currentTime<=0)
    {
        audio.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity="1";
    }
    else{
        audio.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity="0";
    }
})





audio.addEventListener('timeupdate', ()=>{
    // console.log('timeUpdate');
    let progress=parseInt((audio.currentTime/audio.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change', ()=>{
    audio.currentTime=myProgressBar.value*audio.duration/100;
}) 


function playCurrentSong() {
    audio.src = `songs/${songIndex}.mp3`;
    audio.currentTime = 0;
    audio.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
}




let currentlyPlayingIcon = null; // Initialize a variable to keep track of the currently playing icon
// let songIndex = 1; // Initialize the songIndex to the first song (assuming you start at song 1)

// Function to play the current song
function playCurrentSong() {
    if (currentlyPlayingIcon) {
        currentlyPlayingIcon.classList.add('fa-circle-play');
        currentlyPlayingIcon.classList.remove('fa-circle-pause');
    }
    songnameinfo.innerText = songs[songIndex - 1].songName;
    gif.style.opacity="1";
    // console.log( songnameinfo.innerText);
    // console.log(songs[songIndex - 1].songName);
    currentlyPlayingIcon = document.getElementById(String(songIndex));
    currentlyPlayingIcon.classList.remove('fa-circle-play');
    currentlyPlayingIcon.classList.add('fa-circle-pause');

    audio.src = `songs/${songIndex}.mp3`;
    audio.currentTime = 0;
    audio.play();
    
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
}

// Play the first song when the page loads
playCurrentSong();

Array.from(document.getElementsByClassName('songItemPlays')).forEach((element) => {
    element.addEventListener('click', () => {
        const clickedSongIndex = parseInt(element.id);
        if (element === currentlyPlayingIcon) {
            // If the same icon is clicked, toggle play/pause
            if (element.classList.contains('fa-circle-play')) {
                element.classList.remove('fa-circle-play');
                element.classList.add('fa-circle-pause');
                audio.src = `songs/${songIndex}.mp3`;
                audio.currentTime = 0;
                audio.play();
                gif.style.opacity="1";
                songnameinfo.innerText = songs[songIndex - 1].songName;

                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            } else if (element.classList.contains('fa-circle-pause')) {
                element.classList.add('fa-circle-play');
                element.classList.remove('fa-circle-pause');
                audio.pause();
                gif.style.opacity="0";
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
            }
        } else {
            // If a new icon is clicked, stop the previous and play the new one
            if (currentlyPlayingIcon) {
                currentlyPlayingIcon.classList.add('fa-circle-play');
                currentlyPlayingIcon.classList.remove('fa-circle-pause');
            }

            currentlyPlayingIcon = element;
            songIndex = clickedSongIndex; // Update the songIndex

            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
            playCurrentSong(); // Play the newly selected song
        }
    });
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 10; // If at the first song, loop back to the last one
    } else {
        songIndex -= 1;
    }
    playCurrentSong(); // Play the new song when "previous" is clicked
});


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 10) {
        songIndex = 1; // If at the first song, loop back to the last one
    } else {
        songIndex += 1;
    }
    playCurrentSong(); // Play the new song when "previous" is clicked
});
