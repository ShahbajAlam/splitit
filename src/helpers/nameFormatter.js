const nameFormatter = (name) => {
    const nameArr = name.split(" ");
    let formattedName = "";
    nameArr.forEach((n) => {
        formattedName += n[0].toUpperCase() + n.toLowerCase().slice(1) + " ";
    });
    return formattedName.trim();
};

export { nameFormatter };
