// document.addEventListener("DOMContentLoaded", function() {


//     const searchButton = document.getElementById("search-btn");
//     const usernameInput = document.getElementById("user-input");
//     const statsContainer = document.querySelector(".stats-container");
//     const easyProgressCircle = document.querySelector(".easy-progress");
//     const mediumProgressCircle = document.querySelector(".medium-progress");
//     const hardProgressCircle = document.querySelector(".hard-progress");
//     const easyLabel = document.getElementById("easy-label");
//     const mediumLabel = document.getElementById("medium-label");
//     const hardLabel = document.getElementById("hard-label");
//     const cardStatsContainer = document.querySelector(".stats-cards");

//     //return true or false based on a regex
//     function validateUsername(username) {
//         if(username.trim() === "") {
//             alert("Username should not be empty");
//             return false;
//         }
//         const regex = /^[a-zA-Z0-9_-]{1,15}$/;
//         const isMatching = regex.test(username);
//         if(!isMatching) {
//             alert("Invalid Username");
//         }
//         return isMatching;
//     }

//     async function fetchUserDetails(username) {

//         try{
//             searchButton.textContent = "Searching...";
//             searchButton.disabled = true;
//             //statsContainer.classList.add("hidden");

//             // const response = await fetch(url);
//             // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//             const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

//             const targetUrl = 'https://leetcode.com/graphql/';
            
//             const myHeaders = new Headers();
//             myHeaders.append("content-type", "application/json");

//             const graphql = JSON.stringify({
//                 query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
//                 variables: { "username": `${username}` }
//             })
//             const requestOptions = {
//                 method: "POST",
//                 headers: myHeaders,
//                 body: graphql,
//             };

//             const response = await fetch(proxyUrl+targetUrl, requestOptions);
//             if(!response.ok) {
//                 throw new Error("Unable to fetch the User details");
//             }
//             const parsedData = await response.json();
//             console.log("Logging data: ", parsedData) ;

//             displayUserData(parsedData);
//         }
//         catch(error) {
//             statsContainer.innerHTML = `<p>${error.message}</p>`
//         }
//         finally {
//             searchButton.textContent = "Search";
//             searchButton.disabled = false;
//         }
//     }

//     function updateProgress(solved, total, label, circle) {
//         const progressDegree = (solved/total)*100;
//         circle.style.setProperty("--progress-degree", `${progressDegree}%`);
//         label.textContent = `${solved}/${total}`;
//     }


//     function displayUserData(parsedData) {
//         const totalQues = parsedData.data.allQuestionsCount[0].count;
//         const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
//         const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
//         const totalHardQues = parsedData.data.allQuestionsCount[3].count;

//         const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
//         const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
//         const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
//         const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

//         updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
//         updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
//         updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

//         const cardsData = [
//             {label: "Overall Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions },
//             {label: "Overall Easy Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions },
//             {label: "Overall Medium Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions },
//             {label: "Overall Hard Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions },
//         ];

//         console.log("card ka data: " , cardsData);

//         cardStatsContainer.innerHTML = cardsData.map(
//             data => 
//                     `<div class="card">
//                     <h4>${data.label}</h4>
//                     <p>${data.value}</p>
//                     </div>`
//         ).join("")

//     }

//     searchButton.addEventListener('click', function() {
//         const username = usernameInput.value;
//         console.log("logggin username: ", username);
//         if(validateUsername(username)) {
//             fetchUserDetails(username);
//         }
//     })

// })

// Another code 
document.addEventListener("DOMContentLoaded", function(){
    const searchBtn = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");
    const progressClass = document.querySelector(".progress");
    const name  = document.querySelector(".name");
    const totalSolved = document.querySelector(".totalSolved");
    const ranking = document.querySelector(".ranking");
    const contribution = document.querySelector(".contribution");
    const reputation = document.querySelector(".reputation");
    
    

    //return true or false based on regex
    function validateUsername(username){
        if(username==""){ 
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) alert("Invalid username");
        return isMatching;
    }

    // to display the information on cards
    function displayCards(data){
        totalSolved.textContent = `Total Problems Solved : ${data.totalSolved}`;
        ranking.textContent = `Ranking : ${data.ranking}`;
        contribution.textContent = `Contribution Points : ${data.contributionPoints}`
        reputation.textContent =`Reputation : ${data.reputation}`;

        cardStatsContainer.style.display="flex";

    }

    function displayUserData(data){
        const easySolved = (data.easySolved/data.totalEasy)*100;
        const mediumSolved = (data.mediumSolved/data.totalMedium)*100;
        const hardSolved = (data.hardSolved/data.totalHard)*100;
        console.log(easySolved," " ,mediumSolved, " ", hardSolved);

        easyProgressCircle.style.setProperty("--progress-degree",`${easySolved}%`);
        mediumProgressCircle.style.setProperty("--progress-degree",`${hardSolved}%`);
        hardProgressCircle.style.setProperty("--progress-degree",`${mediumSolved}%`);

        easyLabel.textContent= `${data.easySolved}/${data.totalEasy}`;
        mediumLabel.textContent= `${data.mediumSolved}/${data.totalMedium}`;
        hardLabel.textContent= `${data.hardSolved}/${data.totalHard}`;

        name.style.display="block" ;

        progressClass.style.display="flex";
        // progressClass.style.flexDirection="column";

        
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchBtn.textContent ="Searching...";
            searchBtn.disabled = true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch user-details...");
            }
            const data = await response.json();
            console.log("user datails : ", data);
            displayUserData(data);
            displayCards(data);
            

        }
        catch(error){
            console.error("Error fetching user details:", error);
        }
        finally{
            // finally make everything normal
            searchBtn.innerHTML=`<span>Search</span><span class="material-symbols-outlined">
                    query_stats
                    </span>`
            searchBtn.disabled = false;
            usernameInput.value="";
        }
    }

    searchBtn.addEventListener("click", ()=>{
        const username = usernameInput.value;
        name.textContent =`Welcome Champion! ${username}`;
        // console.log(username);

        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })

    // on clicking the userinput field all the details got hidded
    usernameInput.addEventListener("click",()=>{
        name.style.display="none" ;

        progressClass.style.display="none";
        cardStatsContainer.style.display="none";
    });

    // to resume and play the toggle animation
    function toggleAnimation(element) {
        const currentState = window.getComputedStyle(element).animationPlayState;
        
        if (currentState === 'running') {
            element.style.animationPlayState = 'paused';
        } else {
            element.style.animationPlayState = 'running';
        }
    }

    name.addEventListener("click", function() {
        toggleAnimation(name); // Now the correct element is passed
    });
})