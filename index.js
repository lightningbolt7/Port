

let ball1El = document.getElementById("ball1")
let ball2El = document.getElementById("ball2")
let headingEl = document.getElementById("heading")
let time = 11000
let picEl = document.getElementById("myPic")
let aliasEl = document.getElementById("alias")
let nameEl = document.getElementById("name")
let bodyEl = document.getElementById("index")
let skillHead = document.getElementById("skillHead")
let eduHead = document.getElementById("eduHead")
let hobbyHead = document.getElementById("hobbyHead")
let skillEl = document.getElementById("skill")
let eduEl = document.getElementById("edu")
let hobbyEl = document.getElementById("hobby")
let pianoEl = document.getElementById("piano")
let musicEl = document.getElementById("music")
let pianoHeadEl = document.getElementById("piano-title")
let thunderEl = document.getElementById("thunder")
let timeId
let temp=1;
let num;
let timeOpacityId;
console.log(nameEl)
skillEl.classList.remove("active")
skillHead.classList.add("heading-shadow")

skillHead.addEventListener("click",function(){
    skillEl.classList.remove("active")
    skillHead.classList.add("heading-shadow")
    num=1
    addCover(temp)
    temp=num
})
eduHead.addEventListener("click",function(){
    eduEl.classList.remove("active")
    eduHead.classList.add("heading-shadow")
    num=2
    addCover(temp)
    temp=num
})
hobbyHead.addEventListener("click",function(){
    hobbyEl.classList.remove("active")
    hobbyHead.classList.add("heading-shadow")
    num=3
    addCover(temp)
    temp=num
})
nameEl.addEventListener("mouseover",function(){
    nameEl.classList.remove("pop-anim")
    picEl.classList.add("fadeIn-anim")
    if(timeOpacityId){
        clearTimeout(timeOpacityId)
        timeOpacityId=setTimeout(stayOpacity,3000)
    }
   else{
        timeOpacityId=setTimeout(stayOpacity,3000)
   }
    aliasEl.classList.add("change")
})

//picture visibility AND ALIAS STYLING-----------------
picEl.addEventListener("mouseover",function(){
    picEl.classList.remove("visible")
})
let thunderCount=0
aliasEl.addEventListener("mouseover",function(){
     thunderCount++
    bodyEl.classList.add("cursor")
    if(timeId){
        clearInterval(timeId)
        timeId=setTimeout(removeCursor,30000)
    }
    else{
        timeId=setTimeout(removeCursor,30000)
    }
    if(thunderCount%2 != 0){
        thunderEl.play()
    }
    else{
        thunderEl.pause()
        thunderEl.currentTime = 0
    }
    
})
//BACKGROUND VIDEO FORMATTING
let vid = document.getElementById("myVideo");
    vid.addEventListener("timeupdate", function () {
        if(this.currentTime >= 27.0) {
            this.currentTime = 0.0;
        }
    });
function removeCursor(){
    bodyEl.classList.remove("cursor")
}
function addCover(temp){
    if(temp==num){
        return
    }
    if(temp==1){
        skillEl.classList.add("active")
        skillHead.classList.remove("heading-shadow")
    }
    else if(temp==2){
        eduEl.classList.add("active")
        eduHead.classList.remove("heading-shadow")
    }
    else{
        hobbyEl.classList.add("active")
        hobbyHead.classList.remove("heading-shadow")
    }
}
//audio playback
let pianoHover=0
let pianoTimer
pianoHeadEl.addEventListener("mouseover",function(){
    pianoHeadEl.classList.remove("pop-anim")
    pianoHover++
    if(pianoHover % 2 !== 0){
        musicEl.play()
        pianoHeadEl.classList.add("piano-shadow")
        if(pianoTimer){
            setTimeout(removeMusic,70000)
        }
        else{
            clearTimeout(pianoTimer)
            setTimeout(removeMusic,70000)
        }
    }
    else{
        removeMusic()
    }
})
function removeMusic(){
    musicEl.pause()
    musicEl.currentTime=0
    pianoHeadEl.classList.remove("piano-shadow")
}
//--------STORY TITLE VISIBILITY
let storyEl = document.getElementById("story")
let storyTitle = document.getElementById("story-text")
storyEl.addEventListener("mouseover",function(){
    storyTitle.innerHTML = "<div>GOLDEN AMULET</div>"
})
storyEl.addEventListener("mouseleave",function(){
    storyTitle.innerHTML = "Currently working on novel"
})
//--------About Me Mystery Text
let subEl = document.getElementById("sub")
let aboutEl = document.getElementById("about-text")

