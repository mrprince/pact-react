import path from "path";
import PersonService from './person.service';
import { Pact, Interaction, Matchers } from "@pact-foundation/pact"
import Person from './person';

const provider = new Pact({
  cors: true,
  port: 8888,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  pactfileWriteMode: 'update',
  consumer: 'person-react-consumer',
  provider: 'person-provider',
  host: '127.0.0.1'
});


describe('PersonService API', () => {

  const personService = new PersonService('http://localhost', 8888);

  beforeAll(() => provider.setup());

  afterAll(() => provider.verify() && provider.finalize());

  describe("get person 0", () => {

    beforeAll(() => {

      const interaction = new Interaction()
        .given("Person 0 exists")
        .uponReceiving("A request to /api/person/0")
        .withRequest({
          method: "GET",
          path: "/api/person/0",
          headers: {
            Accept: "application/json; charset=UTF-8",
          },
        })
        .willRespondWith({
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: new Person(0, 'Michael Johansen', 50),
        });

      return provider.addInteraction(interaction)
    });

    it('sends a request according to contract', (done) => {
      personService.getPerson(0)
        .then((person: Person) => {
          expect(person.name).toEqual('Michael Johansen');
          done();
        });

    });

  })

});   