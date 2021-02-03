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
      async createPackage(parent, args, context, info) {
        let package = await dataService.createPackage(args.name, args.type, args.status);
        return {status: "success", package: package, message: "package created successfully"};
      },
      async setPackageStatus(parent, args, context, info) {
        let package = await dataService.setPackageStatus(args.id, args.status);
        return {status: "success", package: package, message: "package status updated successfully"};
      },
      async login(parent, args, context, info) {
        try {
            /**
             *  HERE, check if args.password is correct!
             */
            let token = await authService.createToken(args.email);
            return { status: "success", token };
        } catch(err) {
            return { status: "error", message: "could not create token" };
        }
      }
    },
  };

  module.exports = resolvers;
