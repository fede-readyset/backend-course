// Importo Passport
import passport from "passport";
import local from "passport-local";

// Importo Modelo y funciones de bcrypt
import UsuarioModel from "../models/usuario.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

const LocalStrategy = local.Strategy;
