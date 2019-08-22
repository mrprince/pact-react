import Person from "./person";
import axios from 'axios';

class PersonService {

    baseUrl:string;

    port:number;

    constructor(baseUrl:string, port:number){
        this.baseUrl = baseUrl;
        this.port = port;
    }


    getPerson(id:number): Promise<Person>  {
        if (id == null) {
            throw new Error("id must not be null!");
        }
        return axios.request({
            method: 'GET',
            url: `/api/person/${id}`,
            baseURL: `${this.baseUrl}:${this.port}`,
            headers: {
                'Accept': 'application/json; charset=UTF-8'
            }
        }).then(response => response.data as Person) as Promise<Person>;
    };

}

export default PersonService;