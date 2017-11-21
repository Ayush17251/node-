var generatemessage = (from, text) =>{
  return{
    from,
    text
  };
};


var generateLocationmessage=(from,lattitude,longitude) => {
  return{
    from,
    url:`https://www.google.com/maps?q=${lattitude},${longitude}`
  };
};


module.exports={generatemessage,generateLocationmessage};
