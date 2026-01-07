const mongoose = require("mongoose");

const SeriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startYear: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
    },
    endYear: {
      type: Number,
      validate: {
        validator: function (value) {
          const update = this.getUpdate?.() || {};
          const startYear = update.startYear ?? this.startYear;

          if (!value || !startYear) return true;

          return value >= startYear;
        },
        message: "O ano de finalização não deve ser menor que o ano de inicio.",
      },
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { collection: "series" }
);

module.exports = mongoose.model("Series", SeriesSchema);
