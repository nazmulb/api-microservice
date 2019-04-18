const request = require('supertest');
const app = require('../../app');

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

function getUrl(segment) {
  return BASE_URL+ROUTE_PATH+segment;
}

describe('User Routes', () => {
  test('Add New User', async (done) => {
    const response = await request(app).post(getUrl('/add_update_user')).send(getData());

    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.msg).toBe("Successfully added");
    done();
  });

  test('Add Existing an User', async (done) => {
    const response = await request(app).post(getUrl('/add_update_user')).send(getData());
    
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.msg).toBe("Username already exists. Try another one.");
    done();
  });
  
  test('List of user', async (done) => {
    const response = await request(app).get(getUrl('/')).send(commonOptions());

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).not.toBe(0);
    expect(typeof response.body[0]).toBe('object');
    expect(response.body[0]).toMatchObject(USER_OBJECT);
    userId = response.body[0]._id;
    done();
  });

  test('View Single User by id', async (done) => {
    const response = await request(app).get(getUrl(`/view/${userId}`)).send(commonOptions());
    
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).not.toBe(0);
    expect(typeof response.body[0]).toBe('object');
    expect(response.body[0]).toMatchObject(USER_OBJECT);
    done();
  });

  test('Update an User', async (done) => {
    const response = await request(app).post(getUrl('/add_update_user')).send(getData({id: userId}));
    
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.msg).toBe("Successfully updated");
    done();
  });

  test('Delete an User', async (done) => {
    const response = await request(app).delete(getUrl(`/${userId}`)).send({
      ...commonOptions(),
      form:{
      id: userId
    }});
    
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.msg).toBe(`Successfully removed user id: ${userId}`);
    done();
  });
});
