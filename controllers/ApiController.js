const { User } = require('../models')

const getRestsByLocation = async ( req, res ) => {

  try { 
    const rests = await User.find({
      restId: { $ne: null },
      address: req.body.location.toLowerCase() 
    });
  
    const filteredRests = rests.map(rest => {
      const { passwordDigest, ...filteredRest } = rest; // Destructure and exclude passwordDigest
      console.log(filteredRest)
      return filteredRest;
    });

    if(filteredRests.length <= 0) {
      res.send(`No restaurants found nearby ${req.body.location}`)
    } else {
      res.send(filteredRests)
    }
    
  } catch (error) {
    res.send(`no restaurants found for ${req.body.location}`)
  }
  
}

module.exports = {
  getRestsByLocation
}