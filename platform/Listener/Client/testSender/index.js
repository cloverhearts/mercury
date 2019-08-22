module.exports = {
  channel: 'test',
  action: (event, response) => {
    console.log('receive!')
    console.log('hoho ', response)
  }
};
