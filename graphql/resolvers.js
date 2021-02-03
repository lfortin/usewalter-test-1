const authService = require('../services/auth');

const resolvers = {
    Query: {
      async getResidents() {
        return [];
      },
      async getPackages() {
        return [];
      }
    },
    Mutation: {
      async createPackage(name, type, status) {
        return {status: "success", package: {name, type, status}};
      },
      async setPackageStatus(packageId, status) {
        return {status: "success", package: {}};
      },
      async login(email, password) {
        try {
            /**
             *  HERE, check if password is correct!
             */
            let token = await authService.createToken(email);
            return { status: "success", token };
        } catch(err) {
            return { status: "error", message: "could not create token" };
        }
      }
    },
  };

  module.exports = resolvers;
