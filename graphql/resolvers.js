const authService = require('../services/auth');
const dataService = require('../services/data');

const resolvers = {
    Query: {
      async getResidents() {
        return dataService.getResidents();
      },
      async getPackages() {
        return dataService.getPackages();
      }
    },
    Mutation: {
      async createPackage(name, type, status) {
        let package = await dataService.createPackage(name, type, status);
        return {status: "success", package: package, message: "package created successfully"};
      },
      async setPackageStatus(packageId, status) {
        let package = await dataService.setPackageStatus(packageId, status);
        return {status: "success", package: package, message: "package status updated successfully"};
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
