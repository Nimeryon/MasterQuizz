const Word = (title) => {
    let lower = title.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.substring(1);
}