subEl.addEventListener("mouseover",function(){
    aboutEl.innerHTML = `<div class="fadeIn-anim-mono">
        Wow! intentionally or by just randomly hovering(most likely), you 
        found my secret message, congrats. More about me, I like to 
        play basketball and soccer. I am interested in Card Magic too.
        You see, Card magic can be compared to a website, the frontend is the
        magic what the audience(user) sees and the backend is the magic that 
        only the magician(programmer) sees for the magic(website) to work.
    </div>`
})
subEl.addEventListener("mouseleave",function(){
    aboutEl.innerHTML= `Hello<span> User!</span>, quite the intro ain't it?
    Apoligies for the thunder sound if it got you. But hey,
    feel free to interact with the rest of this Portfolio. I have 
    added music which you can disable by hovering again.Moving on to 
    the topic of this title. Technology is developing exponentially as you are 
    reading this. Almost everything has been integrated with TECH. I am interested
    on how they work and contribute my chunk to its development; Thinking logically
    to solve problems in an efficient way. Maybe it is true, being lazy makes you smart.`
})
//-----EARTH CLICK
let earthEl = document.getElementById("planet")
earthEl.addEventListener("mouseover",function(){
    earthEl.classList.remove("pop-anim")
})
//-------TOGGLE ANIMATION
let conInfoEl = document.getElementById("conInfo")
let videoEl = document.getElementById("myVideo")
let backdropEl = document.getElementById("backdrop")
let toggleEL = document.getElementById("toggle")
let toggleCount=0;
let sunEl = document.getElementById("sun")
let darkEl = document.getElementById("dark")

backdropEl.addEventListener("click",function(){
    toggleCount++
    if(toggleCount%2!=0){
        videoEl.src = "./sun.mp4"
        backdropEl.style.pointerEvents = 'none'
        setTimeout(enable,2000)
        toggleEL.classList.remove("toggle-anim-back")
        toggleEL.classList.add("toggle-anim")
        setTimeout(yo,1980)
        darkEl.classList.remove("dark-active")
        sunEl.classList.add("sun-active")
        console.log(conInfoEl)
        conInfoEl.style.color = "white"
        document.getElementById("worInf").style.color = "white"
        document.getElementById("descriptionInfo").style.color = "white"
        document.getElementById("modech1").style.color = "white"
        document.getElementById("modech3").style.color = "white"
        document.getElementById("modech2").style.color = "white"
        document.getElementById("modech4").style.color = "white"
        document.getElementById("modech5").style.color = "white"
        document.getElementById("piano").style.color = "white"
        document.getElementById("modech6").style.color = "white"
        document.getElementById("modech7").style.color = "white"
        document.getElementById("time0").style.color = "white"
        document.getElementById("time1").style.color = "white"
        document.getElementById("time2").style.color = "white"
        document.getElementById("time3").style.color = "white"
        document.getElementById("subIn").style.color = "#f7f305"
        document.getElementById("sub1").style.color = "#f7f305"
        document.getElementById("sub").style.color = "#f7f305"
        document.getElementById("modech8").style.color = "white"
        document.getElementById("modech9").style.color = "white"
        document.getElementById("modech10").style.color = "white"


    }   
    else{
        videoEl.src = "./edit 1.mp4"
        backdropEl.style.pointerEvents = 'none'
        setTimeout(enable,2000)
        toggleEL.classList.remove("toggle-anim")
        toggleEL.classList.add("toggle-anim-back")
        darkEl.classList.add("dark-active")
        sunEl.classList.remove("sun-active")
        conInfoEl.style.color = "#ababab"
        document.getElementById("worInf").style.color = "#ababab"
        document.getElementById("descriptionInfo").style.color = "#ababab"
        document.getElementById("modech1").style.color = "#ababab"
        document.getElementById("modech3").style.color = "#ababab"
        document.getElementById("modech2").style.color = "#ababab"
        document.getElementById("modech4").style.color = "#ababab"
        document.getElementById("modech5").style.color = "#ababab"
        document.getElementById("piano").style.color = "#ababab"
        document.getElementById("modech6").style.color = "#ababab"
        document.getElementById("modech7").style.color = "#ababab"
        document.getElementById("time0").style.color = "#dc4f4f"
        document.getElementById("time1").style.color = "#dc4f4f"
        document.getElementById("time2").style.color = "#dc4f4f"
        document.getElementById("time3").style.color = "#dc4f4f"
        document.getElementById("modech8").style.color = "#ababab"
        document.getElementById("modech9").style.color = "#ababab"
        document.getElementById("modech10").style.color = "#ababab"
        document.getElementById("subIn").style.color = "white"
        document.getElementById("sub1").style.color = "white"
        document.getElementById("sub").style.color = "white"
        setTimeout(yoBack,1980)
    }
})
function enable(){
    backdropEl.style.pointerEvents = 'auto'
}
function yoBack(){
    
    toggleEL.classList.remove("toggleFront")
}
function yo(){
    toggleEL.classList.add("toggleFront")
}
function stayOpacity(){
    picEl.classList.add("visible")
    picEl.classList.remove("fadeIn-anim")
}

