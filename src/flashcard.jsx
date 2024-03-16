import React from "react";
import { useState } from "react";
import Card from "./card";
import cards from "./cards";

function Gurn(min, max) {
    let numbers = [];
    for (let i = min; i <= max - 1; i++) {
        numbers.push(i);
    }

    let result = [];
    while (result.length < max) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const randomNumber = numbers[randomIndex];
        result.push(randomNumber);
        numbers.splice(randomIndex, 1);
    }

    return result;
}


const Flashcard = () => {
    const [Page,SetPage] = useState(0)
    const [carded,SetCarded] = useState(cards)
    const [paged, SetPaged] = useState(Gurn(0,cards.length))
    const [val, SetVal] = useState("")
    const [correct, SetCorrect] = useState("")
    //SetCarded(...carded)

    const back = () => {
        if (Page >= 1) {
            SetPage(Page-1)
            SetVal("")
            SetCorrect("")
        }
    }

    const forward = () => {
        if (Page < paged.length - 1) { 
            SetPage(Page+1) 
            SetVal("")
            SetCorrect("")
        }
    }

    const rand = () => {
        SetPaged(Gurn(0,cards.length))
        SetCarded(cards)
        SetVal("")
        SetCorrect("")
    }

    /*const checks = (event) => {
        SetVal(event.target.value)
        if (event.target.value == carded[paged[Page]].Back){
            console.log("Goeated")
        }
    }*/

    function isSimilar(guess, answer) {
        //Asked Chat-gpt for a similarity algorithm
        //modified to lowercase all character and remove spaces
        guess.toLowerCase()
        answer.toLowerCase()
        guess.trim()
        answer.trim()
    
        // Calculate the number of matching characters
        let matchingCount = 0;
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === answer[i]) {
                matchingCount++;
            }
        }
    
        // Calculate the percentage of matching characters
        const similarityPercentage = (matchingCount / answer.length) * 100;
    
        // the guess cant be too much bigger than the actual answer
        if (guess.length >= answer.length + 3) {
            return 0
        }
        else {
        // Check if the similarity percentage is at least 90%
        //changed to 70
            return similarityPercentage >= 70;
        }
    }
    

    const checks = (event) => {
        event.preventDefault();
        const guess = val;
        const answer = carded[paged[Page]].Back;
        console.log(guess, answer)
        if (isSimilar(guess, answer)) {
            SetCorrect("correct");
            // Handle correct guess
        } else {
            SetCorrect("wrong");
            // Handle wrong guess
        }
    }
    
    
    const values = (event) => {
        SetVal(event.target.value)
    }

    return (
        <>
        <div className="justify-center">
            <Card
            Front = {carded[paged[Page]].Front}
            Back = {carded[paged[Page]].Back}> 
            </Card>
        </div>
        <div className="mt-1 mb-8">
            <form>
                <input type = "text" value={val} onChange={values} placeholder="Enter a guess!" id = {correct}></input>
                <button onClick={checks} className="mx-8 bg-orange-400 rounded-md w-24" >Check</button>
            </form>
        </div>
        <div>
            <button className = "mx-8 bg-orange-400 rounded-md w-24" onClick={back}>Back</button>
            <button className = "mx-8 bg-orange-400 rounded-md w-24" onClick={forward}>Next</button>
            <button className = "m-auto h-32 rounded-md w-12 size text-4xl" onClick={rand}>🔄</button>
        </div>
        </>
    )
}

export default Flashcard