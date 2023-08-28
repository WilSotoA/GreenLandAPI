const { OAuth2Client } = require("google-auth-library");

const decodeTokenOauth = async (token) => {
  // Decodificar el token
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "877087591444-60fd4isbggmplol2hl8dd43quildvtjo.apps.googleusercontent.com", // Reemplaza 'tu_client_id' con el ID de cliente de tu aplicación
  });
  const payload = ticket.getPayload();
  return payload;
};

module.exports = {
  decodeTokenOauth,
};