//---------------------PORTFOLIO JS STARTS HERE---------------------
let RecimeDescription = `Recime is an AI powered recipe generator. Powered by OpenAI API and yours truly, it displays ingredients and recipes of any dish. Moreover, they are stored on a previous recipe tab for future reference with detailed seperation. Maybe finally I can learn to cook without my mom near me. 
                         
                        Skills involved: \u00A0\u00A0\u00A0 Use of API, HTML ,CSS, JS, Handling Data Structure, Prompt Engineering, Token Usage and Algorithms.
`
let LeWordDescription = `Lé Word is the little brother of the game Wordle that involves the user to guess a four-letter word. It comes with a point-analysis system that consists the accuracy of the user and other information. It uses the dictionary API to validate words. Users can view the definition of answer in the end. In a nutshell, it is a fun as well as an educative project.

                        Skills involved: \u00A0\u00A0\u00A0 Use of API, HTML, CSS, JS, Game design algorithm, Manipulation of HTML IDs and local storage manipulation.
`
let websiteTrackerDescription = `WebsiteTracker is a google extension that can store Links for future referece. It uses Google's API to access elements of a current tab and store in the extension. It has an input tab to enter links manually. This has been really useful for me for storing and accessing links in a flash. Moreover, this is my first successful project involving API.

                        Skills involved: \u00A0\u00A0\u00A0 Use of API, HTML, CSS, JS , localStorage Manipulation, data handling and algorithms.
`
let workObj = [{name:"Recime",description: RecimeDescription },{name:"Lè Word",description: LeWordDescription },{name:"Website Tracker",description: websiteTrackerDescription }]
let workCurrent = 1
let workEl
let scrollC=0;
let descriptionHeaderEl = document.getElementById("descriptionHeader")
let descriptionInfoEl = document.getElementById("descriptionInfo")
descriptionHeaderEl.innerText = workObj[0].name
descriptionInfoEl.innerText = workObj[0].description
function displayInfoWork(index){
    workEl = document.getElementById("work"+workCurrent)
    workEl.classList.remove("selectedWork")
    workEl = document.getElementById("work"+(index+1))
    workEl.classList.add("selectedWork")
    workCurrent = index+1
    descriptionHeaderEl.innerText = workObj[index].name
    descriptionInfoEl.innerText = workObj[index].description
    
}

function hideScroll(){
    if(scrollC==50){
        console.log("done")
        let ScrollEl = document.getElementById("scrollStyle")
        scrollStyle.classList.add("hideScroll")
       
    }
    scrollC++;
    
}

let TimeLineInfo2020=`Late 2019 and early 2020 was when I got introduced to 
                      Programming in my life. This was where the seed was planted
                      and have been growing since. I started this by learning Java 
                      during highschool. I was introduced to loops, sorting algorithms and
                      other basics for Java`
let TimeLineInfo2021=`During my Junior year of highschool, I was introduced to Python and its basics.
                        I was able to master it due to prior experience of Java. I scored perfect scores on
                        Computer Science and Chemistry board exams that are a series of exam conducted all over
                        the country. Moreover, I was awarded for scoring rank 1 on Physics among all the students in my school`
let TimeLineInfo2022=`During my senior year of highschool, I was introduced to SQL and its basics.
                        Through this I learnt how databases are managed and the backend of the program. I also learnt
                        how to integrate SQL as a backend for Python(frontend) to store and manipulate data. During this year,
                        I was accepted for fall 2022 application at University of Texas at Dallas. During my freshman year at UTD,
                        I joined Students Game Development Association (SDGA-organisation) to code games through unity. Through this,
                        I was exposed to C# and its uses in game development. During fall 2022, I attended HackUTD where I found out that
                        I required more knowledge over website dev through HTML,CSS and JS. I set a goal to master these languages during the following summer
                        `
let TimeLineInfo2023=`During my Freshman year, I self-learnt more languages such as HTML,CSS and JS to focus my aim on
                        website development as I planned after my experience from the hackathon. Over the summer, I learnt the respective languages and proceeded to make small projects.
                        On knowing the basics, I proceeded to make full stack website that utilises APIs. I was able to sucessfully finish
                        three of such projects which are listed above. This portfolio that you are currently was successfully deployed
                        during this year. I also became a member of ACM at UTD`
let timeArr = [TimeLineInfo2020,TimeLineInfo2021,TimeLineInfo2022,TimeLineInfo2023]
function displayTimelineInfo(indexTime){
        
    let elem = document.getElementById("time"+indexTime)
    elem.innerHTML = timeArr[indexTime]
    elem.classList.remove("hideTime")
    elem.classList.add("fadeIn-time")
    
}


/*headerEl.addEventListener('mouseover',function(){
    ball1El.classList.add("balls")
    ball2El.classList.add("balls2")
})*/
