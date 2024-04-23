const formatDate = (dateTimeStr) => {
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const dateTime = new Date(dateTimeStr);
    return dateTime.toLocaleString('en-US', options).replace(',', '•').replace(' ', '');
};

export { formatDate };