export function shortenText(len, text) {
    return text.length <= len ? text : text.slice(0, len-3)+"..."  
}

export function checkFormFields(formData) {
    const emptyFields = [];

    for (const field in formData) {
        if (field === 'picturePath') {
            continue;
        }
        if (!formData[field]) {
            emptyFields.push(field);
        }
    }

    return emptyFields;
}

export function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
}

export function capitalizeWords(text) {
    if (!text) return '';
    const words = text.split(' ');
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
}