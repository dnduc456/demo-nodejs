const request = require("supertest");
const Server = require("../src/bootstrap/server").default;

describe("#test api", () => {
  let app: any;
  beforeAll(async () => {
    // Setup
    app = await Server.instance();
    return app.init();
  });


  it('pagination res json success', function(done) {
    request(app.server.listener)
      .get('/v1/clients/9a722330-413e-4f1c-a7d4-4d1768fc33a5/team-members')
      .expect(200, done);
  });
  it('pagination res json invalid request input', function(done) {
    request(app.server.listener)
      .get('/v1/clients/9a722330-413e-4f1c-a7d4/team-members')
      .expect(400, done);
  });
  it('create new director', function(done) {
    request(app.server.listener)
      .post('/v1/clients/9a722330-413e-4f1c-a7d4-4d1768fc33a5/directors')
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .expect(201, done);
  });
  it('create new director but duplicate', function(done) {
    request(app.server.listener)
      .post('/v1/clients/9a722330-413e-4f1c-a7d4-4d1768fc33a5/directors')
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .expect(400, done);
  });
  it('create new director but invalid request input', function(done) {
    request(app.server.listener)
      .post('/v1/clients/9a722330-413e-4f1c-a7d4-4d1768fc33a5/directors')
      .send({asdsadsa: 'john'})
      .set('Accept', 'application/json')
      .expect(400, done);
  });
});

