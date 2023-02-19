import React from 'react';
function UnixToDate({ unix }) {
  const date = new Date(unix * 1000); // Convert Unix timestamp to JavaScript Date object
 const options = { // Define date formatting options
 weekday: 'long',
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 hour: 'numeric',
 minute: 'numeric',
 second: 'numeric',
 timeZoneName: 'short'
 };
 const formattedDate = date.toLocaleString('en-US', options); // Format date using options
 return <span>{formattedDate}</span>; // Render formatted date
}