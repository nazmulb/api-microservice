const requestify = require('requestify'); 


const BASE_URL = `http://localhost:${process.env.prort || 8082}`;
const ROUTE_PATH = '/users';
const USER_OBJECT =  expect.objectContaining({
  _id: expect.any(Number),
  username: expect.any(String),
  password: expect.any(String),
  profession: expect.any(String)
});

let userId = 0;

function getUrl(route) {
  return BASE_URL+ROUTE_PATH+route;
}

describe('User Routes', () => {
  test('List of user', async () => {
    const response = await requestify.get(getUrl('/'));
    expect(response.code).toEqual(200);
  
    const body = JSON.parse(response.body); 
    expect(body.length).not.toBe(0);
    expect(typeof body[0]).toBe('object');
    expect(body[0]).toMatchObject(USER_OBJECT);
    userId = body[0]._id;
  });

  test('View single user by id', async () => {
    const response = await requestify.get(getUrl(`/view/${userId}`));
    expect(response.code).toEqual(200);
  
    const body = JSON.parse(response.body); 
    expect(body.length).not.toBe(0);
    expect(typeof body[0]).toBe('object');
    expect(body[0]).toMatchObject(USER_OBJECT);
  });
});
