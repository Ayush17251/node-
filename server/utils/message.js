const moment=require('moment');


var generatemessage = (from, text) =>{
  return{
    from,
    text,
    createdAt: moment().valueOf()
  };
};


var generateLocationmessage=(from,lattitude,longitude) => {
  return{
    from,
    url:`https://www.google.com/maps?q=${lattitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};


module.exports={generatemessage,generateLocationmessage};
