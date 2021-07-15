export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NGN',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const triggerFileDownload = (file, fileName) => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName); //or any other extension
  document.body.appendChild(link);
  link.click();
}



export const formatDate = (date)=>{
  const year = new Intl.DateTimeFormat('en',{year: 'numeric'}).format(date)
  const month = new Intl.DateTimeFormat('en',{month: 'long'}).format(date)
  const day = new Intl.DateTimeFormat('en',{day: 'numeric'}).format(date)
  const time = new Intl.DateTimeFormat('en',{timeStyle: 'short'}).format(date)
  return `${month} ${day}, ${year} ${time}`
}

export const formatTime = (date)=>{
  const time = new Intl.DateTimeFormat('en',{timeStyle: 'short'}).format(date)
  return time
}

export const formatTicketDate = (date)=>{
  const newDate = new Intl.DateTimeFormat('en').format(date)
  return newDate
}

export const formatLongDate = (date)=>{
  const newDate = new Intl.DateTimeFormat('en-Gb', {dateStyle: 'full'}).format(date)
  return newDate
}

export const formatShortDate = (date)=>{
  const newDate = new Intl.DateTimeFormat('en', {dateStyle: 'short'}).format(date)
  return newDate
}
