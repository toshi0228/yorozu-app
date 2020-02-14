// export const displayPlan



export const plus = num =>{
    return {type: "PLUS", payload: {num: num}}
};

export const toTure =() =>{
    return {type: "ToTure",}
};


export const changeScore = (id) =>{
    return {type: "PLUSSCORE", payload: {id:id}}
};

