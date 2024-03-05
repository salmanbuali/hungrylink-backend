const { User } = require('../models')

const getRestsByLocation = async (req, res) => {
  
  try {
    const rests = await User.find({
      restId: { $ne: null },
      address: req.body.location.toLowerCase()
    }).lean()
    
    const filteredRests = rests.map((rest) => {
      const { passwordDigest, orders, type, _id, updatedAt, createdAt, __v, ...filteredRest } = rest 
      const website = `https://hungrylink.surge.sh/menu/${rest.restId}`
      return { ...filteredRest, website };
    })

    if (filteredRests.length <= 0) {
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
