module.exports = {
  channel: 'test',
  action: (event, arg) => {
    console.log('receive!', arg)
    event.sender.send('test-response',  {...arg, title: ' 을 보내주었다.'})
    event.sender.send('test-response', {...arg, title: ' 하나 더 받아라!'})
  }
}
