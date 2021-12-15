const app = require('./server/index.js');
const request = require('supertest');



//test default route handler
describe('/', () => {
  it('responds with Hello World', async () => {
    const res = await request(app).get('/');

    expect(res.text).toBe('Hello World');
  });
});

//test </workouts> endpoint
describe('Test routes', () => {
  it('addWorkout route works', (done) => {
    request(app)
      .post('/workouts/addWorkout')
      .send({
        name: 'name_of_workout',
        filming_date_time: 'YYYY-MM-14Thh:mmTZD',
        filming_duration: 60, 
        status: 'planned_ready_completed_canceled',
        userID: 1,
        level: 'beginner_intermediate_advanced'
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('getWorkouts route works', (done) => {
    request(app)
      .get('/workouts/getWorkouts')
      .set('Accept', 'application/json')
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

});
