export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const parseTime = (timeString: string): number => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  if (isNaN(minutes) || isNaN(seconds)) return 0;
  return minutes * 60 + seconds;
}; 

export const parseEditValue= (editValueString: string): number => {  
  if (editValueString.length <= 2) {
    return parseInt(editValueString);
  } else if (editValueString.length === 3){
    return parseInt(editValueString.slice(0, 1)) * 60 + parseInt(editValueString.slice(1, 3));
  } else if (editValueString.length === 4){
    return parseInt(editValueString.slice(0, 2)) * 60 + parseInt(editValueString.slice(2, 4));
  }

  throw new Error("Invalid edit value string");
}; 
