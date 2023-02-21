module.exports = function makeGetAllConversations({
    axios,intercomAccessToken
  }) {
    return async function getAllConversations(pageNumber) {
      try {
        const res = await axios({
          method: 'GET',
          url: `https://api.intercom.io/conversations?per_page=50&page=${pageNumber}`,
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
  