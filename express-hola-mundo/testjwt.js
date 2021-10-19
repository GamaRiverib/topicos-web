const jwt = require("jsonwebtoken");

const user = process.argv[2];

const payload = { user };

const secret = "TopicosWeb123";

const token = jwt.sign(payload, secret, {
  issuer: "topicos",
  subject: user
});

console.log({token});

const payloadDecoded = jwt.decode(token, { complete: false, json: false });

console.log({payloadDecoded});

const payloadDecoded2 = jwt.decode(token, { complete: true, json: true });

console.log({payloadDecoded2});

const tokenFake = jwt.sign(payload, "ABCKDEDKD", {
  issuer: "topicos",
  subject: user
});

console.log({tokenFake});

const tokenVerified = jwt.verify(token, secret, { complete: true });

console.log({tokenVerified});

try {
  const tokenFakeVerified = jwt.verify(tokenFake, secret, { complete: true });

  console.log({tokenFakeVerified});
} catch(reason) {
  console.log(reason);
}
