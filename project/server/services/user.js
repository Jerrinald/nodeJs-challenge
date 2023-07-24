const { User } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");
const nodemailer = require('nodemailer');


module.exports = function UserService() {
  return {
    findAll: async function (filters, options) {
      let dbOptions = {
        where: filters,
      };
      // options.order = {name: "ASC", dob: "DESC"}
      if (options.order) {
        // => [["name", "ASC"], ["dob", "DESC"]]
        dbOptions.order = Object.entries(options.order);
      }
      if (options.limit) {
        dbOptions.limit = options.limit;
        dbOptions.offset = options.offset;
      }
      return User.findAll(dbOptions);
    },
    findOne: async function (filters) {
      return User.findOne({ where: filters });
    },
    create: async function (data) {
      try {
        // Créer un nouvel utilisateur dans la base de données
        const newUser = await User.create(data);

        // Générer un jeton d'activation unique pour l'utilisateur (vous pouvez utiliser une bibliothèque comme "uuid" pour cela)
        const activationToken = generateUniqueToken();

        // Sauvegarder le jeton d'activation dans la base de données associée à l'utilisateur
        newUser.activationToken = activationToken;
        await newUser.save();

        // Envoi de l'e-mail de validation
        const transporter = nodemailer.createTransport({
          host: 'smtp.example.com', // Remplacez par votre serveur SMTP
          port: 587,
          secure: false,
          auth: {
            user: 'your_username', // Remplacez par votre nom d'utilisateur SMTP
            pass: 'your_password' // Remplacez par votre mot de passe SMTP
          }
        });

        const mailOptions = {
          from: 'your_email@example.com', // Remplacez par votre adresse e-mail
          to: newUser.email, // Adresse e-mail de l'utilisateur enregistré
          subject: 'Confirmation d\'inscription', // Sujet de l'e-mail
          html: `<p>Merci de vous être inscrit! Veuillez cliquer sur le lien suivant pour activer votre compte :</p>
             <a href="http://localhost:3000/activate-account/${activationToken}">Activer le compte</a>` // Lien d'activation (remplacez par votre propre lien)
        };

        await transporter.sendMail(mailOptions);

        return newUser;

      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    replace: async function (filters, newData) {
      try {
        const nbDeleted = await this.delete(filters);
        const user = await this.create(newData);
        return [[user, nbDeleted === 0]];
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    update: async (filters, newData) => {
      try {
        const [nbUpdated, users] = await User.update(newData, {
          where: filters,
          returning: true,
          individualHooks: true,
        });

        return users;
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    delete: async (filters) => {
      return User.destroy({ where: filters });
    },
    login: async (email, password) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new ValidationError({
          email: "Invalid credentials",
        });
      }
      const isPasswordValid = await user.isPasswordValid(password);
      if (!isPasswordValid) {
        throw new ValidationError({
          email: "Invalid credentials",
        });
      }

      return user;
    },
  };
};
