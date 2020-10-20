function isValidInput(text) {
    //numbers from the API specs
    if (!text || text.length > 5000) return false;

    //API allows us to use more chunks at once, but for MVP we wan to save API costs
    //and don't allow too long texts
    if (text.split(/[\w]+/).length > 500) return false;

    return true;
}

export { isValidInput }