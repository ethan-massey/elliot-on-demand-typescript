import { Service } from "typedi";
import { UserRepository } from "../datasource/repositories/User.Repository";
const bcrypt = require("bcrypt");

@Service()
export class ValidationService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async isValidAPIKey(clientPlaintextPassword: string) {
    try {
      const adminUser = await this.userRepository.findOneByUsername("admin");

      // check to see if plaintext sent from client matches password in DB
      return bcrypt.compareSync(
        clientPlaintextPassword,
        adminUser.password,
        (err: any, result: any) => {
          if (err) throw err;
        },
      );
    } catch (error) {
      throw error;
    }
  }
}
