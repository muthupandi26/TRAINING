// Create session
exports.createSession = (req, user) => {
  req.session.user = user;
};

// Destroy session
exports.destroySession = (req) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
  });
};
