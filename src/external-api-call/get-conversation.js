
module.exports = function makeGetConversation({
    axios,intercomAccessToken
  }) {
    return async function getConversation(id) {
      try {
        const res = await axios({
          method: 'GET',
          url: `https://api.intercom.io/conversations/${id}`,
          headers: {
            'Authorization': intercomAccessToken,
            'Accept': 'application/json',
            'content-type': 'application/json',
          },
        });
        return res.data;
      } catch (err) {
        let error;
        if (err && err.response && err.response.data) {
          error = err.response.data;
        } else {
          error = err.message || err;
        }
        console.info('Error in update Prodcut details in bigcommerce');
        throw error;
      }
    };
  };
  