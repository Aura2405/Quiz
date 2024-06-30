import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialSeconds }) => {
const [seconds, setSeconds] = useState(initialSeconds);

useEffect(() => {
if (seconds <= 0) {
return;
}


const timer = setInterval(() => {
setSeconds((prevSeconds) => prevSeconds - 1);
}, 1000);


return () => clearInterval(timer);
}, [seconds]);


// const formatTime = (timeInSeconds) => {
// const minutes = Math.floor(timeInSeconds / 60)
// .toString()
// .padStart(2, '0');
// const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
// return `${minutes}:${seconds}`;
// };

// return (
// <div>
// <h1>Countdown Timer</h1>
// <p>{formatTime(seconds)}</p>
// </div>
// );

return {
    seconds
}

};

export default CountdownTimer