// import { transformSnakeToCamel } from '../utils/snakeCamelConverter'

export default class Account {
    constructor(props) {
      this.id = props.id
      this.email = props.email
      this.username = props.username
    }

    // このstaticはなんだろうか...
    // static newFromApiResponse = data => {
    //     return new Account(transformSnakeToCamel(data))
    //   }
  }


