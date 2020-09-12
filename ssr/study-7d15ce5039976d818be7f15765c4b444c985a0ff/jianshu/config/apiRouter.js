var express = require('express');

const apiRouters = express.Router();
apiRouters.get('/getDiscList', function(req, res) {
  var url = "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data);
  }).catch((e) => {
    console.log(e);
  })
})

// app.use('/api', apiRouters);
export default apiRouters;
