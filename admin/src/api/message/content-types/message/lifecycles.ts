const { ForbiddenError } = require("@strapi/utils").errors;

export default {
  beforeCreate(event) {
    const { data } = event.params;
    console.log(data);
    // Ensure that the Name and Email fields are not empty
    if (!data.Name || !data.Email) {
      throw new ForbiddenError("Name and email are required");
    }
    // Ensure that the email looks vaguely like an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.Email)) {
      throw new ForbiddenError("Email is not valid");
    }
  },

  async afterCreate(event) {
    const { result } = event;
    console.log(JSON.stringify(event, null, 2));
    const emailText = `
Name: ${result.Name}
Email: ${result.Email}
Message: ${result.Message}
`;
    // Send an email to the admin email
    try {
      await strapi.plugins["email"].services.email.send({
        to: "mail+utopianfriends@raphaelkabo.com, utopian.friends@yahoo.com",
        from: "no-reply@utopianfriends.org",
        replyTo: result.Email,
        subject: `[Utopian Friends] New message from ${result.Name}`,
        text: emailText,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
