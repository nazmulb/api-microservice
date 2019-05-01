const rp = require('request-promise');

const BASE_URL = `http://localhost:${process.env.prort || 8082}`;
const ROUTE_PATH = '/users';
const USER_OBJECT =  expect.objectContaining({
  _id: expect.any(Number),
  username: expect.any(String),
  password: expect.any(String),
  profession: expect.any(String)
});

let userId = 0;
const timeStamp = Math.floor(new Date().getTime()/1000);

function commonOptions() {
  return {
    json: true,
    resolveWithFullResponse: true,
  }
}

function getData(params = {}) {
  const form = {
      username: params.username || "abu bakar"+timeStamp,
      password: params.password || 123,
      profession: params.profession || "soft engineer"
  };
  if (params.id) {
    form._id = params.id
  }
  return {
    ...commonOptions(),
    form
  };
}

function getUrl(route) {
  return BASE_URL+ROUTE_PATH+route;
}

describe('User Routes', () => {
  test('Add New User', async () => {
    const response = await rp.post(getUrl('/add_update_user'), getData());

    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.msg).toBe("Successfully added");
  });

  test('Add Existing an User', async () => {
    const response = await rp.post(getUrl('/add_update_user'), getData());
    
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.msg).toBe("Username already exists. Try another one.");
  });
  
  test('List of user', async () => {
    const response = await rp.get(getUrl('/'), commonOptions());

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).not.toBe(0);
    expect(typeof response.body[0]).toBe('object');

    expect(response.body[0]).toMatchObject(USER_OBJECT);
    userId = response.body[0]._id;
  });

  test('View Single User by id', async () => {
    const response = await rp.get(getUrl(`/view/${userId}`), commonOptions());
    
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).not.toBe(0);
    expect(typeof response.body[0]).toBe('object');
    expect(response.body[0]).toMatchObject(USER_OBJECT);
  });

  test('Update an User', async () => {
    const response = await rp.post(getUrl('/add_update_user'), getData({id: userId}));
    
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.msg).toBe("Successfully updated");
  });

  test('Delete an User', async () => {
    const response = await rp.delete(getUrl(`/${userId}`), {
      ...commonOptions(),
      form:{
      id: userId
    }});
    
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.msg).toBe(`Successfully removed user id: ${userId}`);
  });
});
