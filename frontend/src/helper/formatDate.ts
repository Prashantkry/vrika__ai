export const formatDate = (dateString:string) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return '';

    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };
