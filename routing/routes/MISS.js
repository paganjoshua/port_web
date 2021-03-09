const MISS = (contentType) => {
  return {
    hit: false,
    client: {
      status: 404,
      headers: {
        'Content-Type': contentType,
        'x-wizbiz-by': 'jynx-jynx',
        'x-you-owe-me-a-coffee': 'https://satan.jynx.link'
      },
      data: null,
    }
  }
}

module.exports = MISS;