let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../config/enviroment').baseUrl;
let domain = require('../config/enviroment').domain;
let sensor = require('../config/sample-data').valid;
let invalidSensor = require('../config/sample-data').invalid;
let userCredentials = require('../config/sample-data').user.admin;
let token = "";

chai.use(chaiHttp);

before(function (done) {
  chai.request(baseUrl)
    .post('/auth/token')
    .send(userCredentials)
    .end(function (err, response) {
      token = response.text;
      chai.request(baseUrl)
        .delete(`/domains/${domain}/sensors/${sensor.id}`)
        .end((err, rss) => {
          done();
        })
    });
});


describe('Sensors', () => {
  describe('Get Sensors', () => {
    it('it should GET all the the senseors', (done) => {
      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors`)
        .end((err, res) => {
          res.should.have.status(200);
          //res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Create sensors', () => {
    it('it should POST a sensor ', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors`)
        .send(sensor)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('it should Reject posting data with reapeted values', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors`)
        .send(sensor)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
    it('it should Reject posting a sensor with invalid data', (done) => {
      chai.request(baseUrl)
        .post(`/domains/${domain}/sensors`)
        .send(invalidSensor)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('single sensor', () => {
    it('it should GET a sensor by the given id', (done) => {

      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/${sensor.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('gateway_id');
          res.body.should.have.property('name');
          res.body.should.have.property('owner');
          res.body.should.have.property('measurements');
          res.body.should.have.property('location');
          res.body.should.have.property('id').eql(sensor.id);
          done();
        });
    });
    it('it should give a 404 err a sensor with none existent id', (done) => {

      chai.request(baseUrl)
        .get(`/domains/${domain}/sensors/this-id-does-not-exist`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });

    });
  });

  describe('insert owner', () => {
    it('it should update the owner field', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/owner`)
        .set('content-type', 'text/plain')
        .send("henok")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });

    });
  });
  describe('insert name', () => {
    it('it should update the name field', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/name`)
        .set('content-type', 'text/plain')
        .send("SEN1")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });

    });


  });
  describe('insert location', () => {
    it('it should update the location field', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/location`)
        .send({
          "latitude": 5.36,
          "longitude": 4.0083
        })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });

    });
  });

  describe('insert sensor kind', () => {
    it('it should update the sensor kind field', (done) => {
      chai.request(baseUrl)
        .put(`/domains/${domain}/sensors/${sensor.id}/sensor_kind`)
        .set('content-type', 'text/plain')
        .send("Soil moisture sensor")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });

    });
  });

  describe('Remove sensor', () => {
    it('it should Remove a sensor by the given id', (done) => {
      chai.request(baseUrl)
        .delete(`/domains/${domain}/sensors/${sensor.id}`)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

});
