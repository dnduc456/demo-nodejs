import * as Hapi from "hapi";


// Validate user of given JWT
const validate = async (decoded: any, request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  return {
    isValid: true,
    credentials: decoded
  };
};

export const jwtAuthPolicy: any = {
  validate: validate,
  tokenType: 'Bearer',
  verifyOptions: { algorithms: ['RS256'] }
};

export default {
  jwtAuthPolicy,
};
