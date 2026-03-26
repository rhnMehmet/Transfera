const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    favoriteTeams: [
      {
        teamId: {
          type: Number,
          required: true,
        },
        teamName: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    favoritePlayers: [
      {
        playerId: {
          type: Number,
          required: true,
        },
        playerName: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    notificationPreferences: {
      transferNotifications: {
        type: Boolean,
        default: true,
      },
      matchNotifications: {
        type: Boolean,
        default: true,
      },
      emailNotifications: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);