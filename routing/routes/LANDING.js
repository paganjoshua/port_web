const LANDING = (contentType) => {
  return {
    hit: true,
    client: {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'x-wizbiz-by': 'jynx-jynx',
        'x-you-owe-me-a-coffee': 'https://satan.jynx.link'
      },
      data: null,
    }
  }
}

module.exports = LANDING;